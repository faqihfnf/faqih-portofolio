import { getPageRecordMap } from "@/services/notionServices";
import { NotionRenderer } from "./renderer";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const recordMap = await getPageRecordMap(id);

  // ambil judul & created_time dari recordMap.rootBlock
  const block = recordMap?.block?.[Object.keys(recordMap.block)[0]]?.value;
  const title = block?.properties?.title?.[0]?.[0] || "Untitled Blog Post";
  const createdTime = block?.created_time
    ? new Date(block.created_time).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-20">
      {/* Tombol back */}
      <Link href="/blog" className="inline-block text-sm text-blue-500 hover:underline mb-6">
        ← Back to Blog
      </Link>

      {/* Judul dan tanggal */}
      <h1 className="text-4xl flex justify-center text-center font-bold mb-2">{title}</h1>
      {createdTime && <p className="text-sm flex justify-center text-gray-500 mb-8">📅 {createdTime}</p>}

      {/* Konten dari Notion */}
      <div className="prose dark:prose-invert">
        <NotionRenderer recordMap={recordMap} />
      </div>
    </div>
  );
}
