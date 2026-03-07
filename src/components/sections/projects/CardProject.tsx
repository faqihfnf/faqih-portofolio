"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/services/notionServices";

interface CardProjectProps {
  project: Project;
}

export default function CardProject({ project }: CardProjectProps) {
  const { title, description, cover, technologies, githubUrl, liveUrl, slug } = project;

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-md shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:border hover:border-indigo-400 overflow-hidden transition-all duration-300 flex flex-col h-full"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Gambar — klik ke detail page */}
      <Link href={`/projects/${slug ?? ""}`}>
        <div className="relative h-56 overflow-hidden cursor-pointer">
          {cover ? (
            <img src={cover} alt={title} className="object-cover transition-transform duration-300 hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-800 flex items-center justify-center">
              <span className="text-slate-400 text-sm">No image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Konten */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title — klik ke detail page */}
        <Link href={`/projects/${slug ?? ""}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{title}</h3>
        </Link>

        <p className="mb-4 text-justify flex-grow text-sm text-slate-600 dark:text-slate-300">{description}</p>

        <div className="flex-grow" />

        {/* Tech badges */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {technologies.map((tech) => (
              <span key={tech} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors text-sm"
            >
              <Github size={18} />
              Code
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors text-sm"
            >
              <ExternalLink size={18} />
              Live Demo
            </Link>
          )}
          <Link href={`/projects/${slug ?? ""}`} className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors text-sm ml-auto">
            Detail →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
