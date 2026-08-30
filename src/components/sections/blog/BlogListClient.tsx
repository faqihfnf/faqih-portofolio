"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/services/notionServices";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/editorial/SectionHeader";
import { fraunces, inter } from "@/components/editorial/fonts";
import EditorialTheme from "@/components/editorial/EditorialTheme";
import { EditorialButton } from "@/components/editorial/EditorialButton";

interface BlogListClientProps {
  posts: BlogPost[];
}

const INITIAL_COUNT = 5;

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const allTags = ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags))).sort()];
  const filteredPosts = selectedTag === "All" ? posts : posts.filter((post) => post.tags.includes(selectedTag));

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_COUNT, filteredPosts.length));
  };

  const { t } = useTranslation();

  return (
    <div className={`${fraunces.variable} ${inter.variable} editorial min-h-screen`}>
      <EditorialTheme />
      <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        <SectionHeader tag="Blog" title={t("blog.title")} description={t("blog.description")} />

        {/* Filter tag — teks minimal, bukan pill */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 pb-4">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setVisibleCount(INITIAL_COUNT);
                }}
                className={`cursor-pointer text-[11px] uppercase tracking-[0.18em] transition-colors ${selectedTag === tag ? "text-[var(--ed-accent)]" : "text-[var(--ed-text-muted)] hover:text-[var(--ed-text-secondary)]"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Daftar artikel — dengan thumbnail seperti sebelumnya */}
        <ol className="border-t border-[var(--ed-border)]">
          {filteredPosts.slice(0, visibleCount).map((post, index) => (
            <motion.li
              key={post.id}
              className="border-b border-[var(--ed-border)] py-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (index % 8) * 0.06 }}
            >
              <Link href={`/blog/${post.slug ?? ""}`} className="group flex flex-col gap-5 sm:flex-row-reverse sm:gap-8">
                {/* Thumbnail — kanan seperti sebelumnya */}
                {post.cover && (
                  <div className="flex-shrink-0 sm:h-[120px] sm:w-[180px]">
                    <img src={post.cover} alt={post.title} className="h-44 w-full rounded-[2px] border border-[var(--ed-border)] object-cover sm:h-full" />
                  </div>
                )}

                {/* Content — kiri */}
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">
                    {post.createdAt && (
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("id-ID", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                    {post.tags.length > 0 && <span className="hidden sm:inline">·</span>}
                    {post.tags.length > 0 && <span className="hidden sm:inline">{post.tags.slice(0, 3).join(" · ")}</span>}
                  </div>

                  <h2 className="ed-serif mt-2 text-xl leading-snug tracking-tight transition-colors group-hover:text-[var(--ed-accent)]">{post.title}</h2>

                  {post.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--ed-text-secondary)]">{post.description}</p>}
                </div>
              </Link>
            </motion.li>
          ))}
        </ol>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <p className="py-20 text-center text-[var(--ed-text-muted)]">
            Tidak ada post dengan tag <span className="text-[var(--ed-text-secondary)]">{selectedTag}</span>.
          </p>
        )}

        {/* Load More */}
        {visibleCount < filteredPosts.length && (
          <div className="mt-10 text-center">
            <EditorialButton type="button" onClick={handleLoadMore} variant="primary">
              Load More
            </EditorialButton>
          </div>
        )}
      </section>
    </div>
  );
}
