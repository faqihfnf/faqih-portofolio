"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoaderPinwheel } from "lucide-react";
import BlogCard from "@/components/sections/blog/BlogCard";

export default function BlogListClient({ posts, siteUrl }: { posts: any[]; siteUrl: string }) {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <>
      <div className="space-y-10">
        {posts.slice(0, visibleCount).map((post) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <BlogCard post={post} siteUrl={siteUrl} />
          </motion.div>
        ))}
      </div>

      {visibleCount < posts.length && (
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
