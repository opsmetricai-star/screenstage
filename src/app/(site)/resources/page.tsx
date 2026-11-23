import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { resources } from "@/lib/content";
import { RoiCalculator } from "@/components/RoiCalculator";

export const metadata: Metadata = { title: "Resources" };
export default function Resources() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Guides, webinars and tools for modern hiring" lead="Practical research and playbooks from our science and customer teams." />
      <section className="pb-20"><div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((r) => <article key={r.title} className="card p-7 hover:-translate-y-1 transition"><div className="eyebrow">{r.type} · {r.date}</div><h2 className="text-[22px] mt-3 leading-snug">{r.title}</h2></article>)}
      </div></section>
      <section id="roi" className="py-20 bg-tint"><div className="container-x"><h2 className="h-section">Virtual recruiting ROI calculator</h2><p className="text-soft mt-2 mb-8">Estimate what structured, automated screening could save you each year.</p><RoiCalculator /></div></section>
    </>
  );
}
