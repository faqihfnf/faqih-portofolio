"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function BusinessHours() {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg shadow-indigo-500"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Business Hours
      </h2>
      <ul className="space-y-3">
        <li className="flex justify-between text-sm md:text-base">
          <span>Monday – Friday</span>
          <span className="font-medium text-indigo-600">09:00 – 18:00</span>
        </li>
        <li className="flex justify-between text-sm md:text-base">
          <span>Saturday</span>
          <span className="font-medium text-indigo-600">10:00 – 14:00</span>
        </li>
        <li className="flex justify-between text-sm md:text-base">
          <span>Sunday</span>
          <span className="font-medium text-indigo-600">Closed</span>
        </li>
      </ul>
    </motion.div>
  );
}
