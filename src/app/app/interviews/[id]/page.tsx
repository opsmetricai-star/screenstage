import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CopyLink } from "@/components/CopyLink";
import { deleteRow } from "../../actions";
import type { Script, Evaluation } from "@/lib/gemini";

export default async function InterviewDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: iv } = await supabase.from("interviews").select("id, title, script, share_token").eq("id", id).single();
  if (!iv) notFound();
  const script = iv.script as Script;
  const { data: responses } = await supabase.from("responses").select("id, overall_score, evaluation, created_at, candidates(name, email)").eq("interview_id", id).order("created_at", { ascending: false });
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <div className="max-w-4xl">
      <h1 className="text-[34px]">{iv.title}</h1>
      <div className="card p-5 mt-6"><div className="text-[14px] text-soft mb-2">Candidate link</div><CopyLink url={`${site}/i/${iv.share_token}`} /></div>
      <section className="card p-6 mt-6"><h2 className="text-[20px]">Script</h2><p className="text-soft mt-2 italic">{script.intro}</p>
        <ol className="mt-5 space-y-5">{script.questions.map((q, i) => <li key={i}><div className="flex gap-3"><span className="text-brand">{i + 1}.</span><div><div>{q.text}</div><div className="text-[13px] text-muted mt-1">{q.competency}</div><ul className="text-[14px] text-soft mt-2 list-disc pl-5">{q.rubric.map((r) => <li key={r}>{r}</li>)}</ul></div></div></li>)}</ol></section>
      <h2 className="text-[20px] mt-10 mb-3">Responses ({responses?.length ?? 0})</h2>
      <div className="grid gap-4">{responses?.map((r) => {
        const ev = r.evaluation as Evaluation | null;
        const cand = r.candidates as unknown as { name: string; email: string } | null;
        return (
          <article key={r.id} className="card p-6"><div className="flex justify-between"><div><div className="text-[18px]">{cand?.name ?? "Candidate"}</div><div className="text-soft text-[13px]">{cand?.email}</div></div><div className="text-right"><div className="text-[34px] font-light grad-text">{Math.round(r.overall_score ?? 0)}</div><div className="text-[13px] capitalize text-soft">{ev?.recommendation}</div></div></div>
            {ev && <><p className="mt-3 text-soft">{ev.summary}</p><ul className="mt-4 grid gap-2">{ev.scores.map((s) => <li key={s.competency} className="text-[14px]"><div className="flex justify-between"><b className="font-medium">{s.competency}</b><span>{s.score}/5</span></div><div className="h-1.5 bg-line rounded mt-1"><div className="h-1.5 bg-brand rounded" style={{ width: `${(s.score / 5) * 100}%` }} /></div><div className="text-soft mt-1">{s.evidence}</div></li>)}</ul></>}</article>
        );
      })}</div>
      <form action={async () => { "use server"; await deleteRow("interviews", id); const { redirect } = await import("next/navigation"); redirect("/app/interviews"); }}><button className="mt-10 text-[14px] text-soft hover:text-brand">Delete interview</button></form>
    </div>
  );
}
