import Link from "next/link";
import { ArrowRight, Calendar, Layers, Plug, ShieldCheck, Sparkles, Workflow, Lock } from "lucide-react";
import { CtaBand, FaqList, ProductMock } from "@/components/Sections";
import { homeFaqs, resources } from "@/lib/content";

const logos = ["Northwind Health", "Alder & Co", "Brightline Retail", "Kestrel Bank", "Harbor Hotels", "Meridian Foods", "Atlas Telecom", "Summit Care", "Pioneer Motors", "Lumen Public"];

const experience = [
  { t: "Match and Apply", s: "A website chat agent learns about candidates and guides them to the best role", d: "Instead of candidates mass applying to roles that are not the right fit, AI chat identifies real interest and matches them to the right opening.", href: "/solutions/match-and-apply" },
  { t: "AI Interviewer", s: "Every applicant gets a conversation.", d: "Shortlist faster with 24/7 AI screening interviews built on validated hiring science. Every recommendation comes with the evidence behind it.", href: "/solutions/ai-interviewer" },
  { t: "Assessments", s: "Critical skills are verified with predictive tasks that show instead of tell.", d: "Evaluate candidates at scale using job-relevant skills tests, game-based tasks and structured interview insights.", href: "/solutions/assessments" },
  { t: "Video interviewing", s: "Your verified shortlist moves to live interviews with smart summaries and scores.", d: "An interview co-pilot joins live conversations to capture notes, summaries and candidate insights for your whole panel.", href: "/solutions/video-interviewing" },
];
const governance = [
  { icon: Workflow, t: "Automation" }, { icon: Sparkles, t: "Science" }, { icon: Plug, t: "Integration" }, { icon: Lock, t: "Security" },
  { icon: ShieldCheck, t: "Cheating" }, { icon: Layers, t: "Services" }, { icon: Calendar, t: "Schedule" },
];

