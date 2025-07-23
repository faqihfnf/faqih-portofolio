"use client";
import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export function FollowMe() {
  const socials = [
    {
      href: "https://github.com/username",
      icon: <Github className="w-5 h-5" />,
    },
    {
      href: "https://linkedin.com/in/username",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      href: "https://twitter.com/username",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      href: "https://youtube.com/@username",
      icon: <Youtube className="w-5 h-5" />,
    },
  ];

  return (
    <motion.div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md shadow-indigo-500" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
      <h2 className="text-2xl font-bold mb-6">Follow Me</h2>
      <div className="flex justify-center sm:justify-start gap-4">
        {socials.map((social, idx) => (
          <Link
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex justify-center items-center rounded-lg border border-indigo-400 dark:border-indigo-500 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
