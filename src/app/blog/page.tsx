import { getData } from "@/services/notionServices";
import BlogHeader from "@/components/sections/blog/BlogHeader";
import BlogListClient from "@/components/sections/blog/BlogListClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Faqih Nur Fahmi - Blog",
  description: "Artikel dan tulisan tentang teknologi, programming, dan pengalaman.",
};

export default async function BlogList() {
  const posts = await getData();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <BlogHeader />

        {/* Blog Cards */}
        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
