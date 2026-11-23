import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";
import { AppNav } from "@/components/AppNav";
import { signOut } from "./actions";

export const metadata = { title: { default: "Dashboard", template: "%s | ScreenStage" } };

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured()) {
    return (
      <div className="min-h-screen grid place-items-center p-8"><div className="card p-10 max-w-lg">
        <Logo /><h1 className="text-[28px] mt-6">Connect Supabase to continue</h1>
        <p className="text-soft mt-3">The dashboard needs a database and authentication. Add <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>, run <code>supabase/schema.sql</code> in your project, then restart.</p>
        <Link href="/" className="btn btn-ghost mt-6">Back to site</Link>
      </div></div>
    );
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const [{ data: profile }, { count: unread }] = await Promise.all([
    supabase.from("profiles").select("full_name, company, plan, credits_total, credits_used").eq("id", user.id).single(),
    supabase.from("notifications").select("id", { count: "exact", head: true }).eq("read", false),
  ]);
  const left = (profile?.credits_total ?? 0) - (profile?.credits_used ?? 0);

  return (
    <div className="min-h-screen grid lg:grid-cols-[250px_1fr] bg-tint/50">
      <aside className="bg-white border-r border-line p-5 flex lg:flex-col gap-4 lg:gap-6 lg:sticky lg:top-0 lg:h-screen overflow-x-auto">
        <Link href="/app" className="shrink-0"><Logo /></Link>
        <AppNav unread={unread ?? 0} />
        <div className="hidden lg:block mt-auto text-[14px]">
          <div className="rounded-xl bg-tint p-4"><div className="text-soft">Plan: <b className="text-ink capitalize">{profile?.plan ?? "free"}</b></div><div className="mt-1 text-soft">{left} credits left</div>
            <div className="h-1.5 mt-2 bg-line rounded"><div className="h-1.5 rounded bg-brand" style={{ width: `${Math.min(100, ((profile?.credits_used ?? 0) / Math.max(1, profile?.credits_total ?? 1)) * 100)}%` }} /></div></div>
          <div className="mt-3 truncate text-soft">{user.email}</div>
          <form action={signOut}><button className="mt-1 text-violet hover:underline">Log out</button></form>
        </div>
      </aside>
      <main className="p-6 lg:p-10 min-w-0">{children}</main>
    </div>
  );
}
