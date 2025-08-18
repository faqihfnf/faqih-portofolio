"use client";

import { Clipboard, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogCard({
  post,
  siteUrl,
}: {
  post: {
    id: string;
    slug: string | null;
    title: string;
    cover?: string | null;
    description?: string | null;
    createdAt?: string | null;
  };
  siteUrl: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault(); // jangan trigger Link
    const url = `${siteUrl}/blog/${post.slug ?? ""}`;
    try {
      await navigator.clipboard.writeText(url);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1500); // tooltip hilang setelah 1.5 detik
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <Link
      href={`/blog/${post.slug ?? ""}`}
      className="flex flex-col hover:border-1 hover:border-indigo-400 shadow-md shadow-indigo-200 hover:shadow-indigo-300 md:flex-row-reverse gap-6 p-6 hover:bg-gray-50 dark:hover:bg-slate-900/30 rounded-md transition-colors relative"
    >
      {/* ✅ Image di kanan */}
      {post.cover && (
        <div className="md:w-1/3 flex-shrink-0">
          <img src={post.cover} alt={post.title} className="w-full h-40 md:h-full object-cover rounded-md shadow-sm shadow-indigo-200" />
        </div>
      )}

      {/* ✅ Content di kiri */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold hover:underline mb-5">{post.title}</h2>
          {post.description && <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{post.description}</p>}
        </div>

        {/* Date & Copy Link */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-4 relative">
          {post.createdAt && (
            <span>
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          <div className="relative">
            <button onClick={handleCopyLink} className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer hover:font-semibold transition-colors relative">
              <Copy className="w-4 h-4" size={16} />
              <span className="mt-0.5">Copy</span>
            </button>

            {/* Tooltip */}
            {showTooltip && <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">Link copied!</div>}
          </div>
        </div>
      </div>
    </Link>
  );
}
