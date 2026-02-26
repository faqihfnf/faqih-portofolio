"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation));
const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), { ssr: false });
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), { ssr: false });

import { NotionRenderer as Renderer } from "react-notion-x";

export function NotionRenderer({ recordMap }: { recordMap: any }) {
  useEffect(() => {
    if (!recordMap) return; // tambahkan guard ini

    let timers: ReturnType<typeof setTimeout>[] = [];

    const addHeadingIds = () => {
      const blocks = document.querySelectorAll(".notion-block");
      blocks.forEach((block: Element) => {
        const htmlBlock = block as HTMLElement;
        const blockId = htmlBlock.getAttribute("data-block-id");
        if (blockId && recordMap?.block?.[blockId]) {
          const blockData = recordMap.block[blockId].value;
          if (blockData?.type === "header" || blockData?.type === "sub_header" || blockData?.type === "sub_sub_header") {
            const headingElement = htmlBlock.querySelector("h1, h2, h3");
            if (headingElement && !headingElement.id) {
              const cleanId = blockId.replace(/-/g, "");
              let levelSuffix = "";
              if (blockData.type === "sub_header") levelSuffix = "-h2";
              if (blockData.type === "sub_sub_header") levelSuffix = "-h3";
              headingElement.id = cleanId + levelSuffix;
            }
          }
        }
      });
    };

    // Tunggu render selesai dulu
    timers.push(setTimeout(addHeadingIds, 100));
    timers.push(setTimeout(addHeadingIds, 500));
    timers.push(setTimeout(addHeadingIds, 1000));

    return () => {
      timers.forEach(clearTimeout); // cleanup semua timer sekaligus
    };
  }, [recordMap]);

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
