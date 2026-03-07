"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Compass, Droplets, Users, HandHelping } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Eyebrow } from "@/components/shared/eyebrow";
import { TiltCard } from "@/components/shared/tilt-card";
import { StaggerContainer, StaggerItem } from "@/components/shared/stagger-container";

const painCards = [
  {
    icon: Eye,
    title: "The Invisible Expert",
    summary:
      "You are the best-kept secret in your industry. Competitors with half your expertise are getting all the attention.",
    detail:
      "You have years of experience. A proven track record. Real results for real clients. But your online presence does not reflect that. The people who need you most have never heard of you. Meanwhile, someone with a fraction of your skill posts one reel and books three calls.",
  },
  {
    icon: Compass,
    title: "Content Without Direction",
    summary:
      "You post because you know you should. But every piece feels like shouting into a void. No system. No strategy. No results.",
    detail:
      "You have tried being consistent. You have tried trending audio and carousel posts. But without a system that connects content to conversations, consistency is just organized noise. The effort is there. The direction is missing.",
  },
  {
    icon: Droplets,
    title: "The Lead Drought",
    summary:
      "Your pipeline depends on referrals and hope. One quiet month and the pressure becomes unbearable.",
    detail:
      "When the phone stops ringing, the doubt creeps in. You know your work is excellent. But your business depends on people remembering to recommend you. That is not a strategy. That is a prayer. And it does not scale.",
  },
  {
    icon: Users,
    title: "The Team Gap",
    summary:
      "Your marketing team posts content but cannot connect it to revenue. They need a system, not more tools.",
    detail:
      "Your team is talented. They create good-looking content. But there is no framework connecting posts to pipeline. No way to measure what drives leads and what burns budget. They are busy. But busy is not the same as effective.",
  },
  {
    icon: HandHelping,
    title: "The Delegation Trap",
    summary:
      "You hired an agency. They posted. Nothing changed. Because no one can tell your story better than you. They just need the right system.",
    detail:
      "Agencies promise results. They deliver posts. The gap between those two things is where your budget disappears. Your story, your expertise, your authenticity. That cannot be outsourced. But it can be systematized.",
  },
];

export function Problem() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <SectionWrapper id="problem" variant="muted">
      <AnimatedSection>
        <div className="max-w-[700px] mx-auto text-center mb-16">
          <Eyebrow>The Real Problem</Eyebrow>
          <h2 className="text-h2 text-foreground font-bold mb-6">
            You are brilliant at what you do. But nobody knows it.
          </h2>
          <p className="text-body text-muted-foreground">
            These are the five leaks killing your growth.
          </p>
        </div>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {painCards.map((card, i) => {
          const Icon = card.icon;
          const isExpanded = expanded === i;
          return (
            <StaggerItem key={i}>
              <TiltCard>
                <button
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  className="text-left w-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-sans font-bold text-brand-blue text-small">
                      0{i + 1}
                    </span>
                    <Icon
                      size={20}
                      className="text-muted-foreground"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-foreground font-bold text-lg mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-small leading-relaxed">
                    {card.summary}
                  </p>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground text-small leading-relaxed mt-4 pt-4 border-t border-border">
                        {card.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </SectionWrapper>
  );
}
