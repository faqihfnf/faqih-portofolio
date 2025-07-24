"use client";

import AboutMe from "@/components/sections/home/AboutMe";
import CallToAction from "@/components/sections/home/CallToAction";
import GithubContribution from "@/components/sections/home/GithubContribution";
import HeroSection from "@/components/sections/home/HeroSection";
import MyServices from "@/components/sections/home/MyServices";
import TechStack from "@/components/sections/home/TechStack";
import GitHubCalendar from "react-github-calendar";

export default function Home() {
  return (
    <div className="relative dark:bg-black-100  justify-center items-center overflow-clip flex-col mx-auto ">
      {/* Hero Section */}
      <HeroSection />

      {/* My Services Section */}
      <MyServices />

      {/* Tech Stack Section */}
      <TechStack />

      {/* About Me Section */}
      <AboutMe />

      {/* GitHub Contributions Section */}
      <GithubContribution />

      {/* CTA Section */}
      <CallToAction />
    </div>
  );
}
