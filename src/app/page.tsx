"use client";

import AboutMe from "@/components/sections/home/AboutMe";
import CallToAction from "@/components/sections/home/CallToAction";
import GithubContribution from "@/components/sections/home/GithubContribution";
import HeroSection from "@/components/sections/home/HeroSection";
import MyServices from "@/components/sections/home/MyServices";
import TechStack from "@/components/sections/home/TechStack";
import Testimonials from "@/components/sections/home/Testimonials";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="relative dark:bg-black-100 justify-center items-center overflow-clip flex-col mx-auto ">
      {/* Global StarsBackground - covers entire page in dark mode */}
      <div className="fixed inset-0 pointer-events-none dark:block hidden">
        <StarsBackground className="opacity-60" />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* My Services Section */}
      <MyServices />

      {/* Tech Stack Section */}
      <TechStack />

      {/* About Me Section */}
      <AboutMe />

      {/* Testimonials Section */}
      <Testimonials />

      {/* GitHub Contributions Section */}
      <GithubContribution />

      {/* CTA Section */}
      <CallToAction />
    </div>
  );
}
