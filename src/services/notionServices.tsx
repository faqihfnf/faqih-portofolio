import { notion } from "../lib/notion";
import { redis } from "../lib/redis";
import { NotionAPI } from "notion-client";

const notionApi = new NotionAPI();

/**
 * Ambil daftar halaman dari database Notion (untuk daftar blog)
 */
export async function getData() {
  const cachedData = await redis.get("blog");
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });

  // simpan ke redis dengan TTL 1 jam (ioredis style)
  await redis.set("blog", JSON.stringify(data), "EX", 60 * 60);

  return data;
}

/**
 * Ambil recordMap dari Notion (untuk react-notion-x)
 */
export async function getPageRecordMap(pageId: string) {
  const cacheKey = `blog:recordMap:${pageId}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const recordMap = await notionApi.getPage(pageId);

  // simpan ke redis dengan TTL 1 jam (ioredis style)
  await redis.set(cacheKey, JSON.stringify(recordMap), "EX", 60 * 60);

  return recordMap;
}
