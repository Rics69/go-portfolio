"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useContact } from "@/components/contact/contact-modal";
import { ArrowIcon, EnterIcon, SoundIcon } from "@/components/ui/icons";
import { heroKeys, type HeroKey, type KeyAction, type KeyTone } from "@/content/profile";
import { playKeySound, soundStore } from "@/lib/key-sound";

// Grid of 11 half-unit columns: BACK on top, END shifted half a key right, tall Enter.
const areas: Record<string, string> = {
  KeyB: "1 / 1 / 2 / 3",
  KeyA: "1 / 3 / 2 / 5",
  KeyC: "1 / 5 / 2 / 7",
  KeyK: "1 / 7 / 2 / 9",
  Enter: "1 / 9 / 3 / 12",
  KeyE: "2 / 2 / 3 / 4",
  KeyN: "2 / 4 / 3 / 6",
  KeyD: "2 / 6 / 3 / 8",
};

const tones: Record<KeyTone, React.CSSProperties> = {
  paper: { "--face": "#ffffff", "--rim": "#efefef", "--skirt": "#d4d4d4", "--legend": "#0a0a0a" } as React.CSSProperties,
  mist: { "--face": "#ececec", "--rim": "#dddddd", "--skirt": "#b8b8b8", "--legend": "#0a0a0a" } as React.CSSProperties,
  ink: { "--face": "#2d2d2d", "--rim": "#1a1a1a", "--skirt": "#000000", "--legend": "#ffffff" } as React.CSSProperties,
  gopher: { "--face": "#00add8", "--rim": "#0098bf", "--skirt": "#006f8a", "--legend": "#0a0a0a" } as React.CSSProperties,
};

const letters = heroKeys.filter((key) => key.code !== "Enter").map((key) => key.letter);

