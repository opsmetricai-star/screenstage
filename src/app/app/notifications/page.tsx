import { createClient } from "@/lib/supabase/server";
import { markNotificationsRead } from "../actions";

export const metadata = { title: "Notifications" };
export default async function Notifications() {
  const supabase = await createClient();
  const { data } = await supabase.from("notifications").select("id, body, read, created_at").order("created_at", { ascending: false }).limit(50);
  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-end"><h1 className="text-[34px]">Notifications</h1><form action={markNotificationsRead}><button className="text-violet text-[15px]">Mark all read</button></form></div>
      <ul className="card divide-y divide-line mt-6">{data?.map((n) => <li key={n.id} className={`p-4 ${n.read ? "text-soft" : ""}`}>{!n.read && <span className="inline-block w-2 h-2 rounded-full bg-brand mr-2" />}{n.body}<div className="text-[12px] text-muted mt-0.5">{new Date(n.created_at).toLocaleString()}</div></li>)}
        {!data?.length && <li className="p-8 text-center text-soft">You are all caught up.</li>}</ul>
    </div>
  );
}
