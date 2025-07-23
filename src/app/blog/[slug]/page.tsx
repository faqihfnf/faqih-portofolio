import { getData, getPageRecordMap } from "@/services/notionServices";
import NotionContent from "./NotionContent";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = params;

  const posts = await getData();
  const page = posts.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 mt-20">
        <p className="text-red-500">❌ Blog not found.</p>
        <Link href="/blog" className="text-blue-500 underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const pageId = page.id.replace(/-/g, "");
  const recordMap = await getPageRecordMap(pageId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-20">
      <Link
        href="/blog"
        className="inline-block text-sm text-blue-500 hover:underline mb-6">
        ← Back to Blog
      </Link>

      {page.cover && (
        <img
          src={page.cover}
          alt={page.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-2 text-center">{page.title}</h1>
      {page.createdAt && (
        <p className="text-sm text-gray-500 mb-8 text-center">
          📅{" "}
          {new Date(page.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {/* Render isi Notion di komponen client */}
      <NotionContent recordMap={recordMap} />
    </div>
  );
}
