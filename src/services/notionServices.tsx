import { notion } from "../lib/notion";
import { NotionAPI } from "notion-client";

const notionApi = new NotionAPI();

/**
 * Ambil daftar halaman (list blog) langsung dari Notion Database
 * tanpa cache redis
 */
export async function getData() {
  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "CreatedAt",
        direction: "descending",
      },
    ],
  });

  return data;
}

/**
 * Ambil detail page (recordMap) langsung dari Notion
 * tanpa cache redis
 */
export async function getPageRecordMap(pageId: string) {
  const recordMap = await notionApi.getPage(pageId);
  return recordMap;
}
