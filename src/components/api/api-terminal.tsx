"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon, ReplayIcon } from "@/components/ui/icons";
import { apiProfile } from "@/content/profile";
import { useHost } from "@/hooks/use-host";
import { formatJson, tokenizeJsonLine, type JsonToken } from "@/lib/json";

export const endpoint = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/v1/me`;

const tokenColor: Record<JsonToken["kind"], string> = {
  key: "text-gopher",
  string: "text-paper",
  literal: "text-[#7fd8ee]",
  punct: "text-white/40",
  space: "",
};

type Response = { lines: string[]; ms: number; ok: boolean };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function ApiTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const host = useHost();

  const [run, setRun] = useState(0);
  const [typed, setTyped] = useState(0);
  const [response, setResponse] = useState<Response | null>(null);
  const [printed, setPrinted] = useState(0);

  const command = `curl -s ${host}${endpoint} | jq`;
  const typing = typed < command.length;
  const done = response !== null && printed >= response.lines.length;

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    (async () => {
      setResponse(null);
      setPrinted(0);

      for (let i = reduce ? command.length : 0; i <= command.length; i++) {
        if (cancelled) return;
        setTyped(i);
        await sleep(24 + Math.random() * 36);
      }
      await sleep(reduce ? 0 : 300);

      // A real request to the static endpoint, so the timing is honest.
      const started = performance.now();
      let data: unknown = apiProfile;
      let ok = false;
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        data = await res.json();
        ok = res.ok;
      } catch {
        // Fall back to the bundled profile when offline.
      }
      if (cancelled) return;

      const lines = formatJson(data).split("\n");
      setResponse({ lines, ok, ms: Math.max(1, Math.round(performance.now() - started)) });

      for (let i = reduce ? lines.length : 1; i <= lines.length; i++) {
        if (cancelled) return;
        setPrinted(i);
        await sleep(55);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, run, reduce, command.length]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-card bg-ink text-left shadow-[0_32px_64px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="size-3 rounded-full bg-white/15" />
        <span className="size-3 rounded-full bg-white/15" />
        <span className="size-3 rounded-full bg-white/15" />
        <span className="ml-2 truncate font-mono text-[14px] text-white/50">danil@kazan: ~</span>
        <a
          href={endpoint}
          target="_blank"
          rel="noreferrer"
          className="ml-auto flex min-h-9 shrink-0 items-center gap-1 rounded-full px-3 font-mono text-[14px] text-white/60 transition-colors hover:bg-white/10 hover:text-paper"
        >
          JSON
          <ArrowIcon direction="out" className="size-3.5" />
        </a>
        <button
          type="button"
          onClick={() => setRun((value) => value + 1)}
          aria-label="Повторить запрос"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-paper"
        >
          <ReplayIcon className="size-4" />
        </button>
      </div>

      <pre
        aria-label="Ответ API с профилем в формате JSON"
        className="min-h-[420px] whitespace-pre-wrap break-words p-4 font-mono text-[14px] leading-[1.75] text-paper sm:min-h-[440px] sm:p-6 sm:text-[15px]"
      >
        <span className="text-gopher">➜</span> <span className="text-white/50">~</span>{" "}
        {command.slice(0, typed)}
        {typing && <Caret />}
        {response && (
          <span className="mt-2 block text-white/40">
            {response.ok ? `# HTTP 200 OK · ${response.ms} мс · application/json` : "# offline · показываю кэш"}
          </span>
        )}
        {response?.lines.slice(0, printed).map((line, i) => (
          <span key={i} className="block">
            {tokenizeJsonLine(line).map((token, j) => (
              <span key={j} className={tokenColor[token.kind]}>
                {token.text}
              </span>
            ))}
          </span>
        ))}
        {done && (
          <span className="mt-2 block">
            <span className="text-gopher">➜</span> <span className="text-white/50">~</span> <Caret />
          </span>
        )}
      </pre>
    </div>
  );
}

function Caret() {
  return <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-gopher" />;
}
