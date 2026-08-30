"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/editorial/SectionHeader";
import PullQuote from "@/components/editorial/PullQuote";
import StatRow from "@/components/editorial/StatRow";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <section className="border-b border-[var(--ed-border)]">
      <div className="mx-auto w-full max-w-5xl px-6 py-14 md:px-10 md:py-24">
        <SectionHeader
          tag="Profile"
          title={
            <>
              {t("about.title")}
              <em className="ed-accent-em">{t("about.title-1")}</em>
            </>
          }
        />

        {/* Photo + body text */}
        <AnimateOnScroll animation="fade-up">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[260px_1fr] md:gap-14">
            <div className="w-full max-w-[280px] overflow-hidden rounded-[2px] border border-[var(--ed-border)]">
              <Image src="/photo.png" alt="Faqih Nur Fahmi" width={400} height={400} className="h-auto w-full object-cover" priority />
            </div>

            <div className="flex flex-col gap-6">
              <p className="leading-relaxed text-[var(--ed-text-secondary)]">{t("about.content")}</p>
              <a href="https://www.faqih.me/blog/profil-faqih-nur-fahmi" target="_blank" rel="noopener noreferrer" className="ed-link self-start text-xs uppercase tracking-[0.18em]">
                {t("about.read-more")}
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Motto */}
        <AnimateOnScroll animation="fade-up" delay={150}>
          <div className="mt-16 max-w-2xl md:mt-20">
            <PullQuote cite="My Work Philosophy">
              {t("about.quote-1")} <em className="ed-accent-em">{t("about.quote-2")}</em>, {t("about.quote-3")} <em className="ed-accent-em">{t("about.quote-4")}</em>, {t("about.quote-5")}{" "}
              <em className="ed-accent-em">{t("about.quote-6")}</em>.
            </PullQuote>
          </div>
        </AnimateOnScroll>

        {/* Stats */}
        <AnimateOnScroll animation="fade-up" delay={250}>
          <div className="mt-16 md:mt-20">
            <StatRow
              stats={[
                { value: <CountUp end={9} duration={2.5} separator="" enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("about.stats-1-a") + " " + t("about.stats-1-b") },
                { value: <CountUp end={10} duration={2.5} separator="" enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("about.stats-2-a") + " " + t("about.stats-2-b") },
                { value: <CountUp end={15} duration={2.5} separator="" enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("about.stats-3-a") + " " + t("about.stats-3-b") },
                { value: <CountUp end={1000} duration={2.5} separator="." enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("about.stats-4-a") + " " + t("about.stats-4-b") },
              ]}
            />
          </div>
        </AnimateOnScroll>

        {/* Principles — thin-line list instead of cards */}
        <AnimateOnScroll animation="fade-up" delay={350}>
          <div className="mt-16 border-t border-[var(--ed-border)] md:mt-20">
            {[1, 2, 3].map((id) => (
              <div key={id} className="grid grid-cols-1 gap-1 border-b border-[var(--ed-border)] py-6 md:grid-cols-[220px_1fr] md:gap-10">
                <h3 className="text-sm font-medium">{t(`about.add-title-${id}`)}</h3>
                <p className="text-sm leading-relaxed text-[var(--ed-text-secondary)]">{t(`about.add-desc-${id}`)}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
