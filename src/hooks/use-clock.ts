"use client";

import { useSyncExternalStore } from "react";

const formatters = new Map<string, Intl.DateTimeFormat>();

function format(timeZone: string) {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", timeZone });
    formatters.set(timeZone, formatter);
  }
  return formatter.format(new Date());
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

// Current HH:MM in the given zone; a placeholder during prerender avoids a hydration mismatch.
export function useClock(timeZone: string) {
  return useSyncExternalStore(
    subscribe,
    () => format(timeZone),
    () => "--:--",
  );
}
