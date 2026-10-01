"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MaskLines, Reveal } from "@/components/Reveal";
import { en } from "@/content/en";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const NOTE_TONES = ["note-proof", "note-warm2", "note-cool", "note-cool2", "note-warm"];

/**
 * In my own words. The one paper section, like turning on the lights.
 * Marco's story, his real lines from the interviews pinned like notes, and the stage photo.
 * The quotes are verbatim from context/standout-statements.md in the Brand Sculptors workspace.
 */
export function OwnWords() {
  const w = en.words;
  const stage = useRef<HTMLDivElement>(null);
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const img = stage.current?.querySelector(".ow-img");
      if (img) {
        gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: stage.current, start: "top bottom", end: "bottom top", scrub: true } });
      }
      const notes = board.current?.querySelectorAll(".ow-note");
      if (notes?.length) {
        gsap.from(notes, {
          y: -30,
          rotate: () => gsap.utils.random(-8, 8),
          autoAlpha: 0,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.08,
          scrollTrigger: { trigger: board.current, start: "top 78%", once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="glow-royal relative bg-ink-900 py-28 md:py-36" style={{ "--glow-y": "30%", "--glow-x": "70%" } as React.CSSProperties}>
      <Reveal className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <MaskLines lines={w.h2} className="h2 max-w-[16ch] text-paper" />
          {w.story.map((p) => (
            <p key={p} className="lede mt-6 max-w-[36rem]" data-reveal="rise">
              {p}
            </p>
          ))}
        </div>
        <div ref={stage} data-reveal="wipe" className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-paper/12 bg-ink-950 shadow-[0_40px_100px_-40px_rgba(75,72,255,.6)] lg:aspect-auto">
          <Image src="/stage/stage-portrait.png" alt="Marco Bednarz laughing on stage next to his slides" fill sizes="(max-width: 1024px) 100vw, 640px" className="ow-img object-cover object-[60%_30%]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-5 pt-16">
            <p className="font-mono text-[11px] tracking-[0.2em] text-spark">{w.stageEyebrow.toUpperCase()}</p>
            <p className="mt-1 max-w-[28rem] text-[15px] text-paper">{w.stageLine}</p>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-20 max-w-[1320px] px-5 sm:px-8">
        <div ref={board} className="dot-grid grid gap-5 rounded-[24px] border border-paper/10 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          {w.quotes.map((q, i) => (
            <figure
              key={q}
              className={`ow-note note ${NOTE_TONES[i % NOTE_TONES.length]} relative flex flex-col justify-between px-5 py-5 ${i === 0 ? "lg:col-span-2" : ""}`}
              
            >
                            <blockquote className={`font-medium leading-snug tracking-[-0.015em] ${i === 0 ? "text-[clamp(22px,2.2vw,30px)]" : "text-[18px]"}`}>“{q}”</blockquote>
            </figure>
          ))}
        </div>
        <p className="mt-14 text-[clamp(20px,1.9vw,26px)] font-semibold tracking-[-0.02em] text-paper">{w.closing}</p>
      </div>
    </section>
  );
}
