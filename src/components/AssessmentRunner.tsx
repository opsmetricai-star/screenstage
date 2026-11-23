"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { scoreAssessment } from "@/app/app/actions";

type Item = { prompt: string; competency: string; options: string[] };

export function AssessmentRunner({ id, items }: { id: string; items: Item[] }) {
  const router = useRouter();
  const [picks, setPicks] = useState<(number | null)[]>(items.map(() => null));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ score: number; correct: number; total: number } | null>(null);
  const [err, setErr] = useState("");
  const [pending, start] = useTransition();

  const submit = () => {
    if (picks.some((p) => p === null)) return setErr("Please answer every question.");
    setErr("");
    start(async () => {
      const r = await scoreAssessment(id, picks as number[], name, email);
      if ("error" in r && r.error) setErr(r.error);
      else if ("score" in r) { setResult(r as { score: number; correct: number; total: number }); router.refresh(); }
    });
  };

  if (result) return <div className="card p-8 mt-6 text-center"><div className="text-[64px] font-light grad-text">{result.score}%</div><p className="text-soft">{result.correct} of {result.total} correct</p><button className="btn btn-ghost mt-4" onClick={() => { setResult(null); setPicks(items.map(() => null)); }}>Run another candidate</button></div>;

  return (
    <div className="card p-6 mt-6 grid gap-6">
      <div className="grid sm:grid-cols-2 gap-3"><input className="input" placeholder="Candidate name (optional)" value={name} onChange={(e) => setName(e.target.value)} aria-label="Candidate name" /><input className="input" placeholder="Candidate email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Candidate email" /></div>
      {items.map((it, i) => (
        <fieldset key={i}><legend className="mb-2"><span className="text-brand mr-2">{i + 1}.</span>{it.prompt}</legend>
          <div className="grid gap-2">{it.options.map((o, k) => <label key={k} className={`flex gap-3 items-start rounded-lg border p-3 cursor-pointer text-[15px] ${picks[i] === k ? "border-brand bg-brand-soft" : "border-line hover:border-ink/30"}`}><input type="radio" name={`q${i}`} checked={picks[i] === k} onChange={() => setPicks(picks.map((p, j) => (j === i ? k : p)))} className="mt-1 accent-[var(--brand)]" />{o}</label>)}</div></fieldset>
      ))}
      {err && <p role="alert" className="text-brand text-[15px]">{err}</p>}
      <button onClick={submit} disabled={pending} className="btn btn-primary justify-self-start disabled:opacity-60">{pending ? "Scoring…" : "Submit and score"}</button>
    </div>
  );
}
