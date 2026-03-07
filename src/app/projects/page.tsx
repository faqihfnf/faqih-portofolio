import { getProjects } from "@/services/notionServices";
import ProjectsClient from "@/components/sections/projects/ProjectClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Faqih Nur Fahmi - Projects",
  description: "Kumpulan project yang telah saya kerjakan.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}
