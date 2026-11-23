"use client";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type P = { funnel: { stage: string; count: number }[]; buckets: { range: string; count: number }[]; usage: { day: string; credits: number }[] };

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="card p-6"><h2 className="text-[18px] mb-4">{title}</h2><div className="h-[240px]">{children}</div></section>;
}

export function AnalyticsCharts({ funnel, buckets, usage }: P) {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <Box title="Hiring funnel"><ResponsiveContainer><BarChart data={funnel}><CartesianGrid vertical={false} stroke="#e6e7ee" /><XAxis dataKey="stage" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} width={28} /><Tooltip /><Bar dataKey="count" fill="#d9246b" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></Box>
      <Box title="Score distribution"><ResponsiveContainer><BarChart data={buckets}><CartesianGrid vertical={false} stroke="#e6e7ee" /><XAxis dataKey="range" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} width={28} /><Tooltip /><Bar dataKey="count" fill="#6b5ce7" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></Box>
      <div className="lg:col-span-2"><Box title="Credit usage by day">{usage.length ? <ResponsiveContainer><LineChart data={usage}><CartesianGrid vertical={false} stroke="#e6e7ee" /><XAxis dataKey="day" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} width={28} /><Tooltip /><Line type="monotone" dataKey="credits" stroke="#d9246b" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer> : <p className="text-soft">No usage yet.</p>}</Box></div>
    </div>
  );
}
