"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Same endpoint before and after the rewrite: Go finishes a request roughly twice as often.
const lanes = [
  { name: "Python · FastAPI", latency: "~250 мс", period: 2.4, dot: "bg-faint" },
  { name: "Go", latency: "~120 мс", period: 1.15, dot: "bg-gopher" },
];
const packets = 3;

export function LatencyRace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [done, setDone] = useState([0, 0]);
  const running = inView && !reduce;

  useEffect(() => {
    if (!running) return;
    const timers = lanes.map((lane, i) =>
      window.setInterval(
        () => setDone((counts) => counts.map((count, j) => (j === i ? count + 1 : count))),
        (lane.period * 1000) / packets,
      ),
    );
    return () => timers.forEach((id) => window.clearInterval(id));
  }, [running]);

  return (
    <div ref={ref} className="font-mono text-[14px]">
      <div className="flex items-center justify-between text-muted">
        <span>GET /api/applications</span>
        <span className="max-sm:hidden">avg latency</span>
      </div>

      {lanes.map((lane, i) => (
        <div key={lane.name} className="mt-5">
          <div className="flex items-baseline justify-between gap-4">
            <span className={i === 1 ? "font-semibold" : "text-muted"}>{lane.name}</span>
            <span className={i === 1 ? "text-lg font-semibold" : "text-muted"}>{lane.latency}</span>
          </div>
          <div className="relative mt-2 h-8 overflow-hidden rounded-full bg-mist">
            {Array.from({ length: packets }, (_, k) => (
              <span
                key={k}
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  animation: `travel ${lane.period}s linear ${(-lane.period * k) / packets}s infinite`,
                  animationPlayState: running ? "running" : "paused",
                }}
              >
                <span className={`absolute top-1/2 left-0 size-4 -translate-y-1/2 rounded-full ${lane.dot}`} />
              </span>
            ))}
            <span className="absolute inset-y-1 right-1 flex items-center rounded-full bg-paper px-3 text-[12px] text-muted">
              db
            </span>
          </div>
        </div>
      ))}

      <p className="mt-5 flex justify-between border-t border-line pt-4 text-muted" aria-live="off">
        <span>обработано</span>
        <span>
          {done[0]} <span className="text-faint">vs</span> <span className="font-semibold text-ink">{done[1]}</span>
        </span>
      </p>
    </div>
  );
}
