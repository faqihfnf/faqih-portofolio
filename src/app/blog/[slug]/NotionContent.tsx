"use client";

// import { NotionRenderer as Renderer } from "./renderer";
import NotionErrorBoundary from "./NotionErrorBoundary";

interface NotionContentProps {
  recordMap: any;
}

export default function NotionContent({ recordMap }: NotionContentProps) {
  return (
    <NotionErrorBoundary>
      <div className="prose dark:prose-invert">{/* <Renderer recordMap={recordMap} /> */}</div>
    </NotionErrorBoundary>
  );
}
