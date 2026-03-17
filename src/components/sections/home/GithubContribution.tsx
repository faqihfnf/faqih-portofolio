"use client";

import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function GithubContribution() {
  const { t } = useTranslation();
  return (
    <section className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <motion.h2 className="text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          {t("github.title")}
          <span className="text-indigo-700 dark:text-indigo-500">{t("github.title-1")}</span>
        </motion.h2>
        <motion.p className="text-lg max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          {t("github.description")}
        </motion.p>
      </div>

      <div className="overflow-x-auto flex items-center justify-center text-center bg-slate-900 rounded-lg p-8 shadow-md shadow-green-600">
        <Link href="https://github.com/faqihfnf" target="_blank" rel="noopener noreferrer">
          <GitHubCalendar
            username="faqihfnf"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            theme={{
              light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
              dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
          />
        </Link>
      </div>
    </section>
  );
}
