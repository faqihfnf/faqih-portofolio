import { getData } from "@/services/notionServices";
import BlogListClient from "@/components/sections/blog/BlogListClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Faqih Nur Fahmi - Blog",
  description: "Catatan pribadi tentang perjalanan belajar dan pengalaman saya. Mendokumentasikan proses bertumbuh melalui artikel, pemikiran, ide, dan tutorial seputar HR dan Web Development.",
};

export default async function BlogList() {
  const posts = await getData();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
