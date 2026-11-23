import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get your questions answered" />
      <section className="pb-24"><div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="space-y-8"><div><h2 className="text-[22px]">Sales and business development</h2><p className="text-soft mt-1">Tell us about your hiring volume and we will reply within one business day.</p></div><div><h2 className="text-[22px]">Support</h2><p className="text-soft mt-1">Existing customers can reach support from the in-app Settings page. Candidates, see <Link className="text-brand underline" href="/candidates">candidate support</Link>.</p></div></div>
        <div className="card p-8"><LeadForm /></div>
      </div></section>
    </>
  );
}
