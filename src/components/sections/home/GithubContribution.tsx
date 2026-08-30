"use client";

import ActivityCalendar from "react-activity-calendar";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/editorial/SectionHeader";

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/* Bronze monochrome scale: from var(--ed-border) to var(--ed-accent) */
const bronzeScale = ["#2E2F31", "#46413A", "#6E5F45", "#8F7A50", "#A2895B"];
const bronzeScaleLight = ["#E3E1D9", "#CFC4AC", "#B49E72", "#9C8354", "#8A6F3F"];

export default function GithubContribution() {
  const { t } = useTranslation();
  const [data, setData] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((d) => {
        if (d.contributions) {
          setData(d.contributions);
          setTotal(d.total);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="border-b border-[var(--ed-border)]">
      <div className="mx-auto w-full max-w-5xl px-6 py-14 md:px-10 md:py-24">
        <SectionHeader
          tag="GitHub"
          title={
            <>
              {t("github.title")}
              <em className="ed-accent-em">{t("github.title-1")}</em>
            </>
          }
          description={t("github.description")}
        />

        <div className="rounded-lg border border-[var(--ed-border)] bg-[var(--ed-bg-elevated)] p-6 md:p-9">
          <div className="flex justify-center overflow-x-auto">
            <Link href="https://github.com/faqihfnf" target="_blank" rel="noopener noreferrer">
              {loading ? (
                <ActivityCalendar data={[]} loading />
              ) : (
                <ActivityCalendar
                  data={data}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={13}
                  theme={{
                    light: bronzeScaleLight,
                    dark: bronzeScale,
                  }}
                  labels={{
                    totalCount: `${total} contributions in the last year`,
                  }}
                  hideTotalCount={false}
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
