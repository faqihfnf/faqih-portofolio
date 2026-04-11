"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { Linkedin, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  linkedinUrl: string | null;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Testimonials() {
  const { t } = useTranslation();
  const [data, setData] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((d) => {
        if (Array.isArray(d)) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % data.length);
  }, [data.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + data.length) % data.length);
  }, [data.length]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (data.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, data.length]);

  // Don't render section if no testimonials
  if (!loading && data.length === 0) return null;

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <AnimateOnScroll animation="fade-up" delay={0}>
            <h2 className="text-4xl font-bold mb-4">
              {t("testimonials.title")}
              <span className="text-indigo-700 dark:text-indigo-500">{t("testimonials.title-1")}</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200}>
            <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">{t("testimonials.description")}</p>
          </AnimateOnScroll>
        </div>

        {/* Spotlight */}
        <AnimateOnScroll animation="fade-up" delay={400}>
          {loading ? (
            <div className="max-w-2xl mx-auto animate-pulse">
              <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            </div>
          ) : (
            <div className="relative max-w-2xl mx-auto">
              {/* Quote icon */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Card */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-2xl pt-10 pb-8 px-8 shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    {/* Testimonial text - fixed height for ~250 chars */}
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 justify-center mb-8 italic h-36 text-center flex items-center">&ldquo;{data[current].testimonial}&rdquo;</p>

                    {/* Author info */}
                    <div className="flex items-center justify-center gap-4">
                      {/* Avatar with initials */}
                      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 dark:text-indigo-400 font-semibold text-sm">{getInitials(data[current].name)}</span>
                      </div>

                      <div className="text-left">
                        {/* Name (with optional LinkedIn link) */}
                        {data[current].linkedinUrl ? (
                          <a
                            href={data[current].linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5"
                          >
                            {data[current].name}
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <p className="font-semibold text-gray-900 dark:text-white">{data[current].name}</p>
                        )}

                        {/* Position & Company */}
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {data[current].position}
                          {data[current].company && <span> at {data[current].company}</span>}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              {data.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button onClick={prev} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {data.map((_, i) => (
                      <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-indigo-600 w-6" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"}`} />
                    ))}
                  </div>

                  <button onClick={next} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
