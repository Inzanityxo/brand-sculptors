"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { en } from "@/content/en";
import { useReducedMotionPref } from "@/lib/motion";

const R = 230;
const LOOP_MS = 11000;

/**
 * The system that learns. The loop from Marco's keynote: publish, numbers come back, checked
 * against your goals, proposal, correction becomes a rule. A light travels the circle, each node
 * lights up as it passes, and the rule counter in the middle goes up with every round.
 */
export function Learn() {
  const l = en.learn;
  const nodes = l.loop;
  const reduce = useReducedMotionPref();
  const svgWrap = useRef<HTMLDivElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const arc = useRef<SVGCircleElement>(null);
  const [active, setActive] = useState(-1);
  const [rules, setRules] = useState(1);

  useEffect(() => {
    if (reduce) return;
    const el = svgWrap.current!;
    let running = false;
    let raf = 0;
    let t0 = 0;
    const circ = 2 * Math.PI * R;
    const frame = (now: number) => {
      if (!running) return;
      const q = ((now - t0) % LOOP_MS) / LOOP_MS;
      const w = -Math.PI / 2 + q * 2 * Math.PI;
      dot.current?.setAttribute("cx", String(Math.cos(w) * R));
      dot.current?.setAttribute("cy", String(Math.sin(w) * R));
      arc.current?.setAttribute("stroke-dasharray", `${q * circ} ${circ}`);
      const pos = q * nodes.length;
      let on = -1;
      for (let i = 0; i < nodes.length; i++) {
        const d = (((pos - i) % nodes.length) + nodes.length) % nodes.length;
        if (Math.min(d, nodes.length - d) < 0.3) on = i;
      }
      setActive((a) => (a === on ? a : on));
      const r = 1 + Math.max(0, Math.floor((now - t0) / LOOP_MS + 0.2));
      setRules((x) => (x === r ? x : r));
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          if (!t0) t0 = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!e.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce, nodes.length]);

  return (
    <section id="learn" className="glow-royal relative overflow-hidden bg-ink-950 py-28 md:py-36" style={{ "--glow-x": "70%", "--glow-y": "50%", "--glow-size": "1100px" } as React.CSSProperties}>
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
        <Reveal>
          <p className="eyebrow mb-5" data-reveal="rise">{l.eyebrow}</p>
          <h2 className="h2 text-[clamp(34px,4vw,60px)] text-paper">
            <span className="mask-line" data-reveal="line">
              <span className="whitespace-nowrap">{l.h2Pre}</span>
            </span>
            <span className="mask-line" data-reveal="line">
              <span className="neon-text-cool uppercase tracking-[-0.01em]">{l.h2Key}</span>
            </span>
          </h2>
          <p className="lede mt-6 max-w-[34rem]" data-reveal="rise">{l.sub}</p>
          <ul className="mt-8 grid gap-3">
            {l.points.map((pt, i) => (
              <li key={pt.k} className={`note ${["note-cool", "note-cool2", "note-proof"][i]} flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4`} data-reveal="rise">
                <span className="w-[130px] shrink-0 font-mono text-[12px] uppercase tracking-[0.18em] text-paper">{pt.k}</span>
                <span className="text-[16px] text-paper/85">{pt.t}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div ref={svgWrap} className="relative mx-auto w-full max-w-[720px] [&>svg]:aspect-[94/60]">
          <svg viewBox="-470 -300 940 600" className="w-full overflow-visible" role="img" aria-label={nodes.map((n) => n.t).join(", ")}>
            <defs>
              <filter id="lGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="lNum" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#9A98FF" />
              </linearGradient>
              <linearGradient id="lArc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4B48FF" stopOpacity=".2" />
                <stop offset="1" stopColor="#22E3D0" stopOpacity=".85" />
              </linearGradient>
            </defs>
            <circle r={R} fill="none" stroke="rgba(244,241,234,.1)" strokeWidth="1.2" />
            <circle ref={arc} r={R} fill="none" stroke="url(#lArc)" strokeWidth="2.5" strokeDasharray={reduce ? "2000 0" : "0 2000"} transform="rotate(-90)" />
            {nodes.map((n, i) => {
              const w = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
              const x = Math.cos(w) * R;
              const y = Math.sin(w) * R;
              const anchor = Math.cos(w) > 0.2 ? "start" : Math.cos(w) < -0.2 ? "end" : "middle";
              const dx = anchor === "start" ? 28 : anchor === "end" ? -28 : 0;
              const dy = anchor === "middle" ? (y < 0 ? -56 : 44) : 5;
              const on = active === i || reduce;
              const last = i === nodes.length - 1;
              return (
                <g key={n.t}>
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? 17 : 15}
                    fill={on ? (last ? "#5a4a0c" : "#1210A1") : "#0C0E26"}
                    stroke={on ? (last ? "#FFD23F" : "#4B48FF") : "rgba(244,241,234,.22)"}
                    strokeWidth="1.5"
                    filter={on ? "url(#lGlow)" : undefined}
                    style={{ transition: "all .45s ease" }}
                  />
                  <text className="max-sm:hidden" x={x + dx} y={y + dy} textAnchor={anchor} fill="#F4F1EA" fontSize="20" fontWeight="600" opacity={on ? 1 : 0.55} style={{ transition: "opacity .45s ease" }}>
                    {n.t}
                  </text>
                  <text className="max-sm:hidden" x={x + dx} y={y + dy + 22} textAnchor={anchor} fill="#A3A6C2" fontSize="12" letterSpacing="1.6" fontFamily="var(--font-geist-mono)">
                    {n.z}
                  </text>
                </g>
              );
            })}
            <circle ref={dot} r="7" cx="0" cy={-R} fill="#F4F1EA" filter="url(#lGlow)" opacity={reduce ? 0 : 1} />
            <text key={rules} textAnchor="middle" y="26" fontSize="104" fontWeight="700" letterSpacing="-5" fill="url(#lNum)" className="learn-count">
              {reduce ? "∞" : rules}
            </text>
            <text textAnchor="middle" y="64" fontSize="12.5" letterSpacing="2.2" fill="#F4F1EA" opacity=".6" fontFamily="var(--font-geist-mono)">
              {l.counter}
            </text>
          </svg>
          <ol className="mt-4 grid gap-2 sm:hidden">
            {nodes.map((n, i) => (
              <li key={n.t} className={`flex items-center gap-3 rounded-[10px] border px-3 py-2 text-[14px] transition-colors ${active === i || reduce ? "border-royal-glow/70 bg-royal-glow/15 text-paper" : "border-paper/10 text-paper/60"}`}>
                <span className="font-mono text-[11px] text-royal-soft">0{i + 1}</span>
                {n.t}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <figure className="mx-auto mt-14 max-w-[1320px] px-5 sm:px-8">
        <blockquote className="max-w-[46rem] text-[clamp(19px,1.7vw,24px)] font-medium leading-snug text-paper">“{l.quote}”</blockquote>
      </figure>
      <style>{`.learn-count{animation:countPop .6s cubic-bezier(.22,1,.36,1)}@keyframes countPop{from{opacity:.2;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
