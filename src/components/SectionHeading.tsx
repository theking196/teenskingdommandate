interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow ? <span className="glass-pill">{eyebrow}</span> : null}
      <h2 className="mt-4 text-3xl font-bold md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-white/70">{description}</p> : null}
    </div>
  );
}
