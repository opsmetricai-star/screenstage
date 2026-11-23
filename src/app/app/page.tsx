import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Overview() {
  const supabase = await createClient();
  const [iv, asm, cand, recent, profile] = await Promise.all([
    supabase.from("interviews").select("id", { count: "exact", head: true }),
    supabase.from("assessments").select("id", { count: "exact", head: true }),
    supabase.from("candidates").select("id", { count: "exact", head: true }),
    supabase.from("candidates").select("id, name, email, stage, score, created_at").order("created_at", { ascending: false }).limit(6),
    supabase.from("profiles").select("full_name, credits_total, credits_used").single(),
  ]);
  const name = profile.data?.full_name?.split(" ")[0] ?? "there";
  const stats = [["AI interviews", iv.count ?? 0, "/app/interviews"], ["Assessments", asm.count ?? 0, "/app/assessments"], ["Candidates", cand.count ?? 0, "/app/candidates"], ["Credits left", (profile.data?.credits_total ?? 0) - (profile.data?.credits_used ?? 0), "/app/billing"]] as const;
  return (
    <div className="max-w-5xl">
      <h1 className="text-[34px]">Hello, {name}</h1><p className="text-soft">Here is where your hiring stands.</p>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">{stats.map(([l, n, h]) => <Link key={l} href={h} className="card p-6 hover:-translate-y-0.5 transition"><div className="text-soft text-[15px]">{l}</div><div className="text-[42px] font-light grad-text">{n}</div></Link>)}</div>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mt-8">
        <section className="card p-6"><div className="flex justify-between"><h2 className="text-[20px]">Recent candidates</h2><Link href="/app/candidates" className="text-violet text-[15px]">View all</Link></div>
          {recent.data?.length ? <ul className="mt-4 divide-y divide-line">{recent.data.map((c) => <li key={c.id} className="py-3 flex justify-between gap-3"><div className="min-w-0"><div className="truncate">{c.name}</div><div className="text-soft text-[13px] truncate">{c.email}</div></div><div className="text-right shrink-0"><div className="capitalize text-[14px]">{c.stage}</div>{c.score != null && <div className="text-[13px] text-brand">{Math.round(c.score)}/100</div>}</div></li>)}</ul> : <p className="text-soft mt-4">No candidates yet. Create an AI interview and share its link to get started.</p>}</section>
        <section className="card p-6"><h2 className="text-[20px]">Get started</h2><ol className="mt-4 space-y-3 text-[15px]">
          {[["Generate an AI interview from a job description", "/app/interviews"], ["Build a skills assessment", "/app/assessments"], ["Share the candidate link and review scores", "/app/candidates"], ["Pick a plan when you need more credits", "/app/billing"]].map(([t, h], i) => <li key={t}><Link href={h} className="flex gap-3 hover:text-brand"><span className="grid place-items-center w-6 h-6 rounded-full bg-brand-soft text-brand text-[13px] shrink-0">{i + 1}</span>{t}</Link></li>)}</ol></section>
      </div>
    </div>
  );
}
