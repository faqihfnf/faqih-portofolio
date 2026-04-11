"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import SwitchTranslation from "../../layout/SwitchTranslation";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface DesktopNavProps {
  navItems: NavItem[];
  isScrolled: boolean;
  theme: string;
  logoClass: string;
  onToggleTheme: () => void;
  className?: string;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ navItems, isScrolled, theme, logoClass, onToggleTheme, className }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`hidden sm:block fixed top-1 inset-x-0 mx-auto z-50 ${isScrolled ? "max-w-fit" : "px-4 sm:px-6 lg:px-4"} ${className}`}
      >
        <div className={`relative rounded-full border border-transparent ${isScrolled ? "bg-white/60 dark:bg-slate-800/80 backdrop-blur-md shadow-lg px-8 py-2" : "bg-transparent px-0 py-0"} transition-all duration-300`}>
          <div className={`flex items-center ${isScrolled ? "justify-center" : "justify-between"}`}>
            {!isScrolled && (
              <Link href="/" className="text-4xl font-bold text-indigo-700">
                <div className="flex items-center">
                  <Image src="/logo.png" alt="Logo" width={50} height={50} className={logoClass} />
                  <span className="ml-2">FnF.</span>
                </div>
              </Link>
            )}

            <div className="flex items-center space-x-6">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  className={`relative font-semibold flex items-center space-x-1 transition-colors ${
                    pathname === navItem.link
                      ? "text-indigo-600 dark:text-indigo-400"
                      : isScrolled
                        ? "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                        : pathname === "/"
                          ? "text-slate-200 dark:text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-300"
                          : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  <span className={isScrolled ? "hidden sm:block" : "block"}>{navItem.name}</span>
                  {pathname === navItem.link && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-0 -left-1 right-0 h-0.5 ${isScrolled ? "bg-indigo-600 dark:bg-indigo-400" : "bg-indigo-400 dark:bg-indigo-300"}`}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Link>
              ))}

              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isScrolled
                    ? "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                    : pathname === "/"
                      ? "text-slate-200 dark:text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400"
                      : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <div
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isScrolled
                    ? "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                    : pathname === "/"
                      ? "text-slate-200 dark:text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-400"
                      : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <SwitchTranslation />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
