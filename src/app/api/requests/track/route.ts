import { NextResponse } from "next/server";
import { trackRequestSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const normalizePhone = (v: string) => v.replace(/[\s-]/g, "");

/**
 * GET /api/requests/track?ref=NRV-...&phone=01...
 *
 * Reveals a request's status only when BOTH the tracking reference and the
 * exact phone number used at submission match. Wrong either → identical
 * 404 response, so existence of other people's requests cannot be probed.
 */
export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`track:${ip}`, 10, 5 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfterSeconds: limited.retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  const url = new URL(request.url);
  const parsed = trackRequestSchema.safeParse({
    ref: url.searchParams.get("ref") ?? "",
    phone: url.searchParams.get("phone") ?? "",
  });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  try {
    const { getPayload } = await import("payload");
    const config = (await import("@/payload.config")).default;
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "citizen-requests",
      where: { ref: { equals: parsed.data.ref } },
      limit: 1,
      depth: 0,
    });

    const record = result.docs[0] as unknown as
      | { phone: string; status: string; createdAt?: string; updatedAt?: string }
      | undefined;

    if (!record || normalizePhone(record.phone) !== normalizePhone(parsed.data.phone)) {
      return NextResponse.json(
        { ok: false, error: "not_found" },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        ref: parsed.data.ref,
        status: record.status,
        submittedAt: record.createdAt ?? null,
        updatedAt: record.updatedAt ?? null,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[citizen-requests] track lookup failed:", error);
    return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 });
  }
}
