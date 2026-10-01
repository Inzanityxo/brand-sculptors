"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { en } from "@/content/en";

/** Right under the hero: who builds this. The stage photo carries the trust, the text stays short. */
export function Intro() {
  const t = en.intro;
  return (
    <section id="about-short" className="relative border-y border-line bg-ink-900">
      <Reveal className="mx-auto grid max-w-[1320px] items-center gap-8 px-5 py-14 sm:px-8 md:grid-cols-[280px_1fr] md:gap-12 md:py-16">
        <div data-reveal="wipe" className="relative aspect-square overflow-hidden rounded-[22px] border border-paper/10 shadow-[0_0_0_1px_rgba(75,72,255,.25),0_30px_80px_-30px_rgba(75,72,255,.6)] md:aspect-[4/5]">
          <Image src="/marco/headshot.png" alt="Portrait of Marco Bednarz" fill sizes="280px" className="object-cover object-[50%_30%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
        </div>
        <div>
          <p className="eyebrow mb-4" data-reveal="rise">{t.eyebrow}</p>
          <p className="h3 text-paper" data-reveal="rise">{t.title}</p>
          <p className="lede mt-4 max-w-[44rem]" data-reveal="rise">{t.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2" data-reveal="rise">
            {t.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-paper/12 px-3 py-1 font-mono text-[12px] text-muted">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
