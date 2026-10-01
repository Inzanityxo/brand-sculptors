"use client";

import { useEffect, useRef } from "react";
import { en } from "@/content/en";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { play } from "@/lib/sound";
import { HeroButtons, PortraitChip } from "./HeroShared";
import { HeroVisual } from "./HeroVisual";

const SEEN_KEY = "bs-ignited";

/**
 * Hero A: Ignition. Menschlichkeit writes itself from the left, Media & Code types from the
 * right, both meet at a × that ignites, the formula settles as the eyebrow and the headline
 * reveals. Under 3.2 seconds, skippable on scroll, click or key, skipped on repeat visits.
 */
export function HeroIgnition() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const html = document.documentElement;
    const finish = () => {
      delete html.dataset.intro;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
    };

    const seen = (() => {
      try {
        if (window.location.search.includes("replay")) return false;
        return sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        return false;
      }
    })();

    if (seen || prefersReducedMotion()) {
      gsap.set(q(".ig-stage"), { autoAlpha: 0 });
      gsap.set(q(".ig-glow"), { xPercent: -50, yPercent: -50, scale: 1, autoAlpha: 1 });
      gsap.set(q(".ig-final"), { autoAlpha: 1 });
      gsap.set(q(".ig-h1 .mask-line > span"), { y: 0, yPercent: 0 });
      finish();
      return;
    }

    const codeEl = q(".ig-code-text")[0] as HTMLElement;
    const codeText = en.hero.formulaCode;
    codeEl.textContent = "";

    const ctx = gsap.context(() => {
      gsap.set(q(".ig-final"), { autoAlpha: 0 });
      gsap.set(q(".ig-h1 .mask-line > span"), { y: 0, yPercent: 115 });
      gsap.set(q(".ig-human"), { clipPath: "inset(-60% 100% -60% -20%)", x: "-12vw" });
      gsap.set(q(".ig-code"), { autoAlpha: 0, x: "14vw" });
      gsap.set(q(".ig-x"), { scale: 0, autoAlpha: 0 });
      gsap.set(q(".ig-result"), { autoAlpha: 0, x: -12 });
      gsap.set(q(".ig-burst"), { xPercent: -50, yPercent: -50, scale: 0.2, autoAlpha: 0 });
      gsap.set(q(".ig-glow"), { xPercent: -50, yPercent: -50, scale: 0.3, autoAlpha: 0 });

      const typed = { n: 0 };
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });

      tl.to(q(".ig-human"), { clipPath: "inset(-60% -20% -60% -20%)", duration: 0.85, ease: "power2.inOut", onComplete: () => gsap.set(q(".ig-human"), { clipPath: "none" }) }, 0.15)
        .fromTo(q(".ig-human"), { skewX: -6, rotate: -1.5 }, { skewX: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1,0.5)" }, 0.15)
        .to(q(".ig-code"), { autoAlpha: 1, duration: 0.2 }, 0.55)
        .to(typed, {
          n: codeText.length,
          duration: 0.7,
          ease: "none",
          onUpdate: () => {
            codeEl.textContent = codeText.slice(0, Math.round(typed.n));
          },
        }, 0.6)
        .add(() => play("whoosh"), 1.25)
        .to([q(".ig-human"), q(".ig-code")], { x: 0, duration: 0.6, ease: "power4.inOut" }, 1.3)
        .to(q(".ig-x"), { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(3)" }, 1.68)
        .to(q(".ig-burst"), { scale: 1.6, autoAlpha: 1, duration: 0.5, ease: "expo.out" }, 1.7)
        .to(q(".ig-burst"), { autoAlpha: 0, duration: 0.6 }, 2.05)
        .fromTo(q(".ig-spark"), { x: 0, y: 0, autoAlpha: 1, scale: 1 }, {
          x: (i) => Math.cos((i / 14) * Math.PI * 2) * (60 + (i % 3) * 30),
          y: (i) => Math.sin((i / 14) * Math.PI * 2) * (60 + (i % 3) * 30),
          autoAlpha: 0,
          scale: 0.3,
          duration: 0.8,
          ease: "expo.out",
        }, 1.72)
        .to(q(".ig-glow"), { scale: 1, autoAlpha: 1, duration: 1.2, ease: "expo.out" }, 1.7)
        .to(q(".ig-result"), { autoAlpha: 1, x: 0, duration: 0.45 }, 1.95)
        .to(q(".ig-pulse"), { autoAlpha: 0, duration: 0.4 }, 2.1)
        .add(() => {
          // FLIP the formula into the eyebrow position
          const row = q(".ig-row")[0] as HTMLElement;
          const eyebrow = q(".ig-eyebrow")[0] as HTMLElement;
          const a = row.getBoundingClientRect();
          const b = eyebrow.getBoundingClientRect();
          const s = Math.min(1, b.width / a.width);
          gsap.to(row, {
            x: b.left + b.width / 2 - (a.left + a.width / 2),
            y: b.top + b.height / 2 - (a.top + a.height / 2),
            scale: s,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.inOut",
          });
        }, 2.2)
        .to(q(".ig-final"), { autoAlpha: 1, duration: 0.5, stagger: 0.06 }, 2.45)
        .to(q(".ig-h1 .mask-line > span"), { yPercent: 0, duration: 0.8, stagger: 0.1 }, 2.4)
        .fromTo(q(".ig-rise"), { y: 24 }, { y: 0, duration: 0.7, stagger: 0.08 }, 2.55);

      const skip = () => {
        if (tl.progress() < 1) {
          tl.progress(1);
          gsap.set(q(".ig-row"), { autoAlpha: 0 });
          finish();
        }
        off();
      };
      const opts = { passive: true } as const;
      const off = () => {
        window.removeEventListener("wheel", skip);
        window.removeEventListener("touchmove", skip);
        window.removeEventListener("pointerdown", skip);
        window.removeEventListener("keydown", skip);
      };
      window.addEventListener("wheel", skip, opts);
      window.addEventListener("touchmove", skip, opts);
      window.addEventListener("pointerdown", skip, opts);
      window.addEventListener("keydown", skip);
      tl.eventCallback("onComplete", () => {
        finish();
        off();
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="glow-royal relative flex min-h-[100svh] items-center overflow-hidden pt-16"
      style={{ "--glow-y": "48%", "--glow-size": "1100px" } as React.CSSProperties}
      aria-label="Introduction"
    >
      {/* expanding glow */}
      <div
        className="ig-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[1400px] w-[1400px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(75,72,255,.28), rgba(18,16,161,.25) 40%, transparent 70%)",
          transform: "translate(-50%,-50%)",
        }}
        aria-hidden
      />

      {/* intro stage */}
      <div className="ig-stage intro-only pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="ig-pulse pulse-line absolute left-1/2 top-1/2 h-px w-[36vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-royal-glow to-transparent" />
        <div className="ig-row relative flex max-w-[100vw] flex-wrap items-center justify-center gap-x-[2vw] gap-y-3 px-4">
          <span
            className="ig-human font-sans text-[clamp(36px,6vw,92px)] font-semibold leading-none tracking-[-0.03em] text-note-warm"
            style={{ textShadow: "0 0 30px rgba(255,106,61,.55)" }}
          >
            {en.hero.formulaHuman}
          </span>
          <span className="ig-x relative font-sans text-[clamp(34px,5vw,72px)] font-light text-spark" style={{ textShadow: "0 0 30px rgba(255,204,77,.9)" }}>
            ×
            <span className="ig-burst absolute left-1/2 top-1/2 h-40 w-40 rounded-full opacity-0" style={{ background: "radial-gradient(closest-side, rgba(255,204,77,.75), rgba(255,204,77,0) 70%)" }} />
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="ig-spark absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-spark opacity-0" style={{ boxShadow: "0 0 8px 2px rgba(255,204,77,.8)" }} />
            ))}
          </span>
          <span className="ig-code relative px-1 py-1 font-mono text-[clamp(22px,3.6vw,52px)] uppercase leading-none tracking-[0.04em] text-note-cool2" style={{ textShadow: "0 0 26px rgba(34,227,208,.45)" }}>
            <span className="ig-code-text">{en.hero.formulaCode}</span>
            <span className="cursor-blink ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-note-cool2" />
          </span>
          <span className="ig-result font-sans text-[clamp(24px,3.8vw,56px)] font-semibold text-paper">
            = {en.hero.formulaResult}
          </span>
        </div>
      </div>

      {/* final state */}
      <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-24">
        <div>
          <PortraitChip className="ig-final intro-hide mb-8 lg:hidden" />
          <p className="ig-eyebrow ig-final intro-hide eyebrow inline-block">{en.hero.eyebrow}</p>
          <p className="ig-final intro-hide mt-3 font-mono text-[13px] text-muted">{en.hero.footnote}</p>
          <h1 className="ig-h1 h1 mt-8 text-[clamp(35px,4.5vw,72px)] text-paper">
            {en.hero.h1.map((l, i) => (
              <span key={i} className="mask-line">
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <p className="ig-final ig-rise intro-hide lede mt-8 max-w-[36rem]">{en.hero.sub}</p>
          <HeroButtons className="ig-final ig-rise intro-hide mt-10" />
        </div>
        <div className="ig-final intro-hide px-6 pb-8 pt-8 sm:px-14 lg:px-4">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
