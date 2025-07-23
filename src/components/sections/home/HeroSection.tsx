"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusinessIcon,
  DownloadIcon,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import ColourfulText from "@/components/ui/colourful-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function HeroSection() {
  const words = `I create beautiful and functional web applications using modern technologies to help and solve the problems. Passionate about user experience and innovative solutions.`;

  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="blue" />
      <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="indigo" />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <motion.h1
          className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-600 bg-opacity-50 mt-10 md:mt-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          Faqih Nur Fahmi
        </motion.h1>

        <motion.h1
          className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-600 bg-opacity-50 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <ColourfulText text="Full Stack Developer" />
        </motion.h1>

        <TextGenerateEffect
          words={words}
          className="mt-6 font-normal text-white lg:max-w-2xl max-w-sm text-center mx-auto"
          filter={true}
          duration={1}
        />

        <motion.div
          className="flex justify-center space-x-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}>
          <Link
            href="/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#5907e8,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-slate-100 font-semibold">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Resume
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-12 animate-shimmer-reverse items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#047687,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-slate-100 font-semibold">
            <BriefcaseBusinessIcon className="mr-2 h-4 w-4" /> Projects
          </Link>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}>
          <Link
            href="https://github.com/faqihfnf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/faqih-nur-fahmi-b51bb1ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link
            href="mailto:faqih.fnf@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
