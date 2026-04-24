"use client";

import { useState, useEffect, useRef } from "react";
import { TableOfContentsIcon, ChevronDown } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
  variant?: "sidebar" | "dropdown";
}

export default function TableOfContents({ headings, variant = "sidebar" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false); // Close dropdown after click

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

  // Dropdown version untuk mobile
  if (variant === "dropdown") {
    return (
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-3 text-left transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <span className="flex items-center font-medium text-slate-900 dark:text-slate-100">
            <TableOfContentsIcon className="w-5 h-5 mr-2" />
            Daftar Isi
          </span>
          <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="mt-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
            <nav>
              <ul className="space-y-1">
                {headings.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      className={`text-left cursor-pointer w-full py-2 px-3 rounded-md transition-colors ${
                        activeId === item.id
                          ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                      style={{
                        paddingLeft: `${12 + (item.level - 1) * 12}px`,
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
        )}
      </div>
    );
  }

  // Sidebar version untuk desktop
  return (
    <div className="bg-slate-600/10 dark:bg-slate-800 rounded-md p-4 mt-5">
      <h3 className="text-lg flex items-center font-semibold mb-4 text-slate-900 dark:text-slate-100">
        <TableOfContentsIcon className="inline-block w-6 h-6 mr-2" />
        <span className="font-semibold">Daftar Isi</span>
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`text-left cursor-pointer w-full transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  activeId === item.id ? "text-indigo-700 dark:text-indigo-400 font-medium" : "text-slate-600 font-medium dark:text-slate-300"
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
