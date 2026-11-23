"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** Shared AI generator form used for interviews and assessments. */
export function Generator({ kind }: { kind: "interview" | "assessment" }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const isIv = kind === "interview";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErr("");
    const f = new FormData(e.currentTarget);
    const payload = isIv
      ? { title: f.get("title"), description: f.get("description") }
      : { title: f.get("title"), skills: f.get("skills"), count: Number(f.get("count") ?? 8) };
    const res = await fetch(isIv ? "/api/ai/interview" : "/api/ai/assessment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setErr(json.error ?? "Something went wrong.");
    router.push(isIv ? `/app/interviews/${json.id}` : `/app/assessments/${json.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card p-6 grid gap-4">
      <h2 className="text-[20px]">{isIv ? "Generate an AI interview" : "Draft an assessment with AI"} <span className="text-soft text-[14px]">· uses 1 credit</span></h2>
      <input name="title" required minLength={2} placeholder={isIv ? "Role title, e.g. Home healthcare nurse" : "Assessment title, e.g. Customer service judgment"} className="input" aria-label="Title" />
      {isIv
        ? <textarea name="description" required minLength={40} rows={6} placeholder="Paste the job description (at least 40 characters)…" className="input" aria-label="Job description" />
        : <><input name="skills" required placeholder="Skills to measure, e.g. empathy, prioritization, attention to detail" className="input" aria-label="Skills" /><label className="text-[14px] text-soft">Questions <select name="count" defaultValue="8" className="input !w-24 ml-2 inline-block">{[5, 8, 10, 12].map((n) => <option key={n}>{n}</option>)}</select></label></>}
      {err && <p role="alert" className="text-brand text-[15px]">{err}</p>}
      <button disabled={busy} className="btn btn-primary justify-self-start disabled:opacity-60">{busy ? "Generating… can take up to a minute" : "Generate"}</button>
    </form>
  );
}
