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
      <PageHero eyebrow="Pricing" title="Pay for the AI decisions you run" lead="Every plan includes the full engine: AI interviews, AI-drafted assessments, deterministic scoring, pipeline and analytics. Plans differ only in monthly capacity." />
      <section className="pb-24"><div className="container-x grid sm:grid-cols-2 xl:grid-cols-4 gap-6 -mt-4">
        {plans.map((p) => (
          <div key={p.id} className={`card p-8 flex flex-col ${p.popular ? "ring-2 ring-brand relative" : ""}`}>
            {p.popular && <span className="absolute -top-3 left-8 bg-brand text-white text-xs px-3 py-1 rounded-full">Most popular</span>}
            <h2 className="text-[26px]">{p.name}</h2><p className="text-soft mt-1">{p.blurb}</p>
            <div className="mt-6"><span className="text-[52px] font-light">${p.price}</span><span className="text-soft"> {p.price === 0 ? "forever" : "per month"}</span></div>
            <ul className="mt-6 space-y-3 flex-1">{p.features.map((f) => <li key={f} className="flex gap-2.5"><Check size={18} className="text-brand mt-1 shrink-0" />{f}</li>)}</ul>
            <Link href={p.id === "free" ? "/signup" : `/signup?plan=${p.id}`} className={`btn btn-lg mt-8 ${p.popular ? "btn-primary" : "btn-ghost"}`}>Sign up</Link>
          </div>
        ))}
      </div>
      <p className="container-x mt-8 text-center text-soft text-[15px]">Every account starts on the Free plan with 5 AI credits. For a paid plan, checkout opens in your billing page right after you create your account.</p>
      </section>
      <FaqList title="Billing questions" items={[
        { q: "What is a credit?", a: "One credit covers one AI action: generating an interview, evaluating a candidate's answers or drafting an assessment. Assessment scoring is calculated in code and does not use credits." },
        { q: "When does a paid plan activate?", a: "When your payment is confirmed. A redirect from checkout never unlocks a plan on its own. Use the same email at checkout as on your account." },
        { q: "What happens if an AI action fails?", a: "The credit is returned to your balance automatically." },
        { q: "Can I change plans?", a: "Yes. Choose another plan from the billing page at any time." },
      ]} />
    </>
  );
}
