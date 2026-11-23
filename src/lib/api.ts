import { NextResponse } from "next/server";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { GeminiError } from "@/lib/gemini";

export const fail = (status: number, error: string) => NextResponse.json({ error }, { status });

export function geminiFail(e: unknown) {
  if (e instanceof GeminiError) return fail(e.code === "not_configured" ? 503 : 502, e.message);
  return fail(500, "Unexpected server error.");
}

/** Resolves the signed-in user, or an error response. */
export async function requireUser() {
  if (!supabaseConfigured()) return { error: fail(503, "The service is temporarily unavailable. Please try again shortly.") };
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { error: fail(401, "Please sign in.") };
  return { supabase, user: data.user };
}

/** Spends one credit atomically via the service role. Returns an error response if exhausted. */
export async function spendCredit(userId: string, kind: string) {
  const admin = adminClient();
  if (!admin) return fail(503, "The service is temporarily unavailable. Please try again shortly.");
  const { data, error } = await admin.rpc("spend_credit", { p_user: userId, p_kind: kind, p_n: 1 });
  if (error) return fail(500, "Could not record usage.");
  if (!data) return fail(402, "You are out of credits. Upgrade your plan on the Billing page.");
  return null;
}
