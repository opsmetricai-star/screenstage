import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { findPage, pages, type PageDef } from "@/lib/content";
import { CtaBand, FaqList, ProductMock } from "@/components/Sections";

type P = { params: Promise<{ group: string; slug: string }> };
const groups = ["solutions", "platform", "use-cases"];

export function generateStaticParams() {
  return pages.map((p) => ({ group: p.group, slug: p.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { group, slug } = await params;
  const p = findPage(group as PageDef["group"], slug);
  return p ? { title: p.nav, description: p.lead } : {};
}

export default async function DetailPage({ params }: P) {
  const { group, slug } = await params;
  if (!groups.includes(group)) notFound();
  const p = findPage(group as PageDef["group"], slug);
  if (!p) notFound();

  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="container-x grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <div className="reveal">
            <div className="eyebrow">{p.eyebrow}</div>
            <h1 className="h-display mt-3">{p.title}</h1>
            <p className="mt-5 text-[21px] leading-snug text-soft max-w-[560px]">{p.lead}</p>
            <div className="mt-8 flex gap-3 flex-wrap"><Link href="/signup" className="btn btn-primary btn-lg">Sign up</Link><Link href="/login" className="btn btn-ghost btn-lg">Log in</Link></div>
          </div>
          <div className="reveal" style={{ animationDelay: ".15s" }}><ProductMock /></div>
        </div>
      </section>

      <section className="border-y border-line"><div className="container-x grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
        {p.stats.map((s) => <div key={s.label} className="py-10 sm:px-8 first:sm:pl-0"><div className="text-[48px] font-light grad-text">{s.value}</div><div className="text-soft">{s.label}</div></div>)}
      </div></section>

      <section className="py-24"><div className="container-x">
        <h2 className="h-section max-w-2xl">What this delivers for your business</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {p.features.map((f) => <div key={f.title} className="card p-7"><span className="grid place-items-center w-9 h-9 rounded-full bg-brand-soft text-brand"><Check size={18} /></span><h3 className="text-[22px] mt-5">{f.title}</h3><p className="text-soft mt-2">{f.body}</p></div>)}
        </div>
      </div></section>

      <section className="bg-tint py-24"><div className="container-x">
        <h2 className="h-section max-w-3xl">{p.stepsTitle}</h2>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {p.steps.map((s, i) => <li key={s.title} className="card p-6"><div className="text-[40px] font-light grad-text">{String(i + 1).padStart(2, "0")}</div><h3 className="text-[20px] mt-3">{s.title}</h3><p className="text-soft mt-1.5">{s.body}</p></li>)}
        </ol>
      </div></section>

      <section className="bg-dark text-white py-24"><div className="container-x">
        <h2 className="h-section max-w-3xl">{p.pillarsTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {p.pillars.map((x) => <div key={x.title} className="rounded-2xl border border-white/15 p-7"><h3 className="text-[22px]">{x.title}</h3><p className="text-white/65 mt-2">{x.body}</p></div>)}
        </div>
      </div></section>

      <CtaBand />
      <FaqList items={p.faqs} />
    </>
  );
}
