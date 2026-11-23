import { NextResponse } from "next/server";
import { z } from "zod";
import { assessmentResponseSchema, assessmentSchema, clean, geminiJson } from "@/lib/gemini";
import { fail, geminiFail, requireUser, spendCredit } from "@/lib/api";
import { refundCredit } from "@/lib/credits";

const body = z.object({ title: z.string().min(2).max(120), skills: z.string().min(3).max(500), count: z.number().int().min(3).max(15).default(8) });

export async function POST(req: Request) {
  const auth = await requireUser();
  if (auth.error) return auth.error;
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail(400, "Provide a title and the skills to measure.");
  const { title, skills, count } = parsed.data;

  const noCredit = await spendCredit(auth.user.id, "ai_assessment");
  if (noCredit) return noCredit;
  try {
    const out = await geminiJson(
      `Write ${count} situational multiple-choice questions for the assessment "${clean(title, 120)}" measuring: ${clean(skills, 500)}. Each has exactly 4 options and one correct answer (answer_index 0-3). Make wrong options plausible. Vary the position of the correct answer.`,
      assessmentSchema, assessmentResponseSchema);
    const { data, error } = await auth.supabase.from("assessments").insert({ user_id: auth.user.id, title, items: out.items }).select("id").single();
    if (error) { await refundCredit(auth.user.id, "ai_assessment"); return fail(500, "Could not save the assessment."); }
    return NextResponse.json({ id: data.id, items: out.items });
  } catch (e) {
    await refundCredit(auth.user.id, "ai_assessment");
    return geminiFail(e);
  }
}
