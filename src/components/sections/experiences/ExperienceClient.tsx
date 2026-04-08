"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ExperienceTimeline from "@/components/sections/experiences/ExperienceTimeline";
import { getExperienceData } from "@/data/experiences"; // Sesuaikan path jika berbeda
import { useTranslation } from "react-i18next";
import { Briefcase, SquareTerminal, Terminal } from "lucide-react"; // Icon untuk tombol

export default function ExperienceClient() {
  const { t } = useTranslation();

  // Ambil dua data tersebut
  const { hrExperiences, techExperiences } = getExperienceData(t);

  // State untuk melacak tab yang aktif (default: hr)
  const [activeTab, setActiveTab] = useState<"hr" | "tech">("hr");

  // Tentukan data mana yang akan dikirim ke timeline berdasarkan tab yang aktif
  const currentExperiences = activeTab === "hr" ? hrExperiences : techExperiences;

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 className="sm:text-4xl text-3xl font-bold mb-4 text-slate-900 dark:text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {t("experience.title")}
          </motion.h1>
          <motion.p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {t("experience.description")}
          </motion.p>
        </div>

        {/* Tombol Toggle (Tab) */}
        <motion.div className="flex justify-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="bg-slate-200/50 cursor-pointer dark:bg-slate-800/50 p-1.5 rounded-xl inline-flex shadow-inner">
            <button
              onClick={() => setActiveTab("hr")}
              className={`flex cursor-pointer items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-40 sm:w-48 ${
                activeTab === "hr" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <Briefcase size={18} />
              HR Journey
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`flex cursor-pointer items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-40 sm:w-48 ${
                activeTab === "tech" ? "bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <SquareTerminal size={18} />
              Tech Journey
            </button>
          </div>
        </motion.div>

        {/* Timeline Container (Gunakan key agar animasi ke-reset saat ganti tab) */}
        <div key={activeTab}>
          <ExperienceTimeline activeTab={activeTab} experiences={currentExperiences} />
        </div>
      </div>
    </div>
  );
}
