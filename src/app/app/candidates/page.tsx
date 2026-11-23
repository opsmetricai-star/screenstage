import { createClient } from "@/lib/supabase/server";
import { StageSelect } from "@/components/StageSelect";

export const metadata = { title: "Candidates" };
const stages = ["applied", "screened", "assessed", "interview", "offer", "rejected"];

export default async function Candidates() {
  const supabase = await createClient();
  const { data } = await supabase.from("candidates").select("id, name, email, stage, score, created_at").order("score", { ascending: false, nullsFirst: false });
  return (
    <div className="max-w-6xl">
      <h1 className="text-[34px]">Candidates</h1><p className="text-soft">Everyone who has completed an interview or assessment, ranked by score.</p>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-6">{stages.map((s) => <div key={s} className="card p-4"><div className="text-[13px] text-soft capitalize">{s}</div><div className="text-[28px] font-light">{data?.filter((c) => c.stage === s).length ?? 0}</div></div>)}</div>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-[15px]"><thead className="text-left text-soft text-[13px]"><tr><th className="p-4">Name</th><th>Email</th><th>Score</th><th>Stage</th></tr></thead>
          <tbody className="divide-y divide-line">{data?.map((c) => <tr key={c.id}><td className="p-4">{c.name}</td><td className="text-soft">{c.email}</td><td className="text-brand">{c.score != null ? Math.round(c.score) : "No score"}</td><td><StageSelect id={c.id} stage={c.stage} stages={stages} /></td></tr>)}
            {!data?.length && <tr><td colSpan={4} className="p-8 text-center text-soft">No candidates yet.</td></tr>}</tbody></table>
      </div>
    </div>
  );
}
