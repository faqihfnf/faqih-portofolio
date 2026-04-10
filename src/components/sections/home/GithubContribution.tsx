"use client";

import ActivityCalendar from "react-activity-calendar";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { useEffect, useState } from "react";

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function GithubContribution() {
  const { t } = useTranslation();
  const [data, setData] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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
    <section className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <AnimateOnScroll animation="fade-up" delay={0}>
          <h2 className="text-4xl font-bold mb-4">
            {t("github.title")}
            <span className="text-indigo-700 dark:text-indigo-500">
              {t("github.title-1")}
            </span>
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={200}>
          <p className="text-lg max-w-4xl mx-auto">
            {t("github.description")}
          </p>
        </AnimateOnScroll>
      </div>

      {/* Calendar */}
      <AnimateOnScroll animation="fade-up" delay={400}>
        <div className="overflow-x-auto bg-slate-900 rounded-lg p-8 shadow-md shadow-green-600">
          <div className="flex justify-center min-w-fit">
            <Link
              href="https://github.com/faqihfnf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {loading ? (
                <ActivityCalendar data={[]} loading />
              ) : (
                <ActivityCalendar
                  data={data}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                  theme={{
                    light: [
                      "#ebedf0",
                      "#c6e48b",
                      "#7bc96f",
                      "#239a3b",
                      "#196127",
                    ],
                    dark: [
                      "#161b22",
                      "#0e4429",
                      "#006d32",
                      "#26a641",
                      "#39d353",
                    ],
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
      </AnimateOnScroll>
    </section>
  );
}
