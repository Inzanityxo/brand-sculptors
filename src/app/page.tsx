import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { SocialProof } from "@/components/sections/social-proof";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <Problem />
      <Solution />
      <SocialProof />
      <CTASection />
    </>
  );
}
