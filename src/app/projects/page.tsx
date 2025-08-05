"use client";

import CardProject from "@/components/sections/projects/CardProject";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";

const categories = ["All", "React", "Next.js", "Node.js", "MongoDb", "Express.js"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProjects = selectedCategory === "All" ? projects : projects.filter((project) => project.technologies.some((tech) => tech.toLowerCase().includes(selectedCategory.toLowerCase())));

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 className="text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            My Projects
          </motion.h1>
          <motion.p className="text-lg max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge and learning experience.
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(6);
              }}
              className={`px-5 py-2 rounded-full font-medium transition-colors shadow-sm cursor-pointer ${selectedCategory === category ? "bg-indigo-600 text-white" : "bg-indigo-100 text-gray-700 hover:bg-indigo-200"}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleCount).map((project, index) => (
            <CardProject key={index} {...project} />
          ))}
        </div>

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
