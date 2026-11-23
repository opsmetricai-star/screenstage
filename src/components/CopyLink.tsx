"use client";
import { useState } from "react";

export function CopyLink({ url }: { url: string }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="flex gap-2"><input readOnly value={url} className="input" aria-label="Share link" onFocus={(e) => e.currentTarget.select()} />
      <button className="btn btn-ghost shrink-0" onClick={async () => { try { await navigator.clipboard.writeText(url); setOk(true); setTimeout(() => setOk(false), 1500); } catch { /* clipboard blocked */ } }}>{ok ? "Copied" : "Copy"}</button></div>
  );
}
