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

  return <BlogListClient posts={posts} />;
}
