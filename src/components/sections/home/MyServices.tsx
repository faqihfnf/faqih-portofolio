"use client";

import { StarsBackground } from "@/components/ui/stars-background";
import { myServices } from "@/data/myservices";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const hoverRotations = [
  { icon: -12, card: -1 },
  { icon: 12, card: 1 },
  { icon: -12, card: -1 },
  { icon: 12, card: 1 },
];

const iconGradients = ["from-sky-400 to-indigo-500", "from-indigo-400 to-purple-500", "from-purple-400 to-pink-500", "from-emerald-400 to-teal-500"];

// Asimetris: genap → kiri atas & kanan bawah lancip, ganjil → sebaliknya
const borderRadii = [
  "rounded-tr-sm rounded-tl-3xl rounded-br-3xl rounded-bl-sm", // kiri atas
  "rounded-tr-3xl rounded-tl-sm rounded-br-sm rounded-bl-3xl", // kanan atas
  "rounded-tl-sm rounded-tr-3xl rounded-bl-3xl rounded-br-sm", // kiri bawah
  "rounded-tl-3xl rounded-tr-sm rounded-bl-sm rounded-br-3xl", // kanan bawah
];

export default function MyServices() {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StarsBackground />
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 className="text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            {t("services.title")} <span className="text-indigo-700 dark:text-indigo-500"> {t("services.title-1")}</span>
          </motion.h2>
          <motion.p className="text-lg max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            {t("services.description")}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {myServices.map((card, index) => {
            const rotation = hoverRotations[index];
            const gradient = iconGradients[index];
            const radius = borderRadii[index];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  rotate: rotation.card,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className={`group relative bg-white dark:bg-slate-800 p-6 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 shadow-lg  shadow-indigo-500/70 hover:shadow-xl hover:shadow-indigo-100/80 dark:hover:shadow-indigo-900/30 transition-all duration-300 cursor-default ${radius}`}
              >
                {/* Top gradient streak */}
                <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${index % 2 === 0 ? "rounded-tr-3xl" : "rounded-tl-3xl"}`} />

                {/* Content row: icon + text sejajar */}
                <div className="flex items-center gap-5">
                  {/* Icon badge */}
                  <motion.div
                    whileHover={{ rotate: rotation.icon, scale: 1.15 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
                  >
                    <card.icon className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* Title + desc */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-1.5 text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors duration-200">{t(`services.cards.${card.id}.title`)}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{t(`services.cards.${card.id}.desc`)}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
