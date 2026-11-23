import { notFound } from "next/navigation";
import { adminClient } from "@/lib/supabase/admin";
import { scriptSchema } from "@/lib/gemini";
import { CandidateInterview } from "@/components/CandidateInterview";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Your interview", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Public({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const admin = adminClient();
  if (!admin) return <Shell><p className="text-soft">This interview link cannot be opened right now.</p></Shell>;
  const { data } = await admin.from("interviews").select("title, script").eq("share_token", token).single();
  if (!data) notFound();
  const script = scriptSchema.parse(data.script);
  // Rubrics stay server-side; candidates only get question text.
  return <Shell><CandidateInterview token={token} title={data.title} intro={script.intro} questions={script.questions.map((q) => q.text)} /></Shell>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-tint/50"><div className="grad-bar h-2" /><div className="container-x max-w-2xl py-10"><Logo /><div className="mt-8">{children}</div></div></div>;
}
