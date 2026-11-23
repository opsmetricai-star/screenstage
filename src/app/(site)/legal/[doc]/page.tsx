import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";

const docs: Record<string, { title: string; sections: [string, string][] }> = {
  privacy: { title: "Privacy policy", sections: [["Information we collect", "Account details, the job and candidate information you enter, candidate responses and usage records such as credit consumption."], ["How we use it", "To operate the service, meter usage, protect accounts and improve product quality. We do not sell personal data."], ["AI processing", "Job descriptions and candidate responses are sent to our AI provider solely to generate interviews and assessments and to score responses against your rubric."], ["Data isolation", "Each account's records are isolated at the database level and are accessible only to that account."], ["Your rights", "You may request access to, export of or deletion of your data through your account administrator."]] },
  terms: { title: "Terms of use", sections: [["Acceptable use", "Use ScreenStage lawfully and only for legitimate hiring purposes. You are responsible for the content you submit."], ["Human decisions", "AI output is a recommendation. You are responsible for every hiring decision and for compliance with the employment laws that apply to you."], ["Billing", "Paid plans provide a monthly credit allowance and activate after payment is confirmed. Failed AI actions are credited back."], ["Availability", "We work to keep the service available but do not guarantee uninterrupted access."]] },
  "ai-ethics": { title: "AI ethical principles", sections: [["Job-relevant evidence only", "Scoring is limited to evidence of the competencies a role requires. Protected characteristics are excluded from scoring instructions."], ["Explainability", "Every rating states its rationale and cites the candidate's own words."], ["Transparency to candidates", "Candidates are told when an AI interviewer is conducting the session."], ["Human oversight", "People make every hiring decision and can overrule any recommendation."], ["Reliability", "AI outputs must conform to a strict schema, and calculations that affect results are performed in code."]] },
};
export function generateStaticParams() { return Object.keys(docs).map((doc) => ({ doc })); }
export default async function Legal({ params }: { params: Promise<{ doc: string }> }) {
  const d = docs[(await params).doc];
  if (!d) notFound();
  return (
    <>
      <PageHero title={d.title} />
      <section className="pb-24"><div className="container-x max-w-3xl space-y-8">{d.sections.map(([h, b]) => <div key={h}><h2 className="text-[24px]">{h}</h2><p className="text-soft mt-2">{b}</p></div>)}</div></section>
    </>
  );
}
