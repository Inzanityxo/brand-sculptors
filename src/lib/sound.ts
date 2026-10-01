"use client";

// UI sound. Off by default, the choice is saved in localStorage.
// Every sound has a Web Audio placeholder. To use a real file, drop it into /public/sounds/
// and set its path below; it then plays through Howler.

import { useSyncExternalStore } from "react";

export type SoundName =
  | "tick"
  | "click"
  | "whoosh"
  | "paper"
  | "chime"
  | "success"
  | "jingle";

export const SOUND_FILES: Partial<Record<SoundName, string>> = {
  // tick: "/sounds/tick.mp3",
};

const VOLUME: Record<SoundName, number> = {
  tick: 0.2,
  click: 0.28,
  whoosh: 0.32,
  paper: 0.25,
  chime: 0.3,
  success: 0.32,
  jingle: 0.3,
};

const KEY = "bs-sound";
let enabled = false;
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  enabled = window.localStorage.getItem(KEY) === "on";
}

export function isSoundOn() {
  return enabled;
}

export function setSound(on: boolean) {
  enabled = on;
  try {
    window.localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  listeners.forEach((l) => l());
  if (on) play("click");
}

export function useSound() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => enabled,
    () => false,
  );
}

let ctx: AudioContext | null = null;
function audio() {
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  dur: number,
  vol: number,
  type: OscillatorType = "sine",
  at = 0,
  slideTo?: number,
) {
  const c = audio();
  const t = c.currentTime + at;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.012, dur / 4));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise(dur: number, vol: number, from: number, to: number, q = 0.8) {
  const c = audio();
  const t = c.currentTime;
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = q;
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.35);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(c.destination);
  src.start(t);
  src.stop(t + dur);
}

const synth: Record<SoundName, (v: number) => void> = {
  tick: (v) => tone(2200, 0.045, v * 0.5, "sine"),
  click: (v) => {
    tone(520, 0.09, v, "triangle", 0, 380);
    tone(1040, 0.05, v * 0.4, "sine");
  },
  whoosh: (v) => {
    noise(0.9, v, 180, 2400, 0.7);
    tone(70, 0.9, v * 0.8, "sine", 0, 140);
  },
  paper: (v) => noise(0.22, v * 0.8, 3000, 1400, 1.4),
  chime: (v) => {
    tone(880, 0.28, v * 0.7, "sine");
    tone(1318.5, 0.28, v * 0.5, "sine", 0.06);
  },
  success: (v) => {
    tone(659.3, 0.18, v * 0.6, "sine");
    tone(987.8, 0.26, v * 0.6, "sine", 0.08);
  },
  jingle: (v) => {
    const notes = [523.3, 659.3, 784, 1046.5, 784, 1046.5];
    notes.forEach((n, i) => tone(n, 0.12, v * 0.5, "square", i * 0.11));
  },
};

type HowlLike = { play: () => void; volume: (v: number) => void };
const howls: Partial<Record<SoundName, HowlLike>> = {};

export function play(name: SoundName) {
  if (!enabled || typeof window === "undefined") return;
  const file = SOUND_FILES[name];
  try {
    if (file) {
      const cached = howls[name];
      if (cached) return cached.play();
      void import("howler").then(({ Howl }) => {
        const h = new Howl({ src: [file], volume: VOLUME[name] });
        howls[name] = h;
        h.play();
      });
      return;
    }
    synth[name](VOLUME[name]);
  } catch {
    // Audio is decoration. A failure never breaks the page.
  }
}
