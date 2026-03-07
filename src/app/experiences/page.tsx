import { Metadata } from "next";
import ExperienceClient from "@/components/sections/experiences/ExperienceClient";

export const metadata: Metadata = {
  title: "Faqih Nur Fahmi - Experiences",
  description: "Pengalaman profesional saya dalam dunia HR dan web development.",
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
