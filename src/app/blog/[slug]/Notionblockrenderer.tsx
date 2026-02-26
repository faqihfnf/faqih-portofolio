"use client";

import React, { useState } from "react";
import { NotionBlock } from "@/services/notionServices";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// ============================================================
// Rich Text Renderer
// ============================================================
interface RichText {
  type: string;
  text?: { content: string; link?: { url: string } | null };
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
  plain_text?: string;
  href?: string | null;
}

function RichTextContent({ richText }: { richText: RichText[] }) {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((text, i) => {
        const content = text.plain_text || text.text?.content || "";
        const annotations = text.annotations || {};
        const href = text.href || text.text?.link?.url;

        let node: React.ReactNode = content;

        if (annotations.code) {
          node = (
            <code key={i} className="bg-gray-100 dark:bg-gray-800 text-rose-500 dark:text-rose-400 px-1.5 py-0.5 rounded text-sm font-mono">
              {content}
            </code>
          );
        } else {
          if (annotations.bold) node = <strong key={i}>{node}</strong>;
          if (annotations.italic) node = <em key={i}>{node}</em>;
          if (annotations.strikethrough) node = <del key={i}>{node}</del>;
          if (annotations.underline) node = <u key={i}>{node}</u>;
          if (href) {
            node = (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                {node}
              </a>
            );
          }
        }

        return <React.Fragment key={i}>{node}</React.Fragment>;
      })}
    </>
  );
}

// ============================================================
// Toggle Block
// ============================================================
function ToggleBlock({ block, blocks }: { block: NotionBlock; blocks: NotionBlock[] }) {
  const [open, setOpen] = useState(false);
  const data = (block as any).toggle;

  return (
    <div className="my-2">
      <button onClick={() => setOpen(!open)} className="flex items-start gap-2 w-full text-left group">
        <span className={`mt-1 text-gray-500 transition-transform duration-200 ${open ? "rotate-90" : ""}`}>▶</span>
        <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <RichTextContent richText={data?.rich_text || []} />
        </span>
      </button>
      {open && block.children && (
        <div className="ml-6 mt-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
          <NotionBlockRenderer blocks={block.children} />
        </div>
      )}
    </div>
  );
}

