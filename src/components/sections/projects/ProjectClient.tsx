"use client";

import CardProject from "@/components/sections/projects/CardProject";
import FilterCarousel from "@/components/ui/filter-carousel";
import { Project } from "@/services/notionServices";
import { motion } from "framer-motion";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const INITIAL_COUNT = 6;

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Kumpulkan semua kategori unik dari technologies
  const allCategories = ["All", ...Array.from(new Set(projects.flatMap((p) => p.technologies))).sort()];

  const filteredProjects = selectedCategory === "All" ? projects : projects.filter((p) => p.technologies.some((tech) => tech.toLowerCase() === selectedCategory.toLowerCase()));

  const handleLoadMore = () => setVisibleCount((prev) => prev + INITIAL_COUNT);

  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 className="text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {t("projects.title")}
          </motion.h1>
          <motion.p className="text-lg max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {t("projects.description")}
          </motion.p>
        </div>

        {/* Filter */}
        {/* <motion.div className="flex flex-wrap justify-center gap-3 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(INITIAL_COUNT);
              }}
              className={`px-5 py-2 rounded-full font-medium transition-colors shadow-sm cursor-pointer ${selectedCategory === category ? "bg-indigo-600 text-white" : "bg-indigo-100 text-slate-700 hover:bg-indigo-200"}`}
            >
              {category}
            </button>
          ))}
        </motion.div> */}
        <div className="flex justify-center items-center mb-12">
          <div className="w-full max-w-7xl">
            <FilterCarousel
              categories={allCategories}
              selected={selectedCategory}
              onSelect={(cat) => {
                setSelectedCategory(cat);
                setVisibleCount(INITIAL_COUNT);
              }}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <CardProject key={project.id} project={project} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Tidak ada project dengan kategori <strong>{selectedCategory}</strong>.
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#5907e8,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-slate-100 font-semibold cursor-pointer"
            >
              <LoaderPinwheel className="mr-2 h-4 w-4" />
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
