"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { byGroup } from "@/lib/content";

const sol = byGroup("solutions");
const uc = byGroup("use-cases");
const plat = byGroup("platform");

const solCols = [
  { h: "Engage", items: sol.filter((s) => s.eyebrow === "Engage") },
  { h: "Screen", items: sol.filter((s) => s.slug === "ai-interviewer") },
  { h: "Assess", items: sol.filter((s) => s.eyebrow === "Assess") },
  { h: "Interview", items: sol.filter((s) => s.eyebrow === "Interview") },
];
const candidateTypes = ["high-volume-hiring", "early-career-graduate", "technical-hiring", "professional-hiring", "internal-mobility"];
const otherOfferings = ["mid-market"];

type MenuKey = "solutions" | "platform" | "use-cases" | "customers" | "resources" | "company";

function Item({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="block py-1.5 text-[16px] text-ink hover:text-brand transition-colors">{children}</Link>;
}
function ColHead({ children }: { children: React.ReactNode }) { return <div className="eyebrow mb-3">{children}</div>; }

export function Header() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const tabs: { key: MenuKey; label: string }[] = [
    { key: "solutions", label: "Solutions" }, { key: "platform", label: "Platform" }, { key: "use-cases", label: "Use Cases" },
    { key: "customers", label: "Customers" }, { key: "resources", label: "Resources" }, { key: "company", label: "Company" },
  ];
  const close = () => setOpen(null);
  return (
    <header className="sticky top-0 z-50 bg-white" onMouseLeave={close}>
      <div className="grad-bar text-white text-[15px] text-right">
        <div className="container-x py-1.5"><b className="font-medium">Candidates:</b> Are you interviewing and <Link href="/candidates" className="font-semibold underline">need support?</Link></div>
      </div>
      <div className="border-b border-line">
        <div className="container-x flex h-[68px] items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="ScreenStage home"><Logo /></Link>
            <nav className="hidden lg:flex items-center gap-1">
              {tabs.map((t) => (
                <button key={t.key} onMouseEnter={() => setOpen(t.key)} onClick={() => setOpen(open === t.key ? null : t.key)}
                  className={`relative flex items-center gap-1 px-2.5 xl:px-3 whitespace-nowrap h-[68px] text-[16px] ${open === t.key ? "text-violet" : "text-soft"} hover:text-violet`}>
                  {t.label}<ChevronDown size={14} className={`transition-transform ${open === t.key ? "rotate-180" : ""}`} />
                  {open === t.key && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand" />}
                </button>
              ))}
            </nav>
          </div>
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 text-[16px] text-soft whitespace-nowrap">
            <Link href="/pricing" className="hover:text-ink hidden 2xl:block">Pricing</Link>
            <button aria-label="Search" className="hover:text-ink"><Search size={18} /></button>
            <Link href="/candidates" className="hover:text-ink">Candidates</Link>
            <span className="h-5 w-px bg-line" />
            <Link href="/login" className="hover:text-ink">Log In</Link>
            <Link href="/demo" className="btn btn-primary">Request Demo</Link>
          </div>
          <button className="lg:hidden p-2" aria-label="Menu" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
        </div>
      </div>

      {open && (
        <div className="hidden lg:block absolute left-0 right-0 bg-white border-b border-line shadow-[0_30px_50px_-30px_rgba(40,30,80,.25)]" onClick={close}>
          <div className="container-x py-8 grid grid-cols-[1fr_1fr_1fr_1fr_340px] gap-8">
            {open === "solutions" && <>
              {solCols.map((c) => (<div key={c.h}><ColHead>{c.h}</ColHead>{c.items.map((i) => <Item key={i.slug} href={`/solutions/${i.slug}`}>{i.nav}</Item>)}</div>))}
              <Feature title="Take the product tour" href="/demo" tone="from-rose-200 to-violet-300" />
            </>}
            {open === "platform" && <>
              <div><ColHead>Platform</ColHead>{plat.slice(0, 3).map((i) => <Item key={i.slug} href={`/platform/${i.slug}`}>{i.nav}</Item>)}</div>
              <div><ColHead>Trust</ColHead>{plat.slice(3).map((i) => <Item key={i.slug} href={`/platform/${i.slug}`}>{i.nav}</Item>)}</div>
              <div><ColHead>Explore</ColHead><Item href="/resources">AI in hiring</Item><Item href="/pricing">Pricing</Item></div><div />
              <Feature title="Hiring science explained" href="/platform/our-science" tone="from-indigo-200 to-rose-200" />
            </>}
            {open === "use-cases" && <>
              <div><ColHead>Candidate type</ColHead>{uc.filter((u) => candidateTypes.includes(u.slug)).map((i) => <Item key={i.slug} href={`/use-cases/${i.slug}`}>{i.nav}</Item>)}</div>
              <div><ColHead>Industries</ColHead>{uc.filter((u) => !candidateTypes.includes(u.slug) && !otherOfferings.includes(u.slug)).map((i) => <Item key={i.slug} href={`/use-cases/${i.slug}`}>{i.nav}</Item>)}</div>
              <div><ColHead>Other offerings</ColHead>{uc.filter((u) => otherOfferings.includes(u.slug)).map((i) => <Item key={i.slug} href={`/use-cases/${i.slug}`}>{i.nav}</Item>)}</div><div />
              <Feature title="Retail guide" href="/use-cases/retail" tone="from-amber-200 to-rose-300" />
            </>}
            {open === "customers" && <>
              <div><ColHead>Customers</ColHead><Item href="/customers">Our customers</Item><Item href="/customers#stories">Success stories</Item></div><div /><div /><div />
              <Feature title="Customer stories" href="/customers" tone="from-emerald-200 to-indigo-200" />
            </>}
            {open === "resources" && <>
              <div><ColHead>Learn</ColHead><Item href="/resources">All resources</Item><Item href="/blog">Blog</Item></div>
              <div><ColHead>Tools</ColHead><Item href="/resources">ROI calculator</Item><Item href="/pricing">Pricing</Item></div><div /><div />
              <Feature title="Inside the AI interviewer" href="/resources" tone="from-sky-200 to-violet-300" />
            </>}
            {open === "company" && <>
              <div><ColHead>Company</ColHead><Item href="/about">About</Item><Item href="/careers">Careers</Item><Item href="/contact">Contact</Item></div>
              <div><ColHead>Legal</ColHead><Item href="/legal/privacy">Privacy policy</Item><Item href="/legal/terms">Terms of use</Item></div><div /><div />
              <Feature title="Our story" href="/about" tone="from-fuchsia-200 to-indigo-200" />
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
            {[["Customers", "/customers"], ["Resources", "/resources"], ["Company", "/about"], ["Pricing", "/pricing"], ["Candidates", "/candidates"], ["Log In", "/login"]].map(([n, h]) => <Link key={h} href={h} onClick={() => setMobile(false)} className="block py-2 text-lg">{n}</Link>)}
            <Link href="/demo" className="btn btn-primary w-full">Request Demo</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Feature({ title, href, tone }: { title: string; href: string; tone: string }) {
  return (
    <Link href={href} className={`relative block h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br ${tone} group`}>
      <div className="absolute -right-6 top-6 w-56 h-40 bg-white/80 rounded-xl rotate-6 shadow-xl p-4"><div className="h-2 w-24 bg-ink/20 rounded mb-2" /><div className="h-2 w-32 bg-ink/10 rounded mb-2" /><div className="flex gap-1 mt-5">{[1, 2, 3, 4].map((i) => <span key={i} className="h-2 flex-1 rounded-full bg-brand" />)}</div></div>
      <div className="absolute bottom-0 inset-x-0 bg-black/45 text-white px-5 py-3 flex justify-between items-center font-medium">{title}<span className="grid place-items-center w-6 h-6 rounded-full bg-white text-ink text-sm group-hover:translate-x-1 transition">→</span></div>
    </Link>
  );
}
