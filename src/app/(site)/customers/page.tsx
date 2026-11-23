import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = { title: "Customers" };
const stories = [
  ["Healthcare", "A 12-hospital network cut time-to-fill for nurses by 41%", "AI interviews and scenario assessments replaced a three-week phone-screen backlog."],
  ["Retail", "Seasonal hiring doubled without adding recruiters", "Always-on screening let stores hire 3,000 associates in six weeks."],
  ["Financial services", "Consistent, documented hiring across 60 branches", "Shared rubrics and audit logs gave compliance teams confidence."],
  ["Hospitality", "Better guest-facing hires, lower first-90-day turnover", "Situational questions surfaced warmth and reliability early."],
  ["Manufacturing", "Safer shop-floor hiring at plant scale", "Dependability and safety-mindset signals reduced early attrition by 28%."],
  ["Public sector", "Transparent, equitable process for 9,000 applicants", "Structured scoring with human review satisfied oversight requirements."],
];
export default function Customers() {
  return (
    <>
      <PageHero eyebrow="Customers" title="Trusted by the best talent acquisition teams" lead="Teams across healthcare, retail, manufacturing, finance and government use ScreenStage to hire with confidence." />
      <section id="stories" className="pb-24"><div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(([k, t, b]) => <article key={t} className="card p-7"><div className="eyebrow">{k}</div><h2 className="text-[22px] mt-3 leading-snug">{t}</h2><p className="text-soft mt-3">{b}</p></article>)}
      </div></section>
      <CtaBand title="Join the teams hiring with confidence" />
    </>
  );
}
