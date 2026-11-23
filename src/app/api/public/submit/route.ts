import { NextResponse } from "next/server";
import { z } from "zod";
import { adminClient } from "@/lib/supabase/admin";
import { scriptSchema } from "@/lib/gemini";
import { evaluateAnswers } from "@/lib/evaluate";
import { fail, geminiFail } from "@/lib/api";
import { refundCredit } from "@/lib/credits";

const body = z.object({
  token: z.string().min(8).max(64), name: z.string().min(1).max(120), email: z.string().email(),
  answers: z.array(z.string().min(1).max(4000)).min(1).max(12),
});

/** A candidate submits answers via the shared interview link. Uses the owner's credit. */
export async function POST(req: Request) {
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail(400, "Please answer every question and enter a valid email.");
  const admin = adminClient();
  if (!admin) return fail(503, "Submissions are unavailable until Supabase is configured.");
  const { token, name, email, answers } = parsed.data;

  const iv = await admin.from("interviews").select("id, user_id, role_id, title, script").eq("share_token", token).single();
  if (iv.error || !iv.data) return fail(404, "This interview link is not valid.");
  const script = scriptSchema.parse(iv.data.script);
  if (answers.length !== script.questions.length) return fail(400, "Please answer every question.");

  const ok = await admin.rpc("spend_credit", { p_user: iv.data.user_id, p_kind: "candidate_evaluation", p_n: 1 });
  if (!ok.data) return fail(503, "This interview is temporarily unavailable. Please contact the recruiter.");

  const qa = script.questions.map((q, i) => ({ question: q.text, answer: answers[i] }));
  try {
    const { evaluation, overall } = await evaluateAnswers(script, qa);
    const cand = await admin.from("candidates").insert({ user_id: iv.data.user_id, role_id: iv.data.role_id, name, email, stage: "screened", score: overall }).select("id").single();
    await admin.from("responses").insert({ user_id: iv.data.user_id, interview_id: iv.data.id, candidate_id: cand.data?.id, answers: qa, evaluation, overall_score: overall });
    await admin.from("notifications").insert({ user_id: iv.data.user_id, body: `${name} completed "${iv.data.title}" (${overall}/100, ${evaluation.recommendation}).` });
    return NextResponse.json({ ok: true });
  } catch (e) {
    await refundCredit(iv.data.user_id, "candidate_evaluation");
    return geminiFail(e);
  }
}
