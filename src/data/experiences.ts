import { Briefcase, Code, Layers, Rocket, Server, Terminal } from "lucide-react";
import { TFunction } from "i18next";

export function getExperienceData(t: TFunction) {
  const hrExperiences = [
    {
      title: "Human Capital Supervisor",
      company: "Papandayan Cargo",
      location: "Jakarta, Indonesia",
      period: "2025 - Present",
      description: t("experience.description-1"), // Pastikan di id.json/en.json sudah ada
      icon: Rocket,
      color: "indigo",
      technologies: ["HRIS", "Payroll", "L & D", "Industrial Relation", "Talent Management"],
    },
    {
      title: "Compensation & Benefits and HRIS Leader",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2023 - 2025",
      description: t("experience.description-2"),
      icon: Layers,
      color: "pink",
      technologies: ["HRIS", "Personal Administration", "HR Analytics", "Compensation & Benefits"],
    },
    {
      title: "Compensation & Benefits Senior Staff",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2019 - 2023",
      description: t("experience.description-3"),
      icon: Briefcase,
      color: "green",
      technologies: ["HRIS", "Personal Administration", "HR Analytics", "Compensation & Benefits"],
    },
    {
      title: "Human Resource Staff",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2017 - 2019",
      description: t("experience.description-4"),
      icon: Briefcase,
      color: "red",
      technologies: ["Administration", "Database Management", "Compensation & Benefits"],
    },
  ];

  const techExperiences = [
    {
      title: "Full-Stack Web Developer",
      company: "Independent / Freelance",
      location: "Jakarta, Indonesia",
      period: "2024 - Present",
      description:
        "Merancang dan mengembangkan aplikasi web modern secara end-to-end. Saat ini sedang berfokus membangun 'karirpapandayanargo', sebuah Applicant Tracking System (ATS) komprehensif, serta mengembangkan sistem berbasis Notion CMS dengan implementasi Redis untuk optimasi performa caching.",
      icon: Terminal,
      color: "yellow",
      technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "Redis", "Supabase"],
    },
    {
      title: "Web Development Enthusiast",
      company: "Self-Taught & Personal Projects",
      location: "Jakarta, Indonesia",
      period: "2022 - 2024",
      description: "Mendalami arsitektur perangkat lunak dan modern JavaScript ecosystem. Membangun berbagai proyek mandiri berfokus pada UI/UX yang interaktif, pengelolaan database relasional, dan integrasi API yang seamless.",
      icon: Code,
      color: "red",
      technologies: ["JavaScript", "Tailwind CSS", "React", "Node.js", "REST API"],
    },
  ];

  return { hrExperiences, techExperiences };
}
