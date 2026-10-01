"use client";

import { useEffect, useRef, useState } from "react";
import { MaskLines, Reveal } from "@/components/Reveal";
import { en } from "@/content/en";
import { gsap, PIN_PRIORITY, prefersReducedMotion, refreshPins, useIsMobile } from "@/lib/motion";

function TickingRows() {
  const rows = en.fireCode.code.rows;
  const [vals, setVals] = useState<number[]>(rows.map((r) => r.value));
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setVals((v) => v.map((n, i) => (rows[i].value === 0 ? 0 : n + (Math.random() < 0.35 ? 1 : 0))));
    }, 900);
    return () => window.clearInterval(id);
  }, [rows]);
  return (
    <ul className="space-y-1.5 font-mono text-[13px]">
      {rows.map((r, i) => (
        <li key={r.key} className="flex justify-between gap-6 border-b border-dashed border-note-cool/15 pb-1.5">
          <span className="text-note-cool/80">{r.key}</span>
          <span className="tabular-nums text-note-cool2">{vals[i]}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Fire × Code. Two columns start far apart. As the section reaches the middle of the viewport,
 * they move together, the seam blends warm to royal to cool, and "Leverage" appears where they
 * touch. Desktop merges horizontally, mobile stacks and slides the cards over each other.
 */
export function FireCode() {
  const root = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const f = en.fireCode;

  useEffect(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);
    if (prefersReducedMotion()) {
      gsap.set(q(".fc-lev"), { autoAlpha: 1 });
      gsap.set(q(".fc-seam"), { autoAlpha: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(q(".fc-lev"), { autoAlpha: 0, scale: 0.9 });
      gsap.set(q(".fc-seam"), { autoAlpha: 0 });
      if (isMobile) {
        // phones: no pin, the stacked cards are taller than the screen. Leverage lights up when it scrolls in.
        gsap
          .timeline({ scrollTrigger: { trigger: q(".fc-lev")[0], start: "top 80%" } })
          .to(q(".fc-seam"), { autoAlpha: 1, duration: 0.6 }, 0)
          .to(q(".fc-lev"), { autoAlpha: 1, scale: 1, duration: 0.8, ease: "expo.out" }, 0.1)
          .fromTo(q(".fc-spark"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(3)" }, 0.4)
          .fromTo(q(".fc-closing"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.5);
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q(".fc-stage")[0],
          refreshPriority: PIN_PRIORITY.fireCode,
          start: "center center",
          end: "+=110%",
          pin: true,
          scrub: 0.8,
        },
      });
      tl.fromTo(q(".fc-fire"), { x: "-7vw" }, { x: 0, ease: "power2.inOut" }, 0)
        .fromTo(q(".fc-code"), { x: "7vw" }, { x: 0, ease: "power2.inOut" }, 0)
        .fromTo(q(".fc-gap"), { width: "10vw" }, { width: 0, ease: "power2.inOut" }, 0);
      tl.to(q(".fc-border"), { borderColor: "rgba(244,241,234,0)", ease: "none" }, 0.5)
        .to(q(".fc-seam"), { autoAlpha: 1, ease: "none" }, 0.45)
        .to(q(".fc-lev"), { autoAlpha: 1, scale: 1, ease: "expo.out" }, 0.75)
        .fromTo(q(".fc-spark"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: "back.out(3)" }, 0.8)
        .fromTo(q(".fc-closing"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.9);
    }, el);
    refreshPins();
    return () => {
      ctx.revert();
      refreshPins();
    };
  }, [isMobile]);

  return (
    <section ref={root} id="fire-code" className="glow-royal relative overflow-hidden bg-ink-950 pb-24" style={{ "--glow-y": "60%" } as React.CSSProperties}>
      <Reveal className="mx-auto max-w-[1320px] px-5 pt-28 sm:px-8 md:pt-36">
        <p className="eyebrow mb-5" data-reveal="rise">{f.eyebrow}</p>
        <MaskLines lines={f.h2} className="h2 max-w-[18ch] text-paper" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-10">
          <p className="neon-text-warm text-[clamp(20px,1.8vw,26px)] font-semibold leading-snug tracking-[-0.02em]" data-reveal="rise">{f.lineHuman}</p>
          <p className="font-mono text-[15px] leading-relaxed text-note-cool2 md:text-right" data-reveal="rise">{f.lineCode}</p>
        </div>
      </Reveal>

      <div className="fc-stage relative mx-auto mt-12 max-w-[1320px] px-5 sm:px-8">
        <div className="relative flex flex-col md:flex-row md:items-stretch">
          {/* seam gradient behind the merged card */}
          <div
            className="fc-seam pointer-events-none absolute inset-0 -z-0 rounded-[28px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,154,118,.20), rgba(18,16,161,.55) 50%, rgba(127,227,212,.18))",
              boxShadow: "0 0 120px -20px rgba(75,72,255,.6)",
            }}
            aria-hidden
          />

          {/* THE FIRE */}
          <article className="fc-fire fc-border grain relative z-10 order-1 flex-1 md:order-none rounded-[28px] border border-note-warm/30 bg-gradient-to-br from-[#2a1426]/90 to-ink-900/80 p-7 md:rounded-r-none md:p-10">
            <p className="font-mono text-[11px] tracking-[0.22em] text-note-warm">{f.fire.label.toUpperCase()}</p>
            <h3 className="h3 mt-4 text-paper">
              <span className="relative inline-block">
                {f.fire.title}
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 7 C 60 2, 140 9, 298 4" stroke="#FF9A76" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h3>
            <p className="mt-6 text-paper/80">{f.fire.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {f.fire.annotations.map((a) => (
                <li key={a} className="rounded-full border border-note-warm/50 bg-note-warm/10 px-3 py-1 text-[13px] font-medium text-paper shadow-[0_0_18px_-6px_rgba(255,106,61,.8)]">{a}</li>
              ))}
            </ul>
          </article>

          <div className="fc-gap hidden shrink-0 md:block" style={{ width: "10vw" }} aria-hidden />

          {/* THE CODE */}
          <article className="fc-code fc-border data-grid relative z-10 order-3 flex-1 md:order-none rounded-[28px] border border-note-cool2/25 bg-ink-900 p-7 md:mt-0 md:rounded-l-none md:p-10">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] tracking-[0.22em] text-note-cool2">{f.code.label.toUpperCase()}</p>
              <span className="font-mono text-[10px] tracking-[0.18em] text-muted">{f.code.rowsNote}</span>
            </div>
            <h3 className="h3 mt-4 text-paper">{f.code.title}</h3>
            <p className="mt-6 text-paper/80">{f.code.body}</p>
            <div className="mt-6">
              <TickingRows />
            </div>
          </article>

          {/* LEVERAGE */}
          <div className="fc-lev pointer-events-none relative z-20 order-2 -my-4 self-center text-center md:absolute md:left-1/2 md:top-1/2 md:order-none md:my-0 md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="relative rounded-[24px] bg-ink-950/80 px-8 py-6 backdrop-blur-md">
              <span
                className="fc-spark absolute -right-2 -top-2 block h-4 w-4 rounded-full bg-spark"
                style={{ boxShadow: "0 0 24px 6px rgba(255,204,77,.7)" }}
                aria-hidden
              />
              <p className="text-[clamp(44px,6vw,92px)] font-bold leading-none tracking-[-0.04em] text-paper" style={{ textShadow: "0 0 40px rgba(75,72,255,.95), 0 0 90px rgba(18,16,161,.9)" }}>
                {f.leverage}
              </p>
              <p className="mt-2 font-mono text-[13px] tracking-[0.2em] text-royal-soft">{f.leverageSub}</p>
            </div>
          </div>
        </div>

        <p className="fc-closing mx-auto mt-12 max-w-[44rem] text-center text-[clamp(20px,1.9vw,26px)] font-medium leading-snug tracking-[-0.015em] text-paper">
          {f.closing}
        </p>
      </div>
    </section>
  );
}
