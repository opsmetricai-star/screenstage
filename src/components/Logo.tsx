import Image from "next/image";

export function Logo({ light = false }: { light?: boolean }) {
  const h = light ? 32 : 40;
  const w = Math.round(h * (150 / 194));
  return (
    <span className="inline-flex items-center gap-2.5 text-[26px] font-medium tracking-tight" style={{ color: light ? "#fff" : "var(--ink)" }}>
      <span className={`shrink-0 grid place-items-center ${light ? "rounded-lg bg-white p-1" : ""}`}>
        <Image src="/logo.png" alt="" width={w} height={h} priority className="max-w-none shrink-0" style={{ width: w, height: h }} />
      </span>
      screenstage
    </span>
  );
}
