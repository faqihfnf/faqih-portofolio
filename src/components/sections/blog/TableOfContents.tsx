"use client";

import { useState, useEffect, useRef } from "react";

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
    setIsOpen(false);

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
      <div className="mb-8 border-y border-[var(--ed-border)] lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-center justify-between py-4 text-left"
        >
          <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--ed-text-muted)]">Daftar Isi</span>
          <span className="text-[var(--ed-text-muted)]">{isOpen ? "−" : "+"}</span>
        </button>

        {isOpen && (
          <nav className="pb-4">
            <ul className="space-y-2">
              {headings.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full cursor-pointer py-1.5 text-left text-[13px] transition-colors ${
                      activeId === item.id ? "text-[var(--ed-accent)]" : "text-[var(--ed-text-secondary)] hover:text-[var(--ed-text)]"
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 14}px` }}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  // Sidebar version untuk desktop
  return (
    <div className="border-l border-[var(--ed-border)] pl-5 pt-5">
      <h3 className="text-[11px] uppercase tracking-[0.22em] text-[var(--ed-text-muted)]">Daftar Isi</h3>
      <nav>
        <ul className="mt-4 space-y-2.5">
          {headings.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`w-full cursor-pointer text-left text-[13px] leading-snug transition-colors ${
                  activeId === item.id ? "text-[var(--ed-accent)]" : "text-[var(--ed-text-secondary)] hover:text-[var(--ed-text)]"
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 14}px` }}
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
