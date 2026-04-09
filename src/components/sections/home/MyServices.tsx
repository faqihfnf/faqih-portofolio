"use client";

import { myServices } from "@/data/myservices";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const iconGradients = ["from-sky-400 to-indigo-500", "from-indigo-400 to-purple-500", "from-purple-400 to-pink-500", "from-emerald-400 to-teal-500"];

const borderRadii = [
  "rounded-tr-sm rounded-tl-3xl rounded-br-3xl rounded-bl-sm",
  "rounded-tr-3xl rounded-tl-sm rounded-br-sm rounded-bl-3xl",
  "rounded-tl-sm rounded-tr-3xl rounded-bl-3xl rounded-br-sm",
  "rounded-tl-3xl rounded-tr-sm rounded-bl-sm rounded-br-3xl",
];

const hoverRotations = [1, -1, 1, -1];

export default function MyServices() {
  const { t } = useTranslation();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - 800ms delay */}
        <div className="text-center mb-16">
          <AnimateOnScroll animation="fade-up" delay={0}>
            <h2 className="text-4xl font-bold mb-4">
              {t("services.title")} <span className="text-indigo-700 dark:text-indigo-500"> {t("services.title-1")}</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200}>
            <p className="text-lg max-w-4xl mx-auto">
              {t("services.description")}
            </p>
          </AnimateOnScroll>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {myServices.map((card, index) => {
            const gradient = iconGradients[index];
            const radius = borderRadii[index];
            const rotation = hoverRotations[index];

            return (
              <AnimateOnScroll
                key={card.id}
                animation="fade-up"
                delay={index * 150}
              >
                <ServiceCard
                  card={card}
                  gradient={gradient}
                  radius={radius}
                  rotation={rotation}
                  t={t}
                />
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ServiceCard component (tanpa animation logic, sudah di handle AnimateOnScroll)
function ServiceCard({
  card,
  gradient,
  radius,
  rotation,
  t,
}: {
  card: { id: number; icon: React.ComponentType<{ className?: string }> };
  gradient: string;
  radius: string;
  rotation: number;
  t: (key: string) => string;
}) {
  return (
    <div
      className={cn(
        "group relative bg-white dark:bg-slate-800 p-6 border",
        "border-slate-100 dark:border-slate-700",
        "hover:border-indigo-200 dark:hover:border-indigo-700",
        "shadow-lg shadow-indigo-500/70",
        "hover:shadow-xl hover:shadow-indigo-100/80 dark:hover:shadow-indigo-900/30",
        "cursor-default",
        // CSS transitions untuk smooth hover
        "transition-all duration-300 ease-out",
        // Hover effects dengan CSS
        "hover:-translate-y-1",
        radius
      )}
    >
      {/* Top gradient streak */}
      <div className={cn(
        "absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r",
        gradient,
        "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        "rounded-tr-3xl"
      )} />

      {/* Content row: icon + text sejajar */}
      <div className="flex items-center gap-5">
        {/* Icon badge dengan CSS hover */}
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br",
          gradient,
          "flex items-center justify-center shadow-md",
          "transition-transform duration-300 ease-out",
          "group-hover:scale-110 group-hover:-rotate-" + (rotation * 12)
        )}>
          <card.icon className="h-6 w-6 text-white" />
        </div>

        {/* Title + desc */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold mb-1.5 text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {t(`services.cards.${card.id}.title`)}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
            {t(`services.cards.${card.id}.desc`)}
          </p>
        </div>
      </div>
    </div>
  );
}
