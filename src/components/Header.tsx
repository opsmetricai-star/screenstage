"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { byGroup } from "@/lib/content";

const sol = byGroup("solutions");
const uc = byGroup("use-cases");
const plat = byGroup("platform");
const candidateTypes = ["high-volume-hiring", "early-career-graduate", "technical-hiring", "professional-hiring", "internal-mobility"];

type MenuKey = "solutions" | "platform" | "use-cases" | "resources" | "company";

function Item({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="block py-1.5 text-[16px] text-ink hover:text-brand transition-colors">{children}</Link>;
}
function ColHead({ children }: { children: React.ReactNode }) { return <div className="eyebrow mb-3">{children}</div>; }

export function Header() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const tabs: { key: MenuKey; label: string }[] = [
    { key: "solutions", label: "Solutions" }, { key: "platform", label: "Platform" }, { key: "use-cases", label: "Use Cases" },
    { key: "resources", label: "Resources" }, { key: "company", label: "Company" },
  ];
  const close = () => setOpen(null);
  return (
    <header className="sticky top-0 z-50 bg-white" onMouseLeave={close}>
      <div className="grad-bar text-white text-[15px] text-right">
        <div className="container-x py-1.5"><b className="font-medium">Candidates:</b> Interviewing with a ScreenStage customer? <Link href="/candidates" className="font-semibold underline">Get support</Link></div>
      </div>
      <div className="border-b border-line">
        <div className="container-x flex h-[68px] items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="ScreenStage home"><Logo /></Link>
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {tabs.map((t) => (
                <button key={t.key} onMouseEnter={() => setOpen(t.key)} onClick={() => setOpen(open === t.key ? null : t.key)} aria-expanded={open === t.key}
                  className={`relative flex items-center gap-1 px-3 whitespace-nowrap h-[68px] text-[16px] ${open === t.key ? "text-violet" : "text-soft"} hover:text-violet`}>
                  {t.label}<ChevronDown size={14} className={`transition-transform ${open === t.key ? "rotate-180" : ""}`} />
                  {open === t.key && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand" />}
                </button>
              ))}
              <Link href="/pricing" className="px-3 text-[16px] text-soft hover:text-violet">Pricing</Link>
            </nav>
          </div>
          <div className="hidden lg:flex items-center gap-5 text-[16px] text-soft whitespace-nowrap">
            <Link href="/login" className="hover:text-ink">Log in</Link>
            <Link href="/signup" className="btn btn-primary">Sign up</Link>
          </div>
          <button className="lg:hidden p-2" aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
        </div>
      </div>

      {open && (
        <div className="hidden lg:block absolute left-0 right-0 bg-white border-b border-line shadow-[0_30px_50px_-30px_rgba(40,30,80,.25)]" onClick={close}>
          <div className="container-x py-8 grid grid-cols-[1fr_1fr_1fr_340px] gap-8">
            {open === "solutions" && <>
              <div><ColHead>Screen</ColHead>{sol.filter((s) => s.eyebrow === "Screen").map((i) => <Item key={i.slug} href={`/solutions/${i.slug}`}>{i.nav}</Item>)}</div>
              <div><ColHead>Assess</ColHead>{sol.filter((s) => s.eyebrow === "Assess").map((i) => <Item key={i.slug} href={`/solutions/${i.slug}`}>{i.nav}</Item>)}</div>
              <div><ColHead>Decide</ColHead>{sol.filter((s) => s.eyebrow === "Decide").map((i) => <Item key={i.slug} href={`/solutions/${i.slug}`}>{i.nav}</Item>)}</div>
              <Feature title="AI Interviewer" href="/solutions/ai-interviewer" tone="from-rose-200 to-violet-300" />
            </>}
            {open === "platform" && <>
              <div><ColHead>Platform</ColHead>{plat.map((i) => <Item key={i.slug} href={`/platform/${i.slug}`}>{i.nav}</Item>)}</div><div /><div />
              <Feature title="Evidence-based scoring" href="/platform/evidence-scoring" tone="from-indigo-200 to-rose-200" />
            </>}
            {open === "use-cases" && <>
              <div><ColHead>Candidate type</ColHead>{uc.filter((u) => candidateTypes.includes(u.slug)).map((i) => <Item key={i.slug} href={`/use-cases/${i.slug}`}>{i.nav}</Item>)}</div>
              <div><ColHead>Industries</ColHead>{uc.filter((u) => !candidateTypes.includes(u.slug) && u.slug !== "mid-market").map((i) => <Item key={i.slug} href={`/use-cases/${i.slug}`}>{i.nav}</Item>)}</div>
              <div><ColHead>Company size</ColHead>{uc.filter((u) => u.slug === "mid-market").map((i) => <Item key={i.slug} href={`/use-cases/${i.slug}`}>{i.nav}</Item>)}</div>
              <Feature title="Retail hiring" href="/use-cases/retail" tone="from-amber-200 to-rose-300" />
            </>}
            {open === "resources" && <>
              <div><ColHead>Tools</ColHead><Item href="/resources">Hiring ROI calculator</Item><Item href="/pricing">Pricing</Item></div><div /><div />
              <Feature title="Hiring ROI calculator" href="/resources" tone="from-sky-200 to-violet-300" />
            </>}
            {open === "company" && <>
              <div><ColHead>Company</ColHead><Item href="/about">About</Item><Item href="/candidates">Candidate support</Item></div>
              <div><ColHead>Legal</ColHead><Item href="/legal/privacy">Privacy policy</Item><Item href="/legal/terms">Terms of use</Item><Item href="/legal/ai-ethics">AI ethical principles</Item></div><div />
              <Feature title="About ScreenStage" href="/about" tone="from-fuchsia-200 to-indigo-200" />
            </>}
          </div>
        </div>
      )}

      {mobile && (
        <div className="lg:hidden border-b border-line bg-white max-h-[75vh] overflow-auto">
          <div className="container-x py-4 space-y-3">
            {([["Solutions", sol.map((s) => [s.nav, `/solutions/${s.slug}`])], ["Platform", plat.map((s) => [s.nav, `/platform/${s.slug}`])], ["Use Cases", uc.map((s) => [s.nav, `/use-cases/${s.slug}`])]] as [string, string[][]][]).map(([h, items]) => (
              <details key={h} className="group">
                <summary className="flex justify-between py-2 text-lg cursor-pointer list-none">{h}<ChevronDown size={18} className="group-open:rotate-180 transition" /></summary>
                <div className="pl-3 pb-2">{items.map(([n, href]) => <Link key={href} href={href} onClick={() => setMobile(false)} className="block py-1.5 text-soft">{n}</Link>)}</div>
              </details>
            ))}
            {[["Resources", "/resources"], ["Pricing", "/pricing"], ["About", "/about"], ["Candidate support", "/candidates"], ["Log in", "/login"]].map(([n, h]) => <Link key={h} href={h} onClick={() => setMobile(false)} className="block py-2 text-lg">{n}</Link>)}
            <Link href="/signup" className="btn btn-primary w-full">Sign up</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Feature({ title, href, tone }: { title: string; href: string; tone: string }) {
  return (
    <Link href={href} className={`relative block h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br ${tone} group`}>
      <div className="absolute -right-6 top-6 w-56 h-40 bg-white/80 rounded-xl rotate-6 shadow-xl p-4"><div className="h-2 w-24 bg-ink/20 rounded mb-2" /><div className="h-2 w-32 bg-ink/10 rounded mb-2" /><div className="flex gap-1 mt-5">{[1, 2, 3, 4].map((i) => <span key={i} className="h-2 flex-1 rounded-full bg-brand" />)}</div></div>
      <div className="absolute bottom-0 inset-x-0 bg-black/45 text-white px-5 py-3 flex justify-between items-center font-medium">{title}<span aria-hidden className="grid place-items-center w-6 h-6 rounded-full bg-white text-ink text-sm group-hover:translate-x-1 transition">&rarr;</span></div>
    </Link>
  );
}
