"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { en } from "@/content/en";
import { goToContact } from "@/lib/motion";
import { setSound, useSound } from "@/lib/sound";
import { Button } from "./Button";
import { triggerGo } from "./GoMode";

export function SoundToggle() {
  const on = useSound();
  return (
    <button
      type="button"
      onClick={() => setSound(!on)}
      aria-pressed={on}
      aria-label={on ? en.nav.soundOff : en.nav.soundOn}
      title={on ? en.nav.soundOff : en.nav.soundOn}
      className="group inline-flex h-10 items-center gap-2 rounded-full border border-paper/12 px-3 text-paper/80 transition-colors hover:border-royal-glow/60 hover:text-paper"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        {!on && <path d="M16 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
      </svg>
      {on && (
        <span className="flex h-[14px] items-end gap-[2px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="block w-[3px] bg-spark"
              style={{
                height: 6,
                animation: `eq 0.${7 + i}s steps(3) ${i * 0.08}s infinite alternate`,
              }}
            />
          ))}
        </span>
      )}
      <style>{`@keyframes eq{from{height:3px}to{height:14px}}`}</style>
    </button>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-line bg-ink-950/88 backdrop-blur-xl" : "border-b border-transparent"}`}
    >
      <nav className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8" aria-label="Main">
        <Link href="/" className="flex items-center gap-3 text-paper">
          <Image src="/brand/logo-mark.png" alt="" width={28} height={28} priority unoptimized />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">{en.nav.brand}</span>
        </Link>
        <ul className="hidden items-center gap-7 text-[14px] text-muted lg:flex">
          {en.nav.links.map((l) => (
            <li key={l.href}>
              <a className="transition-colors hover:text-paper" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <SoundToggle />
          <Button variant="spark" onClick={goToContact} className="hidden min-h-10 px-4 text-[14px] sm:inline-flex">
            {en.nav.cta}
          </Button>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950 px-5 py-10 text-[14px] text-muted sm:px-8">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p>{en.footer.line}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link className="hover:text-paper" href="/impressum">
            {en.footer.impressum}
          </Link>
          <Link className="hover:text-paper" href="/datenschutz">
            {en.footer.datenschutz}
          </Link>
          <button
            type="button"
            onClick={triggerGo}
            aria-label={en.footer.rocket}
            title="?"
            className="opacity-50 transition-opacity hover:opacity-100"
          >
            <PixelRocket />
          </button>
        </div>
      </div>
    </footer>
  );
}

function PixelRocket() {
  // 8 x 10 pixel rocket
  const rows = [
    "...##...",
    "..####..",
    "..#..#..",
    "..####..",
    "..####..",
    ".######.",
    "##.##.##",
    "...##...",
    "..#..#..",
    "...##...",
  ];
  return (
    <svg width="16" height="20" viewBox="0 0 8 10" shapeRendering="crispEdges" aria-hidden>
      {rows.flatMap((r, y) =>
        r.split("").map((c, x) =>
          c === "#" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={y >= 8 ? "#FFCC4D" : "#F4F1EA"} />
          ) : null,
        ),
      )}
    </svg>
  );
}
