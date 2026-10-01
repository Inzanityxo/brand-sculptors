"use client";

import { motion } from "framer-motion";
import { MaskLines, Reveal } from "@/components/Reveal";
import { en } from "@/content/en";
import { useReducedMotionPref } from "@/lib/motion";

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Connected tools. The operating system in the middle, the tools around it in neon clusters
 * (ads and channels, planning and CRM, knowledge and team, creation and AI). Each tool sits on a
 * line to the core, and a light in the cluster color runs along it, like data coming back.
 * Pure SVG and CSS, no heavy assets.
 */
export function ConnectorsOrbit({ className = "" }: { className?: string }) {
  const c = en.connects;
  const reduce = useReducedMotionPref();
  const all = c.clusters.flatMap((cl) => cl.tools.map((t) => ({ t, color: cl.color })));
  const total = all.length;
  // clusters stay together: walk around the ellipse in cluster order, alternating two radii
  const nodes = all.map((n, i) => {
    const a = -Math.PI / 2 + (i / total) * Math.PI * 2;
    const r = i % 2 ? 420 : 300;
    return { ...n, i, x: r1(Math.cos(a) * r), y: r1(Math.sin(a) * r * 0.6) };
  });

  return (
    <div className={`relative mx-auto aspect-[1000/640] w-full ${className}`}>
      <svg viewBox="-500 -320 1000 640" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="cxCore">
            <stop offset="0" stopColor="#4B48FF" stopOpacity=".55" />
            <stop offset="1" stopColor="#4B48FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse rx="300" ry="180" fill="none" stroke="rgba(244,241,234,.07)" />
        <ellipse rx="420" ry="252" fill="none" stroke="rgba(244,241,234,.05)" />
        <circle r="170" fill="url(#cxCore)" />
        {nodes.map((n) => (
          <g key={n.t}>
            <line x1="0" y1="0" x2={n.x} y2={n.y} stroke={n.color} strokeOpacity=".22" />
          </g>
        ))}
      </svg>
      {nodes.map((n) => (
        <span
          key={n.t}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border bg-ink-900/90 px-3.5 py-1.5 text-[13px] font-medium text-paper"
          style={{
            left: `${50 + (n.x / 1000) * 100}%`,
            top: `${50 + (n.y / 640) * 100}%`,
            borderColor: `${n.color}99`,
            boxShadow: `0 0 22px -6px ${n.color}, inset 0 0 12px -8px ${n.color}`,
          }}
        >
          {n.t}
        </span>
      ))}
      {/* data running back and forth: out to the tool, back to the core */}
      {!reduce &&
        nodes.map((n) => {
          const px = `${50 + (n.x / 1000) * 100}%`;
          const py = `${50 + (n.y / 640) * 100}%`;
          const dur = 2.2 + (n.i % 4) * 0.45;
          const glow = { background: n.color, boxShadow: `0 0 10px 2px ${n.color}` };
          return (
            <span key={`dots-${n.t}`} aria-hidden>
              <motion.span
                className="absolute h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={glow}
                initial={{ left: "50%", top: "50%", opacity: 0 }}
                animate={{ left: ["50%", px], top: ["50%", py], opacity: [0, 1, 1, 0] }}
                transition={{ duration: dur, repeat: Infinity, repeatDelay: 0.6, delay: (n.i * 0.23) % 2.4, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={glow}
                initial={{ left: px, top: py, opacity: 0 }}
                animate={{ left: [px, "50%"], top: [py, "50%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: dur, repeat: Infinity, repeatDelay: 0.6, delay: 1.1 + ((n.i * 0.37) % 2.4), ease: "easeInOut" }}
              />
            </span>
          );
        })}
      <div className="note note-cool2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-4 text-center">
        <p className="font-mono text-[10.5px] tracking-[0.2em] text-note-cool2">CORE</p>
        <p className="mt-1 text-[18px] font-semibold text-paper">{c.center}</p>
      </div>
    </div>
  );
}

export function ClusterLegend({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {en.connects.clusters.map((cl) => (
        <span key={cl.k} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/80">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: cl.color, boxShadow: `0 0 10px ${cl.color}` }} />
          {cl.k}
        </span>
      ))}
    </div>
  );
}

export function Connects() {
  const c = en.connects;
  return (
    <section id="connects" className="relative overflow-hidden bg-ink-900 py-28 md:py-36">
      <Reveal className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <p className="eyebrow mb-5" data-reveal="rise">{c.eyebrow}</p>
        <MaskLines lines={c.h2} className="h2 max-w-[18ch] text-paper" />
        <p className="lede mt-6 max-w-[40rem]" data-reveal="rise">{c.sub}</p>
      </Reveal>
      <ClusterLegend className="mx-auto mt-10 max-w-[1320px] px-5 sm:px-8" />
      <ConnectorsOrbit className="mt-6 hidden max-w-[1100px] md:block" />

      {/* mobile: clusters as chip groups */}
      <div className="mx-auto mt-8 grid max-w-[1320px] gap-5 px-5 sm:px-8 md:hidden">
        {c.clusters.map((cl) => (
          <div key={cl.k} className="flex flex-wrap gap-2">
            {cl.tools.map((t) => (
              <span key={t} className="rounded-full border bg-ink-800 px-3 py-1.5 text-[13px] text-paper" style={{ borderColor: `${cl.color}99`, boxShadow: `0 0 16px -6px ${cl.color}` }}>
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-[1320px] px-5 text-[15px] text-muted sm:px-8">{c.note}</p>
    </section>
  );
}
