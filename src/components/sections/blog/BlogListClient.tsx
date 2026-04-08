"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoaderPinwheel } from "lucide-react";
import BlogCard from "@/components/sections/blog/BlogCard";
import { BlogPost } from "@/services/notionServices";
import FilterCarousel from "@/components/ui/filter-carousel";
import { useTranslation } from "react-i18next";

interface BlogListClientProps {
  posts: BlogPost[];
}

const INITIAL_COUNT = 5;

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Kumpulkan semua tags unik dari semua post
  const allTags = ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags))).sort()];

  // Filter posts berdasarkan tag yang dipilih
  const filteredPosts = selectedTag === "All" ? posts : posts.filter((post) => post.tags.includes(selectedTag));

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_COUNT, filteredPosts.length));
  };

  const { t } = useTranslation();

  return (
    <>
      <div className="text-center mb-12">
        <motion.h1 className="sm:text-4xl text-3xl font-bold mb-4" whileHover={{ scale: 1.01 }} transition={{ duration: 0.5 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {t("blog.title")}
        </motion.h1>
        <motion.p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {t("blog.description")}
        </motion.p>
      </div>
      {/* Filter Tags - sama dengan halaman project */}
      {allTags.length > 1 && (
        <FilterCarousel
          categories={allTags}
          selected={selectedTag}
          onSelect={(tag) => {
            setSelectedTag(tag);
            setVisibleCount(INITIAL_COUNT);
          }}
        />
      )}

      {/* Blog List */}
      <div className="space-y-8">
        {filteredPosts.slice(0, visibleCount).map((post) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          Tidak ada post dengan tag <strong>{selectedTag}</strong>.
        </div>
      )}

      {/* Load More */}
      {visibleCount < filteredPosts.length && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 
              bg-[linear-gradient(110deg,#000103,45%,#5907e8,55%,#000103)] 
              bg-[length:200%_100%] px-6 text-slate-300 transition-colors 
              focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 
              focus:ring-offset-slate-50 hover:text-slate-100 font-semibold"
          >
            <LoaderPinwheel className="mr-2 h-4 w-4" />
            Load More
          </button>
        </div>
      )}
    </>
  );
}
