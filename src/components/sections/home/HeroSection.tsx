"use client";

import Link from "next/link";
import TypeIt from "typeit-react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import RoleTag from "@/components/editorial/RoleTag";
import StatRow from "@/components/editorial/StatRow";
import { EditorialButton } from "@/components/editorial/EditorialButton";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default function HeroSection() {
  const { t } = useTranslation();

  const socialLinks = [
    { href: "https://github.com/faqihfnf", label: "GitHub" },
    { href: "https://www.linkedin.com/in/faqih-nur-fahmi-b51bb1ab/", label: "LinkedIn" },
  ];

  return (
    <section className="border-b border-[var(--ed-border)]">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-40 lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Left column — role, short intro, vertical stats */}
        <AnimateOnScroll animation="slide-right" className="flex flex-col gap-8">
          <RoleTag>
            Certified HR Manager
            <br />
            Full Stack Developer
          </RoleTag>
          <StatRow
            vertical
            stats={[
              { value: <CountUp end={9} duration={2.5} separator="" enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("about.stats-1-a") + " " + t("about.stats-1-b") },
              { value: <CountUp end={15} duration={2.5} separator="" enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("about.stats-3-a") + " " + t("about.stats-3-b") },
              { value: <CountUp end={1000} duration={2.5} separator="." enableScrollSpy scrollSpyOnce useEasing={false} suffix="+" />, label: t("about.stats-4-a") + " " + t("about.stats-4-b") },
            ]}
          />
          <div className="flex gap-5">
            {socialLinks.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ed-link text-xs uppercase tracking-[0.18em]">
                {label}
              </a>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Right column — tagline dominan, deskripsi di bawahnya, buttons */}
        <AnimateOnScroll animation="fade-up" delay={150} className="flex flex-col">
          {/* Nama — kecil, di atas tagline */}
          <p className="text-[16px] uppercase tracking-[0.22em] text-[var(--ed-text-muted)]">Faqih Nur Fahmi / 2026</p>

          {/* Tagline — headline dominan */}
          <h1 className="ed-serif mt-4 text-[2.6rem] leading-[1.1] tracking-tight sm:text-6xl lg:text-[5.5rem]">
            {t("hero.tagline-1")} <em className="ed-accent-em">{t("hero.tagline-2")}</em> {t("hero.tagline-3")} <em className="ed-accent-em">{t("hero.tagline-4")}</em>.
          </h1>

          {/* Deskripsi — di bawah tagline */}
          <p className="mt-6 max-w-xl leading-relaxed text-[var(--ed-text-secondary)]">{t("hero.description")}</p>

          {/* Running text */}
          {/* <p className="ed-serif mt-6 min-h-[1.6em] text-2xl italic text-[var(--ed-accent)] md:text-3xl">
            <TypeIt
              getBeforeInit={(instance) => {
                instance
                  .type("Full Stack Developer")
                  .pause(1800)
                  .delete()
                  .pause(300)
                  .type("Tech Enthusiast")
                  .pause(1800)
                  .delete()
                  .pause(300)
                  .type("Certified HR Manager")
                  .pause(1800)
                  .delete()
                  .pause(300)
                  .type("Data Analyst")
                  .pause(1800)
                  .delete()
                  .pause(300);
                return instance;
              }}
              options={{
                speed: 90,
                deleteSpeed: 70,
                waitUntilVisible: true,
                loop: true,
                lifeLike: true,
              }}
            />
          </p> */}

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/CV.pdf" target="_blank" rel="noopener noreferrer">
              <EditorialButton variant="primary">Resume</EditorialButton>
            </Link>
            <Link href="/projects">
              <EditorialButton variant="secondary">{t("navbar.nav-item-3")}</EditorialButton>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
