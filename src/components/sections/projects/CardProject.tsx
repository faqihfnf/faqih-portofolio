"use client";

import { techStackIcons } from "@/data/techstack";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface CardProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  stackIcons: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function CardProject({
  title,
  description,
  image,
  technologies,
  stackIcons,
  githubUrl,
  liveUrl,
}: CardProjectProps) {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-md shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:border-1 hover:border-indigo-400 overflow-hidden transition-shadow duration-300 flex flex-col h-full"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}>
      {/* Gambar */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Konten */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="mb-4 text-justify flex-grow">{description}</p>

        <div className="">
          {technologies.map((tech, index) => (
            <span key={index}></span>
          ))}
        </div>

        {/* Spacer untuk mendorong konten ke bawah */}
        <div className="flex-grow"></div>

        {/* Icon stack - selalu di atas links */}
        {techStackIcons.length > 0 && (
          <div className="flex flex-wrap items-center mb-4">
            {techStackIcons.map((icon, index) => (
              <div
                key={index}
                className={`bg-slate-800 relative w-10 h-10 rounded-full border border-indigo-700 dark:border-indigo-400 overflow-hidden ${
                  index !== 0 ? "-ml-2" : ""
                }`}>
                <Image
                  src={stackIcons[index]}
                  alt="stack icon"
                  fill
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
        )}

        {/* Link Code & Live Demo selalu di bawah */}
        <div className="flex justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors">
              <Github size={20} />
              Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors">
              <ExternalLink size={20} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
