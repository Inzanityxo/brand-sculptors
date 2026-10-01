"use client";

import { Fragment } from "react";

export type NoteTone = "warm" | "warm2" | "cool" | "cool2" | "cool3" | "proof";

export function StickyNote({
  tone,
  children,
  rotate = 0,
  className = "",
  style,
  pin = false,
}: {
  tone: NoteTone;
  children: React.ReactNode;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
  pin?: boolean;
}) {
  return (
    <div
      className={`note note-${tone} relative px-3.5 py-3 ${className}`}
      style={{ transform: rotate ? `rotate(${(rotate * 0.25).toFixed(2)}deg)` : undefined, ...style }}
      data-pin={pin || undefined}
    >
      {children}
    </div>
  );
}

/**
 * Renders copy and turns [CONFIRM ...] (and [PROOF]) into small yellow tags.
 * They stay visible on purpose until Marco replaces them with confirmed facts.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\[(?:PROOF|CONFIRM)[^\]]*\])/g);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        /^\[(PROOF|CONFIRM)/.test(p) ? (
          <span
            key={i}
            title={p.slice(1, -1)}
            className="mx-1 inline-block rounded-[4px] border border-dashed border-spark/70 bg-spark/10 px-1.5 py-[1px] align-middle font-mono text-[10px] font-normal tracking-[0.08em] text-spark normal-case [.on-paper_&]:border-[#a67600] [.on-paper_&]:bg-[#ffcc4d]/40 [.on-paper_&]:text-note-ink"
          >
            {p.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </span>
  );
}

/** 8-bit progress bar. One of the allowed pixel moments. */
export function PixelBar({
  label,
  value,
  blocks = 16,
  className = "",
}: {
  label: string;
  value: number;
  blocks?: number;
  className?: string;
}) {
  const filled = Math.round(Math.max(0, Math.min(1, value)) * blocks);
  return (
    <div
      className={`pixel inline-flex items-center gap-3 text-[11px] text-paper ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <span>{label}</span>
      <span className="flex gap-[3px] border-2 border-paper/70 p-[3px]">
        {Array.from({ length: blocks }).map((_, i) => (
          <span
            key={i}
            className={`block h-[9px] w-[6px] ${i < filled ? (i >= blocks - 2 ? "bg-spark" : "bg-royal-glow") : "bg-paper/10"}`}
          />
        ))}
      </span>
      <span className="w-9 text-right tabular-nums">{Math.round(value * 100)}%</span>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-5">{children}</p>;
}
