import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";

const docs: Record<string, { title: string; sections: [string, string][] }> = {
  privacy: { title: "Privacy policy", sections: [["What we collect", "Account details, job and candidate data you enter, and basic usage analytics."], ["How we use it", "To provide the service, meter usage and improve product quality. We do not sell personal data."], ["AI processing", "Interview content you submit is sent to our AI provider solely to generate scripts and evaluations."], ["Your rights", "You can access, export or delete your data by contacting support."]] },
  terms: { title: "Terms of use", sections: [["Acceptable use", "Use ScreenStage lawfully and only for legitimate hiring purposes."], ["Human oversight", "AI output is advisory. You are responsible for hiring decisions."], ["Billing", "Paid plans renew monthly and activate after payment is confirmed."], ["Liability", "The service is provided as is, to the extent permitted by law."]] },
  "ai-ethics": { title: "AI ethical principles", sections: [["Fairness", "Scoring uses job-relevant evidence only and never protected characteristics."], ["Transparency", "Candidates are told when AI is involved; every score links to evidence."], ["Human control", "People make every hiring decision."], ["Accountability", "We monitor outcomes and publish changes to our methods."]] },
};
export function generateStaticParams() { return Object.keys(docs).map((doc) => ({ doc })); }
export default async function Legal({ params }: { params: Promise<{ doc: string }> }) {
  const d = docs[(await params).doc];
  if (!d) notFound();
  return (
    <>
      <PageHero title={d.title} lead="Last updated November 2026. This is a template; have counsel review it before launch." />
      <section className="pb-24"><div className="container-x max-w-3xl space-y-8">{d.sections.map(([h, b]) => <div key={h}><h2 className="text-[24px]">{h}</h2><p className="text-soft mt-2">{b}</p></div>)}</div></section>
    </>
  );
}
