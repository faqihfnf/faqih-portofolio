"use client";

import React, { useState, useEffect, useRef } from "react";
import { getBlockTitle } from "notion-utils";
import { TableOfContentsIcon } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  recordMap: any;
}

export default function TableOfContents({ recordMap }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // 👉 state untuk mendeteksi sedang manual scroll (klik TOC)
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const isManualScrollingRef = useRef(false);
  useEffect(() => {
    isManualScrollingRef.current = isManualScrolling;
  }, [isManualScrolling]);

  // 🔹 Extract headings
  useEffect(() => {
    const extractHeadings = () => {
      const items: TOCItem[] = [];
      if (!recordMap?.block) return items;

      Object.values(recordMap.block).forEach((block: any) => {
        const value = block?.value;
        if (!value) return;

        if (
          value.type === "header" ||
          value.type === "sub_header" ||
          value.type === "sub_sub_header"
        ) {
          const title = getBlockTitle(value, recordMap) || "";
          if (title.trim()) {
            let level = 1;
            if (value.type === "sub_header") level = 2;
            if (value.type === "sub_sub_header") level = 3;

            // hapus dash agar sesuai dengan data-block-id
            items.push({
              id: value.id.replace(/-/g, ""),
              title: title.trim(),
              level,
            });
          }
        }
      });

      return items;
    };

    const headings = extractHeadings();
    setTocItems(headings);
    console.log("TOC Items extracted:", headings);
  }, [recordMap]);

  // 🔹 Intersection Observer
  useEffect(() => {
    const observerOptions = {
      rootMargin: "-20% 0% -35% 0%",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrollingRef.current) return; // 🚫 jangan override saat sedang manual scroll

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const setupObserver = () => {
      tocItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
          console.log("Observing element:", item.id);
        } else {
          console.log("Element not found:", item.id);
        }
      });
    };

    const timer = setTimeout(setupObserver, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [tocItems]);

  // 🔹 Scroll to heading saat klik
  const scrollToHeading = (id: string) => {
    setIsManualScrolling(true);
    setActiveId(id); // langsung highlight heading yang diklik

    let element = document.getElementById(id);
    if (!element) {
      element = document.querySelector(
        `[data-block-id="${id}"] h1, [data-block-id="${id}"] h2, [data-block-id="${id}"] h3`
      ) as HTMLElement | null;
    }

    if (element) {
      const yOffset = -100; // sesuaikan dengan tinggi navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      if (history.pushState) {
        history.pushState(null, "", `#${id}`);
      }
    } else {
      console.log("Element not found for scrolling:", id);
    }

    // Matikan flag setelah scroll animasi selesai
    setTimeout(() => {
      setIsManualScrolling(false);
    }, 1000);
  };

  // 🔹 Jika tidak ada heading
  if (tocItems.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          📋 Table of Contents
        </h3>
        <p className="text-sm text-gray-500">No headings found</p>
      </div>
    );
  }

  // 🔹 Render TOC
  return (
    <div className="bg-slate-800/10 dark:bg-slate-800 rounded-md p-4">
      <h3 className="text-lg flex items-center font-semibold mb-4 text-gray-900 dark:text-gray-100">
        <TableOfContentsIcon className="inline-block w-6 h-6 mr-2" />
        <span className="font-semibold">Daftar Isi</span>
      </h3>
      <nav>
        <ul className="space-y-2">
          {tocItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`text-left w-full transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  activeId === item.id
                    ? "text-indigo-600 dark:text-indigo-400 font-medium"
                    : "text-gray-600 font-medium dark:text-gray-300"
                }`}
                style={{
                  paddingLeft: `${(item.level - 1) * 12}px`,
                  fontSize:
                    item.level === 1
                      ? "14px"
                      : item.level === 2
                      ? "13px"
                      : "12px",
                }}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
