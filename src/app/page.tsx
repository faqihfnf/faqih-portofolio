"use client";

import HeroSection from "@/components/sections/home/HeroSection";
import MyServices from "@/components/sections/home/MyServices";

export default function Home() {
  return (
    <div className="relative dark:bg-black-100  justify-center items-center overflow-clip flex-col mx-auto ">
      {/* Hero Section */}
      <HeroSection />

      {/* My Services Section */}
      <MyServices />

      {/* Tech Stack Section */}
      {/* <TechStack /> */}

      {/* About Me Section */}
      {/* <AboutMe /> */}

      {/* CTA Section */}
      {/* <CallToAction /> */}
    </div>
  );
}
