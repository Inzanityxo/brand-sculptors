"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import { en } from "@/content/en";
import { goToContact, scrollToId } from "@/lib/motion";

export function HeroButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Button variant="spark" onClick={goToContact}>
        {en.hero.primary}
        <span aria-hidden>→</span>
      </Button>
      <Button variant="glass" onClick={() => scrollToId("bottleneck")}>
        {en.hero.secondary}
      </Button>
    </div>
  );
}

/** Small portrait with name, shown above the headline on mobile, where the big visual sits further down. */
export function PortraitChip({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-royal-soft/40 shadow-[0_0_20px_rgba(75,72,255,.5)]">
        <Image src="/marco/headshot.png" alt="Marco Bednarz" fill sizes="44px" className="object-cover object-[50%_30%]" priority />
      </span>
      <span className="leading-tight">
        <span className="block text-[14px] font-semibold text-paper">{en.hero.portraitName}</span>
        <span className="block text-[12.5px] text-muted">{en.hero.portraitLine}</span>
      </span>
    </div>
  );
}
