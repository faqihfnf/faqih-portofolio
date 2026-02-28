import { notion } from "../lib/notion";
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

// ============================================================
// Types
// ============================================================
export interface BlogPost {
  id: string;
  title: string;
  slug: string | null;
  cover: string | null;
  createdAt: string | null;
  description: string;
  tags: string[]; // tambah tags
}

export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  [key: string]: any;
}

// ============================================================
// Simple in-memory cache (30 menit)
// ============================================================
interface CacheEntry {
  data: unknown;
  expiredAt: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 1000 * 60 * 30;

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
// getData — ambil list blog dari Notion Database
// ============================================================
export async function getData(): Promise<BlogPost[]> {
  const cacheKey = "blog-list";
  const cached = getCache<BlogPost[]>(cacheKey);
  if (cached) return cached;

  const raw: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "CreatedAt", direction: "descending" }],
  });

  const results: BlogPost[] = (raw.results as PageObjectResponse[]).map((page) => {
    let title = "Untitled";
    const titleProp = page.properties.Name;
    if (titleProp.type === "title" && titleProp.title.length > 0) {
      title = titleProp.title[0].plain_text;
    }

    let slug: string | null = null;
    const slugProp = page.properties.Slug;
    if (slugProp?.type === "rich_text" && slugProp.rich_text.length > 0) {
      slug = slugProp.rich_text[0].plain_text;
    }

    let cover: string | null = null;
    const coverProp = page.properties.Cover;
    if (coverProp?.type === "files" && coverProp.files.length > 0) {
      const file = coverProp.files[0];
      if (file.type === "external") cover = file.external.url;
      else if (file.type === "file") cover = file.file.url;
    }

    let createdAt: string | null = null;
    const createdProp = page.properties.CreatedAt;
    if (createdProp?.type === "date" && createdProp.date?.start) {
      createdAt = createdProp.date.start;
    } else {
      createdAt = (page as any).created_time ?? null;
    }

    let description = "";
    const descProp = page.properties.Description;
    if (descProp?.type === "rich_text" && descProp.rich_text.length > 0) {
      description = descProp.rich_text[0].plain_text;
    }

    // Tags dari multi-select
    let tags: string[] = [];
    const tagsProp = page.properties.Tags;
    if (tagsProp?.type === "multi_select") {
      tags = tagsProp.multi_select.map((t: { name: string }) => t.name);
    }

    return { id: page.id, title, slug, cover, description, createdAt, tags };
  });

  setCache(cacheKey, results);
  return results;
}

// ============================================================
// getPageBlocks — ambil semua blocks dari halaman Notion
// ============================================================
async function fetchBlocksRecursive(blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });

    for (const block of response.results as NotionBlock[]) {
      const notionBlock: NotionBlock = { ...block };
      if (block.has_children) {
        notionBlock.children = await fetchBlocksRecursive(block.id);
      }
      blocks.push(notionBlock);
    }

    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const cacheKey = `page-blocks-${pageId}`;
  const cached = getCache<NotionBlock[]>(cacheKey);
  if (cached) return cached;

  const blocks = await fetchBlocksRecursive(pageId);
  setCache(cacheKey, blocks);
  return blocks;
}

export function revalidatePage(pageId: string) {
  cache.delete(`page-blocks-${pageId}`);
  cache.delete("blog-list");
}
