import { Footer, Nav } from "@/components/Chrome";
import { Audience } from "@/sections/Audience";
import { Connects } from "@/sections/Connects";
import { Contact } from "@/sections/Contact";
import { FireCode } from "@/sections/FireCode";
import { FitCheck } from "@/sections/FitCheck";
import { HeroIgnition } from "@/sections/HeroIgnition";
import { Intro } from "@/sections/Intro";
import { Learn } from "@/sections/Learn";
import { OwnWords } from "@/sections/OwnWords";
import { Roles } from "@/sections/Roles";
import { Steer } from "@/sections/Steer";
import { WhyNow } from "@/sections/WhyNow";
import { Workflow } from "@/sections/Workflow";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <HeroIgnition />
        <Learn />
        <Intro />
        <Workflow />
        <Roles />
        <Connects />
        <Audience />
        <FireCode />
        <Steer />
        <OwnWords />
        <WhyNow />
        <FitCheck />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
