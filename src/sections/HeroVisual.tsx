"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { en } from "@/content/en";
import { prefersReducedMotion } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The hero visual: Marco on stage (the human side) with his operating system floating around
 * the frame (the system side). Cards come in one after another and drift slightly with the cursor.
 * Sample data only, never client content.
 */
export function HeroVisual({ className = "", startDelay }: { className?: string; startDelay?: number }) {
  const v = en.hero.visual;
  const [go, setGo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = document.documentElement.dataset.intro === "1";
    const d = prefersReducedMotion() ? 0 : (startDelay ?? (intro ? 2700 : 250));
    const t = window.setTimeout(() => setGo(true), d);
    return () => window.clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.style.setProperty("--px", (e.clientX / window.innerWidth - 0.5).toFixed(3));
      el.style.setProperty("--py", (e.clientY / window.innerHeight - 0.5).toFixed(3));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const card = (i: number) => ({
    initial: { opacity: 0, y: 18, scale: 0.96 },
    animate: go ? { opacity: 1, y: 0, scale: 1 } : {},
    transition: { duration: 0.7, ease, delay: 0.35 + i * 0.3 },
  });
  const depth = (d: number): React.CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0) * ${-d}px), calc(var(--py, 0) * ${-d * 0.7}px), 0)`,
    transition: "transform 900ms cubic-bezier(.22,1,.36,1)",
  });

  return (
    <div ref={root} className={`relative mx-auto w-full max-w-[680px] ${className}`}>
      <div
        aria-hidden
        className="absolute inset-[-14%] -z-10 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(75,72,255,.45), rgba(18,16,161,.22) 50%, transparent 75%)" }}
      />

      {/* the launch film: poster first, the video only loads on click */}
      <figure
        className="group relative aspect-video overflow-hidden rounded-[26px] border border-paper/12 bg-ink-900 shadow-[0_50px_120px_-40px_rgba(0,0,0,.9),0_0_0_1px_rgba(75,72,255,.25)]"
        style={depth(5)}
      >
        {playing ? (
          <video
            className="absolute inset-0 h-full w-full bg-black object-cover"
            src="/film/launch-film-16x9.mp4"
            poster="/film/launch-film-poster.jpg"
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={en.hero.film.label}
            className="absolute inset-0 block h-full w-full cursor-pointer text-left"
          >
            <Image
              src="/film/launch-film-poster.jpg"
              alt={en.hero.film.poster}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 680px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-ink-950/25 transition-colors duration-300 group-hover:bg-ink-950/10" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-3 rounded-full border border-paper/25 bg-ink-950/70 py-2 pl-2 pr-5 text-[15px] font-semibold text-paper shadow-[0_0_40px_-6px_rgba(75,72,255,.9)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-spark/70 group-hover:shadow-[0_0_50px_-4px_rgba(255,204,77,.7)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-spark text-note-ink">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
                  </svg>
                </span>
                {en.hero.film.play}
                <span className="font-mono text-[12px] font-normal text-paper/70">{en.hero.film.length}</span>
              </span>
            </span>
          </button>
        )}
      </figure>

      {/* command, top left */}
      <motion.div {...card(0)} className="pointer-events-none absolute -top-[4.5rem] left-[-8%] hidden w-[56%] sm:block">
        <div style={depth(22)} className="glass rounded-[14px] bg-ink-900/80 px-3.5 py-3">
          <p className="font-mono text-[10px] tracking-[0.18em] text-royal-soft">COMMAND</p>
          <p className="mt-1 font-mono text-[12px] leading-snug text-paper sm:text-[13px]">
            <span className="text-spark">›</span> {v.command}
            <span className="cursor-blink ml-1 inline-block h-[0.95em] w-[0.45em] translate-y-[0.15em] bg-royal-soft" />
          </p>
        </div>
      </motion.div>

      {/* report, right */}
      <motion.div {...card(1)} className="pointer-events-none absolute right-[-4%] top-[52%] hidden w-[34%] sm:block lg:right-[-10%]">
        <div style={depth(30)} className="glass rounded-[14px] bg-ink-900/80 p-3">
          <div className="flex h-11 items-end gap-1.5">
            {[34, 48, 40, 58, 92, 66, 100].map((h, i) => (
              <motion.span
                key={i}
                className={`block flex-1 rounded-sm ${i === 4 || i === 6 ? "bg-note-proof shadow-[0_0_10px_rgba(255,210,63,.7)]" : "bg-royal-glow/80"}`}
                initial={{ height: "8%" }}
                animate={go ? { height: `${h}%` } : {}}
                transition={{ duration: 0.8, ease, delay: 0.8 + i * 0.06 }}
              />
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-snug text-paper/85">{v.report}</p>
        </div>
      </motion.div>

      {/* draft ready, left */}
      <motion.div {...card(2)} className="pointer-events-none absolute bottom-[14%] left-[-5%] hidden sm:block sm:left-[-12%]">
        <div style={depth(18)} className="glass flex items-center gap-2 rounded-full bg-ink-900/85 px-3.5 py-2">
          <span className="h-2 w-2 rounded-full bg-note-cool2 shadow-[0_0_10px_rgba(34,227,208,.9)]" />
          <span className="text-[12px] text-paper sm:text-[13px]">{v.draft}</span>
        </div>
      </motion.div>

      {/* rule saved, bottom right: the learning loop in one card */}
      <motion.div {...card(3)} className="pointer-events-none absolute -bottom-14 right-[-2%] w-[62%] sm:-bottom-16 sm:right-[-4%] sm:w-[48%]">
        <div style={depth(26)} className="note note-proof px-4 py-3">
          <p className="font-mono text-[10px] tracking-[0.18em] text-note-proof">RULE SAVED</p>
          <p className="mt-1 text-[14px] leading-snug">{v.rule.replace(/^New rule saved: /, "")}</p>
        </div>
      </motion.div>

      <span className="absolute -top-6 right-0 hidden font-mono sm:block text-[9px] tracking-[0.2em] text-muted/70">{v.demo.toUpperCase()}</span>
    </div>
  );
}
