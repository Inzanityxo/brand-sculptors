"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { MaskLines, Reveal } from "@/components/Reveal";
import { en } from "@/content/en";
import { ClusterLegend, ConnectorsOrbit } from "./Connects";
import { getLenis, gsap, PIN_PRIORITY, prefersReducedMotion, refreshPins, ScrollTrigger, useIsMobile } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const TEXT = ["text-note-cool", "text-note-cool2", "text-note-proof"] as const;
const BAR = ["bg-note-cool", "bg-note-cool2", "bg-note-proof"] as const;
const TONE = ["note-cool", "note-cool2", "note-proof"] as const;

/**
 * The three roles of the system: structure, output, analysis.
 * Desktop: the section pins and the scroll drives through every screen of every role, with a
 * progress bar per screen. Clicking a role or screen scrolls to its spot. Mobile: tap to switch.
 */
export function Roles() {
  const r = en.roles;
  const flat = useMemo(() => r.items.flatMap((it, ri) => (it.screens as readonly { image: string; label: string }[]).map((s, si) => ({ ri, si, s }))), [r.items]);
  const [idx, setIdx] = useState(0);
  const [local, setLocal] = useState(0); // progress inside the current screen, 0..1
  const stage = useRef<HTMLDivElement>(null);
  const trig = useRef<ScrollTrigger | null>(null);
  const isMobile = useIsMobile(1024);
  const cur = flat[idx];
  const item = r.items[cur.ri];

  useEffect(() => {
    if (isMobile || prefersReducedMotion() || !stage.current) return;
    const n = flat.length;
    const ctx = gsap.context(() => {
      try {
      trig.current = ScrollTrigger.create({
        trigger: stage.current,
        refreshPriority: PIN_PRIORITY.roles,
        start: "top top",
        end: () => `+=${n * window.innerHeight * 0.42}`,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress * n;
          const i = Math.min(n - 1, Math.floor(p));
          setIdx(i);
          setLocal(Math.min(1, p - i));
        },
      });
      } catch {
        trig.current = null; // fall back to tap navigation, never break the page
      }
    });
    refreshPins();
    return () => {
      trig.current = null;
      ctx.revert();
      refreshPins();
    };
  }, [isMobile, flat.length]);

  const goTo = (i: number) => {
    const t = trig.current;
    if (!t) {
      setIdx(i);
      return;
    }
    const y = t.start + ((i + 0.35) / flat.length) * (t.end - t.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="roles" className="glow-royal relative bg-ink-950" style={{ "--glow-y": "60%" } as React.CSSProperties}>
      <Reveal className="mx-auto max-w-[1320px] px-5 pb-10 pt-28 sm:px-8 md:pt-36">
        <p className="eyebrow mb-5" data-reveal="rise">{r.eyebrow}</p>
        <MaskLines lines={r.h2} className="h2 text-paper" />
        <p className="lede mt-6 max-w-[40rem]" data-reveal="rise">{r.sub}</p>
      </Reveal>

      <div ref={stage} className="relative lg:flex lg:h-[100svh] lg:items-center">
        <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[340px_1fr] lg:gap-10 lg:pb-0">
          {/* role list */}
          <div className="flex flex-col gap-3" role="tablist" aria-label={r.h2}>
            {r.items.map((it, ri) => {
              const on = cur.ri === ri;
              return (
                <div key={it.id} className={`note ${TONE[ri]} px-5 py-4 transition-all duration-300 ${on ? "" : "opacity-50"}`} style={on ? undefined : { boxShadow: "none" }}>
                  <button
                    role="tab"
                    aria-selected={on}
                    onClick={() => goTo(flat.findIndex((f) => f.ri === ri))}
                    className="block w-full text-left"
                  >
                    <span className={`font-mono text-[11px] tracking-[0.2em] ${TEXT[ri]}`}>{it.n}</span>
                    <span className="mt-1 block text-[clamp(22px,2vw,28px)] font-bold uppercase tracking-[-0.02em] text-paper">{it.k}</span>
                    <span className="mt-0.5 block text-[14.5px] text-paper/80">{it.t}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                        <ul className="mt-3 space-y-1.5">
                          {it.points.map((p) => (
                            <li key={p} className="flex gap-2 text-[13.5px] text-paper/75">
                              <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${BAR[ri]}`} />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {it.screens.map((s, si) => {
                            const fi = flat.findIndex((f) => f.ri === ri && f.si === si);
                            const active = fi === idx;
                            const done = fi < idx;
                            return (
                              <button
                                key={s.label}
                                onClick={() => goTo(fi)}
                                className={`relative overflow-hidden rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors ${active ? "border-paper/50 text-paper" : "border-paper/15 text-paper/60 hover:text-paper"}`}
                              >
                                <span
                                  className={`absolute inset-y-0 left-0 ${BAR[ri]} opacity-25`}
                                  style={{ width: active ? `${Math.round(local * 100)}%` : done ? "100%" : "0%", transition: "width 120ms linear" }}
                                />
                                <span className="relative">{s.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            {!isMobile && (
              <p className="mt-2 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted">
                <span className="inline-block h-4 w-[2px] animate-pulse bg-royal-soft" /> SCROLL TO SEE THE NEXT SCREEN · {idx + 1}/{flat.length}
              </p>
            )}
          </div>

          {/* screen */}
          <div>
            <div className="overflow-hidden rounded-[16px] border border-paper/15 bg-[#ECECEF] shadow-[0_60px_140px_-50px_rgba(75,72,255,.55),0_0_0_1px_rgba(75,72,255,.25)]">
              <div className="flex items-center gap-2 border-b border-black/10 bg-[#F6F6F8] px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="mx-auto hidden font-mono text-[11px] text-black/50 sm:inline">
                  operating system · {item.k.toLowerCase()} · {cur.s.label.toLowerCase()}
                </span>
              </div>
              <div className="relative aspect-[1456/810] w-full bg-[#F2F2F4]">
                <AnimatePresence initial={false}>
                  {cur.s.image ? (
                  <motion.a
                    key={cur.s.image}
                    href={cur.s.image}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: 14, scale: 1.01 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.18 } }}
                    transition={{ duration: 0.45, ease }}
                    aria-label={`${cur.s.label}, open full size`}
                  >
                    <Image src={cur.s.image} alt={`${item.k}: ${cur.s.label}`} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-cover object-top" />
                  </motion.a>
                  ) : (
                    <motion.div
                      key="connectors"
                      className="absolute inset-0 flex flex-col justify-center bg-ink-950 px-[4%]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.18 } }}
                      transition={{ duration: 0.45, ease }}
                    >
                      <ClusterLegend className="justify-center [&_span]:text-[9px] sm:[&_span]:text-[10px]" />
                      <ConnectorsOrbit className="mt-2 max-w-[86%] [&_span.absolute]:px-2 [&_span.absolute]:py-0.5 [&_span.absolute]:text-[9px] sm:[&_span.absolute]:text-[10.5px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex flex-1 gap-1">
                {flat.map((f, i) => (
                  <button key={i} onClick={() => goTo(i)} aria-label={f.s.label} className="h-1 flex-1 overflow-hidden rounded-full bg-paper/10">
                    <span className={`block h-full ${BAR[f.ri]}`} style={{ width: i < idx ? "100%" : i === idx ? `${Math.max(8, Math.round(local * 100))}%` : "0%" }} />
                  </button>
                ))}
              </div>
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted">{r.sample.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
