"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Project } from "@/services/notionServices";

interface CardProjectProps {
  project: Project;
}

export default function CardProject({ project }: CardProjectProps) {
  const { title, description, cover, technologies, slug } = project;

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden flex flex-col h-full border border-slate-100 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-950/30 transition-all duration-300"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Cover Image */}
      <Link href={`/projects/${slug ?? ""}`} className="block overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          {cover ? (
            <img src={cover} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-800 flex items-center justify-center">
              <span className="text-slate-400 text-sm">No image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <Link href={`/projects/${slug ?? ""}`}>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1">{title}</h3>
        </Link>

        {/* Description */}
        <div className="h-20 justify-center items-center flex">
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3  flex-1 mb-4">{description}</p>
        </div>

        {/* Tech badges */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {technologies.map((tech) => (
              <span key={tech} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Detail Button */}
        <Link href={`/projects/${slug ?? ""}`} className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors duration-200 group">
          Detail Project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
}
