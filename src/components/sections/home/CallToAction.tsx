"use client";

import { EditorialButton } from "@/components/editorial/EditorialButton";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CallToAction() {
  const { t } = useTranslation();

  return (
    <section>
      <div className="mx-auto w-full max-w-5xl px-6 py-20 text-center md:px-10 md:py-28">
        <h2 className="ed-serif mx-auto max-w-2xl text-3xl leading-tight tracking-tight md:text-[2.75rem] md:leading-[1.15]">
          {t("cta.title")} <em className="ed-accent-em">{t("cta.title-1")}</em>
        </h2>

        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-[var(--ed-text-secondary)]">
          {t("cta.description-1")} {t("cta.description-2")} {t("cta.description-3")} {t("cta.description-4")}
          {t("cta.description-5")} {t("cta.description-6")}.
        </p>

        <Link href="/contact" className="ed-link mt-10 inline-block text-2xl  md:text-3xl">
          <EditorialButton variant="primary">{t("cta.button")}</EditorialButton>
        </Link>
      </div>
    </section>
  );
}
