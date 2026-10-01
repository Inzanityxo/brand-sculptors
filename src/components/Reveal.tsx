"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/**
 * Mask-wipe reveal with staggered children.
 * Children marked with data-reveal="line" slide up out of a mask, data-reveal="wipe" uncover
 * left to right, everything else with data-reveal rises softly.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  start = "top 80%",
  stagger = 0.08,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header";
  start?: string;
  stagger?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const lines = root.querySelectorAll<HTMLElement>("[data-reveal='line'] > span");
    const wipes = root.querySelectorAll<HTMLElement>("[data-reveal='wipe']");
    const rises = root.querySelectorAll<HTMLElement>("[data-reveal='rise']");

    if (prefersReducedMotion()) {
      [lines, wipes, rises].forEach((l) => l.length && gsap.set(l, { clearProps: "all" }));
      gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      return;
    }

    if (!lines.length && !wipes.length && !rises.length) return;
    const ctx = gsap.context(() => {
      if (lines.length) gsap.set(lines, { yPercent: 110 });
      if (wipes.length) gsap.set(wipes, { clipPath: "inset(0 100% 0 0)" });
      if (rises.length) gsap.set(rises, { y: 28, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start, once: true },
        defaults: { ease: "expo.out" },
      });
      if (lines.length) tl.to(lines, { yPercent: 0, duration: 0.9, stagger }, 0);
      if (wipes.length) tl.to(wipes, { clipPath: "inset(0 0% 0 0)", duration: 0.9, stagger }, 0.1);
      if (rises.length) tl.to(rises, { y: 0, opacity: 1, duration: 0.8, stagger }, 0.25);
    }, root);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [start, stagger]);

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} id={id}>
      {children}
    </Tag>
  );
}

/** Splits a headline into masked lines. Pass an array for fixed line breaks. */
export function MaskLines({
  lines,
  className = "",
  as: Tag = "h2",
}: {
  lines: readonly string[] | string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const arr = typeof lines === "string" ? [lines] : lines;
  return (
    <Tag className={className}>
      {arr.map((l, i) => (
        <span key={i} className="mask-line" data-reveal="line">
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
