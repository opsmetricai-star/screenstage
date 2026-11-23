import { createClient } from "@/lib/supabase/server";
import { plans } from "@/lib/content";

export const metadata = { title: "Billing" };
export default async function Billing({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const sp = await searchParams;
  const chosen = plans.find((x) => x.id === sp.plan);
  const supabase = await createClient();
  const [{ data: p }, { data: subs }, { data: { user } }] = await Promise.all([
    supabase.from("profiles").select("plan, credits_total, credits_used").single(),
    supabase.from("subscriptions").select("id, plan, status, created_at").order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);
  const used = p?.credits_used ?? 0, total = p?.credits_total ?? 0;
  return (
    <div className="max-w-5xl">
      <h1 className="text-[34px]">Billing</h1>
      <div className="card p-6 mt-6 grid sm:grid-cols-[1fr_2fr] gap-6 items-center">
        <div><div className="text-soft text-[14px]">Current plan</div><div className="text-[32px] capitalize">{p?.plan ?? "free"}</div></div>
        <div><div className="flex justify-between text-[14px]"><span>{used} of {total} credits used</span><span className="text-soft">{Math.max(0, total - used)} left</span></div><div className="h-2 bg-line rounded mt-2"><div className="h-2 rounded bg-brand" style={{ width: `${Math.min(100, (used / Math.max(1, total)) * 100)}%` }} /></div></div>
      </div>
      {chosen && p?.plan !== chosen.id && (
        <div className="card p-6 mt-6 border-brand/40 flex flex-wrap items-center justify-between gap-4">
          <div><div className="text-[20px]">Complete checkout for the {chosen.name} plan</div><div className="text-soft text-[15px]">${chosen.price} per month with {chosen.credits.toLocaleString()} AI credits. Use {user?.email} at checkout so the plan attaches to this account.</div></div>
          <a href={chosen.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Pay with Selar</a>
        </div>
      )}
      <h2 className="text-[20px] mt-10 mb-3">Choose a plan</h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{plans.map((pl) => (
        <div key={pl.id} className={`card p-6 flex flex-col ${p?.plan === pl.id ? "ring-2 ring-brand" : ""}`}>
          <div className="text-[22px]">{pl.name}</div><div className="text-[34px] font-light">${pl.price}<span className="text-[15px] text-soft">{pl.price === 0 ? "" : " /mo"}</span></div>
          <div className="text-soft text-[14px] mt-1 flex-1">{pl.credits.toLocaleString()} credits{pl.price === 0 ? " to start" : " / month"}</div>
          {p?.plan === pl.id ? <span className="btn btn-ghost mt-4 cursor-default">Current plan</span> : !pl.url ? <span className="text-soft text-[14px] mt-4">Included with every account</span> : <a href={pl.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">Upgrade with Selar</a>}
        </div>))}</div>
      <p className="text-soft text-[14px] mt-4">Use the same email ({user?.email}) at checkout. Your plan activates after Selar confirms the payment, not on redirect; this usually takes a few minutes.</p>
      <h2 className="text-[20px] mt-10 mb-3">Subscription history</h2>
      <ul className="card divide-y divide-line">{subs?.map((s) => <li key={s.id} className="p-4 flex justify-between"><span className="capitalize">{s.plan} · {s.status}</span><span className="text-soft">{new Date(s.created_at).toLocaleDateString()}</span></li>)}{!subs?.length && <li className="p-6 text-soft">No paid subscriptions yet.</li>}</ul>
    </div>
  );
}
