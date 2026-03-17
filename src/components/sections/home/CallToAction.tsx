"use client";

import TouchButton from "@/components/ui/button-touch";
import { motion } from "framer-motion";
import { SendIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CallToAction() {
  const { t } = useTranslation();
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2 className="text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          {t("cta.title")}{" "}
          <span>
            <span className="text-indigo-700 dark:text-indigo-500">{t("cta.title-1")}</span>
          </span>
        </motion.h2>
        <motion.p className="text-xl mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          {t("cta.description-1")} <span className="text-teal-600 dark:text-teal-500 font-semibold">{t("cta.description-2")}</span> {t("cta.description-3")}{" "}
          <span className="text-indigo-600 dark:text-indigo-500 font-semibold">{t("cta.description-4")}</span>
          {t("cta.description-5")} <span className="text-pink-600 dark:text-pink-500 font-semibold">{t("cta.description-6")}</span>.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
          <Link href="/contact">
            <TouchButton
              otherClasses="hover:text-pink-500 dark:hover:text-pink-500 hover:bg-indigo-200 text-indigo-900 dark:text-indigo-100 font-semibold text-lg"
              title={t("cta.button")}
              icon={<SendIcon className="w-4 h-4" />}
              position="right"
            ></TouchButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
