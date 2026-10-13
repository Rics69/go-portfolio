"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Prerender knows the production URL, so the printed command is already correct before hydration.
const siteOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rics69.github.io").origin;

// Full origin with scheme: plain `curl host/...` hits GitHub Pages over http and gets a 301.
export function useOrigin() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    () => siteOrigin,
  );
}
