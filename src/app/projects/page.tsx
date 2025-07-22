"use client";

import CardProject from "@/components/sections/projects/CardProject";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = ["All", "React", "Next.js", "Node.js", "Mobile", "MongoDb"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            My Projects
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Here are some of the projects I&apos;ve worked on. Each one
            represents a unique challenge and learning experience.
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(6);
              }}
              className={`px-5 py-2 rounded-full font-medium transition-colors shadow-sm ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-gray-700 hover:bg-indigo-200"
              }`}>
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
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-400">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
