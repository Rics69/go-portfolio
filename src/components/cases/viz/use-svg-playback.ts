"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

// SMIL animations keep running off-screen; pause them unless the diagram is visible.
export function useSvgPlayback() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (inView && !reduce) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView, reduce]);

  return ref;
}
