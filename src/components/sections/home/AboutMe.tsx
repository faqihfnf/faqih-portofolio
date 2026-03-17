"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";

export default function AboutMe() {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <motion.h2 className="text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            {t("about.title")}
          </motion.h2>
          <motion.p className="text-lg max-w-2xl mx-auto mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            {t("about.description")}
          </motion.p>
        </div>
        {/* Profile & Text */}
        <motion.div className="" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-8 items-center">
            {/* Profile Image */}
            <div className="w-full flex justify-center md:justify-end mb-8 md:mb-0 md:mx-0 order-1 md:order-2">
              {/* Container Utama (Ukuran disamakan di sini) */}
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
                        "40 10 5 10 15 10 2 10 25 10 5 10", // Kondisi Awal: Garis panjang dan bervariasi
                        "5 35 1 25 4 25 1 25 5 35 1 25", // Kondisi Mentok: Garis mengecil, jarak/celah membesar
                      ],
                    }}
                    // Transition disamakan persis dengan SVG di atas agar sinkron
                    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                </motion.svg>

                {/* Container Gambar Profil */}
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src="/photo.png" alt="Faqih Nur Fahmi" width={400} height={400} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>

            {/* About Text */}
            <motion.p
              className="text-lg text-justify items-center justify-center flex text-slate-600 dark:text-slate-300 mb-6 leading-8 order-2 md:order-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {t("about.content")}
            </motion.p>
          </div>
        </motion.div>
        <motion.div className=" gap-12 items-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
            {/* Stat 1: Pengalaman HR */}
            <div className="md:flex items-center justify-start gap-3 md:gap-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                <CountUp end={9} duration={5} suffix="+" enableScrollSpy scrollSpyOnce />
              </div>
              <div className="flex flex-col md:text-left text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                <span>{t("about.stats-1-a")}</span>
                <span>{t("about.stats-1-b")}</span>
              </div>
            </div>

            {/* Stat 2: Tech Stack */}
            <div className="md:flex items-center justify-start gap-3 md:gap-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-pink-600 dark:text-pink-400">
                <CountUp end={10} duration={4} suffix="+" enableScrollSpy scrollSpyOnce />
              </div>
              <div className="flex flex-col md:text-left text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                <span>{t("about.stats-2-a")}</span>
                <span>{t("about.stats-2-b")}</span>
              </div>
            </div>

            {/* Stat 3: Project Selesai */}
            <div className="md:flex items-center justify-start gap-3 md:gap-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
                <CountUp end={15} duration={4} suffix="+" enableScrollSpy scrollSpyOnce />
              </div>
              <div className="flex flex-col md:text-left text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                <span>{t("about.stats-3-a")}</span>
                <span>{t("about.stats-3-b")}</span>
              </div>
            </div>

            {/* Stat 4: GitHub Commits */}
            <div className="md:flex items-center justify-start gap-3 md:gap-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-purple-600 dark:text-purple-400">
                <CountUp end={1000} duration={4} suffix="+" enableScrollSpy scrollSpyOnce />
              </div>
              <div className="flex flex-col md:text-left text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
                <span>{t("about.stats-4-a")}</span>
                <span>{t("about.stats-4-b")}</span>
              </div>
            </div>
          </div>
          {/* Motto/Tagline */}
          <div className="text-left order-2 md:order-1 mt-10 md:mt-16">
            <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}>
              <div className="text-center md:text-left">
                <blockquote className="text-2xl font-medium text-slate-800 dark:text-slate-200 italic border-l-4 leading-relaxed border-indigo-600 pl-4">
                  &quot;{t("about.quote-1")} <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{t("about.quote-2")}</span>, {t("about.quote-3")}{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t("about.quote-4")}</span>, {t("about.quote-5")} <span className="text-pink-600 font-semibold dark:text-pink-400">{t("about.quote-6")}</span>.&quot;
                </blockquote>
                <p className="text-sm text-slate-500 dark:text-slate-300 mt-2">- My Work Philosophy</p>
              </div>
            </motion.div>

            {/* Additional Info Cards */}
            <motion.div className="grid md:grid-cols-3 gap-6 mt-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} viewport={{ once: true }}>
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
