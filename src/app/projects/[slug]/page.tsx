import { getProjects, getPageBlocks } from "@/services/notionServices";
import NotionBlockRenderer from "@/components/sections/blog/NotionBlockRenderer";
import Link from "next/link";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link href="/projects" className="flex items-center text-md hover:text-indigo-500 font-medium mb-6">
          <ChevronLeft className="inline-block mr-1" />
          Back to Projects
        </Link>
        <div className="text-center flex flex-col items-center justify-center mt-40">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">❌ Project tidak ditemukan</h2>
          <p className="text-gray-600 dark:text-gray-300">Sepertinya project yang Anda cari sudah tidak tersedia.</p>
        </div>
      </div>
    );
  }

  const blocks = await getPageBlocks(project.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      {/* Back */}
      <Link href="/projects" className="flex items-center text-md hover:text-indigo-500 font-medium mb-8">
        <ChevronLeft className="inline-block mr-1" />
        Back to Projects
      </Link>

      {/* Cover */}
      {project.cover && <img src={project.cover} alt={project.title} className="w-full h-72 object-cover rounded-lg mb-8" />}

      {/* Header */}
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{project.title}</h1>

      {/* Tech badges */}
      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4 mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
        {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition-colors text-sm font-medium">
            <Github size={16} />
            View Code
          </Link>
        )}
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-medium">
            <ExternalLink size={16} />
            Live Demo
          </Link>
        )}
      </div>

      {/* Notion Content */}
      {blocks.length > 0 ? <NotionBlockRenderer blocks={blocks} /> : <p className="text-gray-500 dark:text-gray-400 text-center py-10">Belum ada konten detail untuk project ini.</p>}
    </div>
  );
}
