"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { en } from "@/content/en";
import { prefersReducedMotion, useIsMobile } from "@/lib/motion";

/**
 * Steer the ship. The 3D ship from Marco's keynote builds itself from glowing frames and sets
 * course for the horizon. It lives in /public/ship/ (three.js, about 600 KB) and loads only when
 * the section comes close, so the first page load stays light.
 */
export function Steer() {
  const s = en.steer;
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [load, setLoad] = useState(false);
  const started = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current!;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: "800px 0px" });
    const seen = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current && frame.current?.contentWindow) {
          started.current = true;
          frame.current.contentWindow.postMessage("ship:start", window.location.origin);
        }
      },
      { threshold: 0.45 },
    );
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  return (
    <section ref={root} id="steer" className="relative h-[100svh] min-h-[780px] overflow-hidden bg-ink-950 md:min-h-[640px]">
      {load && isMobile && (
        // phones: a recording of the same scene, because WebGL in an iframe is unreliable on mobile Safari
        <video
          className="pointer-events-none absolute inset-x-0 bottom-0 aspect-[4/3] w-full object-cover"
          src="/ship/ship-mobile.mp4"
          poster="/ship/ship-mobile-poster.jpg"
          muted
          autoPlay
          playsInline
          preload="auto"
          onEnded={(e) => {
            // the ship is built once, then it keeps sailing
            e.currentTarget.currentTime = 12;
            void e.currentTarget.play();
          }}
        />
      )}
      {load && !isMobile && (
        <iframe
          ref={frame}
          src="/ship/index.html"
          title="A ship builds itself and sets course for the horizon"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
          onLoad={() => {
            const box = root.current!.getBoundingClientRect();
            if (box.top < window.innerHeight * 0.6 && box.bottom > 0 && !started.current) {
              started.current = true;
              frame.current?.contentWindow?.postMessage("ship:start", window.location.origin);
            }
          }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950/80" />
      <Reveal className="relative mx-auto max-w-[1320px] px-5 pt-24 sm:px-8 md:pt-32">
        <p className="eyebrow mb-5" data-reveal="rise">{s.eyebrow}</p>
        <p className="h2 max-w-[24ch] text-[clamp(30px,3.6vw,54px)] text-paper" data-reveal="rise">
          {s.h2}
        </p>
        <p className="lede mt-6 max-w-[36rem]" data-reveal="rise">{s.body}</p>
      </Reveal>
    </section>
  );
}
