import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Generator } from "@/components/Generator";

export const metadata = { title: "AI Interviews" };
export default async function Interviews() {
  const supabase = await createClient();
  const { data } = await supabase.from("interviews").select("id, title, created_at, script").order("created_at", { ascending: false });
  return (
    <div className="max-w-4xl">
      <h1 className="text-[34px]">AI Interviews</h1><p className="text-soft">Turn a job description into a structured interview, share the link, and review evidence-based scores.</p>
      <div className="mt-8"><Generator kind="interview" /></div>
      <h2 className="text-[20px] mt-10 mb-3">Your interviews</h2>
      {data?.length ? <ul className="grid gap-3">{data.map((i) => <li key={i.id}><Link href={`/app/interviews/${i.id}`} className="card p-5 flex justify-between hover:border-brand transition"><span>{i.title}</span><span className="text-soft text-[14px]">{(i.script as { questions: unknown[] }).questions.length} questions · {new Date(i.created_at).toLocaleDateString()}</span></Link></li>)}</ul> : <p className="text-soft">Nothing yet. Generate your first interview above.</p>}
    </div>
  );
}
