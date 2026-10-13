"use client";

import { useSvgPlayback } from "@/components/cases/viz/use-svg-playback";

// Producer → RabbitMQ → consumer. Failed messages go round the retry loop;
// the ones that still fail are parked in the dead-letter queue instead of being lost.
const main = "M50 90 L340 90";
const retry = "M50 90 L340 90 C340 22 150 22 150 90 L340 90";
const dead = "M50 90 L340 90 C340 22 150 22 150 90 L340 90 C340 22 150 22 150 90 L340 90 L350 188";

function Message({ path, dur, begin, fill }: { path: string; dur: number; begin: number; fill: string }) {
  return (
    <rect x="-7" y="-7" width="14" height="14" rx="3" fill={fill} opacity="0">
      <animateMotion path={path} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.06;0.92;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </rect>
  );
}

export function QueueFlow() {
  const ref = useSvgPlayback();

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 220"
      className="w-full font-mono"
      role="img"
      aria-label="Схема: события проходят через RabbitMQ в сервис уведомлений, неудачные повторяются и попадают в dead-letter очередь"
    >
      <defs>
        <marker id="queue-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 10 5 0 10z" fill="var(--color-gopher-ink)" />
        </marker>
      </defs>

      <path d="M90 90H120M280 90H310" stroke="var(--color-line)" strokeWidth="2" />
      <path
        d="M350 70C350 18 150 18 150 64"
        fill="none"
        stroke="var(--color-gopher-ink)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        markerEnd="url(#queue-arrow)"
      />
      <text x="250" y="26" textAnchor="middle" fontSize="12" fill="var(--color-gopher-ink)">
        retry × 3
      </text>
      <path d="M350 110V168" stroke="var(--color-faint)" strokeWidth="1.5" strokeDasharray="4 4" />

      <rect x="10" y="70" width="80" height="40" rx="10" fill="var(--color-mist)" />
      <text x="50" y="94" textAnchor="middle" fontSize="12" fill="var(--color-ink)">
        события
      </text>

      <text x="200" y="58" textAnchor="middle" fontSize="12" fill="var(--color-muted)">
        RabbitMQ
      </text>
      <rect x="120" y="66" width="160" height="48" rx="12" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path d="M152 74V106M184 74V106M216 74V106M248 74V106" stroke="var(--color-line)" strokeWidth="1.5" />

      <rect x="310" y="70" width="80" height="40" rx="10" fill="var(--color-ink)" />
      <text x="350" y="94" textAnchor="middle" fontSize="12" fill="var(--color-paper)">
        notify
      </text>

      <rect
        x="318"
        y="168"
        width="64"
        height="40"
        rx="10"
        fill="var(--color-gopher-soft)"
        stroke="var(--color-gopher-ink)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <text x="306" y="192" textAnchor="end" fontSize="12" fill="var(--color-gopher-ink)">
        DLQ · сохранено
      </text>

      {[0, 0.75, 1.5, 2.25].map((offset) => (
        <Message key={offset} path={main} dur={3} begin={-offset} fill="var(--color-ink)" />
      ))}
      <Message path={retry} dur={5.5} begin={-1} fill="var(--color-gopher)" />
      <Message path={dead} dur={8} begin={-4} fill="var(--color-gopher-ink)" />
    </svg>
  );
}
