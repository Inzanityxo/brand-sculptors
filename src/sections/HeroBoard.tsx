"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { StickyNote, type NoteTone } from "@/components/bits";
import { en } from "@/content/en";
import { gsap, PIN_PRIORITY, prefersReducedMotion, refreshPins } from "@/lib/motion";
import { HeroButtons } from "./HeroShared";

type Item = {
  kind: "note" | "shot" | "tree" | "pipe" | "photo";
  text?: string;
  tone?: NoteTone;
  // loose position (% of hero), ordered position (% of hero), rotation, parallax depth
  loose: [number, number, number];
  order: [number, number, number];
  depth: number;
};

const w = en.hero.boardWords;
const ITEMS: Item[] = [
  { kind: "note", text: w.human[0], tone: "warm", loose: [8, 18, -8], order: [4, 18, -2], depth: 0.6 },
  { kind: "note", text: w.human[1], tone: "warm2", loose: [22, 64, 6], order: [4, 40, 2], depth: 1 },
  { kind: "note", text: w.human[2], tone: "warm", loose: [36, 12, 10], order: [4, 62, -1], depth: 0.4 },
  { kind: "note", text: w.human[3], tone: "warm2", loose: [12, 80, -4], order: [13, 29, 3], depth: 0.8 },
  { kind: "note", text: w.human[4], tone: "warm", loose: [46, 74, -9], order: [13, 51, -2], depth: 0.5 },
  { kind: "note", text: w.system[0], tone: "cool", loose: [62, 16, 7], order: [78, 18, 2], depth: 0.7 },
  { kind: "note", text: w.system[1], tone: "cool2", loose: [84, 30, -6], order: [87, 29, -2], depth: 0.5 },
  { kind: "note", text: w.system[2], tone: "cool3", loose: [70, 58, 9], order: [78, 40, 1], depth: 0.9 },
  { kind: "note", text: w.system[3], tone: "cool", loose: [90, 70, -3], order: [87, 51, 2], depth: 0.6 },
  { kind: "note", text: w.system[4], tone: "cool2", loose: [56, 86, 5], order: [78, 62, -1], depth: 0.4 },
  { kind: "note", text: w.proof[0], tone: "proof", loose: [30, 36, -12], order: [44, 80, -2], depth: 1.1 },
  { kind: "note", text: w.proof[1], tone: "proof", loose: [76, 84, 8], order: [53, 80, 2], depth: 0.7 },
  { kind: "note", text: w.proof[2], tone: "proof", loose: [52, 30, 4], order: [62, 80, -1], depth: 0.9 },
  { kind: "note", text: w.proof[3], tone: "proof", loose: [4, 48, -5], order: [35, 80, 1], depth: 0.6 },
  { kind: "shot", loose: [68, 4, -4], order: [70, 4, 0], depth: 0.3 },
  { kind: "photo", loose: [72, 48, 6], order: [5, 70, -3], depth: 0.35 },
  { kind: "tree", loose: [82, 46, 0], order: [91, 78, 0], depth: 0.25 },
  { kind: "pipe", loose: [26, 88, 0], order: [22, 90, 0], depth: 0.2 },
];

/**
 * Hero B: Living board. A loose Miro canvas with notes, screenshots, a decision tree and a pipe.
 * Notes follow the cursor in parallax. During the first 400px of scroll they snap into an
 * ordered frame around the headline: a messy board becoming a clear plan.
 */
