import Link from "next/link";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getData } from "@/services/notionServices";

export default async function TestPage() {
  const { results } = await getData();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-4">
        {(results as PageObjectResponse[]).map((result) => {
          const titleProp = result.properties.Name;
          const title = titleProp.type === "title" && titleProp.title.length > 0 ? titleProp.title[0].plain_text : "Untitled";

          // Ambil tanggal
          const createdTime = result.created_time
            ? new Date(result.created_time).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "";

          return (
            <Link href={`/blog/${result.id}`} key={result.id} className="block p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">{createdTime}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
