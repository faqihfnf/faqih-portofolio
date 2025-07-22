"use client";

import React, { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { Check, Clipboard } from "lucide-react";

export default function CustomCodeBlock({ block }: { block: any }) {
  const [copied, setCopied] = useState(false);
  const rawCode = block.properties?.title?.[0]?.[0] || "";
  const language = block.properties?.language?.[0]?.[0] || "typescript";

  // Hilangkan backticks jika ada
  const cleanCode = rawCode.replace(/^```[a-z]*\n|\n```$/g, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="w-full relative">
      <button onClick={handleCopy} className="absolute top-2 right-2 z-10 text-white p-1 rounded-md text-sm hover:bg-indigo-700 transition">
        {copied ? <Check size={16} /> : <Clipboard size={16} />}
      </button>

      <CodeBlock
        text={cleanCode}
        language={language}
        theme={dracula}
        showLineNumbers={false}
        customStyle={{
          borderRadius: "8px",
          padding: "16px",
          fontFamily: "JetBrains Mono, monospace",
          backgroundColor: "#282a36",
          overflowX: "auto",
        }}
      />
    </div>
  );
}
