export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[28px] font-medium tracking-tight" style={{ color: light ? "#fff" : "var(--ink)" }}>
      screenstage
      <svg width="10" height="10" viewBox="0 0 10 10" className="-mt-3"><path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="var(--brand)" /></svg>
    </span>
  );
}
