"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// The current host (e.g. rics69.github.io), with a stable placeholder during prerender.
export function useHost() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.host,
    () => "localhost:3000",
  );
}
