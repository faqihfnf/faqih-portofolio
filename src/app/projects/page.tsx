import { getProjects } from "@/services/notionServices";
import ProjectsClient from "@/components/sections/projects/ProjectClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "HR Technology and Digital Projects",
  description: "Explore digital products, internal tools, and practical technology solutions built to solve organizational and business challenges.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}
