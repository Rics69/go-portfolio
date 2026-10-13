"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// 20×16 sprite, one character per pixel. Facing right like the reference: big slit eye on top,
// open mouth with the tongue out.
const palette: Record<string, string> = {
  K: "#1d1d1d", // outline
  R: "#f05a52", // body
  D: "#c9413b", // scale marks
  Y: "#ffcf3f", // eye
  B: "#141414", // pupil, mouth
  L: "#7593f7", // tongue
};

const idle = [
  "....................",
  "............KKKK....",
  "....KKK....KYYYK....",
  ".KK.KRRKKKKYYYYYK...",
  ".KRKRRRRRRKYBBBBK...",
  ".KRRRRRRRRRKYYYK....",
  "KRRRRRRRRRRRKKKKK...",
  "KRRRRRRRRRRRRRBBB...",
  "KRRRRDRRRRRRRBBBB...",
  ".KRRDRRRRRRRBBBBB...",
  ".KRRDRRRDRRRRBLLLLLK",
  ".KRRRRRDRRRRRRLLLLLK",
  "..KRRRRDRRRRRRRKKKKK",
  "...KRRR....RRRK.....",
  "....KRR....RRK......",
  "....KKK....KKK......",
];

// Frames are the idle sprite with a few rows swapped out.
const frames = {
  idle,
  blink: patch({ 2: "....KKK....KRRRK....", 3: ".KK.KRRKKKKRRRRRK...", 4: ".KRKRRRRRRKKKKKKK...", 5: ".KRRRRRRRRRKRRRK...." }),
  shut: patch({
    7: "KRRRRRRRRRRRRRRRK...",
    8: "KRRRRDRRRRRRRRRRK...",
    9: ".KRRDRRRRRRRKKKKK...",
    10: ".KRRDRRRDRRRRRRRK...",
    11: ".KRRRRRDRRRRRRRRK...",
    12: "..KRRRRDRRRRRRRK....",
  }),
};

type Frame = keyof typeof frames;

function patch(rows: Record<number, string>) {
  return idle.map((row, y) => rows[y] ?? row);
}

const sprites = Object.fromEntries(
  Object.entries(frames).map(([name, rows]) => [
    name,
    rows.flatMap((row, y) =>
      [...row].flatMap((cell, x) => (cell === "." ? [] : [{ x, y, fill: palette[cell] }])),
    ),
  ]),
) as Record<Frame, { x: number; y: number; fill: string }[]>;

// Breathes, blinks now and then and snaps its mouth; hover makes it snap right away.
export function PixelToad({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState<Frame>("idle");
  const [up, setUp] = useState(false);
  const timers = useRef(new Set<number>());

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  }, []);

  // Snaps the mouth shut twice, like it caught something.
  const chomp = useCallback(() => {
    setFrame("shut");
    schedule(() => setFrame("idle"), 200);
    schedule(() => setFrame("shut"), 340);
    schedule(() => setFrame("idle"), 540);
  }, [schedule]);

  useEffect(() => {
    if (reduce) return;
    const breathe = window.setInterval(() => setUp((value) => !value), 700);
    const blink = window.setInterval(() => {
      setFrame((current) => (current === "idle" ? "blink" : current));
      schedule(() => setFrame((current) => (current === "blink" ? "idle" : current)), 140);
    }, 3300);
    const ribbit = window.setInterval(chomp, 7000);
    const pending = timers.current;
    return () => {
      window.clearInterval(breathe);
      window.clearInterval(blink);
      window.clearInterval(ribbit);
      pending.forEach((id) => window.clearTimeout(id));
      pending.clear();
    };
  }, [chomp, reduce, schedule]);

  return (
    <svg
      viewBox="0 -1 20 17"
      aria-hidden="true"
      shapeRendering="crispEdges"
      onMouseEnter={reduce ? undefined : chomp}
      className={className}
    >
      <g transform={up ? "translate(0 -1)" : undefined}>
        {sprites[frame].map((p) => (
          <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width="1" height="1" fill={p.fill} />
        ))}
      </g>
    </svg>
  );
}
