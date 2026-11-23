import { adminClient } from "@/lib/supabase/admin";

/** Gives back a credit after an AI failure so users only pay for successful runs. */
export async function refundCredit(userId: string, kind: string) {
  const admin = adminClient();
  if (!admin) return;
  const { data } = await admin.from("profiles").select("credits_used").eq("id", userId).single();
  if (data && data.credits_used > 0) {
    await admin.from("profiles").update({ credits_used: data.credits_used - 1 }).eq("id", userId);
    await admin.from("usage_events").insert({ user_id: userId, kind: `${kind}:refund`, credits: -1 });
  }
}
