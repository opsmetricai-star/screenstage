"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "./Logo";

type Mode = "login" | "signup" | "forgot" | "reset";
const copy: Record<Mode, { title: string; cta: string }> = {
  login: { title: "Welcome back", cta: "Log in" },
  signup: { title: "Create your account", cta: "Create account" },
  forgot: { title: "Reset your password", cta: "Send reset link" },
  reset: { title: "Choose a new password", cta: "Update password" },
};
const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function Form({ mode }: { mode: Mode }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "err" | "ok"; text: string } | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return setMsg({ kind: "err", text: "Sign-in is temporarily unavailable. Please try again shortly." });
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "");
    const password = String(f.get("password") ?? "");
    if ((mode === "signup" || mode === "reset") && password.length < 8) return setMsg({ kind: "err", text: "Use at least 8 characters for your password." });
    setBusy(true); setMsg(null);
    const supabase = createClient();
    const origin = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const plan = sp.get("plan");
    const landing = plan && /^[a-z]+$/.test(plan) ? `/app/billing?plan=${plan}` : "/app";
    let error: { message: string } | null = null;

    if (mode === "login") {
      ({ error } = await supabase.auth.signInWithPassword({ email, password }));
      if (!error) { router.replace(sp.get("next")?.startsWith("/app") ? sp.get("next")! : "/app"); router.refresh(); return; }
    } else if (mode === "signup") {
      const res = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${origin}${landing}`, data: { full_name: f.get("name"), company: f.get("company") } } });
      error = res.error;
      if (!error) {
        if (res.data.session) { router.replace(landing); router.refresh(); return; }
        setMsg({ kind: "ok", text: "Check your inbox to confirm your email, then log in." });
      }
    } else if (mode === "forgot") {
      ({ error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/reset-password` }));
      if (!error) setMsg({ kind: "ok", text: "If that email has an account, a reset link is on its way." });
    } else {
      ({ error } = await supabase.auth.updateUser({ password }));
      if (!error) { router.replace("/app"); router.refresh(); return; }
    }
    if (error) setMsg({ kind: "err", text: error.message });
    setBusy(false);
  }

  return (
    <div className="w-full max-w-[420px]">
      <Link href="/" className="block mb-10"><Logo /></Link>
      <h1 className="text-[34px]">{copy[mode].title}</h1>
      <form onSubmit={submit} className="mt-8 grid gap-4">
        {mode === "signup" && <><input name="name" required placeholder="Full name" aria-label="Full name" className="input" /><input name="company" placeholder="Company" aria-label="Company" className="input" /></>}
        {mode !== "reset" && <input name="email" type="email" required placeholder="Work email" aria-label="Email" className="input" autoComplete="email" />}
        {mode !== "forgot" && <input name="password" type="password" required placeholder={mode === "reset" ? "New password" : "Password"} aria-label="Password" className="input" autoComplete={mode === "login" ? "current-password" : "new-password"} />}
        {msg && <p role="alert" className={`text-[15px] ${msg.kind === "err" ? "text-brand" : "text-emerald-600"}`}>{msg.text}</p>}
        <button disabled={busy} className="btn btn-primary btn-lg disabled:opacity-60">{busy ? "Please wait…" : copy[mode].cta}</button>
      </form>
      <div className="mt-6 text-[15px] text-soft space-y-1.5">
        {mode === "login" && <><p><Link href="/forgot-password" className="text-violet hover:underline">Forgot password?</Link></p><p>New here? <Link href="/signup" className="text-violet hover:underline">Create an account</Link></p></>}
        {mode === "signup" && <p>Already have an account? <Link href="/login" className="text-violet hover:underline">Log in</Link></p>}
        {mode === "forgot" && <p><Link href="/login" className="text-violet hover:underline">Back to log in</Link></p>}
      </div>
    </div>
  );
}

export function AuthForm({ mode }: { mode: Mode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="grid place-items-center p-8"><Suspense><Form mode={mode} /></Suspense></div>
      <div className="hidden lg:grid place-items-center grad-bar p-12 text-white">
        <div className="max-w-md"><h2 className="text-[40px] leading-tight font-light">The AI engine for confident hiring decisions.</h2><p className="mt-4 text-white/80 text-[19px]">Interviews, assessments and ranked recommendations, with the evidence behind every score.</p></div>
      </div>
    </div>
  );
}
