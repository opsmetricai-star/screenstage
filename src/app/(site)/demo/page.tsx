import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = { title: "Request a demo" };
export default function Demo() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-tint/60"><div className="container-x grid lg:grid-cols-2 gap-12 items-start">
      <div className="reveal"><div className="eyebrow">See ScreenStage in action</div><h1 className="h-display mt-3">Are you ready for faster, fairer, friendlier hiring?</h1>
        <p className="mt-5 text-[21px] text-soft">Join hundreds of teams running structured AI interviews and assessments. Book a walkthrough tailored to your roles.</p>
        <ul className="mt-8 space-y-3 text-[18px]">{["30-minute live walkthrough", "Sample interview built from your own job description", "Pricing and rollout plan"].map((x) => <li key={x} className="flex gap-3"><span className="text-brand">✓</span>{x}</li>)}</ul></div>
      <div className="card p-8"><LeadForm cta="Request demo" /></div>
    </div></section>
  );
}
