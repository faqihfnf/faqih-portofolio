"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import React from "react";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  technologies?: string[];
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Garis timeline */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-500 transform -translate-x-1/2"></div>

      <div className="space-y-16">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              className={`relative flex flex-col md:flex-row items-center ${
                isLeft ? "md:justify-start" : "md:justify-end"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}>
              {/* Titik timeline dengan icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-indigo-600 rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center">
                {exp.icon ? <exp.icon className="w-4 h-4 text-white" /> : null}
              </div>

              {/* Card */}
              <div
                className={`mt-8 md:mt-0 md:w-[45%] bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg shadow-indigo-400 transition-shadow relative z-0 ${
                  isLeft
                    ? "md:mr-auto md:text-right"
                    : "md:ml-auto md:text-left"
                }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-2 sm:mt-0 sm:ml-4">
                    <Calendar size={16} className="mr-1" />
                    {exp.period}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-500">
                    {exp.company}
                  </h4>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <MapPin size={16} className="mr-1" />
                    {exp.location}
                  </div>
                </div>

                <p className="text-gray-700 text-justify dark:text-gray-200 mb-4">
                  {exp.description}
                </p>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100 text-sm font-medium rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
