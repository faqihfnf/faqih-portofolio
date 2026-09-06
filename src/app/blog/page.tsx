import { getData } from "@/services/notionServices";
import BlogListClient from "@/components/sections/blog/BlogListClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "HR, Organizational Development, and Technology Blog",
  description: "Articles and reflections by Faqih Nur Fahmi on HR management, organizational development, digital transformation, software development, and practical workplace solutions.",
  alternates: { canonical: "/blog" },
};

export default async function BlogList() {
  const posts = await getData();

  return <BlogListClient posts={posts} />;
}
