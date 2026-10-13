import { ApiContract } from "@/components/cases/viz/api-contract";
import { AuthHub } from "@/components/cases/viz/auth-hub";
import { LatencyRace } from "@/components/cases/viz/latency-race";
import { QueueFlow } from "@/components/cases/viz/queue-flow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cases, type Case, type CaseTone, type CaseViz } from "@/content/profile";

const toneStyles: Record<CaseTone, { card: string; chip: string; meta: string; panel: string }> = {
  accent: {
    card: "bg-gopher text-ink",
    chip: "bg-ink text-paper",
    meta: "text-ink/70",
    panel: "bg-paper",
  },
  mist: {
    card: "bg-mist text-ink",
    chip: "bg-paper text-ink shadow-soft",
    meta: "text-muted",
    panel: "bg-paper",
  },
  dark: {
    card: "bg-ink text-paper",
    chip: "bg-paper/10 text-paper",
    meta: "text-paper/60",
    panel: "bg-[#161616] ring-1 ring-white/10",
  },
};

const visuals: Record<CaseViz, () => React.ReactNode> = {
  latency: LatencyRace,
  queue: QueueFlow,
  hub: AuthHub,
  contract: ApiContract,
};

export function Cases() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow="кейсы"
          title="Что я сделал — в цифрах"
          text="Четыре проекта, где результат можно измерить. Анимации внутри — упрощённые схемы того, что происходило под капотом."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 lg:grid-cols-2 lg:gap-6">
          {cases.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 0.1} className="flex">
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: Case }) {
  const tone = toneStyles[item.tone];
  const Visual = visuals[item.viz];

  return (
    <article
      className={`group flex w-full flex-col overflow-hidden rounded-[32px] px-6 pt-10 text-center transition-transform duration-500 ease-out-expo hover:-translate-y-1 md:px-12 md:pt-14 ${tone.card}`}
    >
      <p className={`text-[15px] font-medium ${tone.meta}`}>{item.label}</p>
      <h3 className="text-display mx-auto mt-4 max-w-[16ch] text-[32px] text-balance md:text-[44px]">{item.title}</h3>
      <p className={`mx-auto mt-5 max-w-md text-base leading-relaxed md:text-lg ${tone.meta}`}>{item.text}</p>

      <ul className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Результаты">
        {item.metrics.map((metric) => (
          <li key={metric} className={`rounded-full px-4 py-2 text-[15px] font-semibold ${tone.chip}`}>
            {metric}
          </li>
        ))}
      </ul>
      <p className={`mt-4 font-mono text-[14px] ${tone.meta}`}>{item.stack.join(" · ")}</p>

      {/* mt-auto pins the diagram to the bottom edge when cards in a row differ in height. */}
      <div className="mt-auto w-full pt-10">
        <div
          className={`mx-auto w-full max-w-[480px] translate-y-2 rounded-t-[24px] p-5 text-left transition-transform duration-500 ease-out-expo group-hover:translate-y-0 sm:p-6 ${tone.panel}`}
        >
          <Visual />
        </div>
      </div>
    </article>
  );
}
