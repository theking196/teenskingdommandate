interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl space-y-3">
      {eyebrow ? <span className="glass-pill">{eyebrow}</span> : null}
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-relaxed text-white/70">{description}</p> : null}
    </div>
  );
}
