import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/Sections";

export const metadata: Metadata = { title: "Candidate support" };
export default function Candidates() {
  return (
    <>
      <PageHero eyebrow="Candidates" title="Interviewing with a ScreenStage customer" lead="This page answers the questions candidates ask most before and after an AI-led interview." />
      <section className="pb-12"><div className="container-x grid md:grid-cols-3 gap-6">
        {[["Prepare your setup", "Use a current browser and a stable connection. The interview works on phones and computers."], ["Answer with specifics", "Concrete examples from your experience give the strongest evidence for each question."], ["Need another format?", "Contact the employer that invited you. They control the process and can arrange alternatives."]].map(([t, b]) => <div key={t} className="card p-7"><h2 className="text-[22px]">{t}</h2><p className="text-soft mt-2">{b}</p></div>)}
      </div></section>
      <FaqList title="Candidate questions" items={[
        { q: "Am I speaking with a person?", a: "The interview is conducted by an AI interviewer, and you are told so at the start. Your answers are scored against job-relevant criteria and reviewed by the hiring team." },
        { q: "Who can see my answers?", a: "Only the employer that invited you and members of their hiring team." },
        { q: "My interview link does not open.", a: "Ask the employer to send you a new link. Links belong to the employer's account." },
        { q: "Can I retake the interview?", a: "That decision belongs to the employer. Contact them directly." },
      ]} />
    </>
  );
}
