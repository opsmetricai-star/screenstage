export function PageHero({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-tint/60">
      <div className="container-x reveal max-w-4xl">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="h-display mt-3">{title}</h1>
        {lead && <p className="mt-5 text-[21px] text-soft leading-snug max-w-2xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
