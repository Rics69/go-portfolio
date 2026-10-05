import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  className?: string;
};

export function SectionHeading({ index, eyebrow, title, text, className = "" }: SectionHeadingProps) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="text-eyebrow text-muted">
        <span className="text-gopher-ink">{"//"}</span> {index} — {eyebrow}
      </p>
      <h2 className="text-display mt-4 text-[40px] md:text-[64px]">{title}</h2>
      {text && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{text}</p>}
    </Reveal>
  );
}
