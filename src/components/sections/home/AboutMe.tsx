"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default function AboutMe() {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Header - 800ms delay */}
        <div className="text-center mb-4">
          <AnimateOnScroll animation="fade-up" delay={0}>
            <h2 className="text-4xl font-bold mb-4">
              {t("about.title")} <span className="text-indigo-700 dark:text-indigo-500">{t("about.title-1")}</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200}>
            <p className="text-lg max-w-4xl mx-auto mb-10">
              {t("about.description")}
            </p>
          </AnimateOnScroll>
        </div>

        {/* Profile & Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-8 items-center">
          {/* Profile Image - muncul dari kanan, posisi kanan di desktop */}
          <AnimateOnScroll animation="slide-right" delay={200} className="order-1 md:order-2">
            <div className="w-full flex justify-center md:justify-end mb-8 md:mb-0 md:mx-0">
              <div className="relative flex items-center justify-center w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
                {/* Animasi Garis Putus-putus (Indigo) */}
                <motion.svg
                  className="absolute inset-0 w-full h-full text-indigo-500 dark:text-indigo-400 scale-[1.03]"
                  viewBox="0 0 100 100"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                >
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="49"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "40 10 5 10 15 10 2 10 25 10 5 10" }}
                    animate={{
                      strokeDasharray: [
                        "40 10 5 10 15 10 2 10 25 10 5 10",
                        "5 35 1 25 4 25 1 25 5 35 1 25",
                      ],
                    }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                </motion.svg>

                {/* Container Gambar Profil */}
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src="/photo.png" alt="Faqih Nur Fahmi" width={400} height={400} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* About Text - muncul dari kiri, posisi kiri di desktop */}
          <AnimateOnScroll animation="slide-left" delay={200} className="order-2 md:order-1">
            <div className="relative z-10">
              <p className="text-lg text-justify text-slate-600 dark:text-slate-300 mb-6 leading-8">
                {t("about.content")}
              </p>
              <a
                href="https://www.faqih.me/blog/profil-faqih-nur-fahmi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                {t("about.read-more")}
                <ArrowRight className="mt-1 w-4 h-4" />
              </a>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Stats Section */}
        <AnimateOnScroll animation="fade-up" delay={400}>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
            {/* Stat 1: Pengalaman HR */}
            <div className="md:flex items-center justify-start gap-3 md:gap-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                <CountUp end={9} duration={3} suffix="+" enableScrollSpy scrollSpyOnce useEasing={false} separator="" />
              </div>
              <div className="flex flex-col md:text-left text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                <span>{t("about.stats-1-a")}</span>
                <span>{t("about.stats-1-b")}</span>
              </div>
            </div>

            {/* Stat 2: Tech Stack */}
            <div className="md:flex items-center justify-start gap-3 md:gap-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-pink-600 dark:text-pink-400">
                <CountUp end={10} duration={3} suffix="+" enableScrollSpy scrollSpyOnce useEasing={false} separator="" />
              </div>
              <div className="flex flex-col md:text-left text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                <span>{t("about.stats-2-a")}</span>
                <span>{t("about.stats-2-b")}</span>
              </div>
            </div>

            {/* Stat 3: Project Selesai */}
            <div className="md:flex items-center justify-start gap-3 md:gap-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
                <CountUp end={15} duration={3} suffix="+" enableScrollSpy scrollSpyOnce useEasing={false} separator="" />
              </div>
              <div className="flex flex-col md:text-left text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                <span>{t("about.stats-3-a")}</span>
                <span>{t("about.stats-3-b")}</span>
              </div>
            </div>

            {/* Stat 4: GitHub Commits */}
            <div className="md:flex items-center justify-start gap-3 md:gap-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-purple-600 dark:text-purple-400">
                <CountUp end={1000} duration={3} suffix="+" enableScrollSpy scrollSpyOnce useEasing={false} separator="" />
              </div>
              <div className="flex flex-col md:text-left text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                <span>{t("about.stats-4-a")}</span>
                <span>{t("about.stats-4-b")}</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Motto/Tagline */}
        <div className="text-left order-2 md:order-1 mt-10 md:mt-16">
          <AnimateOnScroll animation="fade-up" delay={600}>
            <div className="text-center md:text-left">
              <blockquote className="text-2xl font-medium text-slate-800 dark:text-slate-200 italic border-l-4 leading-relaxed border-indigo-600 pl-4">
                &quot;{t("about.quote-1")} <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{t("about.quote-2")}</span>, {t("about.quote-3")}{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t("about.quote-4")}</span>, {t("about.quote-5")} <span className="text-pink-600 font-semibold dark:text-pink-400">{t("about.quote-6")}</span>.&quot;
              </blockquote>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-2">- My Work Philosophy</p>
            </div>
          </AnimateOnScroll>

          {/* Additional Info Cards */}
          <AnimateOnScroll animation="fade-up" delay={800}>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-pink-500 transition-shadow duration-300 shadow-indigo-500">
                <div className="text-3xl mb-3 ">❤️</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t("about.add-title-1")}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t("about.add-desc-1")}</p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-pink-500 transition-shadow duration-300 shadow-teal-500">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t("about.add-title-2")}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t("about.add-desc-2")}</p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-indigo-500 transition-shadow duration-300 shadow-pink-500">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t("about.add-title-3")}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t("about.add-desc-3")}</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
