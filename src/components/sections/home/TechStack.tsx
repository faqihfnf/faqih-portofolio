"use client";

import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/editorial/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const categories: { label: string; tools: string[] }[] = [
  {
    label: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Sass", "Redux", "Shadcn/ui", "Vite", "Storybook", "HTML", "CSS", "JavaScript", "Bootstrap", "Bulma", "React Router", "Figma"],
  },
  {
    label: "Backend & Data",
    tools: ["Node.js", "Express.js", "Bun", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase", "Appwrite", "Prisma", "Python", "Swagger", "Postman", "Git", "GitHub", "GitLab", "Docker", "npm"],
  },
  {
    label: "HR & Productivity",
    tools: ["Excel", "Looker Studio", "Notion", "Google Apps Script", "Canva"],
  },
];

export default function TechStack() {
  const { t } = useTranslation();

  return (
    <section className="border-b border-[var(--ed-border)]">
      <div className="mx-auto w-full max-w-5xl px-6 py-14 md:px-10 md:py-24">
        <AnimateOnScroll animation="fade-up">
          <SectionHeader
            tag="Stack"
            title={
              <>
                {t("stack.title")}
                <em className="ed-accent-em">{t("stack.title-1")}</em>
              </>
            }
            description={t("stack.description")}
          />
        </AnimateOnScroll>

        <div className="border-t border-[var(--ed-border)]">
          {categories.map((category, index) => (
            <AnimateOnScroll key={category.label} animation="fade-up" delay={index * 120}>
              <div className="grid grid-cols-1 gap-3 border-b border-[var(--ed-border)] py-7 md:grid-cols-[180px_1fr] md:gap-12">
                <h3 className="text-[11px] uppercase tracking-[0.22em] text-[var(--ed-text-muted)]">{category.label}</h3>
                <p className="leading-loose text-[var(--ed-text-secondary)]">
                  {category.tools.map((tool, i) => (
                    <span key={tool}>
                      {tool}
                      {i < category.tools.length - 1 && <span className="text-[var(--ed-border)]">{" · "}</span>}
                    </span>
                  ))}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
