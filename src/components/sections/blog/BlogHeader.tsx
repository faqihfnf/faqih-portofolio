"use client";
import { motion } from "framer-motion";

export default function BlogHeader() {
  return (
    <div className="text-center mb-12">
      <motion.h1 className="text-4xl font-bold mb-4" whileHover={{ scale: 1.01 }} transition={{ duration: 0.5 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        My Blog
      </motion.h1>
      <motion.p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        A collection of my thoughts, tutorials, and experiences.
      </motion.p>
    </div>
  );
}
