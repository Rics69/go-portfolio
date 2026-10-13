"use client";

import { useEffect, useRef, useState } from "react";
import { endpoint } from "@/components/api/api-terminal";
import { useContact } from "@/components/contact/contact-modal";
import { apiProfile, commits, goMod, links, profile } from "@/content/profile";
import { formatJson } from "@/lib/json";

type Line = { kind: "input" | "output" | "accent" | "muted"; text: string };

const prompt = "guest@danil:~$";

const commands: [string, string][] = [
  ["help", "список команд"],
  ["whoami", "кто я"],
  ["skills", "основной стек"],
  ["experience", "опыт в одну строку на место"],
  ["contact", "как со мной связаться"],
  ["curl /api/v1/me", "профиль в JSON"],
  ["sudo hire danil", "сделать оффер"],
  ["clear", "очистить экран"],
];

const intro: Line[] = [
  { kind: "accent", text: "danil-shell 1.0 · Go backend edition" },
  { kind: "muted", text: "Наберите help, чтобы увидеть команды." },
];

const suggestions = ["help", "whoami", "skills", "sudo hire danil"];

const out = (text: string): Line => ({ kind: "output", text });
const accent = (text: string): Line => ({ kind: "accent", text });
const muted = (text: string): Line => ({ kind: "muted", text });

function respond(input: string): Line[] | null {
  const [cmd, ...rest] = input.split(/\s+/);
  const args = rest.join(" ");

  switch (cmd) {
    case "help":
      return commands.map(([name, text]) => out(`${name.padEnd(17)}${text}`));
    case "whoami":
      return [accent(`${profile.name} — ${profile.role}`), out(profile.tagline.join(" "))];
    case "skills":
    case "stack":
      return goMod.map((block) => out(`${block.title.padEnd(10)}${block.modules.map((m) => m.name).join(", ")}`));
    case "experience":
    case "git":
      return commits.map((c) => out(`${c.hash}  ${c.company} — ${c.role}`));
    case "contact":
      return [
        out(`telegram  ${links.telegram}`),
        out(`email     ${profile.contacts.email}`),
        out(`github    ${links.github}`),
      ];
    case "sudo":
      return args === "hire danil"
        ? [muted("[sudo] пароль для recruiter: ********"), accent("✓ Отличный выбор. Открываю контакты…")]
        : [out("usage: sudo hire danil")];
    case "go":
      return args === "run ." ? [accent("Hello, recruiter! Сборка прошла, тесты зелёные.")] : [out("usage: go run .")];
    case "ping":
      return [out("PONG · 1 мс · потери 0%")];
    case "date":
      return [out(new Date().toLocaleString("ru-RU", { timeZone: profile.timeZone }) + " МСК")];
    case "rm":
      return [out("rm: отказано. Прод не трогаем.")];
    case "exit":
      return [out("Отсюда не выходят — лучше наберите contact.")];
    default:
      return null;
  }
}

export function Shell() {
  const contact = useContact();
  const [lines, setLines] = useState<Line[]>(intro);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest output in view without scrolling the page itself.
  useEffect(() => {
    const screen = screenRef.current;
    if (screen) screen.scrollTop = screen.scrollHeight;
  }, [lines]);

  const run = async (raw: string) => {
    const input = raw.trim();
    setValue("");
    setHistoryIndex(-1);
    if (!input) {
      setLines((current) => [...current, { kind: "input", text: "" }]);
      return;
    }
    setHistory((current) => [...current, input]);

    if (input === "clear") {
      setLines([]);
      return;
    }

    setLines((current) => [...current, { kind: "input", text: input }]);

    const [cmd, ...args] = input.split(/\s+/);
    if (cmd === "curl") {
      if (args.length && !args.some((arg) => arg.includes("api/v1/me"))) {
        setLines((current) => [...current, out("usage: curl /api/v1/me")]);
        return;
      }
      const started = performance.now();
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        const data: unknown = await res.json();
        const ms = Math.max(1, Math.round(performance.now() - started));
        setLines((current) => [
          ...current,
          muted(`HTTP ${res.status} · ${ms} мс`),
          ...formatJson(data).split("\n").map(out),
        ]);
      } catch {
        setLines((current) => [...current, ...formatJson(apiProfile).split("\n").map(out)]);
      }
      return;
    }

    const response = respond(input);
    setLines((current) => [
      ...current,
      ...(response ?? [out(`команда не найдена: ${cmd}. Наберите help`)]),
    ]);
    if (input === "sudo hire danil") window.setTimeout(contact.open, 900);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void run(value);
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      if (!history.length) return;
      event.preventDefault();
      const next =
        event.key === "ArrowUp"
          ? historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1)
          : historyIndex === -1
            ? -1
            : historyIndex + 1;
      const index = next >= history.length ? -1 : next;
      setHistoryIndex(index);
      setValue(index === -1 ? "" : history[index]);
    } else if (event.key === "Tab") {
      const match = commands.map(([name]) => name).filter((name) => name.startsWith(value) && value);
      if (match.length === 1) {
        event.preventDefault();
        setValue(match[0]);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex h-[440px] flex-col overflow-hidden rounded-card bg-ink text-paper shadow-[0_32px_64px_-16px_rgba(0,0,0,0.25)] sm:h-[480px]"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="size-3 rounded-full bg-white/15" />
          <span className="size-3 rounded-full bg-white/15" />
          <span className="size-3 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-[14px] text-white/50">danil-shell</span>
        </div>

        <div
          ref={screenRef}
          role="log"
          aria-live="polite"
          aria-label="Вывод терминала"
          className="flex-1 overflow-y-auto p-5 font-mono text-[14px] leading-[1.75] sm:p-6 sm:text-[15px]"
        >
          {lines.map((line, i) => (
            <p key={i} className={`whitespace-pre-wrap break-words ${lineTone[line.kind]}`}>
              {line.kind === "input" ? (
                <>
                  <span className="text-gopher">{prompt}</span> {line.text}
                </>
              ) : (
                line.text
              )}
            </p>
          ))}

          <label className="flex items-baseline gap-2">
            <span className="shrink-0 text-gopher">{prompt}</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Команда терминала"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent font-mono text-base text-paper caret-gopher outline-none"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => void run(command)}
            className="min-h-10 rounded-full bg-mist px-4 font-mono text-[14px] text-ink-soft transition-colors hover:bg-line"
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}

const lineTone: Record<Line["kind"], string> = {
  input: "text-paper",
  output: "text-white/80",
  accent: "text-gopher",
  muted: "text-white/45",
};
