"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

async function ctx() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return { supabase, user: data.user };
}

export async function signOut() {
  const { supabase } = await ctx();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateProfile(formData: FormData) {
  const { supabase, user } = await ctx();
  const p = z.object({ full_name: z.string().max(120), company: z.string().max(160) }).parse({
    full_name: formData.get("full_name") ?? "", company: formData.get("company") ?? "",
  });
  await supabase.from("profiles").update(p).eq("id", user.id);
  revalidatePath("/app", "layout");
}

const stages = ["applied", "screened", "assessed", "interview", "offer", "rejected"] as const;
export async function updateStage(id: string, stage: string) {
  const { supabase } = await ctx();
  const s = z.enum(stages).parse(stage);
  await supabase.from("candidates").update({ stage: s }).eq("id", id);
  revalidatePath("/app/candidates");
}

export async function deleteRow(table: "interviews" | "assessments" | "candidates", id: string) {
  const { supabase } = await ctx();
  z.enum(["interviews", "assessments", "candidates"]).parse(table);
  await supabase.from(table).delete().eq("id", id);
  revalidatePath(`/app/${table}`);
}

export async function markNotificationsRead() {
  const { supabase, user } = await ctx();
  await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
  revalidatePath("/app", "layout");
}

/** Deterministic scoring: percent of correct picks. No AI involved. */
export async function scoreAssessment(assessmentId: string, picks: number[], candidateName: string, candidateEmail: string) {
  const { supabase, user } = await ctx();
  const { data: a } = await supabase.from("assessments").select("items").eq("id", assessmentId).single();
  if (!a) return { error: "Assessment not found." };
  const items = a.items as { answer_index: number }[];
  if (picks.length !== items.length) return { error: "Please answer every question." };
  const correct = items.reduce((n, it, i) => n + (picks[i] === it.answer_index ? 1 : 0), 0);
  const score = Math.round((correct / items.length) * 100);

  let candidateId: string | null = null;
  const email = z.string().email().safeParse(candidateEmail);
  if (candidateName.trim() && email.success) {
    const c = await supabase.from("candidates").insert({ user_id: user.id, name: candidateName.trim().slice(0, 120), email: email.data, stage: "assessed", score }).select("id").single();
    candidateId = c.data?.id ?? null;
  }
  await supabase.from("assessment_results").insert({ user_id: user.id, assessment_id: assessmentId, candidate_id: candidateId, picks, score });
  revalidatePath("/app");
  return { score, correct, total: items.length };
}
