import { Briefcase, Code, Layers, Rocket } from "lucide-react";
import { TFunction } from "i18next";

export function getExperienceData(t: TFunction) {
  return [
    {
      title: t("experience.title-1"),
      company: t("experience.company-1"),
      location: t("experience.location-1"),
      period: "2022 - Present",
      description: t("experience.description-1"),
      icon: Rocket,
      color: "indigo",
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "TypeScript",
      ],
    },
    {
      title: t("experience.title-2"),
      company: t("experience.company-2"),
      location: t("experience.location-2"),
      period: "2020 - 2022",
      description: t("experience.description-2"),
      icon: Layers,
      color: "pink",
      technologies: ["React", "Vue.js", "Express.js", "MongoDB", "Docker"],
    },
    {
      title: t("experience.title-3"),
      company: t("experience.company-3"),
      location: t("experience.location-3"),
      period: "2019 - 2020",
      description: t("experience.description-3"),
      icon: Code,
      color: "green",
      technologies: ["JavaScript", "React", "SASS", "Webpack", "Git"],
    },
    {
      title: t("experience.title-4"),
      company: t("experience.company-4"),
      location: t("experience.location-4"),
      period: "2018 - 2019",
      description: t("experience.description-4"),
      icon: Briefcase,
      color: "red",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
  ];
}
