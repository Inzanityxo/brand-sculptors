"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { CALENDLY_URL } from "@/lib/constants";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[100dvh] flex items-center px-[clamp(1.5rem,5vw,6rem)] z-10"
    >
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-28 pb-16">
        {/* Text column */}
        <div className="flex flex-col items-start">
          <motion.h1
            className="text-display text-foreground font-bold mb-6"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            The fire of authentic storytelling.
            <br />
            The precision of content-marketing systems.
          </motion.h1>

          <motion.p
            className="text-body text-muted-foreground max-w-[540px] mb-10"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            We help experts and business owners turn their expertise into a
            predictable stream of qualified leads. Backed by data from 35M+ monthly
            organic impressions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <MagneticButton href={CALENDLY_URL}>
              Book a Discovery Call
            </MagneticButton>
            <a
              href="#problem"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-bold border border-border text-foreground hover:bg-muted transition-colors"
            >
              Learn More
            </a>
          </motion.div>

          <motion.span
            className="text-small text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Free 30-minute call. No strings attached.
          </motion.span>
        </div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ y: imageY }}
        >
          <Image
            src="/images/marco_hero.png"
            alt="Marco Bednarz"
            width={800}
            height={450}
            className="rounded-2xl border-2 border-border object-cover w-full aspect-video"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
