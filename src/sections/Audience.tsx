"use client";

import { MaskLines, Reveal } from "@/components/Reveal";
import { en } from "@/content/en";

/**
 * Who it's for: two doors. The audience is the headline, the pain is one short line under it,
 * the outcomes are three clear points. No story, straight to the point.
 */
export function Audience() {
  const a = en.audience;
  return (
    <section id="for-you" className="glow-royal relative bg-ink-950 py-28 md:py-36" style={{ "--glow-y": "60%" } as React.CSSProperties}>
      <Reveal className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <p className="eyebrow mb-5" data-reveal="rise">{a.eyebrow}</p>
        <MaskLines lines={a.h2} className="h2 max-w-[18ch] text-paper" />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {a.doors.map((d) => {
            const warm = d.tone === "warm";
            return (
              <article key={d.label} data-reveal="rise" className={`note ${warm ? "note-warm" : "note-cool2"} p-7 md:p-10`}>
                <h3 className="text-[clamp(30px,3.4vw,48px)] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-paper">{d.label}</h3>
                <p className={`mt-4 text-[17px] font-medium ${warm ? "text-note-warm" : "text-note-cool2"}`}>{d.title}</p>
                <ul className="mt-8 space-y-4 border-t border-paper/10 pt-6">
                  {d.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[17px] leading-snug text-paper">
                      <span className={`mt-[3px] text-[14px] ${warm ? "text-note-warm" : "text-note-cool2"}`}>→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
