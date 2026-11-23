import Link from "next/link";
import type { Faq } from "@/lib/content";

export function FaqList({ items, title = "Frequently asked questions" }: { items: Faq[]; title?: string }) {
  return (
    <section className="py-20"><div className="container-x grid lg:grid-cols-[1fr_2fr] gap-10">
      <h2 className="h-section">{title}</h2>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex justify-between gap-6 cursor-pointer list-none text-[19px]">{f.q}<span aria-hidden className="text-brand text-2xl leading-none group-open:rotate-45 transition">+</span></summary>
            <p className="mt-3 text-soft leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </div></section>
  );
}

export function CtaBand({ title = "Put an AI decision engine at the center of your hiring." }: { title?: string }) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-tint text-center"><div className="container-x">
      <h2 className="h-display max-w-3xl mx-auto"><span className="grad-text">{title}</span></h2>
      <div className="mt-8 flex gap-3 justify-center flex-wrap"><Link href="/signup" className="btn btn-primary btn-lg">Sign up</Link><Link href="/login" className="btn btn-ghost btn-lg">Log in</Link></div>
    </div></section>
  );
}

export function ProductMock() {
  return (
    <div className="relative">
      <div className="rounded-[20px] overflow-hidden bg-white shadow-[0_30px_80px_-30px_rgba(60,40,120,.35)] border border-line">
        <div className="h-3.5 grad-bar" />
        <div className="p-6 pb-8">
          <div className="text-[13px] font-medium">Home healthcare, Nurse</div><div className="text-[12px] text-muted">AI interview evaluation</div>
          <div className="mt-4 border-t border-line pt-3 text-[12px] font-medium tracking-wide">CANDIDATE</div>
          <Row label="CUSTOMER SERVICE" n={4} fit="Strong" />
          <Row label="TASK MANAGEMENT" n={5} fit="Excellent" />
        </div>
      </div>
      <div className="relative mt-4 lg:mt-0 lg:absolute lg:-right-3 lg:top-12 w-full lg:w-[210px] bg-white rounded-2xl shadow-2xl p-4 border border-line reveal" style={{ animationDelay: ".3s" }}>
        <div className="mx-auto w-16 h-16 rounded-full bg-violet/10 grid place-items-center"><div className="w-12 h-12 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, #e08bd0, #6b5ce7)" }} /></div>
        <p className="text-[12px] text-soft mt-4 leading-relaxed">Recommendation: advance.<br /><br />Cited evidence: &ldquo;I stayed calm, listened, and honoured the lower price.&rdquo;</p>
      </div>
    </div>
  );
}
function Row({ label, n, fit }: { label: string; n: number; fit: string }) {
  return (
    <div className="mt-5 grid grid-cols-[1fr_1fr] gap-4 items-start">
      <div><div className="text-[11.5px] font-medium">{label}</div><div className="mt-2 space-y-1.5"><div className="h-1.5 w-40 bg-line rounded" /><div className="h-1.5 w-32 bg-line rounded" /></div></div>
      <div className="max-w-[150px]"><div className="flex gap-1">{[1, 2, 3, 4, 5].map((i) => <span key={i} className="h-2 flex-1 rounded-full bar-fill" style={{ background: i <= n ? "var(--brand)" : "#f6d3e0" }} />)}</div><div className="text-[12px] mt-1.5">{fit}</div></div>
    </div>
  );
}
