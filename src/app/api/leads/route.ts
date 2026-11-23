import { NextResponse } from "next/server";
import { z } from "zod";
import { adminClient } from "@/lib/supabase/admin";
import { fail } from "@/lib/api";

const body = z.object({
  name: z.string().min(1).max(120), email: z.string().email().max(200),
  company: z.string().max(160).optional(), size: z.string().max(40).optional(), message: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail(400, "Please enter your name and a valid work email.");
  const admin = adminClient();
  if (!admin) return fail(503, "Demo requests are not available until Supabase is configured.");
  const { error } = await admin.from("demo_requests").insert(parsed.data);
  if (error) return fail(500, "Could not save your request. Please try again.");
  return NextResponse.json({ ok: true });
}
