"use client";

import { NotionRenderer as Renderer } from "./renderer";

interface NotionContentProps {
  recordMap: any;
}

export default function NotionContent({ recordMap }: NotionContentProps) {
  return (
    <div className="prose dark:prose-invert">
      <Renderer recordMap={recordMap} />
    </div>
  );
}