export function Keyboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const contact = useContact();
  const soundOn = useSyncExternalStore(soundStore.subscribe, soundStore.get, soundStore.getServer);
  const [pressed, setPressed] = useState<string | null>(null);
  const pressedRef = useRef<string | null>(null);

  const press = useCallback((code: string, sound = true) => {
    pressedRef.current = code;
    setPressed(code);
    if (sound) playKeySound("down");
  }, []);

  const release = useCallback((sound = true) => {
    if (pressedRef.current && sound) playKeySound("up");
    pressedRef.current = null;
    setPressed(null);
  }, []);

  const run = useCallback(
    (action: KeyAction) => {
      if (action.type === "scroll") {
        document.getElementById(action.id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      } else if (action.type === "link") {
        window.open(action.href, "_blank", "noopener,noreferrer");
      } else {
        contact.open();
      }
    },
    [contact, reduce],
  );

  // Types B-A-C-K-E-N-D once after the keys land, to hint that they are pressable.
  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    heroKeys.forEach((key, i) => {
      timers.push(window.setTimeout(() => press(key.code, false), 2300 + i * 150));
      timers.push(window.setTimeout(() => release(false), 2300 + i * 150 + 110));
    });
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [press, release, reduce]);

  // Physical keyboard: only while the keyboard is on screen and the dialog is closed.
  useEffect(() => {
    if (!inView || contact.isOpen) return;

    const byCode = new Map(heroKeys.map((key) => [key.code, key]));
    const find = (code: string) => byCode.get(code === "NumpadEnter" ? "Enter" : code);
    const isTyping = (target: EventTarget | null) =>
      target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

    const onKeyDown = (event: KeyboardEvent) => {
      const key = find(event.code);
      if (!key || event.repeat || event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;
      // Enter on a focused link or button must keep its native meaning.
      if (key.code === "Enter" && event.target !== document.body) return;
      event.preventDefault();
      press(key.code);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const key = find(event.code);
      if (!key || pressedRef.current !== key.code) return;
      release();
      run(key.action);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [inView, contact.isOpen, press, release, run]);

  return (
    <div ref={ref} className="flex w-full flex-col items-center">
      <div
        role="group"
        aria-label="Навигация-клавиатура"
        className="@container grid w-full max-w-[680px] grid-cols-[repeat(11,minmax(0,1fr))] gap-[1.6cqw] [--depth:1.5cqw]"
      >
        {heroKeys.map((key, i) => (
          <Key
            key={key.code}
            data={key}
            index={i}
            pressed={pressed === key.code}
            onPress={() => press(key.code)}
            onRelease={() => release()}
            onActivate={() => run(key.action)}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] text-muted"
      >
        <span>
          Нажмите на клавишу
          <span className="hidden [@media(pointer:fine)]:inline">
            {" "}
            или на своей клавиатуре: <kbd className="font-mono text-ink-soft">{letters.join(" ")}</kbd>,{" "}
            <kbd className="font-mono text-ink-soft">Enter</kbd>
          </span>
        </span>
        <button
          type="button"
          aria-pressed={soundOn}
          onClick={() => soundStore.set(!soundOn)}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 font-medium text-ink-soft ring-1 ring-line transition-colors hover:bg-mist"
        >
          <SoundIcon muted={!soundOn} className="size-4" />
          {soundOn ? "Звук вкл" : "Звук выкл"}
        </button>
      </motion.div>
    </div>
  );
}

type KeyProps = {
  data: HeroKey;
  index: number;
  pressed: boolean;
  onPress: () => void;
  onRelease: () => void;
  onActivate: () => void;
};

function Key({ data, index, pressed, onPress, onRelease, onActivate }: KeyProps) {
  const isEnter = data.code === "Enter";
  const external = data.action.type === "link";

  return (
    <motion.button
      type="button"
      aria-label={`${data.letter} — ${data.label}${external ? " (откроется в новой вкладке)" : ""}`}
      aria-keyshortcuts={data.letter === "Enter" ? "Enter" : data.letter}
      style={{ gridArea: areas[data.code], ...tones[data.tone] }}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 22, delay: 1.2 + index * 0.06 }}
      onPointerDown={onPress}
      onPointerUp={onRelease}
      onPointerLeave={() => {
        if (pressed) onRelease();
      }}
      onClick={onActivate}
      className={`group relative w-full cursor-pointer touch-manipulation select-none [-webkit-tap-highlight-color:transparent] focus-visible:outline-none ${
        isEnter ? "" : "aspect-square"
      }`}
    >
      {/* Skirt: the side of the keycap that shows below the top. */}
      <span className="absolute inset-x-0 top-[var(--depth)] bottom-0 rounded-[2.2cqw] border-2 border-ink bg-[var(--skirt)]" />
      <span
        className={`absolute inset-x-0 top-0 bottom-[var(--depth)] rounded-[2.2cqw] border-2 border-ink bg-[var(--rim)] transition-transform duration-100 ease-out group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-gopher-ink ${
          pressed ? "translate-y-[calc(var(--depth)*0.8)]" : "group-hover:-translate-y-[0.4cqw]"
        }`}
      >
        <span className="absolute inset-x-[0.8cqw] top-[0.5cqw] bottom-[1.3cqw] flex flex-col justify-between overflow-hidden rounded-[1.6cqw] bg-[var(--face)] p-[1.1cqw] text-left text-[var(--legend)]">
          {isEnter ? (
            <EnterIcon className="size-[5.5cqw]" />
          ) : (
            <span className="text-[5.4cqw] leading-none font-extrabold tracking-tight">{data.letter}</span>
          )}
          <span className="flex items-end justify-between gap-1 text-[clamp(9px,1.55cqw,13px)] leading-tight font-semibold uppercase">
            {data.label}
            {external && <ArrowIcon direction="out" className="size-[1.6cqw] min-h-2.5 min-w-2.5 shrink-0" />}
          </span>
        </span>
      </span>
    </motion.button>
  );
}
