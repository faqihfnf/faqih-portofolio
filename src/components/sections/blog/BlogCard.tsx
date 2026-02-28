"use client";

import { Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BlogPost } from "@/services/notionServices";

export default function BlogCard({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/blog/${post.slug ?? ""}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <Link href={`/blog/${post.slug ?? ""}`} className="group flex flex-col sm:flex-row-reverse gap-8 py-10 border-b border-slate-300  hover:border-slate-400 dark:border-slate-800  dark:hover:border-slate-700 transition-all duration-300">
      {/* Thumbnail - kanan seperti Medium */}
      {post.cover && (
        <div className="sm:w-[180px] sm:h-[120px] flex-shrink-0">
          <img src={post.cover} alt={post.title} className="w-full h-48 sm:h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      {/* Content - kiri */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Title + Description */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2">{post.title}</h2>
          {post.description && <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">{post.description}</p>}
        </div>

        {/* Bottom row: tags + date + copy */}
        <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
          {/* Tags + Date */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Tags sebagai badge */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Dot separator */}
            {post.tags && post.tags.length > 0 && post.createdAt && <span className="text-slate-300 dark:text-slate-600 text-xs">·</span>}

            {/* Date */}
            {post.createdAt && (
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Copy button */}
          <div className="relative">
            <button onClick={handleCopyLink} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
