"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  { ssr: false }
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
);

import { NotionRenderer as Renderer } from "react-notion-x";

export function NotionRenderer({ recordMap }: { recordMap: any }) {
  useEffect(() => {
    const addHeadingIds = () => {
      const blocks = document.querySelectorAll(".notion-block");
      blocks.forEach((block: Element) => {
        const htmlBlock = block as HTMLElement;
        const blockId = htmlBlock.getAttribute("data-block-id");
        if (blockId && recordMap?.block?.[blockId]) {
          const blockData = recordMap.block[blockId].value;
          if (
            blockData?.type === "header" ||
            blockData?.type === "sub_header" ||
            blockData?.type === "sub_sub_header"
          ) {
            const headingElement = htmlBlock.querySelector("h1, h2, h3");
            if (headingElement && !headingElement.id) {
              const cleanId = blockId.replace(/-/g, "");
              let levelSuffix = "";
              if (blockData.type === "sub_header") levelSuffix = "-h2";
              if (blockData.type === "sub_sub_header") levelSuffix = "-h3";

              headingElement.id = cleanId + levelSuffix;

              console.log(
                "Added ID to heading:",
                headingElement.id,
                headingElement.textContent
              );
            }
          }
        }
      });
    };

    const timer1 = setTimeout(addHeadingIds, 100);
    const timer2 = setTimeout(addHeadingIds, 500);
    const timer3 = setTimeout(addHeadingIds, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
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
