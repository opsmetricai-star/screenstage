import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = { title: "About" };
const values = [["Hero for our customers", "We measure ourselves by the outcomes our customers achieve."], ["Enjoy the journey", "Great hiring is human. We keep the work warm and the team curious."], ["Always do the right thing", "Fairness, privacy and transparency are not negotiable."], ["Reach forward", "We stretch toward what hiring could be, then ship it."], ["Take action and go", "We prefer working software and real feedback to endless planning."]];
const history = [["2023", "Founded to bring evidence to early-stage hiring decisions."], ["2024", "Launched structured AI interviews and the Assessment Builder."], ["2025", "Added ATS integrations and governance tooling."], ["2026", "Opened self-serve plans for teams of every size."]];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="We put the human back into human resources" lead="ScreenStage helps teams spend less time on repetitive screening and more time with the people most likely to succeed." />
      <section className="py-20"><div className="container-x"><h2 className="h-section">Our values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">{values.map(([t, b]) => <div key={t} className="card p-7"><h3 className="text-[22px]">{t}</h3><p className="text-soft mt-2">{b}</p></div>)}</div></div></section>
      <section className="py-20 bg-tint"><div className="container-x"><h2 className="h-section">Driving industry progress</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">{[["Decisions backed by data", "Every recommendation is tied to evidence."], ["Industry leaders", "Built with practitioners in industrial-organizational psychology."], ["24/7 customer support", "Real people who answer quickly."]].map(([t, b]) => <div key={t} className="card p-7"><h3 className="text-[22px]">{t}</h3><p className="text-soft mt-2">{b}</p></div>)}</div></div></section>
      <section className="py-20"><div className="container-x"><h2 className="h-section">History of ScreenStage</h2>
        <ol className="mt-10 border-l-2 border-brand/30 pl-8 space-y-8">{history.map(([y, t]) => <li key={y} className="relative"><span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-brand" /><div className="text-[28px] font-light grad-text">{y}</div><p className="text-soft">{t}</p></li>)}</ol></div></section>
      <CtaBand title="Ready for more? Schedule a demo" />
    </>
  );
}
