"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { techStackIcons } from "@/data/techstack";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TechStack() {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 className="text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            {t("stack.title")}
          </motion.h2>
          <motion.p className="text-lg max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            {t("stack.description")}
          </motion.p>
        </div>
        <div className="flex flex-col items-center">
          <InfiniteMovingCards items={techStackIcons} direction="left" speed="slow" className=" md:mb-6 lg:mb-10" />
          <InfiniteMovingCards items={techStackIcons} direction="right" speed="slow" />
        </div>
      </div>
    </section>
  );
}
