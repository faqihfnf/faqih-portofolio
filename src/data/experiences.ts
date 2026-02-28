import { Briefcase, Code, Layers, Rocket } from "lucide-react";
import { TFunction } from "i18next";

export function getExperienceData(t: TFunction) {
  return [
    {
      title: "Human Capital Supervisor",
      company: "Papandayan Cargo",
      location: "Jakarta, Indonesia",
      period: "2025 - Present",
      description: t("experience.description-1"),
      icon: Rocket,
      color: "indigo",
      technologies: ["HRIS", "Payroll", "L & D", "Industiral Relation", "Talent Management"],
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
      icon: Code,
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
}
