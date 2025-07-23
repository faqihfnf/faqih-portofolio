import { notion } from "../lib/notion";
import { NotionAPI } from "notion-client";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notionApi = new NotionAPI();

/**
 * Ambil daftar halaman (list blog) langsung dari Notion Database
 * tanpa cache redis
 * Sudah filter: Status = Published
 * Sudah sort: CreatedAt descending
 */
export async function getData(): Promise<
  {
    id: string;
    title: string;
    slug: string | null;
    cover: string | null;
    createdAt: string | null;
    description: string;
  }[]
> {
  const raw: QueryDatabaseResponse = await notion.databases.query({
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

  // transformasi data biar lebih mudah digunakan di komponen
  const results = (raw.results as PageObjectResponse[]).map((page) => {
    // Title
    let title = "Untitled";
    const titleProp = page.properties.Name;
    if (titleProp.type === "title" && titleProp.title.length > 0) {
      title = titleProp.title[0].plain_text;
    }

    // Slug
    let slug: string | null = null;
    const slugProp = page.properties.Slug;
    if (
      slugProp &&
      slugProp.type === "rich_text" &&
      slugProp.rich_text.length > 0
    ) {
      slug = slugProp.rich_text[0].plain_text;
    }

    // Cover
    let cover: string | null = null;
    const coverProp = page.properties.Cover;
    if (coverProp && coverProp.type === "files" && coverProp.files.length > 0) {
      const file = coverProp.files[0];
      if (file.type === "external") {
        cover = file.external.url;
      } else if (file.type === "file") {
        cover = file.file.url;
      }
    }

    // CreatedAt (dari property buatan sendiri, bukan bawaan Notion)
    let createdAt: string | null = null;
    const createdProp = page.properties.CreatedAt;
    if (createdProp && createdProp.type === "date" && createdProp.date?.start) {
      createdAt = createdProp.date.start;
    } else {
      // fallback ke bawaan Notion
      // @ts-ignore
      if ((page as any).created_time) {
        createdAt = (page as any).created_time;
      }
    }

    // misal di loop results
    const descProp = page.properties.Description;
    let description = "";
    if (
      descProp &&
      descProp.type === "rich_text" &&
      descProp.rich_text.length > 0
    ) {
      description = descProp.rich_text[0].plain_text;
    }

    return {
      id: page.id,
      title,
      slug,
      cover,
      description,
      createdAt,
    };
  });

  return results;
}

/**
 * Ambil detail page (recordMap) langsung dari Notion
 * tanpa cache redis
 */
export async function getPageRecordMap(pageId: string) {
  const recordMap = await notionApi.getPage(pageId);
  return recordMap;
}
