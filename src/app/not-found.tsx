"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Stars Background */}
      <StarsBackground className="opacity-60" />
      <ShootingStars />

      <div className="text-center max-w-lg relative z-10">
        {/* 404 Number */}
        <motion.h1
          className="text-[120px] sm:text-[160px] font-extrabold leading-none text-indigo-600/20 dark:text-indigo-400/20 select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">The page you are looking for doesn&apos;t exist or has been moved.</p>
        </motion.div>

        {/* Buttons - same width */}
        <motion.div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-sm mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Link href="/" className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => history.back()}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
