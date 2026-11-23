import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/Sections";

export const metadata: Metadata = { title: "Candidate support" };
export default function Candidates() {
  return (
    <>
      <PageHero eyebrow="Candidates" title="Interviewing with ScreenStage? We are here to help" lead="A few tips and answers to the most common questions before you begin." />
      <section className="pb-12"><div className="container-x grid md:grid-cols-3 gap-6">
        {[["Check your setup", "Use a recent browser, a stable connection and a quiet space. Phones work well."], ["Take your time", "There are no trick questions. Answer with real examples from your experience."], ["Need a human?", "Contact the employer that invited you; they can arrange an alternative format."]].map(([t, b]) => <div key={t} className="card p-7"><h2 className="text-[22px]">{t}</h2><p className="text-soft mt-2">{b}</p></div>)}
      </div></section>
      <FaqList title="Candidate FAQ" items={[
        { q: "Am I speaking with a real person?", a: "Some interviews are conducted by an AI interviewer. You are always told at the start, and people review the results." },
        { q: "Who sees my answers?", a: "Only the employer that invited you and their hiring team." },
        { q: "My link does not work", a: "Links can expire. Ask the employer to send a new one." },
        { q: "Can I retake it?", a: "That is up to the employer. Contact them directly." },
      ]} />
    </>
  );
}
