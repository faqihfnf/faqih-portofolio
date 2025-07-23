import { getData } from "@/services/notionServices";
import BlogCard from "@/components/sections/blog/BlogCard";
import BlogHeader from "@/components/sections/blog/BlogHeader";
import BlogListClient from "@/components/sections/blog/BlogListClient";

export const dynamic = "force-dynamic";

export default async function BlogList() {
  const posts = await getData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <BlogHeader />
        <BlogListClient posts={posts} siteUrl={siteUrl} />
        {/* Blog Cards */}
        {/* <div className="space-y-10">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} siteUrl={siteUrl} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
