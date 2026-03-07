"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function Counter({ target, suffix = "", duration = 2, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 100,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const rounded = Math.round(latest);
        if (rounded >= 1000) {
          ref.current.textContent = `${(rounded / 1000).toFixed(rounded >= 10000 ? 0 : 1).replace(/\.0$/, "")}K${suffix ? "+" : ""}`;
        } else if (rounded >= 1000000) {
          ref.current.textContent = `${(rounded / 1000000).toFixed(0)}M${suffix ? "+" : ""}`;
        } else {
          ref.current.textContent = `${rounded.toLocaleString()}${suffix}`;
        }
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      0
    </motion.span>
  );
}
