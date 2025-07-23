import { getData, getPageRecordMap } from "@/services/notionServices";
import NotionContent from "./NotionContent";
import TableOfContents from "./TableOfContents";
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
    <div className="max-w-6xl mx-auto px-10 py-20">
      <Link
        href="/blog"
        className="inline-block text-sm text-blue-500 hover:underline mb-6">
        ← Back to Blog
      </Link>

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

      {page.cover && (
        <img
          src={page.cover}
          alt={page.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {/* Layout dengan sidebar TOC dan content */}
      <div className="flex gap-8">
        {/* Content utama */}
        <div className="flex-1 max-w-3xl">
          <NotionContent recordMap={recordMap} />
        </div>

        {/* Sidebar TOC - hanya tampil di desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8">
            <TableOfContents recordMap={recordMap} />
          </div>
        </div>
      </div>
    </div>
  );
}
