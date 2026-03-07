"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Counter } from "@/components/shared/counter";
import { STATS } from "@/lib/constants";

export function ProofBar() {
  return (
    <div className="relative z-10 w-full bg-muted/50 py-8 px-[clamp(1.5rem,5vw,6rem)] overflow-hidden">
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            {STATS.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <Counter
                  target={item.numericTarget}
                  suffix={item.suffix}
                  className="font-sans font-bold text-foreground text-[1.75rem] leading-tight mb-1"
                />
                <span className="text-muted-foreground text-small">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
