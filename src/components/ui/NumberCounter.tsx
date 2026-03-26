"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface NumberCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

/** Ease-out cubic: fast start, slow finish */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates a number from 0 → `end` once the element enters the viewport.
 * Renders a single <span>; caller handles surrounding markup.
 */
export function NumberCounter({
  end,
  duration = 2000,
  suffix = "",
}: NumberCounterProps) {
  const [value, setValue] = useState(0);
  const spanRef    = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);         // fire exactly once
  const rafRef     = useRef<number>(0);

  const runAnimation = useCallback(() => {
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);

      setValue(Math.round(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [end, duration]);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const [entry] = entries;
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        observer.disconnect();
        runAnimation();
      }
    },
    [runAnimation]
  );

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2, // trigger when 20% of the element is visible
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [observerCallback]);

  return (
    <span ref={spanRef}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
