import { Briefcase, Code, Layers, Rocket } from "lucide-react";
import { TFunction } from "i18next";

export function getExperienceData(t: TFunction) {
  return [
    {
      title: "Compensation & Benefits Lead",
      company: "Papandayan Cargo",
      location: "Jakarta, Indonesia",
      period: "2025 - Present",
      description: t("experience.description-1"),
      icon: Rocket,
      color: "indigo",
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      title: "Compensation & Benefits and HRIS Leader",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2023 - 2025",
      description: t("experience.description-2"),
      icon: Layers,
      color: "pink",
      technologies: ["React", "Vue.js", "Express.js", "MongoDB", "Docker"],
    },
    {
      title: "Compensation & Benefits Senior Staff",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2019 - 2023",
      description: t("experience.description-3"),
      icon: Code,
      color: "green",
      technologies: ["JavaScript", "React", "SASS", "Webpack", "Git"],
    },
    {
      title: "Human Resource Staff",
      company: "PT Satria Antaran Prima, Tbk",
      location: "Jakarta, Indonesia",
      period: "2017 - 2019",
      description: t("experience.description-4"),
      icon: Briefcase,
      color: "red",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
  ];
}
