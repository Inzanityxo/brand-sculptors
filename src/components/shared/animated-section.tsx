"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "scaleIn" | "fadeIn";
}

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={variants[variant].hidden}
      whileInView={variants[variant].visible}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
