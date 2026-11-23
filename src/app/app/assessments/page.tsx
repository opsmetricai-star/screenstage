import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Generator } from "@/components/Generator";

export const metadata = { title: "Assessments" };
export default async function Assessments() {
  const supabase = await createClient();
  const { data } = await supabase.from("assessments").select("id, title, items, created_at").order("created_at", { ascending: false });
  return (
    <div className="max-w-4xl">
      <h1 className="text-[34px]">Assessments</h1><p className="text-soft">Draft skills tests with AI, review them, then run candidates through for instant, deterministic scoring.</p>
      <div className="mt-8"><Generator kind="assessment" /></div>
      <h2 className="text-[20px] mt-10 mb-3">Your assessments</h2>
      {data?.length ? <ul className="grid gap-3">{data.map((a) => <li key={a.id}><Link href={`/app/assessments/${a.id}`} className="card p-5 flex justify-between hover:border-brand transition"><span>{a.title}</span><span className="text-soft text-[14px]">{(a.items as unknown[]).length} questions</span></Link></li>)}</ul> : <p className="text-soft">None yet.</p>}
    </div>
  );
}
