import { Metadata } from "next";
import ExperienceClient from "@/components/sections/experiences/ExperienceClient";

export const metadata: Metadata = {
  title: "HR Manager Experience",
  description: "Explore Faqih Nur Fahmi's professional experience as an HR Manager across people management, organizational development, HR strategy, and digital transformation.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
