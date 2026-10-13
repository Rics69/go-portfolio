"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { metrics, type Metric } from "@/content/profile";

const ease = [0.16, 1, 0.3, 1] as const;
// Two full turns of the wheel before landing, so every digit visibly spins.
const reel = Array.from({ length: 20 }, (_, i) => i % 10);

export function Metrics() {
  return (
    <section id="metrics" aria-label="Ключевые цифры" className="container-page pb-24 md:pb-32">
      <dl className="grid grid-cols-2 gap-x-4 sm:gap-x-0 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <MetricItem key={metric.label} metric={metric} stagger={(i % 4) * 0.12} />
        ))}
      </dl>
    </section>
  );
}

function MetricItem({ metric, stagger }: { metric: Metric; stagger: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className="relative flex flex-col-reverse justify-end gap-4 border-t border-line pt-8 pb-10 sm:pr-8 lg:pb-0">
      <motion.span
        aria-hidden="true"
        className="absolute -top-px left-0 h-0.5 w-12 origin-left bg-gopher"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.8, delay: 0.2 + stagger, ease }}
      />
      <dt className="max-w-[26ch] text-base leading-relaxed text-muted">{metric.label}</dt>
      <dd className="text-display flex flex-wrap items-baseline gap-x-3 text-[44px] sm:text-[56px] md:text-[72px]">
        <span className="sr-only">
          {metric.value} {metric.unit}
        </span>
        <span aria-hidden="true" className="flex">
          {[...metric.value].map((char, j) =>
            /\d/.test(char) ? (
              <Digit key={j} digit={Number(char)} delay={0.15 + stagger + j * 0.08} active={inView} />
            ) : (
              <span key={j}>{char}</span>
            ),
          )}
        </span>
        {metric.unit && (
          <span aria-hidden="true" className="text-2xl font-semibold tracking-tight md:text-3xl">
            {metric.unit}
          </span>
        )}
      </dd>
    </div>
  );
}

function Digit({ digit, delay, active }: { digit: number; delay: number; active: boolean }) {
  const target = 10 + digit;

  return (
    <span className="relative inline-block h-[1em] overflow-hidden leading-none">
      {/* Reserve the width of the final digit: Onest digits are proportional. */}
      <span className="invisible">{digit}</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={{ y: "0%" }}
        animate={active ? { y: `${(-target / reel.length) * 100}%` } : undefined}
        transition={{ duration: 1.8, delay, ease }}
      >
        {reel.map((n, k) => (
          <span key={k} className="block h-[1em] text-center leading-none">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
