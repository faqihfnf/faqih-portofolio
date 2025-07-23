// src/app/blog/[slug]/NotionContent.tsx
"use client";

import { NotionRenderer as Renderer } from "./renderer";

export default function NotionContent({ recordMap }: { recordMap: any }) {
  return (
    <div className="prose dark:prose-invert">
      <Renderer recordMap={recordMap} />
    </div>
  );
}
