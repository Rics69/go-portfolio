"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { commits, education, type Commit } from "@/content/profile";

export function Experience() {
  return (
    <section id="experience" className="bg-mist py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="опыт"
          title="Карьера как git log"
          text="От фронтенда до Go-микросервисов. Самое свежее сверху, каждое достижение — отдельный коммит."
        />

        <Reveal className="mt-16 md:mt-20">
          <GitLog />
        </Reveal>

        <div className="mt-24">
          <Reveal>
            <h3 className="text-display text-[32px] md:text-[40px]">Образование и курсы</h3>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {education.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 0.08} className="h-full rounded-card bg-paper p-6 md:p-8">
                  <p className="font-mono text-[14px] text-gopher-ink">{item.year}</p>
                  <p className="mt-4 text-xl leading-snug font-bold tracking-tight">{item.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GitLog() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  // The branch line fills with the accent colour as the log scrolls past.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });

  return (
    <div className="overflow-hidden rounded-card bg-paper shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4 font-mono text-[14px] sm:px-8">
        <span>
          <span className="text-gopher-ink">$</span> git log --graph --decorate career
        </span>
        <span className="text-muted">{commits.length} коммита · 2022 → 2026</span>
      </div>

      <ol ref={listRef} className="relative px-5 py-8 sm:px-8 md:py-10">
        <span aria-hidden="true" className="absolute top-12 bottom-12 left-[31px] w-0.5 bg-line sm:left-[43px]" />
        <motion.span
          aria-hidden="true"
          className="absolute top-12 bottom-12 left-[31px] w-0.5 origin-top bg-gopher sm:left-[43px]"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />
        {commits.map((commit) => (
          <CommitEntry key={commit.hash} commit={commit} />
        ))}
      </ol>
    </div>
  );
}

function CommitEntry({ commit }: { commit: Commit }) {
  return (
    <li className="relative grid grid-cols-[24px_minmax(0,1fr)] gap-x-4 pb-10 last:pb-0 sm:gap-x-6">
      <motion.span
        aria-hidden="true"
        className="relative z-10 mt-1.5 size-3.5 justify-self-center rounded-full ring-4 ring-paper"
        initial={{ scale: 0.6, backgroundColor: "#a0a0a0" }}
        whileInView={{ scale: 1, backgroundColor: "#00add8" }}
        viewport={{ once: true, margin: "0px 0px -45% 0px" }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      />

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[14px] text-gopher-ink">{commit.hash}</span>
          {commit.head && (
            <span className="rounded-full bg-gopher px-2.5 py-0.5 font-mono text-[14px] font-medium text-ink">
              HEAD -&gt; main
            </span>
          )}
          <span className="font-mono text-[14px] text-muted md:ml-auto">{commit.period}</span>
        </div>
        <h3 className="mt-3 text-2xl leading-tight font-bold tracking-tight md:text-[28px]">
          {commit.company} <span className="font-medium text-muted">— {commit.role}</span>
        </h3>
        <ul className="mt-3 space-y-0.5">
          {commit.lines.map((line) => (
            <li
              key={line.text}
              className="-mx-2 rounded-lg px-2 py-1 font-mono text-[14px] leading-relaxed transition-colors hover:bg-mist sm:text-[15px]"
            >
              <span className="font-semibold text-gopher-ink">{line.type}:</span>{" "}
              <span className="text-ink-soft">{line.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
