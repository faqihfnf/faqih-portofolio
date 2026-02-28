"use client";

import React from "react";
import { motion } from "framer-motion";
import { BriefcaseBusinessIcon, DownloadIcon, Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import ColourfulText from "@/components/ui/colourful-text";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useTypewriter } from "react-simple-typewriter";

export default function HeroSection() {
  const { t } = useTranslation();

  const [typeEffect] = useTypewriter({
    words: ["Certified HR Supervisor", "Full Stack Developer", "Tech Enthusiast", "Data Analyst"],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 100,
    delaySpeed: 1800,
  });

  const socialLinks = [
    { href: "https://github.com/faqihfnf", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/faqih-nur-fahmi-b51bb1ab/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.facebook.com/faqihnurfahmi", icon: Facebook, label: "Facebook" },
    { href: "https://www.youtube.com/@marifahid", icon: Youtube, label: "YouTube" },
    { href: "https://www.instagram.com/faqih.fnf", icon: Instagram, label: "Instagram" },
  ];

  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] dark:bg-black/[0.96] antialiased relative overflow-hidden">
      {/* Grid background */}
      <div
        className={cn("pointer-events-none absolute inset-0 select-none", "[background-size:60px_60px]", "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]")}
      />

      {/* Glow blob */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />

      <Spotlight />

      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-36 md:pt-0 flex flex-col items-center text-center">
        {/* Nama utama */}
        <motion.h1
          className="text-4xl sm:text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-600 bg-opacity-50 mt-10 md:mt-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ColourfulText text={t("hero.title")} />
        </motion.h1>

        {/* Typewriter — ukuran & warna sama seperti sebelumnya */}
        <motion.h1
          className="flex items-center py-5 sm:py-10 justify-center text-3xl sm:text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 bg-opacity-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span>{typeEffect}</span>
          {/* Blinking cursor solid — lebih terlihat dari animate-pulse */}
          <span className="inline-block w-[4px] h-[0.85em] bg-indigo-500 ml-1 align-middle rounded-sm" style={{ animation: "blink 0.75s step-end infinite" }} />
        </motion.h1>

        {/* Description */}
        <motion.h2 className="font-normal text-sm sm:text-lg text-white lg:max-w-2xl max-w-sm text-center mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {t("hero.description")}
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div className="flex justify-center space-x-4 mt-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
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
        </motion.div>

        {/* Divider */}
        <motion.div className="w-48 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mt-10 mb-10" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />

        {/* Social Links */}
        <motion.div className="flex justify-center space-x-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-slate-400 hover:text-indigo-500 hover:scale-125 transition-all duration-200">
              <Icon className="w-6 h-6" />
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Blinking cursor keyframes */}
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
