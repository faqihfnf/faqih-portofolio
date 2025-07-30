"use client";

import { motion } from "framer-motion";
import ExperienceTimeline from "@/components/sections/experiences/ExperienceTimeline";
import { getExperienceData } from "@/data/experiences";
import { useTranslation } from "react-i18next";

export default function ExperiencePage() {
  const { t } = useTranslation();
  const experiences = getExperienceData(t);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            {t("experience.title", "My Experience")}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            {t(
              "experience.subtitle",
              "My professional journey in web development, from junior developer to senior full-stack engineer."
            )}
          </motion.p>
        </div>

        <ExperienceTimeline experiences={experiences} />
      </div>
    </div>
  );
}
