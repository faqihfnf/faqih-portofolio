import { getProjects } from "@/services/notionServices";
import ProjectsClient from "@/components/sections/projects/ProjectClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}
