"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import SwitchTranslation from "../../layout/SwitchTranslation";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface MobileTopBarProps {
  navItems: NavItem[];
  theme: string;
  logoClass: string;
  isMobileMenuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({ navItems, theme, logoClass, isMobileMenuOpen, onToggleTheme, onToggleMenu, onCloseMenu }) => {
  const pathname = usePathname();

  return (
    <div className="flex sm:hidden fixed top-0 left-0 right-0 z-50 items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-indigo-600/30 border-b border-slate-200 dark:border-slate-700">
      {/* Logo */}
      <Link href="/" onClick={onCloseMenu} className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={36} height={36} className={logoClass} />
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">FnF.</span>
      </Link>

      {/* Right: dark mode + translate + hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            onToggleTheme();
            onCloseMenu();
          }}
          className="p-2 rounded-full transition-colors cursor-pointer text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="text-slate-700 dark:text-slate-200" onClick={onCloseMenu}>
          <SwitchTranslation />
        </div>

        <button onClick={onToggleMenu} className="p-2 rounded-full transition-colors cursor-pointer text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400">
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Dropdown Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-600 py-3 overflow-hidden"
          >
            {/* Nav Links */}
            <div className="px-3">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-dropdown-${idx}`}
                  href={navItem.link}
                  onClick={onCloseMenu}
                  className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${
                    pathname === navItem.link
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                      : "text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  {pathname === navItem.link && (
                    <motion.div layoutId="mobile-dropdown-indicator" className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 dark:bg-indigo-400 rounded-full" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />
                  )}
                  <span className="[&>svg]:w-4 [&>svg]:h-4">{navItem.icon}</span>
                  <span className="font-medium">{navItem.name}</span>
                </Link>
              ))}
            </div>

            {/* Separator */}
            <div className="mx-4 my-3 border-t border-slate-200 dark:border-slate-600" />

            {/* Theme + Language */}
            <div className="px-3">
              <button
                onClick={() => {
                  onToggleTheme();
                  onCloseMenu();
                }}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                <span className="font-medium">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
              </button>

              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                <SwitchTranslation />
                <span className="font-medium">Language</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
