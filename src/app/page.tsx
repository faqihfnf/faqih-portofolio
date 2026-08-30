"use client";

import AboutMe from "@/components/sections/home/AboutMe";
import CallToAction from "@/components/sections/home/CallToAction";
import GithubContribution from "@/components/sections/home/GithubContribution";
import HeroSection from "@/components/sections/home/HeroSection";
import MyServices from "@/components/sections/home/MyServices";
import TechStack from "@/components/sections/home/TechStack";
import Testimonials from "@/components/sections/home/Testimonials";
import EditorialTheme from "@/components/editorial/EditorialTheme";
import { fraunces, inter } from "@/components/editorial/fonts";

export default function Home() {
  return (
    <div className={`${fraunces.variable} ${inter.variable} editorial min-h-screen`}>
      <EditorialTheme />

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
