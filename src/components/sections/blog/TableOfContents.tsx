"use client";

import React, { useState, useEffect, useRef } from "react";
import { TableOfContentsIcon } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const isManualScrollingRef = useRef(false);

  // Intersection Observer untuk highlight aktif
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%", threshold: 0 },
    );

    // Setup observer setelah render
    const timer = setTimeout(() => {
      headings.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    isManualScrollingRef.current = true;
    setActiveId(id);

    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      if (history.pushState) history.pushState(null, "", `#${id}`);
    }

    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1000);
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-slate-800/10 dark:bg-slate-800 rounded-md p-4 mt-10">
      <h3 className="text-lg flex items-center font-semibold mb-4 text-gray-900 dark:text-gray-100">
        <TableOfContentsIcon className="inline-block w-6 h-6 mr-2" />
        <span className="font-semibold">Daftar Isi</span>
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`text-left w-full transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  activeId === item.id ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-600 font-medium dark:text-gray-300"
                }`}
                style={{
                  paddingLeft: `${(item.level - 1) * 12}px`,
                  fontSize: item.level === 1 ? "14px" : item.level === 2 ? "13px" : "12px",
                }}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
