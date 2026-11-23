import Link from "next/link";
import { Logo } from "./Logo";
import { byGroup } from "@/lib/content";

function Col({ h, items }: { h: string; items: [string, string][] }) {
  return (
    <div>
      <div className="eyebrow !text-white/50 mb-4">{h}</div>
      <ul className="space-y-2.5">{items.map(([n, href]) => <li key={href + n}><Link href={href} className="text-white/85 hover:text-white text-[15px]">{n}</Link></li>)}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container-x py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr]">
        <div><Logo light /><p className="mt-4 text-white/60 text-[15px] max-w-[260px]">Agentic hiring solutions that drive better hires, not just faster ones.</p><Link href="/demo" className="btn btn-primary mt-6">Request Demo</Link></div>
        <Col h="Solutions" items={byGroup("solutions").map((s) => [s.nav, `/solutions/${s.slug}`])} />
        <Col h="Platform" items={byGroup("platform").map((s) => [s.nav, `/platform/${s.slug}`])} />
        <Col h="Use cases" items={byGroup("use-cases").slice(0, 8).map((s) => [s.nav, `/use-cases/${s.slug}`])} />
        <Col h="Resources" items={[["All resources", "/resources"], ["Blog", "/blog"], ["Customers", "/customers"], ["Pricing", "/pricing"], ["Candidate support", "/candidates"]]} />
        <Col h="Company" items={[["About", "/about"], ["Careers", "/careers"], ["Contact", "/contact"], ["Privacy policy", "/legal/privacy"], ["Terms of use", "/legal/terms"], ["AI ethical principles", "/legal/ai-ethics"]]} />
      </div>
      <div className="border-t border-white/10"><div className="container-x py-6 text-sm text-white/50 flex flex-wrap justify-between gap-2"><span>© {new Date().getFullYear()} ScreenStage. All rights reserved.</span><span>Built for fair, evidence-led hiring.</span></div></div>
    </footer>
  );
}
