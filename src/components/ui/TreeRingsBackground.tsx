"use client";

import { useEffect, useState } from "react";

interface RingConfig {
  r: number;
  rxMult: number;
  sw: number;
  maxOpacity: number;
  threshold: number;
  dasharray: string;
  seed: number;
}

const RINGS: RingConfig[] = [
  { r: 22,  rxMult: 1.12, sw: 2.8, maxOpacity: 0.26, threshold: -0.6, dasharray: "1000 0",            seed: 1  },
  { r: 42,  rxMult: 1.10, sw: 2.5, maxOpacity: 0.24, threshold: -0.4, dasharray: "1000 0",            seed: 2  },
  { r: 64,  rxMult: 1.10, sw: 2.2, maxOpacity: 0.22, threshold: -0.1, dasharray: "300 1.5",           seed: 3  },
  { r: 88,  rxMult: 1.09, sw: 2.0, maxOpacity: 0.20, threshold: 0.06, dasharray: "200 1.5",           seed: 4  },
  { r: 114, rxMult: 1.08, sw: 1.8, maxOpacity: 0.18, threshold: 0.15, dasharray: "90 2 70 1.5",       seed: 5  },
  { r: 142, rxMult: 1.08, sw: 1.7, maxOpacity: 0.17, threshold: 0.23, dasharray: "80 2 60 1.5",       seed: 6  },
  { r: 172, rxMult: 1.07, sw: 1.55,maxOpacity: 0.15, threshold: 0.31, dasharray: "65 2.5 50 2",       seed: 7  },
  { r: 204, rxMult: 1.07, sw: 1.45,maxOpacity: 0.14, threshold: 0.39, dasharray: "55 2.5 45 2",       seed: 8  },
  { r: 238, rxMult: 1.06, sw: 1.35,maxOpacity: 0.13, threshold: 0.47, dasharray: "45 3 38 2.5 58 2",  seed: 9  },
  { r: 274, rxMult: 1.06, sw: 1.25,maxOpacity: 0.12, threshold: 0.54, dasharray: "38 3.5 30 3 48 2.5",seed: 10 },
  { r: 312, rxMult: 1.05, sw: 1.15,maxOpacity: 0.11, threshold: 0.61, dasharray: "32 4 25 3 42 3",    seed: 11 },
  { r: 352, rxMult: 1.05, sw: 1.05,maxOpacity: 0.10, threshold: 0.68, dasharray: "26 4.5 20 4 35 3.5",seed: 12 },
  { r: 394, rxMult: 1.04, sw: 0.95,maxOpacity: 0.09, threshold: 0.75, dasharray: "20 5.5 16 4.5 28 4",seed: 13 },
  { r: 438, rxMult: 1.04, sw: 0.85,maxOpacity: 0.08, threshold: 0.82, dasharray: "16 6 12 5 22 5",    seed: 14 },
];

function imperfectPath(cx: number, cy: number, rx: number, ry: number, seed: number): string {
  const N = 120;
  const cmds: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const f1 = Math.sin(seed * 7.391 + t * 3.1)  * 0.022;
    const f2 = Math.sin(seed * 3.157 + t * 7.3)  * 0.011;
    const f3 = Math.cos(seed * 11.23 + t * 1.7)  * 0.007;
    const f4 = Math.sin(seed * 5.831 + t * 13.1) * 0.004;
    const bump = 1 + f1 + f2 + f3 + f4;
    const x = (cx + Math.cos(t) * rx * bump).toFixed(2);
    const y = (cy + Math.sin(t) * ry * bump).toFixed(2);
    cmds.push(i === 0 ? `M${x} ${y}` : `L${x} ${y}`);
  }
  return cmds.join(" ") + " Z";
}

// Pre-computed once at module load — pure deterministic math, SSR-safe
const RING_PATHS = RINGS.map((ring) =>
  imperfectPath(560, 320, ring.r * ring.rxMult, ring.r, ring.seed)
);

// Section IDs with light backgrounds (need dark-green rings)
const LIGHT_SECTION_IDS = ["section-tools", "section-services"];

// Height of the fixed SVG in the viewport
const SVG_PX = 700;

export function TreeRingsBackground() {
  const [progress, setProgress]       = useState(0);
  // 0 = fully on dark bg (white rings), 1 = fully on light bg (green rings)
  const [lightFraction, setLightFraction] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;

      // Ring reveal: complete after scrolling ~1 viewport height
      setProgress(Math.min(1, scrollY / (window.innerHeight * 1.05)));

      // The SVG is fixed at top:50%, so its viewport bounds are:
      const ringTop    = window.innerHeight / 2 - SVG_PX / 2;
      const ringBottom = window.innerHeight / 2 + SVG_PX / 2;

      // How much of the SVG height overlaps with any light-bg section
      let lightOverlap = 0;
      for (const id of LIGHT_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const overlapTop    = Math.max(rect.top,    ringTop);
        const overlapBottom = Math.min(rect.bottom, ringBottom);
        if (overlapBottom > overlapTop) {
          lightOverlap += (overlapBottom - overlapTop) / SVG_PX;
        }
      }
      setLightFraction(Math.min(1, lightOverlap));
    };

    window.addEventListener("scroll",            update, { passive: true });
    window.addEventListener("resize",            update, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll",            update);
      window.removeEventListener("resize",            update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return (
    /* Fixed to viewport — this is the parallax: rings stay put while sections scroll */
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 z-[5] h-screen overflow-hidden"
      style={{ right: "-5.5rem", width: `${SVG_PX}px` }}
    >
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2"
        width={SVG_PX}
        height={SVG_PX}
        viewBox="0 0 700 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Group 1: white rings — visible on dark sections ── */}
        <g style={{ opacity: 1 - lightFraction, transition: "opacity 0.6s ease" }}>
          {RINGS.map((ring, i) => {
            const rp = Math.max(0, Math.min(1, (progress - ring.threshold) / 0.12));
            if (rp === 0) return null;
            return (
              <path
                key={`w-${ring.r}`}
                d={RING_PATHS[i]}
                stroke={`rgba(255,255,255,${(rp * ring.maxOpacity).toFixed(3)})`}
                strokeWidth={ring.sw}
                strokeLinecap="round"
                strokeDasharray={ring.dasharray}
                fill="none"
              />
            );
          })}
        </g>

        {/* ── Group 2: dark forest green rings — visible on light sections ── */}
        <g style={{ opacity: lightFraction, transition: "opacity 0.6s ease" }}>
          {RINGS.map((ring, i) => {
            const rp = Math.max(0, Math.min(1, (progress - ring.threshold) / 0.12));
            if (rp === 0) return null;
            return (
              <path
                key={`g-${ring.r}`}
                d={RING_PATHS[i]}
                stroke={`rgba(15,48,20,${(rp * ring.maxOpacity * 2.4).toFixed(3)})`}
                strokeWidth={ring.sw}
                strokeLinecap="round"
                strokeDasharray={ring.dasharray}
                fill="none"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
