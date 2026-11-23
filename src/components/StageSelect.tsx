"use client";
import { useTransition } from "react";
import { updateStage } from "@/app/app/actions";

export function StageSelect({ id, stage, stages }: { id: string; stage: string; stages: string[] }) {
  const [pending, start] = useTransition();
  return (
    <select aria-label="Stage" disabled={pending} defaultValue={stage} onChange={(e) => start(() => updateStage(id, e.target.value))} className="input !w-auto !py-1.5 capitalize">
      {stages.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
