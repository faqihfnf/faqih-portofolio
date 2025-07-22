"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css"; // tema code block
import "katex/dist/katex.min.css"; // untuk math kalau ada

// load komponen third-party opsional (code, collection, equation, pdf)
const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation));
const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), { ssr: false });
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), { ssr: false });

import { NotionRenderer as Renderer } from "react-notion-x";
import CustomCodeBlock from "@/components/sections/blog/CodeBlock";

export function NotionRenderer({ recordMap }: { recordMap: any }) {
  return (
    <Renderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={false}
      pageHeader={false}
      components={{
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
      }}
    />
  );
}
