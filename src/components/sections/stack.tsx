"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { goMod, type Module } from "@/content/profile";

const modulePath = "github.com/Rics69/danil";
const modules = goMod.flatMap((block) => block.modules);

export function Stack() {
  const [selected, setSelected] = useState("go");
  const current = modules.find((module) => module.name === selected) ?? modules[0];

  return (
    <section id="stack" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="стек"
          title="Стек в go.mod"
          text="Наведите на зависимость или нажмите на неё — go mod why покажет, в каких проектах я её использовал."
        />

        <div className="mt-16 grid grid-cols-1 items-start gap-6 md:mt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Reveal className="rounded-card bg-mist p-5 font-mono text-[14px] leading-[1.9] sm:p-8 sm:text-[15px]">
            <p className="mb-6 inline-flex rounded-full bg-paper px-3 py-1 text-muted shadow-soft">go.mod</p>
            <p>
              <Keyword>module</Keyword> {modulePath}
            </p>

            {goMod.map((block) => (
              <div key={block.title} className="mt-6">
                <p>
                  <Keyword>require</Keyword> (
                </p>
                <p className="pl-4 text-muted sm:pl-8">{"// " + block.title}</p>
                <ul>
                  {block.modules.map((module) => (
                    <li key={module.name}>
                      <ModuleLine
                        module={module}
                        indirect={block.indirect}
                        active={module.name === selected}
                        onSelect={() => setSelected(module.name)}
                      />
                      {module.name === selected && (
                        <div className="my-2 lg:hidden">
                          <WhyOutput module={module} />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <p>)</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:sticky lg:top-28 lg:block">
            <WhyOutput module={current} className="min-h-[264px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Keyword({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-gopher-ink">{children}</span>;
}

type ModuleLineProps = {
  module: Module;
  indirect?: boolean;
  active: boolean;
  onSelect: () => void;
};

function ModuleLine({ module, indirect, active, onSelect }: ModuleLineProps) {
  const comment = [indirect && "indirect", module.comment].filter(Boolean).join(" · ");
  const content = (
    <>
      <span className="truncate">{module.name}</span>
      {comment && <span className="truncate text-muted">{"// " + comment}</span>}
    </>
  );
  const layout = "grid w-full grid-cols-[minmax(0,13ch)_minmax(0,1fr)] gap-x-4 rounded-lg pr-2 pl-4 text-left sm:pl-8";

  // Only dependencies backed by a real project are explorable.
  if (!module.usedIn) return <div className={layout}>{content}</div>;

  return (
    <button
      type="button"
      aria-pressed={active}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className={`${layout} relative cursor-pointer transition-colors ${
        active ? "bg-paper shadow-soft" : "hover:bg-paper/60"
      }`}
    >
      {active && <span aria-hidden="true" className="absolute inset-y-1.5 left-1.5 w-1 rounded-full bg-gopher sm:left-3" />}
      {content}
    </button>
  );
}

function WhyOutput({ module, className = "" }: { module: Module; className?: string }) {
  const projects = module.usedIn ?? [];
  const lines = [
    { text: `# ${module.name}`, tone: "text-white/50" },
    { text: modulePath, tone: "text-paper" },
    ...projects.map((project, i) => ({
      text: `${i === projects.length - 1 ? "└─" : "├─"} ${project}`,
      tone: "text-gopher",
    })),
    ...(module.comment ? [{ text: `# ${module.comment}`, tone: "text-white/50" }] : []),
  ];

  return (
    <div
      className={`overflow-hidden rounded-card bg-ink p-5 font-mono text-[14px] leading-[1.9] text-paper sm:p-6 sm:text-[15px] ${className}`}
    >
      <p>
        <span className="text-gopher">$</span> go mod why {module.name}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={module.name}
          aria-live="polite"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="mt-2"
        >
          {lines.map((line) => (
            <motion.p
              key={line.text}
              className={line.tone}
              variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
            >
              {line.text}
            </motion.p>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
