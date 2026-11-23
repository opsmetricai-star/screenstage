import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = { title: "About" };
const principles = [
  ["AI at the core", "We build the decision engine first. Interviews, assessments and analytics are all expressions of it."],
  ["Evidence over impression", "A rating without a supporting answer does not leave the platform."],
  ["Precision where it counts", "Models interpret language. Code calculates scores. We never blur the two."],
  ["People decide", "We recommend and explain. Your team advances, holds or declines."],
  ["Trust by architecture", "Isolation, metering and billing integrity are enforced in the database and on the server."],
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="We are building the decision layer for hiring" lead="ScreenStage exists to make selection faster, fairer and measurable. Our AI turns unstructured candidate responses into ranked, explainable recommendations that hiring teams can act on with confidence." />
      <section className="py-20"><div className="container-x"><h2 className="h-section">Operating principles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">{principles.map(([t, b]) => <div key={t} className="card p-7"><h3 className="text-[22px]">{t}</h3><p className="text-soft mt-2">{b}</p></div>)}</div></div></section>
      <CtaBand />
    </>
  );
}
