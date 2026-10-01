"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import { useSyncExternalStore } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const EASE = "power3.out";
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

let lenis: Lenis | null = null;
export function setLenis(l: Lenis | null) {
  lenis = l;
}
export function getLenis() {
  return lenis;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useReducedMotionPref() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => prefersReducedMotion(),
    () => false,
  );
}

export function useIsMobile(breakpoint = 768) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches,
    () => false,
  );
}

/** Scroll smoothly to the contact form and focus the first field. */
export function goToContact() {
  const target = document.getElementById("contact");
  if (!target) {
    window.location.href = "/#contact";
    return;
  }
  const focus = () => {
    const first = target.querySelector<HTMLInputElement>("input[name='name']");
    first?.focus({ preventScroll: true });
  };
  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4, onComplete: focus });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    window.setTimeout(focus, prefersReducedMotion() ? 0 : 700);
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis && !prefersReducedMotion()) lenis.scrollTo(el, { duration: 1.2 });
  else el.scrollIntoView();
}

let refreshTimer: number | null = null;
/**
 * Pins created after other pins (for example after a media query flips) shift every later
 * section. Every pinned trigger gets a refreshPriority in page order (earlier section = higher),
 * and this recomputes all positions once the pins exist.
 */
export function refreshPins() {
  if (typeof window === "undefined") return;
  if (refreshTimer) window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    try {
      ScrollTrigger.refresh();
    } catch {
      // a refresh during hot reload can hit a trigger that is already gone; the next one fixes it
    }
  }, 80);
}

/** refreshPriority per pinned section, in page order. Earlier sections refresh first. */
export const PIN_PRIORITY = { heroBoard: 30, roles: 20, fireCode: 10 } as const;
