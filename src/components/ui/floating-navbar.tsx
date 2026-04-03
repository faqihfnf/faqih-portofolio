"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { AppDispatch, RootState } from "@/app/redux/store";
import { toggleTheme } from "@/app/redux/features/themeSlices";
import SwitchTranslation from "../layout/SwitchTranslation";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, className }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleTheme = () => dispatch(toggleTheme());
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  const logoClass = pathname === "/" ? "" : "dark:invert";

  return (
    <>
      {/* ============================================================
          MOBILE BACKDROP — level teratas, z-40
          Klik di mana saja di halaman untuk close menu
      ============================================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex sm:hidden fixed inset-0 z-40 bg-black/20 dark:bg-black/40" onClick={closeMobileMenu} />
        )}
      </AnimatePresence>

      {/* ============================================================
          DESKTOP NAVBAR (hidden sm:block)
      ============================================================ */}
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
                  onClick={handleToggleTheme}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isScrolled
                      ? "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                      : pathname === "/"
                        ? "text-slate-200 dark:text-slate-300 hover:text-indigo-400 hover:bg-white/10"
                        : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <div>
                  <SwitchTranslation />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ============================================================
          MOBILE TOP BAR — z-50 (di atas backdrop z-40)
          Logo | Dark mode + Translate + Hamburger
      ============================================================ */}
      <div className="flex sm:hidden fixed top-0 left-0 right-0 z-50 items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        {/* Logo */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className={logoClass} />
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">FnF.</span>
        </Link>

        {/* Right: dark mode + translate + hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              handleToggleTheme();
              closeMobileMenu();
            }}
            className="p-2 rounded-full transition-colors cursor-pointer text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="text-slate-700 dark:text-slate-200" onClick={closeMobileMenu}>
            <SwitchTranslation />
          </div>

          <button onClick={toggleMobileMenu} className="p-2 rounded-full transition-colors cursor-pointer text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Dropdown Menu Panel — tetap di dalam top bar agar posisi absolute top-full benar */}
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
                    onClick={closeMobileMenu}
                    className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${
                      pathname === navItem.link
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                        : "text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    {pathname === navItem.link && (
                      <motion.div
                        layoutId="mobile-dropdown-indicator"
                        className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
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
                    handleToggleTheme();
                    closeMobileMenu();
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

      {/* ============================================================
          MOBILE BOTTOM NAV — z-50
          Fixed di bawah — semua nav item dengan icon + label
      ============================================================ */}
      <div className="flex sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-around w-full px-2 py-4">
          {navItems.map((navItem, idx) => {
            const isActive = pathname === navItem.link;
            return (
              <Link
                key={`bottom-nav-${idx}`}
                href={navItem.link}
                className={`flex flex-col items-center gap-0.5 flex-1 transition-colors duration-200 ${
                  isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <span className="[&>svg]:w-5 [&>svg]:h-5">{navItem.icon}</span>
                <span className="text-[10px] font-medium truncate max-w-full text-center">{navItem.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
