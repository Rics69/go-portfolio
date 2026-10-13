"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Keyboard } from "@/components/hero/keyboard";
import { StatusDot } from "@/components/ui/status-dot";
import { profile } from "@/content/profile";

const ease = [0.16, 1, 0.3, 1] as const;
const words = ["Данил", "Клементьев —", "Go-разработчик,", "который", "делает", "сервисы"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-36 md:pb-32">
      <div className="container-page flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="inline-flex min-h-10 items-center gap-2.5 rounded-full bg-mist px-4 text-[15px] font-medium text-ink-soft"
        >
          <StatusDot />
          {profile.status}
          <span className="max-sm:hidden">· {profile.city}, UTC+3</span>
        </motion.p>

        <h1 className="text-display mt-6 max-w-[15ch] text-[clamp(34px,10.2vw,80px)] text-balance">
          {words.map((word, i) => (
            <Word key={word} delay={0.3 + i * 0.07}>
              {word}
            </Word>
          ))}
          <Word delay={0.3 + words.length * 0.07}>
            <RotatingWord words={profile.heroWords} />
          </Word>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 max-w-xl text-lg text-balance text-ink-soft md:text-xl"
        >
          {profile.tagline.join(" ")}
        </motion.p>

        <div className="mt-12 w-full md:mt-14">
          <Keyboard />
        </div>
      </div>
    </section>
  );
}

function Word({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <>
      <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom whitespace-nowrap">
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay, ease }}
        >
          {children}
        </motion.span>
      </span>{" "}
    </>
  );
}

function RotatingWord({ words }: { words: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [reduce, words.length]);

  return (
    <span className="relative inline-grid justify-items-center overflow-hidden rounded-[0.18em] bg-gopher px-[0.16em] align-bottom">
      {/* The invisible copies reserve the width of the longest word. */}
      {words.map((word) => (
        <span key={word} aria-hidden="true" className="invisible col-start-1 row-start-1">
          {word}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
