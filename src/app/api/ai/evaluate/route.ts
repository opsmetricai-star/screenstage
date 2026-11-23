import { NextResponse } from "next/server";
import { z } from "zod";
import { scriptSchema } from "@/lib/gemini";
import { fail, geminiFail, requireUser, spendCredit } from "@/lib/api";
import { refundCredit } from "@/lib/credits";
import { evaluateAnswers } from "@/lib/evaluate";

const body = z.object({
  interviewId: z.string().uuid(),
  name: z.string().min(1).max(120),
  email: z.string().email(),
  answers: z.array(z.object({ question: z.string(), answer: z.string().min(1).max(4000) })).min(1).max(12),
});

/** Recruiter-run evaluation (e.g. pasted or practice answers). */
export async function POST(req: Request) {
  const auth = await requireUser();
  if (auth.error) return auth.error;
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail(400, "Invalid request.");
  const { interviewId, name, email, answers } = parsed.data;

  const iv = await auth.supabase.from("interviews").select("id, role_id, script").eq("id", interviewId).single();
  if (iv.error || !iv.data) return fail(404, "Interview not found.");
  const script = scriptSchema.parse(iv.data.script);

  const noCredit = await spendCredit(auth.user.id, "ai_evaluation");
  if (noCredit) return noCredit;
  try {
    const { evaluation, overall } = await evaluateAnswers(script, answers);
    const cand = await auth.supabase.from("candidates").insert({ user_id: auth.user.id, role_id: iv.data.role_id, name, email, stage: "screened", score: overall }).select("id").single();
    await auth.supabase.from("responses").insert({ user_id: auth.user.id, interview_id: interviewId, candidate_id: cand.data?.id, answers, evaluation, overall_score: overall });
    return NextResponse.json({ evaluation, overall });
  } catch (e) {
    await refundCredit(auth.user.id, "ai_evaluation");
    return geminiFail(e);
  }
}
