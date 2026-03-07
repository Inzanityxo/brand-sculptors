"use client";

import { TrendingUp, Clock } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Eyebrow } from "@/components/shared/eyebrow";

const proofs = [
  {
    icon: TrendingUp,
    title: "Quantum Leap Fitness \u00D7 Sjard Roscher",
    description:
      "Built a content system that generates 1,400+ qualified leads per month for one of Europe\u2019s leading fitness brands. 35M+ organic impressions. 6 channels. One system.",
  },
  {
    icon: Clock,
    title: "5+ Years in the Trenches",
    description:
      "Not theory. 5+ years of building, testing, and refining content systems across industries. 35M+ organic impressions. The data speaks.",
  },
];

export function SocialProof() {
  return (
    <SectionWrapper variant="muted">
      <AnimatedSection>
        <div className="max-w-[700px] mx-auto text-center mb-16">
          <Eyebrow>Track Record</Eyebrow>
          <h2 className="text-h2 text-foreground font-bold">
            This is not theory. This is what we do every day.
          </h2>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
        {proofs.map((proof, i) => {
          const Icon = proof.icon;
          return (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-8 hover:border-foreground/10 hover:-translate-y-1 transition-all duration-300 h-full">
                <Icon
                  size={24}
                  className="text-brand-blue mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-foreground font-bold text-lg mb-3">
                  {proof.title}
                </h3>
                <p className="text-muted-foreground text-body">
                  {proof.description}
                </p>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
