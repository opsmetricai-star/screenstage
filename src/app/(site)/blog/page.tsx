import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Blog" };
const posts = [
  ["Why structured scoring beats gut feel", "Rubrics turn opinions into evidence and make decisions defensible.", "Aug 2, 2026"],
  ["Designing AI interviews candidates actually like", "Short, warm and fair: what 70,000 conversations taught us.", "Jul 14, 2026"],
  ["Hiring for retention, not just speed", "The skills that predict who stays in hourly roles.", "Jun 30, 2026"],
  ["A practical guide to adverse-impact monitoring", "How to check your funnel for fairness each month.", "Jun 9, 2026"],
  ["Cheating in the age of AI: a balanced view", "Prevention, detection and humane review.", "May 21, 2026"],
  ["Writing a job description that yields a good interview", "Clear outcomes make better questions.", "May 3, 2026"],
];
export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Ideas for fairer, faster, smarter hiring" />
      <section className="pb-24"><div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(([t, b, d]) => <article key={t} className="card p-7"><div className="eyebrow">{d}</div><h2 className="text-[22px] mt-3 leading-snug">{t}</h2><p className="text-soft mt-2">{b}</p></article>)}
      </div></section>
    </>
  );
}
