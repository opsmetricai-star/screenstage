"use client";
import { useState } from "react";

export function RoiCalculator() {
  const [hires, setHires] = useState(200);
  const [apps, setApps] = useState(15);
  const [mins, setMins] = useState(20);
  const [rate, setRate] = useState(35);
  // Deterministic estimate: assume automated screening removes 70% of first-round screening minutes.
  const totalHours = (hires * apps * mins) / 60;
  const savedHours = Math.round(totalHours * 0.7);
  const savings = Math.round(savedHours * rate);
  const f = (label: string, v: number, set: (n: number) => void) => (
    <label className="block"><span className="text-[14px] text-soft">{label}</span><input type="number" min={0} className="input mt-1" value={v} onChange={(e) => set(Math.max(0, Number(e.target.value)))} /></label>
  );
  return (
    <div className="card p-8 grid lg:grid-cols-[1fr_1fr] gap-10">
      <div className="grid sm:grid-cols-2 gap-4">{f("Hires per year", hires, setHires)}{f("Applicants screened per hire", apps, setApps)}{f("Minutes per screen", mins, setMins)}{f("Recruiter cost per hour ($)", rate, setRate)}</div>
      <div className="grid content-center gap-2"><div className="text-soft">Estimated annual savings</div><div className="text-[56px] font-light grad-text">${savings.toLocaleString()}</div><div className="text-soft">≈ {savedHours.toLocaleString()} recruiter hours saved (assumes 70% of first-round screening is automated)</div></div>
    </div>
  );
}
