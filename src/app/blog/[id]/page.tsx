import { getPageRecordMap } from "@/services/notionServices";
import { NotionRenderer } from "./renderer";

interface PageProps {
  params: { id: string };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = params;
  const recordMap = await getPageRecordMap(id);

  return (
    <div className="mt-20 p-10">
      <NotionRenderer recordMap={recordMap} />
    </div>
  );
}
