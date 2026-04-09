"use client";

import { BriefcaseBusinessIcon, DownloadIcon, Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import ColourfulText from "@/components/ui/colourful-text";
import { useTranslation } from "react-i18next";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import FallingBeams from "@/components/ui/falling-beams";
import TypeIt from "typeit-react";

export default function HeroSection() {
  const { t } = useTranslation();

  const socialLinks = [
    { href: "https://github.com/faqihfnf", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/faqih-nur-fahmi-b51bb1ab/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.facebook.com/faqihnurfahmi", icon: Facebook, label: "Facebook" },
    { href: "https://www.youtube.com/@marifahid", icon: Youtube, label: "YouTube" },
    { href: "https://www.instagram.com/faqih.me", icon: Instagram, label: "Instagram" },
  ];

  return (
    <div className="min-h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] dark:bg-black/[0.96] antialiased relative overflow-hidden">
      {/* Glow blob */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />

      {/* Animasi Background */}
      <ShootingStars />
      <StarsBackground />
      <FallingBeams />

      {/* Content */}
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-36 md:pt-0 flex flex-col items-center text-center">
        {/* Nama utama */}
        <h1 className="text-4xl sm:text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-600 bg-opacity-50 mt-10 md:mt-28 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ColourfulText text={t("hero.title")} />
        </h1>

        {/* Typewriter - TypeIt.js */}
        <h1 className="py-5 sm:py-10 text-3xl sm:text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 bg-opacity-50">
          <TypeIt
            getBeforeInit={(instance) => {
              instance
                .type("Certified HR Supervisor")
                .pause(1800)
                .delete()
                .pause(300)
                .type("Full Stack Developer")
                .pause(1800)
                .delete()
                .pause(300)
                .type("Tech Enthusiast")
                .pause(1800)
                .delete()
                .pause(300)
                .type("Data Analyst")
                .pause(1800)
                .delete()
                .pause(300);
              return instance;
            }}
            options={{
              speed: 100,
              deleteSpeed: 80,
              waitUntilVisible: true,
              loop: true,
              lifeLike: true,
            }}
          />
        </h1>

        {/* Description */}
        <h2 className="font-normal text-sm sm:text-lg text-white lg:max-w-4xl max-w-sm text-center mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">{t("hero.description")}</h2>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Link
            href="/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#5907e8,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-slate-100 font-semibold"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Resume
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-12 animate-shimmer-reverse items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#047687,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-slate-100 font-semibold"
          >
            <BriefcaseBusinessIcon className="mr-2 h-4 w-4" />
            Projects
          </Link>
        </div>

        {/* Divider */}
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mt-10 mb-10 animate-in fade-in duration-700 delay-500" />

        {/* Social Links */}
        <div className="flex justify-center space-x-6 animate-in fade-in duration-700 delay-500">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-slate-400 hover:text-indigo-500 hover:scale-125 transition-all duration-200">
              <Icon className="w-6 h-6" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
