"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FilterCarouselProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function FilterCarousel({ categories, selected, onSelect }: FilterCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Left button */}
      <button
        onClick={() => scroll("left")}
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all duration-200 ${
          canScrollLeft ? "opacity-100 hover:border-indigo-400 hover:text-indigo-600" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Scrollable filter row */}
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`flex-shrink-0 px-5 py-2 rounded-full font-medium text-sm transition-colors shadow-sm cursor-pointer ${
              selected === category ? "bg-indigo-600 text-white" : "bg-indigo-100 text-slate-700 hover:bg-indigo-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right button */}
      <button
        onClick={() => scroll("right")}
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all duration-200 ${
          canScrollRight ? "opacity-100 hover:border-indigo-400 hover:text-indigo-600" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
