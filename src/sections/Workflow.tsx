"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MaskLines, Reveal } from "@/components/Reveal";
import { en } from "@/content/en";
import { useReducedMotionPref } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const w = en.workflow;
type VisualKey = (typeof w.steps)[number]["visual"];

function Chat({ play }: { play: boolean }) {
  const reduce = useReducedMotionPref();
  const [nLive, setN] = useState(0);
  const n = reduce ? w.chat.length : nLive;
  useEffect(() => {
    if (!play || reduce) return;
    let i = 0;
    let t = 0;
    const step = () => {
      i = i >= w.chat.length ? 0 : i + 1;
      setN(i);
      t = window.setTimeout(step, i >= w.chat.length ? 2600 : 1100);
    };
    t = window.setTimeout(step, 400);
    return () => window.clearTimeout(t);
  }, [play, reduce]);
  return (
    <div className="flex flex-col gap-2 p-3">
      {w.chat.slice(0, n).map(([who, text], i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease }}
          className={`max-w-[82%] rounded-[18px] px-3 py-2 text-[12.5px] leading-snug ${who === "me" ? "self-end bg-[#0A84FF] text-white" : "self-start bg-[#26262C] text-white/90"}`}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
}

function Visual({ v, active }: { v: VisualKey; active: boolean }) {
  switch (v) {
    case "static":
      return (
        <div className="mx-auto w-[min(320px,80%)]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-paper/15 shadow-[0_40px_90px_-30px_rgba(75,72,255,.7)]">
            <Image src="/os/statics/static-0.jpg" alt="Static ad that looks like an iMessage chat" fill sizes="320px" className="object-cover" />
          </div>
          <p className="mt-3 text-center font-mono text-[11px] tracking-[0.16em] text-muted">STATIC · V1 · TEST</p>
        </div>
      );
    case "numbers":
      return (
        <div className="glass mx-auto w-full max-w-[460px] rounded-[18px] bg-ink-900/80 p-5">
          <p className="font-mono text-[11px] tracking-[0.18em] text-royal-soft">MORNING REPORT · ADS</p>
          <ul className="mt-4 space-y-2">
            {w.numbers.map((r, i) => (
              <motion.li
                key={r.n}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.45, ease }}
                className={`flex items-center justify-between gap-3 rounded-[12px] border px-4 py-3 text-[14.5px] ${"top" in r && r.top ? "border-note-proof/70 bg-note-proof/10 text-paper shadow-[0_0_30px_-8px_rgba(255,210,63,.7)]" : "border-paper/10 text-paper/70"}`}
              >
                <span className="font-medium">{r.n}</span>
                <span className={`shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.12em] ${"top" in r && r.top ? "text-note-proof" : "text-muted"}`}>{r.v}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-3 text-right font-mono text-[10px] tracking-[0.14em] text-muted">{w.sample.toUpperCase()}</p>
        </div>
      );
    case "ask":
      return (
        <div className="glass mx-auto w-full max-w-[460px] rounded-[18px] bg-ink-900/80 p-5">
          <p className="font-mono text-[11px] tracking-[0.18em] text-royal-soft">CHAT · OPERATING SYSTEM</p>
          <div className="mt-4 flex flex-col gap-3">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="self-end rounded-[16px] rounded-br-[4px] bg-royal-glow px-4 py-2.5 text-[14.5px] text-white">
              {w.askQ}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.45, ease }} className="note note-cool2 self-start rounded-[16px] rounded-bl-[4px] px-4 py-3 text-[14.5px]">
              {w.askA}
            </motion.div>
          </div>
        </div>
      );
    case "decide":
      return (
        <div className="note note-warm mx-auto w-full max-w-[460px] px-7 py-8">
          <p className="font-mono text-[11px] tracking-[0.2em] text-note-warm">YOUR CALL</p>
          <p className="mt-3 text-[clamp(22px,2.2vw,30px)] font-semibold leading-snug tracking-[-0.02em] text-paper">{w.decide}</p>
        </div>
      );
    case "build":
      return (
        <div className="mx-auto flex w-full max-w-[480px] items-end justify-center gap-3 sm:gap-5">
          <div className="relative aspect-[9/19] w-[150px] shrink-0 overflow-hidden sm:w-[200px] rounded-[34px] border-[5px] border-[#1c1d26] bg-[#0b0b10] shadow-[0_40px_100px_-30px_rgba(75,72,255,.7)]">
            <div className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
            <div className="flex items-center gap-2 border-b border-white/5 px-3 pb-2 pt-8">
              <span className="h-6 w-6 rounded-full bg-gradient-to-br from-royal-glow to-note-cool2" />
              <b className="text-[12px] text-white">Sam</b>
            </div>
            <Chat play={active} />
          </div>
          <div className="pb-4">
            <div className="flex h-16 items-end gap-[3px]" aria-hidden>
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="block w-[4px] rounded-full bg-note-cool2"
                  style={{ height: `${20 + ((i * 37) % 70)}%`, animation: active ? `wave 1.${(i % 5) + 1}s ease-in-out ${i * 0.05}s infinite alternate` : "none", boxShadow: "0 0 8px rgba(34,227,208,.6)" }}
                />
              ))}
            </div>
            <p className="mt-3 max-w-[120px] font-mono sm:max-w-[190px] text-[10.5px] leading-relaxed tracking-[0.12em] text-muted">{w.buildLabel.toUpperCase()}</p>
          </div>
          <style>{`@keyframes wave{from{transform:scaleY(.35)}to{transform:scaleY(1)}}`}</style>
        </div>
      );
    case "schedule":
      return (
        <div className="mx-auto w-full overflow-hidden rounded-[16px] border border-paper/15 shadow-[0_40px_100px_-40px_rgba(75,72,255,.6)]">
          <div className="relative aspect-[1456/800] w-full">
            <Image src="/os/scheduling.jpg" alt="Scheduling clips into the planner" fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover object-top" />
          </div>
        </div>
      );
    case "rule":
      return (
        <div className="note note-proof mx-auto w-full max-w-[460px] px-7 py-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-note-proof">RULE SAVED</p>
          <p className="mt-3 text-[clamp(20px,2vw,26px)] font-semibold leading-snug tracking-[-0.02em] text-paper">{w.rule}</p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-muted">THE NEXT CHAT AD STARTS HERE</p>
        </div>
      );
  }
}

