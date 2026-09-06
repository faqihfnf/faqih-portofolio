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
          {t("cta.title")} <em className="ed-accent-em">{t("cta.title-emphasis")}</em>
        </h2>

        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-[var(--ed-text-secondary)]">
          {t("cta.description")}
        </p>

        <div className="mt-10">
          <EditorialButton asChild variant="primary">
            <Link href="/contact">{t("cta.button")}</Link>
          </EditorialButton>
        </div>
      </div>
    </section>
  );
}
