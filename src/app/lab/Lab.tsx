"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { SoundToggle } from "@/components/Chrome";
import { triggerGo } from "@/components/GoMode";
import { PixelBar, RichText, StickyNote } from "@/components/bits";
import { play, type SoundName } from "@/lib/sound";

const INK = [
  ["ink-950", "#07081A", "base background"],
  ["ink-900", "#0C0E26", "section surface"],
  ["ink-800", "#15183A", "raised cards"],
  ["royal", "#1210A1", "large fills and glows only"],
  ["royal-glow", "#4B48FF", "links, focus, active"],
  ["royal-soft", "#9A98FF", "small accent text"],
  ["spark", "#FFCC4D", "primary action, max 5 %"],
  ["paper", "#F4F1EA", "text, paper section"],
  ["muted", "#A3A6C2", "secondary text"],
] as const;

const NOTES = [
  ["warm", "human"],
  ["warm2", "human"],
  ["cool", "system"],
  ["cool2", "system"],
  ["cool3", "system"],
  ["proof", "proof"],
] as const;

const SOUNDS: SoundName[] = ["tick", "click", "whoosh", "paper", "chime", "success", "jingle"];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14">
      <h2 className="eyebrow mb-8">{title}</h2>
      {children}
    </section>
  );
}

export function Lab() {
  return (
    <main className="glow-royal mx-auto max-w-[1200px] px-5 pb-32 pt-16 sm:px-8" style={{ "--glow-y": "200px" } as React.CSSProperties}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="pixel text-[12px] text-spark">/LAB</p>
          <h1 className="h2 mt-2 text-paper">Fire × Code design system</h1>
          <p className="mt-3 max-w-[40rem] text-muted">Every token and component in one place. Review here before any section changes.</p>
        </div>
        <div className="flex items-center gap-3">
          <SoundToggle />
          <Link href="/" className="font-mono text-[13px] text-royal-soft hover:text-paper">
            ← site
          </Link>
        </div>
      </div>

      <nav className="mt-8 flex flex-wrap gap-2 font-mono text-[13px]">
        {["a", "b", "c"].map((v) => (
          <Link key={v} href={`/?hero=${v}${v === "a" ? "&replay" : ""}`} className="rounded-full border border-paper/15 px-4 py-2 text-paper hover:border-royal-glow">
            Hero {v.toUpperCase()} ↗
          </Link>
        ))}
      </nav>

      <Block title="Color tokens">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INK.map(([name, hex, use]) => (
            <div key={name} className="overflow-hidden rounded-[14px] border border-line">
              <div className="h-20" style={{ background: hex }} />
              <div className="p-3">
                <p className="font-mono text-[12px] text-paper">{name}</p>
                <p className="font-mono text-[11px] text-muted">{hex}</p>
                <p className="mt-1 text-[12px] text-muted">{use}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[14px] bg-ink-900 p-5">
            <p className="text-[14px] text-royal-glow">royal-glow on ink: links and focus</p>
            <p className="text-[14px] text-royal-soft">royal-soft on ink: small accents</p>
            <p className="text-[14px] text-royal line-through opacity-80">royal on ink: never for text</p>
          </div>
          <div className="on-paper rounded-[14px] p-5">
            <p className="text-[14px] text-royal">royal on paper works as text</p>
            <p className="text-[14px] text-note-ink">note-ink #14142B on paper</p>
          </div>
        </div>
      </Block>

      <Block title="Sticky notes carry meaning">
        <div className="dot-grid flex flex-wrap gap-6 rounded-[20px] border border-line p-8">
          {NOTES.map(([tone, meaning]) => (
            <StickyNote key={tone} tone={tone} className="w-[150px] text-[15px]">
              {meaning}
              <span className="mt-2 block font-mono text-[10px] opacity-70">note-{tone}</span>
            </StickyNote>
          ))}
        </div>
      </Block>

      <Block title="Typography">
        <div className="space-y-6">
          <p className="h1 text-paper">Geist H1</p>
          <p className="h2 text-paper">Geist H2, tracking -0.03em</p>
          <p className="h3 text-paper">Geist H3 for cards</p>
          <p className="lede max-w-[40rem]">Body and lede in Geist, 17 to 21px, line height 1.6, paper at 82 %.</p>
          <p className="eyebrow">Geist Mono eyebrow · system voice</p>
          <p className="neon-text-warm text-[24px] font-semibold">Neon accent for the human side</p>
          <p className="pixel text-[14px] text-spark">SILKSCREEN · PIXEL MICRO LABELS ONLY</p>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="grid gap-8 md:grid-cols-3">
          {(["spark", "glass", "ghost"] as const).map((v) => (
            <div key={v} className="space-y-4">
              <p className="font-mono text-[12px] text-muted">{v}</p>
              <div className="flex flex-col items-start gap-3">
                <Button variant={v}>Default</Button>
                <Button variant={v} forceState="hover">
                  Hover
                </Button>
                <Button variant={v} forceState="press">
                  Pressed
                </Button>
                <Button variant={v} disabled>
                  Disabled
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[14px] text-muted">Live: move the mouse over a button (magnetic within 12px, light sweep) and press it (0.97 and a yellow spark). Turn sound on to hear tick and click.</p>
      </Block>

      <Block title="Copy markers">
        <p className="text-paper">
          <RichText text="I reply within two working days [CONFIRM reply time]." />
        </p>
        <p className="mt-2 text-[14px] text-muted">Every [CONFIRM] in the content files renders like this until Marco replaces it.</p>
      </Block>

      <Block title="Pixel layer (10 %)">
        <div className="space-y-5">
          <PixelBar label="SYSTEM LOADING" value={0.42} />
          <PixelBar label="LEVERAGE" value={0.03} />
          <div>
            <Button variant="glass" onClick={triggerGo}>
              Trigger GO mode (or press G three times)
            </Button>
          </div>
        </div>
      </Block>

      <Block title="Sound (off by default)">
        <div className="flex flex-wrap gap-2">
          {SOUNDS.map((s) => (
            <button key={s} type="button" onClick={() => play(s)} className="rounded-full border border-paper/15 px-4 py-2 font-mono text-[13px] text-paper hover:border-royal-glow">
              ▶ {s}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[14px] text-muted">Turn sound on with the toggle at the top first. Placeholders are Web Audio, replacements go into /public/sounds.</p>
      </Block>
    </main>
  );
}
