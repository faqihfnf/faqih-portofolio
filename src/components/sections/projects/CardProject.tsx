"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  stackIcons: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function CardProject({ title, description, image, technologies, stackIcons, githubUrl, liveUrl }: CardProjectProps) {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-md shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:border-1 hover:border-indigo-400 overflow-hidden transition-shadow duration-300 flex flex-col h-full"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Gambar */}
      {liveUrl ? (
        <Link href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Buka demo live untuk ${title}`}>
          <div className="relative h-56 overflow-hidden cursor-pointer">
            {/* Sedikit saran: object-cover seringkali lebih baik dari object-fill agar gambar tidak gepeng */}
            <Image src={image} alt={title} fill className="object-cover transition-transform duration-300 hover:scale-105" />
          </div>
        </Link>
      ) : (
        // Jika tidak ada liveUrl, tampilkan gambar saja tanpa Link
        <div className="relative h-56 overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover transition-transform duration-300 hover:scale-105" />
        </div>
      )}

      {/* Konten */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="mb-4 text-justify flex-grow">{description}</p>

        <div className="flex flex-wrap">
          {technologies.map((index) => (
            <span key={index}></span>
          ))}
        </div>

        {/* Spacer untuk mendorong konten ke bawah */}
        <div className="flex-grow"></div>

        {/* Icon stack - selalu di atas links */}
        {stackIcons.length > 0 && (
          <div className="flex flex-wrap items-center mb-4">
            {stackIcons.map((icon, index) => (
              <div key={index} className={`bg-slate-700 relative w-10 h-10 rounded-full border border-indigo-400 dark:border-indigo-100 overflow-hidden ${index !== 0 ? "-ml-2" : ""}`}>
                <Image src={icon} alt="stack icon" fill className="object-contain p-1" />
              </div>
            ))}
          </div>
        )}

        {/* Link Code & Live Demo selalu di bawah */}
        <div className="flex justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          {githubUrl && (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors">
              <Github size={20} />
              Code
            </Link>
          )}
          {liveUrl && (
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors">
              <ExternalLink size={20} />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
