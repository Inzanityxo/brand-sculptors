"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { play } from "@/lib/sound";
import { en } from "@/content/en";

export const GO_EVENT = "bs:go";

/** Fire the hidden GO mode from anywhere (the footer rocket uses this). */
export function triggerGo() {
  window.dispatchEvent(new Event(GO_EVENT));
}

/**
 * Hidden 8-bit mode. Press G three times, or click the pixel rocket in the footer.
 * Works through a root data attribute and CSS variables only, no component re-renders.
 */
export function GoMode() {
  const [active, setActive] = useState(false);
  const timer = useRef<number | null>(null);
  const presses = useRef<number[]>([]);

  const start = useCallback(() => {
    const root = document.documentElement;
    root.dataset.go = "on";
    setActive(true);
    play("jingle");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      delete root.dataset.go;
      setActive(false);
    }, 8000);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key.toLowerCase() !== "g" || e.metaKey || e.ctrlKey || e.altKey) return;
      const now = performance.now();
      presses.current = [...presses.current.filter((p) => now - p < 1200), now];
      if (presses.current.length >= 3) {
        presses.current = [];
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(GO_EVENT, start);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(GO_EVENT, start);
    };
  }, [start]);

  if (!active) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-20 z-[80] flex justify-center"
    >
      <div className="pixel bg-spark px-6 py-3 text-2xl text-note-ink shadow-[6px_6px_0_0_#1210A1] sm:text-4xl">
        {en.go.banner}
      </div>
    </div>
  );
}
