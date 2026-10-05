import { AdvantageGlyph, ArrowIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { advantages, advantagesLead } from "@/content/profile";

export function Advantages() {
  return (
    <section id="advantages" className="bg-mist py-24 md:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-eyebrow text-muted">
            <span className="text-gopher-ink">{"//"}</span> 01 — почему я
          </p>
          <GaugeMark className="mt-10 size-14" />
          <h2 className="text-display mt-8 text-[44px] md:text-[60px]">{advantagesLead.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{advantagesLead.text}</p>
          <a
            href="#work"
            className="group mt-8 inline-flex min-h-11 items-center gap-2 text-base font-medium text-muted transition-colors hover:text-ink"
          >
            Смотреть кейсы
            <ArrowIcon
              direction="out"
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>

        <ul className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {advantages.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 2) * 0.08} className="group">
                <span className="flex size-12 items-center justify-center rounded-xl bg-paper text-ink shadow-soft transition-[background-color,transform] duration-300 ease-out-expo group-hover:-rotate-6 group-hover:bg-gopher">
                  <AdvantageGlyph name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl leading-tight font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Oversized "benchmark dial" mark — plays the role of the logo in the moodboard.
function GaugeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden="true" className={className}>
      <path d="M8 40a20 20 0 1 1 40 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M8 40a20 20 0 0 1 36.5-11.3" stroke="var(--color-gopher)" strokeWidth="5" strokeLinecap="round" />
      <path d="m28 40 11-13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="28" cy="40" r="4" fill="currentColor" />
    </svg>
  );
}
