"use client";

import { Target, Repeat, BarChart3 } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Eyebrow } from "@/components/shared/eyebrow";
import { StaggerContainer, StaggerItem } from "@/components/shared/stagger-container";

const outcomes = [
  {
    icon: Target,
    title: "Your content attracts the right people.",
    description:
      "Stop creating for vanity metrics. Every piece is engineered to start conversations with decision-makers. Not followers. Not likes. Conversations that lead to revenue.",
  },
  {
    icon: Repeat,
    title: "Your team runs the system without you.",
    description:
      "After 8 weeks, your team owns the playbook. No dependency. No guesswork. Complete self-sufficiency. You move on to growing the business while the content engine runs.",
  },
  {
    icon: BarChart3,
    title: "Your pipeline becomes predictable.",
    description:
      "From random posting to a system that generates qualified leads on repeat. Backed by data from 35M+ monthly impressions. Not hope. Not hustle. A system.",
  },
];

export function Solution() {
  return (
    <SectionWrapper>
      <AnimatedSection>
        <div className="max-w-[700px] mx-auto text-center mb-16">
          <Eyebrow>The Shift</Eyebrow>
          <h2 className="text-h2 text-foreground font-bold mb-6">
            What changes when the system clicks.
          </h2>
        </div>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto mb-16">
        {outcomes.map((outcome, i) => {
          const Icon = outcome.icon;
          return (
            <StaggerItem key={i}>
              <div className="glass-card rounded-2xl p-8 h-full">
                <Icon
                  size={24}
                  className="text-brand-blue mb-5"
                  strokeWidth={1.5}
                />
                <h3 className="text-foreground font-bold text-lg mb-3">
                  {outcome.title}
                </h3>
                <p className="text-muted-foreground text-small leading-relaxed">
                  {outcome.description}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <AnimatedSection delay={0.3}>
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-body text-muted-foreground">
            Whether you are building your personal brand or scaling your team&apos;s
            content marketing. Strategy sessions, system installation, or hands-on
            execution. Whatever you need to move.
          </p>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
