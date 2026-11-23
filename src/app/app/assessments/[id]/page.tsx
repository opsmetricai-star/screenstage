import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AssessmentRunner } from "@/components/AssessmentRunner";

export default async function AssessmentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: a } = await supabase.from("assessments").select("id, title, items").eq("id", id).single();
  if (!a) notFound();
  const { data: results } = await supabase.from("assessment_results").select("id, score, created_at, candidates(name)").eq("assessment_id", id).order("created_at", { ascending: false }).limit(20);
  // Answer keys are stripped before reaching the client.
  const items = (a.items as { prompt: string; competency: string; options: string[] }[]).map(({ prompt, competency, options }) => ({ prompt, competency, options }));
  return (
    <div className="max-w-3xl">
      <h1 className="text-[34px]">{a.title}</h1><p className="text-soft">Run a candidate through this assessment. Scoring is calculated from the answer key, not by AI.</p>
      <AssessmentRunner id={a.id} items={items} />
      <h2 className="text-[20px] mt-12 mb-3">Results</h2>
      {results?.length ? <ul className="card divide-y divide-line">{results.map((r) => <li key={r.id} className="p-4 flex justify-between"><span>{(r.candidates as unknown as { name: string } | null)?.name ?? "Anonymous run"}</span><span className="text-brand">{Math.round(r.score)}%</span></li>)}</ul> : <p className="text-soft">No results yet.</p>}
    </div>
  );
}
