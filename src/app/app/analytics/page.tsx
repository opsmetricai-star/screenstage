import { createClient } from "@/lib/supabase/server";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";

export const metadata = { title: "Analytics" };
export default async function Analytics() {
  const supabase = await createClient();
  const [{ data: cands }, { data: usage }] = await Promise.all([
    supabase.from("candidates").select("stage, score"),
    supabase.from("usage_events").select("kind, credits, created_at").order("created_at"),
  ]);
  const stages = ["applied", "screened", "assessed", "interview", "offer", "rejected"];
  const funnel = stages.map((s) => ({ stage: s, count: cands?.filter((c) => c.stage === s).length ?? 0 }));
  const buckets = ["0-20", "21-40", "41-60", "61-80", "81-100"].map((range, i) => ({ range, count: cands?.filter((c) => c.score != null && c.score > (i === 0 ? -1 : i * 20) && c.score <= (i + 1) * 20).length ?? 0 }));
  const perDay = new Map<string, number>();
  usage?.forEach((u) => { const d = u.created_at.slice(0, 10); perDay.set(d, (perDay.get(d) ?? 0) + u.credits); });
  const usageSeries = [...perDay].map(([day, credits]) => ({ day: day.slice(5), credits }));
  const scored = cands?.filter((c) => c.score != null) ?? [];
  const avg = scored.length ? Math.round(scored.reduce((s, c) => s + Number(c.score), 0) / scored.length) : 0;
  return (
    <div className="max-w-5xl">
      <h1 className="text-[34px]">Analytics</h1>
      <div className="grid sm:grid-cols-3 gap-4 mt-6">{[["Candidates", cands?.length ?? 0], ["Average score", avg], ["Credits used", usage?.reduce((s, u) => s + u.credits, 0) ?? 0]].map(([l, n]) => <div key={l as string} className="card p-5"><div className="text-soft text-[14px]">{l}</div><div className="text-[36px] font-light grad-text">{n}</div></div>)}</div>
      <AnalyticsCharts funnel={funnel} buckets={buckets} usage={usageSeries} />
    </div>
  );
}
