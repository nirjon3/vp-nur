import { NextResponse } from "next/server";
import { citizenRequestSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { generateTrackingRef } from "@/lib/tracking";

export const runtime = "nodejs";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_ATTACHMENT = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/**
 * POST /api/requests — citizen request intake.
 *
 * Returns 503 (never a fake success) when the persistence layer is not
 * reachable. The public site therefore cannot show a success state for a
 * request that was not stored.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`req:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfterSeconds: limited.retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const raw = {
    name: form.get("name") ?? "",
    phone: form.get("phone") ?? "",
    union: form.get("union") ?? "",
    category: form.get("category") ?? "general",
    subject: form.get("subject") ?? "",
    description: form.get("description") ?? "",
    consent: form.get("consent") === "true" || form.get("consent") === "on",
    website: form.get("website") ?? "", // honeypot
  };

  const parsed = citizenRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ ok: false, error: "validation", fieldErrors }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot filled → reject as bad request (do not store, do not pretend success)
  if (data.website) {
    return NextResponse.json({ ok: false, error: "invalid_submission" }, { status: 400 });
  }

  // Attachment handling
  const file = form.get("attachment");
  let attachment: { buffer: Buffer; mimetype: string; filename: string } | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ ok: false, error: "attachment_too_large" }, { status: 413 });
    }
    if (!ALLOWED_ATTACHMENT.has(file.type)) {
      return NextResponse.json({ ok: false, error: "attachment_type" }, { status: 415 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachment = {
      buffer,
      mimetype: file.type,
      filename: file.name.replace(/[^\w.\- ]/g, "_").slice(0, 120) || "attachment",
    };
  }

  // Persist via Payload (local API). Any failure → honest 503.
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@/payload.config")).default;
    const payload = await getPayload({ config });

    const ref = generateTrackingRef();
    let attachmentId: number | undefined;

    if (attachment) {
      const created = await payload.create({
        collection: "citizen-request-attachments",
        data: {},
        file: {
          data: attachment.buffer,
          mimetype: attachment.mimetype,
          name: attachment.filename,
          size: attachment.buffer.length,
        },
      });
      attachmentId = created.id;
    }

    await payload.create({
      collection: "citizen-requests",
      data: {
        ref,
        name: data.name,
        phone: data.phone,
        union: data.union || undefined,
        category: data.category,
        subject: data.subject,
        description: data.description,
        attachment: attachmentId,
        status: "received",
        statusHistory: [{ status: "received", at: new Date().toISOString() }],
      },
    });

    return NextResponse.json(
      { ok: true, ref },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[citizen-requests] persistence failed:", error);
    return NextResponse.json(
      { ok: false, error: "service_unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
