"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { techStackIcons } from "@/data/techstack";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { useTranslation } from "react-i18next";

export default function TechStack() {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - 800ms delay */}
        <div className="text-center mb-16">
          <AnimateOnScroll animation="fade-up" delay={0}>
            <h2 className="text-4xl font-bold mb-4">
              {t("stack.title")}
              <span className="text-indigo-700 dark:text-indigo-500"> {t("stack.title-1")}</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200}>
            <p className="text-lg max-w-4xl mx-auto">
              {t("stack.description")}
            </p>
          </AnimateOnScroll>
        </div>
        <div className="flex flex-col items-center">
          <InfiniteMovingCards items={techStackIcons} direction="left" speed="slow" className=" md:mb-6 lg:mb-10" />
          <InfiniteMovingCards items={techStackIcons} direction="right" speed="slow" />
        </div>
      </div>
    </section>
  );
}
