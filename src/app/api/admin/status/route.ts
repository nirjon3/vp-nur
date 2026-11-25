import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET() {
  const status: {
    cloudinary: { ok: boolean; cloudName?: string; error?: string };
    supabase: { ok: boolean; url?: string; tables?: { todos?: number; citizen_requests?: number }; error?: string };
    admin: { ok: boolean; username: string };
  } = {
    cloudinary: { ok: false },
    supabase: { ok: false },
    admin: { ok: true, username: "admin" },
  };

  // Test Cloudinary
  try {
    const res = await cloudinary.api.ping();
    status.cloudinary = {
      ok: res.status === "ok",
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || "htosybxj",
    };
  } catch (err) {
    status.cloudinary = {
      ok: false,
      error: err instanceof Error ? err.message : "Cloudinary check failed",
    };
  }

  // Test Supabase
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const supabase = createClient(url, key);
      const { count: todosCount } = await supabase.from("todos").select("*", { count: "exact", head: true });
      const { count: reqCount } = await supabase.from("citizen_requests").select("*", { count: "exact", head: true });

      status.supabase = {
        ok: true,
        url,
        tables: {
          todos: todosCount ?? 0,
          citizen_requests: reqCount ?? 0,
        },
      };
    } else {
      status.supabase = { ok: false, error: "Supabase env vars missing" };
    }
  } catch (err) {
    status.supabase = {
      ok: false,
      error: err instanceof Error ? err.message : "Supabase check failed",
    };
  }

  return NextResponse.json(status);
}