// ============================================================
// Table Block
// ============================================================
function TableBlock({ block }: { block: NotionBlock }) {
  const tableData = (block as any).table;
  const hasColumnHeader = tableData?.has_column_header ?? false;
  const hasRowHeader = tableData?.has_row_header ?? false;
  const rows = block.children || [];

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, rowIndex) => {
            const rowData = (row as any).table_row;
            const cells: RichText[][] = rowData?.cells || [];
            const isHeader = hasColumnHeader && rowIndex === 0;

            return (
              <tr key={row.id} className={isHeader ? "bg-gray-100 dark:bg-gray-800 font-semibold" : rowIndex % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}>
                {cells.map((cell, cellIndex) => {
                  const isRowHeader = hasRowHeader && cellIndex === 0;
                  const Tag = isHeader || isRowHeader ? "th" : "td";
                  return (
                    <Tag key={cellIndex} className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 last:border-r-0 text-gray-800 dark:text-gray-200">
                      <RichTextContent richText={cell} />
                    </Tag>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// Main Block Renderer
// ============================================================
interface NotionBlockRendererProps {
  blocks: NotionBlock[];
}

export default function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  // Group numbered list items
  const renderedBlocks: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    // Group consecutive numbered_list_item
    if (block.type === "numbered_list_item") {
      const group: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        group.push(blocks[i]);
        i++;
      }
      renderedBlocks.push(
        <ol key={`ol-${block.id}`} className="list-decimal list-outside ml-6 my-3 space-y-1">
          {group.map((b) => {
            const data = (b as any).numbered_list_item;
            return (
              <li key={b.id} className="text-gray-700 dark:text-gray-300 leading-relaxed pl-1">
                <RichTextContent richText={data?.rich_text || []} />
                {b.children && (
                  <div className="ml-4 mt-1">
                    <NotionBlockRenderer blocks={b.children} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>,
      );
      continue;
    }

    // Group consecutive bulleted_list_item
    if (block.type === "bulleted_list_item") {
      const group: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        group.push(blocks[i]);
        i++;
      }
      renderedBlocks.push(
        <ul key={`ul-${block.id}`} className="list-disc list-outside ml-6 my-3 space-y-1">
          {group.map((b) => {
            const data = (b as any).bulleted_list_item;
            return (
              <li key={b.id} className="text-gray-700 dark:text-gray-300 leading-relaxed pl-1">
                <RichTextContent richText={data?.rich_text || []} />
                {b.children && (
                  <div className="ml-4 mt-1">
                    <NotionBlockRenderer blocks={b.children} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>,
      );
      continue;
    }

    renderedBlocks.push(<BlockRenderer key={block.id} block={block} blocks={blocks} />);
    i++;
  }

  return <>{renderedBlocks}</>;
}

// ============================================================
// Single Block Renderer
// ============================================================
function BlockRenderer({ block, blocks }: { block: NotionBlock; blocks: NotionBlock[] }) {
  switch (block.type) {
    case "heading_1": {
      const data = (block as any).heading_1;
      return (
        <h1 id={block.id.replace(/-/g, "")} className="text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-gray-100 scroll-mt-20">
          <RichTextContent richText={data?.rich_text || []} />
        </h1>
      );
    }

    case "heading_2": {
      const data = (block as any).heading_2;
      return (
        <h2 id={block.id.replace(/-/g, "")} className="text-2xl font-bold mt-8 mb-3 text-gray-900 dark:text-gray-100 scroll-mt-20">
          <RichTextContent richText={data?.rich_text || []} />
        </h2>
      );
    }

    case "heading_3": {
      const data = (block as any).heading_3;
      return (
        <h3 id={block.id.replace(/-/g, "")} className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100 scroll-mt-20">
          <RichTextContent richText={data?.rich_text || []} />
        </h3>
      );
    }

    case "paragraph": {
      const data = (block as any).paragraph;
      const richText = data?.rich_text || [];
      if (richText.length === 0) {
        return <div className="h-4" />;
      }
      return (
        <p className="my-3 text-gray-700 dark:text-gray-300 leading-relaxed">
          <RichTextContent richText={richText} />
        </p>
      );
    }

    case "code": {
      const data = (block as any).code;
      const language = data?.language || "plaintext";
      const code = data?.rich_text?.map((t: RichText) => t.plain_text || "").join("") || "";
      return (
        <div className="my-6 rounded-lg overflow-hidden">
          <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 flex justify-between items-center">
            <span>{language}</span>
          </div>
          <SyntaxHighlighter language={language} style={oneDark} customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.875rem" }}>
            {code}
          </SyntaxHighlighter>
          {data?.caption?.length > 0 && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              <RichTextContent richText={data.caption} />
            </p>
          )}
        </div>
      );
    }

    case "image": {
      const data = (block as any).image;
      const url = data?.type === "external" ? data.external?.url : data?.file?.url;
      const caption = data?.caption || [];

      if (!url) return null;

      return (
        <figure className="my-6">
          <img src={url} alt={caption.map((c: RichText) => c.plain_text).join("") || "Blog image"} className="w-full rounded-lg object-cover" />
          {caption.length > 0 && (
            <figcaption className="text-sm text-gray-500 text-center mt-2">
              <RichTextContent richText={caption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "quote": {
      const data = (block as any).quote;
      return (
        <blockquote className="my-6 border-l-4 border-indigo-500 pl-4 py-1 bg-indigo-50 dark:bg-indigo-950/30 rounded-r-lg">
          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
            <RichTextContent richText={data?.rich_text || []} />
          </p>
          {block.children && (
            <div className="mt-2">
              <NotionBlockRenderer blocks={block.children} />
            </div>
          )}
        </blockquote>
      );
    }

    case "toggle": {
      return <ToggleBlock block={block} blocks={blocks} />;
    }

    case "table": {
      return <TableBlock block={block} />;
    }

    case "divider": {
      return <hr className="my-8 border-gray-200 dark:border-gray-700" />;
    }

    case "callout": {
      const data = (block as any).callout;
      const emoji = data?.icon?.type === "emoji" ? data.icon.emoji : "💡";
      return (
        <div className="my-6 flex gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <span className="text-xl flex-shrink-0">{emoji}</span>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <RichTextContent richText={data?.rich_text || []} />
            {block.children && (
              <div className="mt-2">
                <NotionBlockRenderer blocks={block.children} />
              </div>
            )}
          </div>
        </div>
      );
    }

    case "video": {
      const data = (block as any).video;
      const url = data?.type === "external" ? data.external?.url : data?.file?.url;
      if (!url) return null;

      // YouTube embed
      const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      if (youtubeMatch) {
        return (
          <div className="my-6 aspect-video rounded-lg overflow-hidden">
            <iframe src={`https://www.youtube.com/embed/${youtubeMatch[1]}`} className="w-full h-full" allowFullScreen />
          </div>
        );
      }

      return (
        <div className="my-6">
          <video src={url} controls className="w-full rounded-lg" />
        </div>
      );
    }

    case "embed": {
      const data = (block as any).embed;
      const url = data?.url;
      if (!url) return null;
      return (
        <div className="my-6 aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <iframe src={url} className="w-full h-full" />
        </div>
      );
    }

    case "bookmark": {
      const data = (block as any).bookmark;
      const url = data?.url;
      if (!url) return null;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="my-4 flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors group"
        >
          <span className="text-indigo-600 dark:text-indigo-400 group-hover:underline break-all text-sm">{url}</span>
        </a>
      );
    }

    case "child_database":
    case "child_page":
      return null;

    default:
      return null;
  }
}
