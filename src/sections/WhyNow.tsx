"use client";

import { useEffect, useRef } from "react";
import { MaskLines, Reveal } from "@/components/Reveal";
import { en } from "@/content/en";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Why start now. The two curves from Marco's keynote: whoever starts today grows earlier and
 * steeper than whoever starts in a year. The lines draw themselves on scroll, then the gap fills.
 * An illustration, not measured data, and the page says so.
 */
export function WhyNow() {
  const w = en.whyNow;
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(".wn-line");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".wn-chart", start: "top 75%", end: "bottom 45%", scrub: 0.8 } });
      tl.to(paths[0], { strokeDashoffset: 0, ease: "none" }, 0)
        .to(paths[1], { strokeDashoffset: 0, ease: "none" }, 0.45)
        .fromTo(".wn-fill", { opacity: 0 }, { opacity: 1 }, 0.9)
        .fromTo(".wn-cap", { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 1);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="why-now" className="glow-royal relative bg-ink-950 py-28 md:py-36" style={{ "--glow-y": "65%" } as React.CSSProperties}>
      <Reveal className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <p className="eyebrow mb-5" data-reveal="rise">{w.eyebrow}</p>
        <MaskLines lines={w.h2} className="h2 max-w-[18ch] text-paper" />
      </Reveal>

      <div className="wn-chart relative mx-auto mt-12 h-[46vh] min-h-[300px] max-w-[1320px] px-5 sm:px-8">
        <svg viewBox="0 0 1200 460" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-label={`${w.today}, ${w.later}. ${w.note}`}>
          <defs>
            <linearGradient id="wnLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4B48FF" stopOpacity=".5" />
              <stop offset="1" stopColor="#22E3D0" />
            </linearGradient>
            <linearGradient id="wnFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4B48FF" stopOpacity=".32" />
              <stop offset="1" stopColor="#4B48FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="420" x2="1200" y2="420" stroke="rgba(244,241,234,.16)" />
          <path className="wn-fill" d="M40,418 C300,410 520,360 700,280 C860,205 1000,110 1160,30 L1160,300 C1060,340 960,380 880,400 C780,414 620,418 40,418 Z" fill="url(#wnFill)" />
          <path className="wn-line" d="M40,418 C300,410 520,360 700,280 C860,205 1000,110 1160,30" stroke="url(#wnLine)" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(0 0 8px rgba(34,227,208,.6))" }} />
          <path className="wn-line" d="M520,419 C700,418 800,410 880,400 C960,380 1060,340 1160,300" stroke="rgba(244,241,234,.5)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
          <text x="40" y="450" fill="#F4F1EA" fillOpacity=".45" fontSize="15" fontFamily="var(--font-geist-mono)">{w.axisToday}</text>
          <text x="520" y="450" fill="#F4F1EA" fillOpacity=".45" fontSize="15" fontFamily="var(--font-geist-mono)">{w.axisLater}</text>
        </svg>
        <div className="absolute left-5 top-[40%] font-mono text-[11px] uppercase leading-loose tracking-[0.14em] sm:left-8">
          <div className="text-note-cool2">● {w.today}</div>
          <div className="text-paper/60">● {w.later}</div>
        </div>
        <p className="wn-cap absolute left-5 top-0 max-w-[30ch] text-[clamp(17px,1.5vw,21px)] font-medium text-paper sm:left-8">{w.caption}</p>
        <p className="absolute bottom-[-28px] right-5 font-mono text-[10px] tracking-[0.12em] text-muted sm:right-8">{w.note.toUpperCase()}</p>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1320px] gap-4 px-5 sm:px-8 md:grid-cols-3">
        {w.relief.map((r) => (
          <div key={r} className="note note-cool px-5 py-4 text-[16px]">
            <span className="mr-3 inline-block h-2 w-2 -translate-y-[2px] rounded-full bg-note-cool shadow-[0_0_10px_rgba(123,120,255,.9)]" />
            {r}
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-[1320px] px-5 text-[clamp(19px,1.7vw,24px)] font-medium leading-snug text-paper sm:px-8">{w.reliefClosing}</p>
    </section>
  );
}
