"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useCallback, useRef, useState } from "react";
import { play } from "@/lib/sound";
import { prefersReducedMotion } from "@/lib/motion";

type Variant = "spark" | "glass" | "ghost";

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  magnetic?: boolean;
  /** Lab only: render a hover or pressed look without interaction. */
  forceState?: "hover" | "press";
  "aria-describedby"?: string;
};

type Spark = { id: number; x: number; y: number };

/**
 * Three variants. Magnetic hover (follows the cursor within 12px), a light sweep,
 * a press that scales to 0.97 and emits a small yellow spark, and quiet UI sound.
 */
export const Button = forwardRef<HTMLElement, Props>(function Button(
  {
    variant = "spark",
    children,
    href,
    onClick,
    type = "button",
    disabled,
    className = "",
    magnetic = true,
    forceState,
    ...rest
  },
  ref,
) {
  const local = useRef<HTMLElement | null>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      local.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = local.current!;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 12;
    const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 8;
    el.style.setProperty("--mx", `${dx.toFixed(1)}px`);
    el.style.setProperty("--my", `${dy.toFixed(1)}px`);
  };
  const onLeave = () => {
    local.current?.style.setProperty("--mx", "0px");
    local.current?.style.setProperty("--my", "0px");
  };
  const onEnter = () => {
    if (variant === "spark") play("tick");
  };
  const onDown = (e: React.PointerEvent) => {
    play("click");
    if (prefersReducedMotion()) return;
    const r = local.current!.getBoundingClientRect();
    const id = performance.now();
    setSparks((s) => [...s, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    window.setTimeout(() => setSparks((s) => s.filter((p) => p.id !== id)), 600);
  };

  const cls = [
    "btn",
    `btn-${variant}`,
    forceState === "hover" ? "is-hover" : "",
    forceState === "press" ? "is-press" : "",
    className,
  ].join(" ");

  const style =
    forceState === "press"
      ? ({ "--press": 0.97 } as React.CSSProperties)
      : forceState === "hover"
        ? ({ "--mx": "6px", "--my": "-2px" } as React.CSSProperties)
        : undefined;

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <AnimatePresence>
        {sparks.map((s) => (
          <SparkBurst key={s.id} x={s.x} y={s.y} />
        ))}
      </AnimatePresence>
    </>
  );

  const common = {
    className: cls,
    style,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    onPointerEnter: onEnter,
    onPointerDown: onDown,
    ...rest,
  };

  if (href) {
    return (
      <a ref={setRefs as React.Ref<HTMLAnchorElement>} href={href} onClick={onClick} {...common}>
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={setRefs as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...common}
    >
      {inner}
    </button>
  );
});

export function SparkBurst({ x, y, count = 8 }: { x: number; y: number; count?: number }) {
  return (
    <span className="pointer-events-none absolute z-20" style={{ left: x, top: y }} aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + 0.3;
        const d = 18 + (i % 3) * 7;
        return (
          <motion.span
            key={i}
            className="absolute block h-[3px] w-[3px] rounded-full bg-spark"
            style={{ boxShadow: "0 0 6px 1px rgba(255,204,77,.8)" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, opacity: 0, scale: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </span>
  );
}
