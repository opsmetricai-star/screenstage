"use client";
import { useState } from "react";

export function LeadForm({ cta = "Send request" }: { cta?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending"); setErr("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) setState("done");
    else { setErr((await res.json().catch(() => ({}))).error ?? "Something went wrong."); setState("idle"); }
  }
  if (state === "done") return <div className="py-10 text-center"><div className="text-[28px] grad-text">Thank you!</div><p className="text-soft mt-2">We have your request and will be in touch shortly.</p></div>;
  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4"><input name="name" required placeholder="Full name" className="input" aria-label="Full name" /><input name="email" type="email" required placeholder="Work email" className="input" aria-label="Work email" /></div>
      <div className="grid sm:grid-cols-2 gap-4"><input name="company" placeholder="Company" className="input" aria-label="Company" />
        <select name="size" className="input" aria-label="Company size" defaultValue=""><option value="" disabled>Company size</option><option>1-50</option><option>51-500</option><option>501-5,000</option><option>5,000+</option></select></div>
      <textarea name="message" rows={4} placeholder="What would you like to improve in your hiring?" className="input" aria-label="Message" />
      {err && <p role="alert" className="text-brand text-[15px]">{err}</p>}
      <button disabled={state === "sending"} className="btn btn-primary btn-lg disabled:opacity-60">{state === "sending" ? "Sending…" : cta}</button>
    </form>
  );
}