export function HeroBoard() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".hb-item"));
    const reduce = prefersReducedMotion();
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      items.forEach((node, i) => {
        const it = ITEMS[i];
        gsap.set(node, { left: `${it.loose[0]}%`, top: `${it.loose[1]}%`, rotate: it.loose[2] });
      });
      if (reduce) {
        items.forEach((node, i) => {
          const it = ITEMS[i];
          gsap.set(node, { left: `${it.order[0]}%`, top: `${it.order[1]}%`, rotate: it.order[2] });
        });
        return;
      }

      gsap.from(items, {
        autoAlpha: 0,
        scale: 0.85,
        y: 20,
        duration: 0.9,
        ease: "expo.out",
        stagger: { each: 0.04, from: "random" },
        delay: 0.15,
      });
      gsap.from(el.querySelectorAll(".hb-copy > *"), {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.5,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          refreshPriority: PIN_PRIORITY.heroBoard,
          start: "top top",
          end: "+=400",
          scrub: 0.6,
          pin: !isMobile,
        },
      });
      items.forEach((node, i) => {
        const it = ITEMS[i];
        tl.to(node, { left: `${it.order[0]}%`, top: `${it.order[1]}%`, rotate: it.order[2], ease: "power2.inOut" }, 0);
      });
      tl.to(el.querySelector(".hb-frame"), { autoAlpha: 1, scale: 1, ease: "power2.out" }, 0.4);
    }, el);

    const layers = items.map((n) => n.querySelector<HTMLElement>(".hb-par")!);
    const onMove = (e: PointerEvent) => {
      if (reduce || e.pointerType !== "mouse") return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l, i) => {
        gsap.to(l, { x: -nx * 36 * ITEMS[i].depth, y: -ny * 28 * ITEMS[i].depth, duration: 1.2, ease: "power3.out", overwrite: "auto" });
      });
    };
    window.addEventListener("pointermove", onMove);
    refreshPins();
    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="glow-royal dot-grid relative h-[100svh] min-h-[640px] overflow-hidden bg-ink-950 pt-16"
      style={{ "--glow-y": "50%" } as React.CSSProperties}
      aria-label="Introduction"
    >
      <div aria-hidden className="absolute inset-0">
        {ITEMS.map((it, i) => (
          <div key={i} className="hb-item absolute" style={{ left: `${it.loose[0]}%`, top: `${it.loose[1]}%` }}>
            <div className="hb-par">
              {it.kind === "note" && (
                <StickyNote tone={it.tone!} className="w-[100px] text-[13px] sm:w-[118px] sm:text-[14.5px]">
                  {it.text}
                </StickyNote>
              )}
              {it.kind === "shot" && (
                <div className="hidden w-[170px] rounded-[5px] border border-paper/60 bg-ink-800 p-1.5 shadow-2xl sm:block">
                  <div className="data-grid h-[96px] rounded-[2px] bg-ink-900">
                    <div className="flex h-full items-end gap-1.5 p-3">
                      {[30, 44, 38, 62, 70, 88].map((h, j) => (
                        <span key={j} className="block w-3 rounded-sm bg-royal-glow/70" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {it.kind === "photo" && (
                <div className="relative w-[110px] bg-paper p-2 pb-7 shadow-2xl sm:w-[150px]">
                  <div className="relative aspect-square">
                    <Image src="/marco/headshot.png" alt="Marco Bednarz" fill sizes="160px" className="object-cover" priority />
                  </div>
                  <span className="absolute bottom-1 left-0 right-0 text-center font-mono text-[11px] tracking-[0.16em] text-note-ink">MARCO</span>
                </div>
              )}
              {it.kind === "tree" && (
                <svg width="110" height="90" viewBox="0 0 110 90" className="hidden text-paper/50 sm:block">
                  <circle cx="55" cy="10" r="6" fill="none" stroke="currentColor" />
                  <path d="M55 16 L25 50 M55 16 L85 50" stroke="currentColor" fill="none" />
                  <rect x="12" y="50" width="26" height="16" rx="3" fill="none" stroke="currentColor" />
                  <rect x="72" y="50" width="26" height="16" rx="3" fill="none" stroke="#4B48FF" />
                  <path d="M85 66 L85 82" stroke="#4B48FF" />
                  <circle cx="85" cy="85" r="3" fill="#FFCC4D" />
                </svg>
              )}
              {it.kind === "pipe" && (
                <svg width="180" height="60" viewBox="0 0 180 60" className="hidden text-paper/45 sm:block">
                  <path d="M0 10 C40 10 60 26 90 26 C120 26 140 10 180 10 M0 50 C40 50 60 34 90 34 C120 34 140 50 180 50" stroke="currentColor" fill="none" />
                  {[20, 60, 100, 140].map((x) => (
                    <circle key={x} cx={x} cy="30" r="2.5" fill={x < 90 ? "#FF9A76" : "#FFCC4D"} />
                  ))}
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="hb-frame pointer-events-none absolute inset-x-[22%] inset-y-[16%] hidden scale-95 rounded-[28px] border border-royal-soft/25 opacity-0 lg:block" aria-hidden />

      <div className="relative z-10 flex h-full items-center justify-center px-5">
        <div className="hb-copy mx-auto max-w-[900px] rounded-[28px] bg-ink-950/55 px-4 py-8 text-center backdrop-blur-[6px] sm:px-10">
          <p className="eyebrow">{en.hero.eyebrow}</p>
          <p className="mt-2 font-mono text-[13px] text-muted">{en.hero.footnote}</p>
          <h1 className="h1 mt-6 text-[clamp(38px,5vw,80px)] text-paper">
            {en.hero.h1.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h1>
          <p className="lede mx-auto mt-6 max-w-[34rem]">{en.hero.sub}</p>
          <HeroButtons className="mt-8 justify-center" />
        </div>
      </div>
    </section>
  );
}
