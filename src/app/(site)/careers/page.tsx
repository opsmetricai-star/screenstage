import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Careers" };
const jobs = [["Senior Full-stack Engineer", "Engineering", "Remote"], ["Industrial-Organizational Psychologist", "Science", "Remote"], ["Customer Success Manager", "Customer", "Remote"], ["Product Designer", "Design", "Remote"]];
export default function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Help us make hiring fairer for everyone" lead="We are a small, remote-first team building the evidence layer for hiring." />
      <section className="pb-24"><div className="container-x max-w-3xl divide-y divide-line border-y border-line">
        {jobs.map(([t, d, l]) => <Link href="/contact" key={t} className="flex justify-between items-center py-6 hover:text-brand transition"><div><div className="text-[20px]">{t}</div><div className="text-soft text-[15px]">{d} · {l}</div></div><span>→</span></Link>)}
      </div></section>
    </>
  );
}
