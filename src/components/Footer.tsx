import Link from "next/link";
import { Logo } from "./Logo";
import { byGroup } from "@/lib/content";

function Col({ h, items }: { h: string; items: [string, string][] }) {
  return (
    <div>
      <div className="eyebrow !text-white/50 mb-4">{h}</div>
      <ul className="space-y-2.5">{items.map(([n, href]) => <li key={href}><Link href={href} className="text-white/85 hover:text-white text-[15px]">{n}</Link></li>)}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container-x py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div><Logo light /><p className="mt-4 text-white/60 text-[15px] max-w-[280px]">The AI-native platform for hiring decisions backed by evidence.</p></div>
        <Col h="Solutions" items={byGroup("solutions").map((s) => [s.nav, `/solutions/${s.slug}`])} />
        <Col h="Platform" items={[...byGroup("platform").map((s): [string, string] => [s.nav, `/platform/${s.slug}`]), ["Pricing", "/pricing"], ["Resources", "/resources"]]} />
        <Col h="Company" items={[["About", "/about"], ["Candidate support", "/candidates"], ["Privacy policy", "/legal/privacy"], ["Terms of use", "/legal/terms"]]} />
      </div>
      <div className="border-t border-white/10"><div className="container-x py-6 text-sm text-white/50">Copyright {new Date().getFullYear()} ScreenStage. All rights reserved.</div></div>
    </footer>
  );
}
