"use client";

import { ApiTerminal, endpoint } from "@/components/api/api-terminal";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { useCopy } from "@/hooks/use-copy";
import { useHost } from "@/hooks/use-host";

export function ApiSection() {
  const host = useHost();
  const { copied, copy } = useCopy();
  const command = `curl -s ${host}${endpoint}`;

  return (
    <section id="api" className="container-page overflow-x-clip pb-24 md:pb-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          <p className="text-eyebrow text-muted">
            <span className="text-gopher-ink">{"//"}</span> curl me
          </p>
          <h2 className="text-display mt-4 text-[40px] md:text-[56px]">Резюме, которое отвечает на запросы</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Мой профиль — это JSON-эндпоинт. Терминал делает к нему настоящий запрос и показывает реальное время
            ответа. Можно повторить из своей консоли.
          </p>
          <button
            type="button"
            onClick={() => copy(command)}
            aria-label="Скопировать команду curl"
            className="group mt-8 flex min-h-12 w-full max-w-md items-center gap-3 rounded-2xl bg-mist px-4 text-left font-mono text-[14px] transition-colors hover:bg-line"
          >
            <span className="text-gopher-ink">$</span>
            <span className="min-w-0 flex-1 truncate">{command}</span>
            <span className="flex items-center gap-1.5 text-muted group-hover:text-ink">
              {copied ? <CheckIcon className="size-4 text-gopher-ink" /> : <CopyIcon className="size-4" />}
              <span aria-live="polite">{copied ? "скопировано" : "копировать"}</span>
            </span>
          </button>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-x-12 -inset-y-12 bg-[radial-gradient(var(--color-line)_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
          />
          <Reveal delay={0.1} y={48} className="relative">
            <ApiTerminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
