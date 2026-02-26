import { notion } from "../lib/notion";
import { NotionAPI } from "notion-client";
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const notionApi = new NotionAPI();

// ============================================================
// Simple in-memory cache (30 menit)
// ============================================================
interface CacheEntry {
  data: unknown;
  expiredAt: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 1000 * 60 * 30; // 30 menit

function getCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiredAt) {
    cache.delete(key);
    return null;
  }
  return cached.data as T;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, expiredAt: Date.now() + CACHE_TTL });
}

// ============================================================
// Types
// ============================================================
interface BlogPost {
  id: string;
  title: string;
  slug: string | null;
  cover: string | null;
  createdAt: string | null;
  description: string;
}

// ============================================================
// getData — ambil list blog dari Notion Database
// ============================================================
export async function getData(): Promise<BlogPost[]> {
  const cacheKey = "blog-list";

  const cached = getCache<BlogPost[]>(cacheKey);
  if (cached) {
    return cached;
  }

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

  const results: BlogPost[] = (raw.results as PageObjectResponse[]).map((page) => {
    // Title
    let title = "Untitled";
    const titleProp = page.properties.Name;
    if (titleProp.type === "title" && titleProp.title.length > 0) {
      title = titleProp.title[0].plain_text;
    }

    // Slug
    let slug: string | null = null;
    const slugProp = page.properties.Slug;
    if (slugProp && slugProp.type === "rich_text" && slugProp.rich_text.length > 0) {
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

    // CreatedAt
    let createdAt: string | null = null;
    const createdProp = page.properties.CreatedAt;
    if (createdProp && createdProp.type === "date" && createdProp.date?.start) {
      createdAt = createdProp.date.start;
    } else if ((page as PageObjectResponse & { created_time?: string }).created_time) {
      createdAt = (page as PageObjectResponse & { created_time?: string }).created_time ?? null;
    }

    // Description
    let description = "";
    const descProp = page.properties.Description;
    if (descProp && descProp.type === "rich_text" && descProp.rich_text.length > 0) {
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

  setCache(cacheKey, results);
  return results;
}

// ============================================================
// getPageRecordMap — ambil detail page dari Notion
// ============================================================
export async function getPageRecordMap(pageId: string) {
  const cacheKey = `page-${pageId}`;

  const cached = getCache<unknown>(cacheKey);
  if (cached) {
    return cached;
  }

  const recordMap = await notionApi.getPage(pageId);
  setCache(cacheKey, recordMap);
  return recordMap;
}

// ============================================================
// revalidatePage — paksa hapus cache untuk halaman tertentu
// Panggil ini jika ingin update konten tanpa tunggu 30 menit
// ============================================================
export function revalidatePage(pageId: string) {
  cache.delete(`page-${pageId}`);
  cache.delete("blog-list");
}

// ============================================================
// revalidateAll — paksa hapus semua cache
// Panggil ini jika ingin update konten tanpa tunggu 30 menit
// ============================================================
export function revalidateAll() {
  cache.clear();
}

// ============================================================
// revalidateBlogList — paksa hapus cache untuk list blog
// Panggil ini jika ingin update konten tanpa tunggu 30 menit
// ============================================================
export function revalidateBlogList() {
  cache.delete("blog-list");
}
