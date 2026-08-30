import { getProjects, getPageBlocks } from "@/services/notionServices";
import NotionBlockRenderer from "@/components/sections/blog/NotionBlockRenderer";
import Link from "next/link";
import { fraunces, inter } from "@/components/editorial/fonts";
import EditorialTheme from "@/components/editorial/EditorialTheme";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  const blocks = project ? await getPageBlocks(project.id) : [];

  return (
    <div className={`${fraunces.variable} ${inter.variable} editorial min-h-screen`}>
      <EditorialTheme />
      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        {/* Back */}
        <Link href="/projects" className="ed-link inline-block text-[11px] uppercase tracking-[0.18em]">
          &larr; Projects
        </Link>

        {!project ? (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <h2 className="ed-serif text-3xl tracking-tight md:text-4xl">Project tidak ditemukan</h2>
            <p className="mt-3 text-[var(--ed-text-secondary)]">Sepertinya project yang Anda cari sudah tidak tersedia.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <h1 className="ed-serif mt-8 text-3xl leading-tight tracking-tight md:text-[2.75rem] md:leading-[1.15]">{project.title}</h1>

            {/* Meta: teknologi sebagai teks kecil */}
            {project.technologies.length > 0 && (
              <p className="mt-4 text-[13px] text-[var(--ed-text-muted)]">
                {project.technologies.map((tech, i) => (
                  <span key={tech}>
                    {tech}
                    {i < project.technologies.length - 1 && <span className="text-[var(--ed-border)]">{" · "}</span>}
                  </span>
                ))}
              </p>
            )}

            {/* Links — teks underline bronze */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="mt-6 flex gap-8 border-b border-[var(--ed-border)] pb-8">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="ed-link text-[11px] uppercase tracking-[0.18em]">
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ed-link text-[11px] uppercase tracking-[0.18em]">
                    Live Demo
                  </a>
                )}
              </div>
            )}

            {/* Cover */}
            {project.cover && <img src={project.cover} alt={project.title} className="mt-10 w-full rounded-[2px] border border-[var(--ed-border)] object-cover" />}

            {/* Notion Content */}
            <div className={project.cover ? "mt-10" : "mt-2"}>{blocks.length > 0 ? <NotionBlockRenderer blocks={blocks} /> : <p className="py-10 text-center text-[var(--ed-text-muted)]">Belum ada konten detail untuk project ini.</p>}</div>
          </>
        )}
      </div>
    </div>
  );
}
