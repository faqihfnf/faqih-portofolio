import { Braces, Briefcase, Code, GraduationCap, Layers, Rocket, Server, Terminal } from "lucide-react";
import { TFunction } from "i18next";

export function getExperienceData(t: TFunction) {
  const hrExperiences = [
    {
      title: "Human Capital Supervisor",
      company: "Papandayan Cargo",
      location: "Jakarta, Indonesia",
      period: "2025 - Present",
      description: t("experience.hr.Job-1"),
      icon: Rocket,
      color: "indigo",
      technologies: ["HRIS", "Payroll", "L & D", "Industrial Relation", "Talent Management"],
    },
    {
      title: "Compensation & Benefits and HRIS Leader",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2023 - 2025",
      description: t("experience.hr.Job-2"),
      icon: Layers,
      color: "emerald",
      technologies: ["HRIS", "Personal Administration", "HR Analytics", "Compensation & Benefits"],
    },
    {
      title: "Compensation & Benefits Senior Staff",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2019 - 2023",
      description: t("experience.hr.Job-3"),
      icon: Briefcase,
      color: "pink",
      technologies: ["HRIS", "Personal Administration", "HR Analytics", "Compensation & Benefits"],
    },
    {
      title: "Human Resource Staff",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2017 - 2019",
      description: t("experience.hr.Job-4"),
      icon: Briefcase,
      color: "lime",
      technologies: ["Administration", "Database Management", "Compensation & Benefits"],
    },
  ];

  const techExperiences = [
    {
      title: "Frontend Developer HSI",
      company: "HSI",
      location: "Jakarta, Indonesia",
      period: "2026 - Present",
      description: t("experience.tech.Job-1"),
      icon: Terminal,
      color: "indigo",
      technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "Redis", "Supabase"],
    },
    {
      title: "Bootcamp Sandbox HSI",
      company: "HSI",
      location: "Jakarta, Indonesia",
      period: "2025",
      description: t("experience.tech.Job-2"),
      icon: Terminal,
      color: "yellow",
      technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "Redis", "Supabase"],
    },
    {
      title: "Bootcamp AI Enabled Python",
      company: "Devscale Indonesia",
      location: "Jakarta, Indonesia",
      period: "2025",
      description: t("experience.tech.Job-3"),
      icon: Terminal,
      color: "pink",
      technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "Redis", "Supabase"],
    },
    {
      title: "Bootcamp Full Stack Developer (MERN)",
      company: "Devscale Indonesia",
      location: "Jakarta, Indonesia",
      period: "2025",
      description: t("experience.tech.Job-4"),
      icon: Braces,
      color: "green",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "REST API"],
    },
    {
      title: "Kuliah Teknik Informatika",
      company: "Self-Taught & Personal Projects",
      location: "Jakarta, Indonesia",
      period: "2023",
      description: t("experience.tech.Job-5"),
      icon: GraduationCap,
      color: "red",
      technologies: ["Data Structures", "Algorithms", "Computer Architecture", "Software Engineering"],
    },
    {
      title: "Start of Tech Journey",
      company: "Self-Taught & Personal Projects",
      location: "Jakarta, Indonesia",
      period: "2023",
      description: t("experience.tech.Job-6"),
      icon: Code,
      color: "blue",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    },
  ];

  return { hrExperiences, techExperiences };
}
