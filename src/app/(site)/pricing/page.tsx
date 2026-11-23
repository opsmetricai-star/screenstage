import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { plans } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/Sections";

export const metadata: Metadata = { title: "Pricing" };

export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple plans that scale with your hiring" lead="Every plan includes AI interviews, assessments and candidate scorecards. Pay monthly in USD and change plans any time." />
      <section className="pb-24"><div className="container-x grid md:grid-cols-3 gap-6 -mt-4">
        {plans.map((p) => (
          <div key={p.id} className={`card p-8 flex flex-col ${p.popular ? "ring-2 ring-brand relative" : ""}`}>
            {p.popular && <span className="absolute -top-3 left-8 bg-brand text-white text-xs px-3 py-1 rounded-full">Most popular</span>}
            <h2 className="text-[26px]">{p.name}</h2><p className="text-soft mt-1">{p.blurb}</p>
            <div className="mt-6"><span className="text-[52px] font-light">${p.price}</span><span className="text-soft"> / month</span></div>
            <ul className="mt-6 space-y-3 flex-1">{p.features.map((f) => <li key={f} className="flex gap-2.5"><Check size={18} className="text-brand mt-1 shrink-0" />{f}</li>)}</ul>
            <Link href={`/signup?plan=${p.id}`} className={`btn btn-lg mt-8 ${p.popular ? "btn-primary" : "btn-ghost"}`}>Get {p.name}</Link>
          </div>
        ))}
      </div>
      <p className="container-x mt-8 text-center text-soft text-[15px]">Start with 5 free AI credits when you sign up. Checkout is handled securely by Selar; your plan activates once payment is confirmed.</p>
      </section>
      <FaqList title="Billing questions" items={[
        { q: "How do credits work?", a: "One credit covers one AI action: generating an interview script, evaluating a candidate's answers or drafting an assessment. Credits reset each month on your plan." },
        { q: "When does my plan activate?", a: "After Selar confirms your payment. A redirect alone does not unlock a plan; we activate it from the verified confirmation, usually within minutes." },
        { q: "Can I change or cancel?", a: "Yes. Choose another plan from the Billing page at any time." },
      ]} />
    </>
  );
}
