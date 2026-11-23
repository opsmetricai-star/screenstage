import { createClient } from "@/lib/supabase/server";
import { updateProfile, signOut } from "../actions";

export const metadata = { title: "Settings" };
export default async function Settings() {
  const supabase = await createClient();
  const [{ data: p }, { data: { user } }] = await Promise.all([supabase.from("profiles").select("full_name, company").single(), supabase.auth.getUser()]);
  return (
    <div className="max-w-xl">
      <h1 className="text-[34px]">Settings</h1>
      <form action={updateProfile} className="card p-6 mt-6 grid gap-4">
        <label className="grid gap-1 text-[14px] text-soft">Email<input className="input" value={user?.email ?? ""} readOnly /></label>
        <label className="grid gap-1 text-[14px] text-soft">Full name<input name="full_name" defaultValue={p?.full_name ?? ""} className="input" /></label>
        <label className="grid gap-1 text-[14px] text-soft">Company<input name="company" defaultValue={p?.company ?? ""} className="input" /></label>
        <button className="btn btn-primary justify-self-start">Save changes</button>
      </form>
      <div className="card p-6 mt-6"><h2 className="text-[18px]">Session</h2><form action={signOut}><button className="btn btn-ghost mt-3">Log out</button></form></div>
    </div>
  );
}
