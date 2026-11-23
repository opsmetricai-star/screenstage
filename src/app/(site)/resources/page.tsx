import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RoiCalculator } from "@/components/RoiCalculator";

export const metadata: Metadata = { title: "Hiring ROI calculator" };
export default function Resources() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Quantify the cost of manual screening" lead="Enter your hiring volume and recruiter cost. The calculator estimates the hours and spend that automated first-round screening can remove." />
      <section className="pb-24"><div className="container-x"><RoiCalculator /></div></section>
    </>
  );
}
