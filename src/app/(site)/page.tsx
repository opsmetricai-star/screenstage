import Link from "next/link";
import { ArrowRight, BrainCircuit, Database, KeyRound, LineChart, ShieldCheck, Workflow, Gauge, Scale } from "lucide-react";
import { CtaBand, FaqList, ProductMock } from "@/components/Sections";
import { homeFaqs } from "@/lib/content";

const outcomes = [
  { k: "Cost", t: "Remove manual first-round screening", d: "The AI interviews and scores every applicant, so recruiter hours go only to candidates the evidence supports." },
  { k: "Speed", t: "Move from applicants to shortlist in one pass", d: "Candidates respond through a single link and results arrive ranked, with a recommendation for each." },
  { k: "Risk", t: "Make every decision traceable", d: "Each rating cites the candidate's own answer, scored against a rubric fixed before anyone responds." },
  { k: "Decisions", t: "Compare candidates on equal terms", d: "One question set, one rubric and one scale for every applicant, from the first to the thousandth." },
];

const engine = [
  { icon: BrainCircuit, t: "Analyzes", d: "Reads the job description and extracts the competencies the role actually demands." },
  { icon: LineChart, t: "Predicts", d: "Rates each answer against the rubric to forecast who will perform in the role." },
  { icon: Scale, t: "Decides", d: "Recommends advance, review or decline, with a written rationale and quoted evidence." },
  { icon: Workflow, t: "Automates", d: "Generates interviews and assessments, collects responses and updates your pipeline without manual steps." },
];

const modules = [
  { t: "AI Interviewer", s: "Every applicant gets a structured interview. Every answer gets a rubric score.", d: "The AI writes the interview from your job description, conducts it through a shareable link and returns a ranked shortlist with the evidence behind each rating.", href: "/solutions/ai-interviewer" },
  { t: "Assessment Builder", s: "Describe the skills. Receive a scenario assessment with answer keys.", d: "The AI drafts situational questions with plausible options and a keyed answer, ready for your team to review and deploy.", href: "/solutions/assessment-builder" },
  { t: "Assessments", s: "Objective skills scores, calculated the instant a candidate finishes.", d: "Precision-sensitive results use arithmetic on the answer key, so identical answers always produce identical scores.", href: "/solutions/assessments" },
  { t: "Hiring Analytics", s: "See where speed, quality and spend are won or lost.", d: "Funnel stages, score distribution and daily credit usage update as candidates complete interviews and assessments.", href: "/solutions/hiring-analytics" },
];

const governance = [
  { icon: Database, t: "Row level security", d: "Every table enforces account isolation in PostgreSQL." },
  { icon: ShieldCheck, t: "Evidence-only scoring", d: "Models are restricted to job-relevant evidence." },
  { icon: KeyRound, t: "Server-held secrets", d: "AI and service credentials never reach the browser." },
  { icon: Gauge, t: "Metered usage", d: "Credits are spent atomically and refunded on failure." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center py-16 lg:py-24 min-h-[640px]">
          <div className="reveal">
            <h1 className="h-display">The AI engine that decides who to hire, and proves why.</h1>
            <p className="mt-5 text-[22px] leading-snug text-soft max-w-[580px]">ScreenStage analyzes every applicant, predicts who will perform and ranks candidates on cited evidence. Your team cuts screening cost and time to hire without giving up control of the decision.</p>
            <div className="mt-9 flex gap-3 flex-wrap"><Link href="/signup" className="btn btn-primary btn-lg">Sign up</Link><Link href="/login" className="btn btn-ghost btn-lg">Log in</Link></div>
          </div>
          <div className="reveal" style={{ animationDelay: ".15s" }}><ProductMock /></div>
        </div>
      </section>

      <section className="py-20 border-y border-line bg-white">
        <div className="container-x">
          <div className="eyebrow">Business outcomes</div>
          <h2 className="h-section mt-3 max-w-3xl">Four outcomes, each delivered by a specific mechanism</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {outcomes.map((o) => (
              <div key={o.k} className="card p-7"><div className="text-[40px] font-light grad-text leading-none">{o.k}</div><h3 className="text-[20px] mt-5 leading-snug">{o.t}</h3><p className="text-soft mt-2">{o.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <div className="eyebrow">01 The AI engine</div>
          <h2 className="h-section mt-3 max-w-3xl">AI is the core of the platform, not an add-on</h2>
          <p className="text-soft mt-4 text-[19px] max-w-2xl">Interviews, assessments, scoring and recommendations all run on the same engine, from the first job description to the final shortlist.</p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {engine.map(({ icon: I, t, d }) => (
              <div key={t} className="card p-7"><span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-soft text-brand"><I size={22} /></span><h3 className="text-[24px] mt-5">{t}</h3><p className="text-soft mt-2">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tint py-24">
        <div className="container-x">
          <div className="eyebrow">02 End-to-end selection</div>
          <h2 className="h-section mt-3 max-w-3xl">One platform from job description to ranked decision</h2>
          <div className="mt-14 space-y-6">
            {modules.map((e, i) => (
              <div key={e.t} className={`card p-8 grid lg:grid-cols-2 gap-8 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div><h3 className="text-[30px]">{e.t}</h3><p className="text-[19px] mt-3">{e.s}</p><p className="text-soft mt-3">{e.d}</p><Link href={e.href} className="inline-flex items-center gap-1 mt-5 text-brand font-medium hover:gap-2 transition-all">Explore {e.t} <ArrowRight size={16} /></Link></div>
                <div className="rounded-2xl h-56 bg-gradient-to-br from-brand-soft via-white to-violet/15 p-6 grid content-center gap-3" aria-hidden>
                  {[0.9, 0.7, 0.5].map((w, k) => <div key={k} className="h-3 rounded-full bg-white shadow-sm" style={{ width: `${w * 100}%` }}><div className="h-3 rounded-full bar-fill" style={{ width: `${60 + k * 12}%`, background: k === 0 ? "var(--brand)" : "var(--violet)", opacity: 0.85 - k * 0.2 }} /></div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div><div className="eyebrow">03 Scoring discipline</div><h2 className="h-section mt-3">Models interpret. Code calculates.</h2><p className="text-soft mt-4 text-[19px]">The AI reads language and cites evidence. Totals and assessment results are computed in code, so every number your team relies on is reproducible.</p></div>
          <div className="card p-8"><div className="grid grid-cols-3 gap-4 text-center">{[["1 to 5", "rating per competency"], ["Strict", "schema validation on every AI output"], ["Exact", "arithmetic for assessment scores"]].map(([n, l]) => <div key={n}><div className="text-[34px] font-light grad-text">{n}</div><div className="text-[14px] text-soft mt-1">{l}</div></div>)}</div></div>
        </div>
      </section>

      <section className="bg-dark text-white py-24">
        <div className="container-x">
          <div className="eyebrow !text-white/50">04 Governance</div>
          <h2 className="h-section mt-3 max-w-3xl">Controls enforced in the database and on the server</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {governance.map(({ icon: I, t, d }) => <div key={t} className="rounded-2xl border border-white/15 p-6 hover:bg-white/5 transition"><I className="text-brand" size={24} /><div className="mt-6 text-[19px]">{t}</div><p className="text-white/60 text-[15px] mt-1">{d}</p></div>)}
          </div>
          <p className="mt-8"><Link className="underline text-white/80 hover:text-white" href="/platform/security-governance">Read the security and governance model</Link></p>
        </div>
      </section>

      <CtaBand />
      <FaqList items={homeFaqs} />
    </>
  );
}