/**
 * One workflow, start to finish: the iMessage chat ad. Test, measure, ask, decide, build, schedule,
 * learn. On desktop the steps scroll on the left and the visual stays pinned on the right.
 * Every step says who does it: you (one decision) or the system (everything else).
 */
export function Workflow() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="workflow" className="glow-royal relative bg-ink-900 py-28 md:py-36" style={{ "--glow-x": "75%", "--glow-y": "40%" } as React.CSSProperties}>
      <Reveal className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <p className="eyebrow mb-5" data-reveal="rise">{w.eyebrow}</p>
        <MaskLines lines={w.h2} className="h2 max-w-[18ch] text-paper" />
        <p className="lede mt-6 max-w-[40rem]" data-reveal="rise">{w.sub}</p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <ol className="relative">
          <span className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-royal-glow/60 via-note-cool2/40 to-note-proof/50" aria-hidden />
          {w.steps.map((s, i) => {
            const you = s.who === "you";
            const on = active === i;
            return (
              <li
                key={s.k}
                ref={(el) => {
                  items.current[i] = el;
                }}
                data-i={i}
                className="relative flex gap-5 py-8 lg:min-h-[52vh] lg:items-center"
              >
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-[12px] transition-all duration-500 ${
                    on ? (you ? "border-note-warm bg-note-warm/20 text-paper shadow-[0_0_24px_rgba(255,106,61,.7)]" : "border-note-cool2 bg-note-cool2/15 text-paper shadow-[0_0_24px_rgba(34,227,208,.6)]") : "border-paper/20 bg-ink-900 text-muted"
                  }`}
                >
                  0{i + 1}
                </span>
                <div className={`min-w-0 flex-1 transition-opacity duration-500 ${on ? "opacity-100" : "lg:opacity-40"}`}>
                  <div className="flex items-center gap-3">
                    <p className="text-[clamp(24px,2.4vw,34px)] font-semibold tracking-[-0.025em] text-paper">{s.k}</p>
                    <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] ${you ? "border-note-warm/60 text-note-warm" : "border-note-cool2/50 text-note-cool2"}`}>
                      {you ? w.youLabel : w.systemLabel}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[28rem] text-[17px] leading-relaxed text-paper/80">{s.t}</p>
                  <div className="mt-6 lg:hidden">
                    <Visual v={s.visual} active />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="hidden lg:block">
          <div className="sticky top-[18vh] flex min-h-[64vh] items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="w-full"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.5, ease }}
              >
                <Visual v={w.steps[active].visual} active />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-[1320px] px-5 text-[clamp(22px,2.2vw,30px)] font-semibold tracking-[-0.02em] text-paper sm:px-8">{w.closing}</p>
    </section>
  );
}
