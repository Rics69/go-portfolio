"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Each field of the API response lights up together with the piece of UI it feeds.
const fields = [
  { key: "name", value: '"Рюкзак 24L"' },
  { key: "price", value: "4990" },
  { key: "in_stock", value: "true" },
];

export function ApiContract() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % fields.length), 1400);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const ring = (i: number) =>
    `rounded-lg transition-[box-shadow,background-color] duration-300 ${
      active === i ? "bg-gopher-soft shadow-[0_0_0_2px_var(--color-gopher)]" : "shadow-[0_0_0_2px_transparent]"
    }`;

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-5 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <pre className="overflow-hidden font-mono text-[13px] leading-[1.9] whitespace-pre">
        <span className="text-faint">{"{"}</span>
        {fields.map((field, i) => (
          <span key={field.key} className={`block px-1 ${ring(i)}`}>
            {"  "}
            <span className="text-gopher-ink">&quot;{field.key}&quot;</span>
            <span className="text-faint">: </span>
            {field.value}
            {i < fields.length - 1 && <span className="text-faint">,</span>}
          </span>
        ))}
        <span className="text-faint">{"}"}</span>
      </pre>

      <div className="rounded-2xl bg-paper p-3 shadow-float ring-1 ring-black/5">
        <div aria-hidden="true" className="flex aspect-[4/3] items-end justify-center rounded-xl bg-mist pb-3">
          <span className="h-16 w-12 rounded-t-[20px] rounded-b-lg bg-line" />
        </div>
        <p className={`mt-3 px-1 text-[15px] leading-snug font-semibold ${ring(0)}`}>Рюкзак 24L</p>
        <p className={`mt-1 px-1 text-[15px] text-ink-soft ${ring(1)}`}>4 990 ₽</p>
        <span
          className={`mt-3 flex min-h-9 items-center justify-center rounded-full bg-ink text-[14px] font-semibold text-paper transition-shadow duration-300 ${
            active === 2 ? "shadow-[0_0_0_3px_var(--color-gopher)]" : ""
          }`}
        >
          В корзину
        </span>
      </div>
    </div>
  );
}
