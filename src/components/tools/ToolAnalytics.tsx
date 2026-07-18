"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

function emit(event: string, tool: string) {
  track(event, { tool });
  window.gtag?.("event", event, { tool, event_category: "homeowner_tool" });
}

export function ToolAnalytics({ tool, children }: { tool: string; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new MutationObserver(() => {
      if (!completed.current && node.querySelector("[data-tool-result='true']")) {
        completed.current = true;
        emit("tool_complete", tool);
      }
    });
    observer.observe(node, { subtree: true, childList: true });
    return () => observer.disconnect();
  }, [tool]);

  return <div ref={root} onClickCapture={(event) => {
    if (!started.current) { started.current = true; emit("tool_start", tool); }
    const target = event.target as HTMLElement;
    if (target.closest("a[href*='/contact'],a[href^='mailto:'],button[data-lead-cta='true']")) {
      if (!completed.current) { completed.current = true; emit("tool_complete", tool); }
      emit("tool_cta", tool);
    }
  }}>{children}</div>;
}
