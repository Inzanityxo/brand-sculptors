"use client";

import Image from "next/image";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AnimatedSection } from "@/components/shared/animated-section";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { CALENDLY_URL } from "@/lib/constants";

export function CTASection() {
  return (
    <SectionWrapper className="border-t border-border">
      <AnimatedSection>
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-h2 text-foreground font-bold mb-6">
            Your expertise deserves to be seen.
          </h2>
          <p className="text-muted-foreground text-body mb-10">
            Book a free 30-minute Discovery Call. No pitch. No pressure. Just an
            honest look at where your content is leaking leads.
          </p>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/marco_hero.png"
                alt="Marco Bednarz"
                width={48}
                height={48}
                className="rounded-full border border-border object-cover"
              />
              <MagneticButton href={CALENDLY_URL}>
                Book a Discovery Call
              </MagneticButton>
            </div>
            <span className="text-small text-muted-foreground">
              Free. No strings attached.
            </span>
          </div>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
