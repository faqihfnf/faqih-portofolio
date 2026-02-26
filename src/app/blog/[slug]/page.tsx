import { getData, getPageRecordMap } from "@/services/notionServices";
import NotionContent from "./NotionContent";
import TableOfContents from "./TableOfContents";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getData();
  return posts.filter((p) => p.slug !== null).map((p) => ({ slug: p.slug as string }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const posts = await getData();
  const page = posts.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="max-w-6xl mx-auto px-10 py-20">
        <Link href="/blog" className="flex text-md hover:text-indigo-500 font-medium mb-6">
          <ChevronLeft className="inline-block mr-1" />
          <span className="">Back to Blog</span>
        </Link>
        <div className="text-center flex flex-col items-center justify-center mt-40">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">❌ Oops! Blog tidak ditemukan</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Sepertinya artikel yang Anda cari sudah tidak tersedia atau telah dipindahkan.</p>
        </div>
      </div>
    );
  }

  const pageId = page.id.replace(/-/g, "");
  const recordMap = await getPageRecordMap(pageId);

  return (
    <div className="max-w-6xl mx-auto px-10 py-20">
      <Link href="/blog" className="flex text-md hover:text-indigo-500 font-medium mb-6">
        <ChevronLeft className="inline-block mr-1" />
        <span className="">Back to Blog</span>
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

      {page.cover && <img src={page.cover} alt={page.title} className="w-full h-64 object-cover rounded-lg mb-6" />}

      {/* Layout dengan sidebar TOC dan content */}
      <div className="flex gap-8">
        {/* Content utama */}
        <div className="flex-1 max-w-4xl">
          <NotionContent recordMap={recordMap} />
        </div>

        {/* Sidebar TOC - hanya tampil di desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-16">
            <TableOfContents recordMap={recordMap} />
          </div>
        </div>
      </div>
    </div>
  );
}
