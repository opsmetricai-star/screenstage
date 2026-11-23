import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { adminClient } from "@/lib/supabase/admin";
import { fail } from "@/lib/api";
import { plans } from "@/lib/content";

/**
 * Trusted payment confirmation. A redirect from the checkout page is NOT proof of payment.
 * Call this from a verified provider webhook or an admin tool with the shared secret:
 *   POST /api/payments/confirm  { email, plan, reference }
 *   Header: x-webhook-secret: <PAYMENT_WEBHOOK_SECRET>
 */
const body = z.object({ email: z.string().email(), plan: z.enum(["starter", "growth", "scale"]), reference: z.string().min(3).max(200) });

export async function POST(req: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) return fail(503, "PAYMENT_WEBHOOK_SECRET is not configured.");
  const sent = Buffer.from(req.headers.get("x-webhook-secret") ?? "");
  const want = Buffer.from(secret);
  if (sent.length !== want.length || !timingSafeEqual(sent, want)) return fail(401, "Unauthorized.");

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail(400, "Invalid payload.");
  const admin = adminClient();
  if (!admin) return fail(503, "Service role key is not configured.");

  const { email, plan, reference } = parsed.data;
  const { data: users, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) return fail(500, "Could not look up the user.");
  const user = users.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) return fail(404, "No account with that email.");

  const dup = await admin.from("subscriptions").select("id").eq("reference", reference).maybeSingle();
  if (dup.data) return NextResponse.json({ ok: true, duplicate: true });

  const credits = plans.find((p) => p.id === plan)!.credits;
  await admin.from("subscriptions").insert({ user_id: user.id, plan, reference, status: "active" });
  await admin.from("profiles").update({ plan, credits_total: credits, credits_used: 0 }).eq("id", user.id);
  await admin.from("notifications").insert({ user_id: user.id, body: `Your ${plan} plan is active with ${credits} credits.` });
  return NextResponse.json({ ok: true });
}
