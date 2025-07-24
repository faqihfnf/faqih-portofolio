"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactInfo() {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 p-8 hover:border-indigo-400 rounded-md shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-shadow duration-300"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}>
      <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-indigo-500 mr-3" />
          <span>faqih.fnf@gmail.com</span>
        </div>
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-indigo-500 mr-3" />
          <span>+62 899 6423 135</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-indigo-500 mr-3" />
          <span>Jakarta, Indonesia</span>
        </div>
      </div>
    </motion.div>
  );
}
