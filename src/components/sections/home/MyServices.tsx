"use client";

import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/editorial/SectionHeader";
import NumberedList from "@/components/editorial/NumberedList";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default function MyServices() {
  const { t } = useTranslation();

  const items = [1, 2, 3, 4].map((id) => ({
    title: t(`expertise.items.${id}.title`),
    desc: t(`expertise.items.${id}.desc`),
  }));

  return (
    <section className="border-b border-[var(--ed-border)]">
      <div className="mx-auto w-full max-w-5xl px-6 py-14 md:px-10 md:py-24">
        <AnimateOnScroll animation="fade-up">
          <SectionHeader
            tag={t("expertise.tag")}
            title={
              <>
                {t("expertise.title")} <em className="ed-accent-em">{t("expertise.title-emphasis")}</em>
              </>
            }
            description={t("expertise.description")}
          />
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={150}>
          <NumberedList items={items} />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
