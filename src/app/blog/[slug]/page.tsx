import { getData, getPageBlocks } from "@/services/notionServices";
import TableOfContents from "../../../components/sections/blog/TableOfContents";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { NotionBlock } from "@/services/notionServices";
import NotionBlockRenderer from "../../../components/sections/blog/NotionBlockRenderer";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Extract headings dari blocks untuk TOC
function extractHeadings(blocks: NotionBlock[]) {
  return blocks
    .filter((b) => ["heading_1", "heading_2", "heading_3"].includes(b.type))
    .map((b) => {
      const data = (b as any)[b.type];
      const title = data?.rich_text?.map((t: any) => t.plain_text).join("") || "";
      const level = b.type === "heading_1" ? 1 : b.type === "heading_2" ? 2 : 3;
      return {
        id: b.id.replace(/-/g, ""),
        title,
        level,
      };
    })
    .filter((h) => h.title.trim() !== "");
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
          <span>Back to Blog</span>
        </Link>
        <div className="text-center flex flex-col items-center justify-center mt-40">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">❌ Oops! Blog tidak ditemukan</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Sepertinya artikel yang Anda cari sudah tidak tersedia atau telah dipindahkan.</p>
        </div>
      </div>
    );
  }

  const blocks = await getPageBlocks(page.id);
  const headings = extractHeadings(blocks);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-10 py-20">
      <Link href="/blog" className="text-md hover:text-indigo-400 hover:font-semibold font-medium mb-6">
        <ChevronLeft className="inline-block mr-1 -mt-1" />
        <span>Back to Blog</span>
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

      {page.cover && <img src={page.cover} alt={page.title} className="w-full h-64 sm:h-96 object-cover rounded-lg mb-6" />}

      <div className="flex gap-8 min-w-0">
        {/* Content utama */}
        <div className="flex-1 min-w-0 max-w-4xl overflow-hidden">
          <NotionBlockRenderer blocks={blocks} />
        </div>

        {/* Sidebar TOC */}
        {headings.length > 0 && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <TableOfContents headings={headings} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