export default function Home() {
  return (
    <>
      {/* 1 Hero */}
      <section className="relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center py-16 lg:py-24 min-h-[640px]">
          <div className="reveal">
            <h1 className="h-display">Make confident talent decisions.</h1>
            <p className="mt-5 text-[24px] leading-snug text-soft max-w-[560px]">Agentic hiring solutions that drive better hires, not just faster ones</p>
            <div className="mt-9 flex gap-3 flex-wrap"><Link href="/demo" className="btn btn-primary btn-lg">Request Demo</Link><Link href="/demo" className="btn btn-ghost btn-lg">Take a tour <ArrowRight size={16} /></Link></div>
          </div>
          <div className="reveal" style={{ animationDelay: ".15s" }}><ProductMock /></div>
        </div>
      </section>

      {/* 2 Customers */}
      <section className="py-16 border-y border-line bg-white">
        <div className="container-x text-center">
          <div className="text-[56px] font-light leading-none"><span className="grad-text">40%</span> <span className="text-[22px] text-soft">of Fortune 100</span></div>
          <h2 className="h-section mt-6">Trusted by the best talent acquisition teams</h2>
          <Link href="/customers" className="inline-block mt-3 text-violet hover:underline">Our customers →</Link>
        </div>
        <div className="mt-10 overflow-hidden"><div className="marquee flex gap-14 w-max text-[22px] font-medium text-muted/80">{[...logos, ...logos].map((l, i) => <span key={i} className="whitespace-nowrap">{l}</span>)}</div></div>
      </section>

      {/* 3 Predictive content / science */}
      <section className="py-24">
        <div className="container-x">
          <div className="eyebrow">01 Predictive hiring content</div>
          <h2 className="h-section mt-3 max-w-3xl">20+ years of personalized interviews and assessments proven to verify candidate skills</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {[["70M", "Interviews completed", "Interviews: Candidates describe skills.", "High-signal questions and what a great response looks like"], ["200M", "Assessments completed", "Assessments: Candidates demonstrate skills.", "Tests and simulations that predict performance"]].map(([n, l, t, d]) => (
              <div key={n} className="card p-8"><div className="text-[64px] font-light leading-none grad-text">{n}</div><div className="text-soft mt-1">{l}</div><h3 className="text-[22px] mt-8">{t}</h3><p className="text-soft mt-2">{d}</p></div>
            ))}
          </div>
          <div className="mt-24 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <div><h2 className="h-section">Scientific skill data</h2><p className="text-soft mt-4 text-[19px]">Leader in evidence-backed content so every recommendation is more predictive, fair and defensible.</p></div>
            <div className="card p-8"><div className="eyebrow mb-6">The impact of hiring science · <Link className="text-violet normal-case tracking-normal" href="/platform/our-science">Our science</Link></div>
              <div className="grid grid-cols-3 gap-4 text-center">{[["+43%", "more successful hires per 100"], ["+32%", "better retention"], ["3X", "higher performance ratings"]].map(([n, l]) => <div key={n}><div className="text-[44px] font-light grad-text">{n}</div><div className="text-[14px] text-soft">{l}</div></div>)}</div></div>
          </div>
        </div>
      </section>

      {/* 4 End-to-end experience */}
      <section className="bg-tint py-24">
        <div className="container-x">
          <div className="eyebrow">02 End-to-end selection experience</div>
          <h2 className="h-section mt-3 max-w-3xl">Unified, AI-enabled experience delivers interviews and assessments at any scale</h2>
          <div className="mt-14 space-y-6">
            {experience.map((e, i) => (
              <div key={e.t} className={`card p-8 grid lg:grid-cols-2 gap-8 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div><h3 className="text-[30px]">{e.t}</h3><p className="text-[19px] mt-3">{e.s}</p><p className="text-soft mt-3">{e.d}</p><Link href={e.href} className="inline-flex items-center gap-1 mt-5 text-brand font-medium hover:gap-2 transition-all">Learn more <ArrowRight size={16} /></Link></div>
                <div className="rounded-2xl h-56 bg-gradient-to-br from-brand-soft via-white to-violet/15 p-6 grid content-center gap-3">
                  {[0.9, 0.7, 0.5].map((w, k) => <div key={k} className="h-3 rounded-full bg-white shadow-sm" style={{ width: `${w * 100}%` }}><div className="h-3 rounded-full bar-fill" style={{ width: `${60 + k * 12}%`, background: k === 0 ? "var(--brand)" : "var(--violet)", opacity: 0.85 - k * 0.2 }} /></div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Case results */}
      <section className="py-24">
        <div className="container-x">
          <div className="flex justify-between items-end flex-wrap gap-4"><h2 className="h-section">Powerful results speak for themselves</h2><Link href="/customers" className="text-violet hover:underline">See more success stories →</Link></div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[["Quality of hire", "49%", "increase recruiter efficiency"], ["Candidate experience", "92%", "candidate experience satisfaction"], ["Hiring efficiency", "3.5 days", "from application to offer"]].map(([k, n, l]) => (
              <div key={k} className="card p-8"><div className="eyebrow">{k}</div><div className="text-[56px] font-light mt-4 grad-text">{n}</div><div className="text-soft">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Governance */}
      <section className="bg-dark text-white py-24">
        <div className="container-x">
          <div className="eyebrow !text-white/50">03 Enterprise-grade platform with defensible governance</div>
          <h2 className="h-section mt-3 max-w-3xl">Audit-ready platform with advanced scheduling and cheating mitigation</h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {governance.map(({ icon: I, t }) => <div key={t} className="rounded-2xl border border-white/15 p-5 hover:bg-white/5 transition"><I className="text-brand" size={22} /><div className="mt-6">{t}</div></div>)}
          </div>
          <p className="mt-8 text-white/60">Enriches 45+ ATS · <Link className="underline" href="/platform/integrations">Integrations</Link></p>
        </div>
      </section>

      {/* 7 Resources */}
      <section className="py-24">
        <div className="container-x">
          <h2 className="h-section">Resources</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {resources.slice(0, 2).map((r) => (
              <Link href="/resources" key={r.title} className="card p-8 hover:-translate-y-1 transition block"><div className="eyebrow">{r.date} / {r.type}</div><h3 className="text-[26px] mt-4">{r.title}</h3><span className="inline-flex items-center gap-1 mt-6 text-brand">Read more <ArrowRight size={16} /></span></Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <FaqList items={homeFaqs} />
    </>
  );
}
