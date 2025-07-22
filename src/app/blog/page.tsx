import Link from "next/link";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getData } from "@/services/notionServices";

export default async function BlogPage() {
  const { results } = await getData();

  return (
    <div className="mt-20 p-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="flex flex-col gap-3">
        {(results as PageObjectResponse[]).map((result) => {
          const titleProp = result.properties.Name;
          const title =
            titleProp.type === "title" && titleProp.title.length > 0
              ? titleProp.title[0].plain_text
              : "Untitled";

          return (
            <Link
              href={`/blog/${result.id}`}
              key={result.id}
              className="text-blue-600 hover:underline">
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
