"use client";
import { useState } from "react";

export function CandidateInterview({ token, title, intro, questions }: { token: string; title: string; intro: string; questions: string[] }) {
  const [answers, setAnswers] = useState<string[]>(questions.map(() => ""));
  const [step, setStep] = useState(-1); // -1 = welcome
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  async function submit() {
    setBusy(true); setErr("");
    const res = await fetch("/api/public/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, name, email, answers }) });
    setBusy(false);
    if (res.ok) setDone(true); else setErr((await res.json().catch(() => ({}))).error ?? "Something went wrong.");
  }

  if (done) return <div className="card p-10 text-center"><div className="text-[32px] grad-text">Thank you, {name.split(" ")[0]}!</div><p className="text-soft mt-3">Your responses were submitted. The hiring team will review them and be in touch.</p></div>;

  if (step === -1) return (
    <div className="card p-8"><h1 className="text-[28px]">{title}</h1><p className="mt-3 text-soft">{intro}</p>
      <p className="mt-3 text-[14px] text-muted">You are speaking with an AI interviewer. Your answers are scored against job-relevant criteria and reviewed by people.</p>
      <div className="grid gap-3 mt-6"><input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Full name" /><input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" /></div>
      <button className="btn btn-primary btn-lg mt-6 disabled:opacity-50" disabled={!name.trim() || !/^\S+@\S+\.\S+$/.test(email)} onClick={() => setStep(0)}>Start interview</button></div>
  );

  const last = step === questions.length - 1;
  return (
    <div className="card p-8"><div className="text-[13px] text-soft">Question {step + 1} of {questions.length}</div><div className="h-1.5 bg-line rounded mt-2"><div className="h-1.5 bg-brand rounded transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
      <h2 className="text-[22px] mt-6">{questions[step]}</h2>
      <textarea rows={7} className="input mt-4" value={answers[step]} onChange={(e) => setAnswers(answers.map((a, i) => (i === step ? e.target.value : a)))} placeholder="Type your answer…" aria-label="Your answer" />
      {err && <p role="alert" className="text-brand mt-3 text-[15px]">{err}</p>}
      <div className="flex justify-between mt-5"><button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
        {last ? <button className="btn btn-primary disabled:opacity-50" disabled={busy || answers.some((a) => !a.trim())} onClick={submit}>{busy ? "Submitting…" : "Submit"}</button>
          : <button className="btn btn-primary disabled:opacity-50" disabled={!answers[step].trim()} onClick={() => setStep(step + 1)}>Next</button>}</div></div>
  );
}
