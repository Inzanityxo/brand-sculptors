"use client";

import { useEffect, useRef, useState } from "react";
import { PixelBar } from "@/components/bits";
import { en } from "@/content/en";
import { gsap, prefersReducedMotion, useReducedMotionPref } from "@/lib/motion";
import { play } from "@/lib/sound";
import { HeroButtons, PortraitChip } from "./HeroShared";
import { HeroVisual } from "./HeroVisual";

const STEPS = [18, 12, 8, 5, 3, 2];
const STEP_MS = 230;

/**
 * Hero C: Pixel to premium. The headline starts as a low-resolution 8-bit render with a pixel bar
 * at 3 %. After 1.5 seconds or on the first scroll, the resolution climbs in visible steps until
 * the crisp hero remains and the bar turns into a thin royal line that fills to 100 %.
 * The pixel steps are drawn on a canvas over the real headline, using its font and line breaks.
 */
export function HeroPixel() {
  const root = useRef<HTMLElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotionPref();
  const [step, setStep] = useState(0);
  const [doneLive, setDone] = useState(false);
  const [barLive, setBar] = useState(0.03);
  const done = reduce || doneLive;
  const bar = reduce ? 1 : barLive;

  // draw the current pixel step
  useEffect(() => {
    if (done) return;
    const c = canvas.current;
    const t = h1.current;
    if (!c || !t) return;
    const draw = () => {
      const r = t.getBoundingClientRect();
      const block = STEPS[step];
      const w = Math.max(1, Math.round(r.width / block));
      const h = Math.max(1, Math.round(r.height / block));
      c.width = w;
      c.height = h;
      c.style.width = `${r.width}px`;
      c.style.height = `${r.height}px`;
      const ctx = c.getContext("2d")!;
      ctx.clearRect(0, 0, w, h);
      const cs = getComputedStyle(t);
      const scale = w / r.width;
      const fontPx = parseFloat(cs.fontSize);
      const lineH = (parseFloat(cs.lineHeight) || fontPx) * scale;
      ctx.font = `${cs.fontWeight} ${fontPx * scale}px ${cs.fontFamily}`;
      ctx.fillStyle = "#F4F1EA";
      ctx.textBaseline = "alphabetic";
      // keep the real line breaks: each span is a line, wrapped again only if it overflows
      const lines: string[] = [];
      t.querySelectorAll<HTMLElement>(".hp-line").forEach((span) => {
        const words = (span.textContent ?? "").split(" ");
        let cur = "";
        for (const word of words) {
          const next = cur ? `${cur} ${word}` : word;
          if (ctx.measureText(next).width > w && cur) {
            lines.push(cur);
            cur = word;
          } else cur = next;
        }
        if (cur) lines.push(cur);
      });
      lines.forEach((line, i) => ctx.fillText(line, 0, lineH * (i + 0.8)));
      // hard 8-bit edges on the coarse steps: every pixel is either on or off
      if (block >= 5) {
        const img = ctx.getImageData(0, 0, w, h);
        for (let i = 3; i < img.data.length; i += 4) img.data[i] = img.data[i] > 90 ? 255 : 0;
        ctx.putImageData(img, 0, 0);
      }
    };
    void document.fonts.ready.then(draw);
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [step, done]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let started = false;
    const timers: number[] = [];
    const start = () => {
      if (started) return;
      started = true;
      play("whoosh");
      STEPS.forEach((_, i) => timers.push(window.setTimeout(() => setStep(i), i * STEP_MS)));
      timers.push(window.setTimeout(() => setDone(true), STEPS.length * STEP_MS));
      const p = { v: 0.03 };
      gsap.to(p, { v: 1, duration: 1.9, ease: "power2.inOut", onUpdate: () => setBar(p.v) });
    };
    timers.push(window.setTimeout(start, 1500));
    window.addEventListener("wheel", start, { passive: true });
    window.addEventListener("touchmove", start, { passive: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", start);
      window.removeEventListener("touchmove", start);
    };
  }, []);

  useEffect(() => {
    if (!done || !root.current || prefersReducedMotion()) return;
    gsap.fromTo(
      root.current.querySelectorAll(".hp-rise"),
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.08 },
    );
  }, [done]);

  return (
    <section
      ref={root}
      className="glow-royal relative flex min-h-[100svh] items-center overflow-hidden pt-16"
      style={{ "--glow-y": "50%" } as React.CSSProperties}
      aria-label="Introduction"
    >
      <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div>
          <PortraitChip className="mb-8 lg:hidden" />
          <p className={`eyebrow ${done ? "" : "pixel"}`}>{en.hero.eyebrow}</p>
          <div className="relative mt-8">
            <h1 ref={h1} className="h1 text-[clamp(35px,4.5vw,72px)] text-paper" style={{ opacity: done ? 1 : 0 }}>
              {en.hero.h1.map((l, i) => (
                <span key={i} className="hp-line block">
                  {l}
                </span>
              ))}
            </h1>
            {!done && (
              <canvas ref={canvas} aria-hidden className="pointer-events-none absolute left-0 top-0" style={{ imageRendering: "pixelated" }} />
            )}
          </div>

          <div className="mt-10 h-8">
            {!done ? (
              <PixelBar label={en.hero.pixelBarLabel} value={bar} />
            ) : (
              <div className="flex max-w-[420px] items-center gap-4">
                <span className="font-mono text-[11px] tracking-[0.2em] text-royal-soft">{en.hero.pixelBarLabel}</span>
                <span className="relative h-px flex-1 bg-paper/10">
                  <span className="absolute inset-y-0 left-0 bg-royal-glow shadow-[0_0_12px_rgba(75,72,255,.9)]" style={{ width: `${bar * 100}%` }} />
                </span>
                <span className="font-mono text-[11px] text-muted tabular-nums">{Math.round(bar * 100)}%</span>
              </div>
            )}
          </div>

          <div style={{ opacity: done ? 1 : 0 }}>
            <p className="hp-rise lede mt-6 max-w-[38rem]">{en.hero.sub}</p>
            <div className="hp-rise mt-10">
              <HeroButtons />
            </div>
          </div>
        </div>
        <div className="px-6 sm:px-14 lg:px-6">
          <HeroVisual startDelay={reduce ? 0 : 1500 + STEPS.length * STEP_MS} />
        </div>
      </div>
    </section>
  );
}
