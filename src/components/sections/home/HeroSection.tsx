"use client";

import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import RoleTag from "@/components/editorial/RoleTag";
import StatRow from "@/components/editorial/StatRow";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default function HeroSection() {
  const { t } = useTranslation();

  const socialLinks = [
    { href: "https://github.com/faqihfnf", label: "GitHub" },
    { href: "https://www.linkedin.com/in/faqih-nur-fahmi-b51bb1ab/", label: "LinkedIn" },
    { href: "/CV.pdf", label: "CV" },
  ];

  const stats = [
    { value: <CountUp end={9} duration={2.5} separator="" enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("hero.stats.years") },
    { value: <CountUp end={15} duration={2.5} separator="" enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("hero.stats.projects") },
    { value: <CountUp end={10} duration={2.5} separator="" enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("hero.stats.technologies") },
    { value: <CountUp end={1000} duration={2.5} separator="." enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("hero.stats.commits") },
  ];

  return (
    <section className="border-b border-[var(--ed-border)]">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-40 lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Mobile: nama + tagline + deskripsi tampil pertama */}
        <AnimateOnScroll animation="fade-up" className="order-1 flex flex-col lg:order-2">
          {/* Eyebrow — identitas halaman */}
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--ed-text-muted)] sm:text-[16px]">
            {t("hero.eyebrow")}{" "}
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--ed-accent)] transition-colors hover:text-[var(--ed-accent)] hover:underline">
              {t("hero.cv")}
            </a>
          </p>

          {/* Headline — HR is the primary professional identity */}
          <h1 className="ed-serif mt-4 text-[2.6rem] leading-[1.1] tracking-tight sm:text-6xl lg:text-[5.5rem]">
            {t("hero.title-first" )} <em className="ed-accent-em">{t("hero.title-first-emphasis")}</em>{" "}{t("hero.title-connector")} <em className="ed-accent-em">{t("hero.title-second-emphasis")}</em>{t("hero.title-ending")}
          </h1>

          {/* Deskripsi — di bawah tagline */}
          <p className="mt-6 max-w-xl leading-relaxed text-[var(--ed-text-secondary)]">{t("hero.description")}</p>
        </AnimateOnScroll>

        {/* Mobile: role tag + stats + sosial tampil setelahnya */}
        <AnimateOnScroll animation="slide-right" className="order-2 flex flex-col gap-8 lg:order-1">
          <RoleTag>
            {t("hero.role")}
            <br />
            {t("hero.role-secondary")}
          </RoleTag>
          <StatRow stats={stats} vertical />
          <div className="flex gap-5">
            {socialLinks.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ed-link text-xs uppercase tracking-[0.18em]">
                {label}
              </a>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
