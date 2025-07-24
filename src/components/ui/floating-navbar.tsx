"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { AppDispatch, RootState } from "@/app/redux/store";
import { toggleTheme } from "@/app/redux/features/themeSlices";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems,
  className,
}) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Redux theme
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50;

      setIsScrolled(currentScrollY > scrollThreshold);
      setVisible(currentScrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const logoClass =
    pathname === "/"
      ? "invert" // selalu invert di halaman "/"
      : "dark:invert"; // selain itu hanya invert di dark mode

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{
          y: visible && isScrolled ? 0 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.2 }}
        className={`fixed top-1 inset-x-0 mx-auto z-50 ${
          isScrolled ? "max-w-fit" : "max-w-7xl px-4 sm:px-6 lg:px-4"
        } ${className}`}>
        <div
          className={`relative rounded-full border border-transparent ${
            isScrolled
              ? "bg-white/60 dark:bg-slate-800/80 backdrop-blur-md shadow-lg px-8 py-2"
              : "bg-transparent px-0 py-0"
          } transition-all duration-300`}>
          <div
            className={`flex items-center ${
              isScrolled ? "justify-center space-x-6" : "justify-between"
            }`}>
            {!isScrolled && (
              <Link href="/" className="text-4xl font-bold text-indigo-700">
                <div className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className={logoClass}
                  />
                  <span className="ml-2">FnF.</span>
                </div>
              </Link>
            )}

            {/* Desktop Navigation */}
            <div
              className={`hidden sm:flex items-center ${
                isScrolled ? "space-x-6" : "space-x-6"
              }`}>
              {navItems.map((navItem, idx) => (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  className={`relative font-semibold flex items-center space-x-1 transition-colors ${
                    pathname === navItem.link
                      ? isScrolled
                        ? "text-indigo-600 dark:text-indigo-400"
                        : pathname === "/"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-indigo-600 dark:text-indigo-400"
                      : isScrolled
                      ? "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                      : pathname === "/"
                      ? "text-slate-200 dark:text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-300"
                      : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}>
                  {isScrolled && navItem.icon && (
                    <span className="block sm:hidden">{navItem.icon}</span>
                  )}
                  <span className={isScrolled ? "hidden sm:block" : "block"}>
                    {navItem.name}
                  </span>
                  {pathname === navItem.link && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-0 -left-1 right-0 h-0.5 ${
                        isScrolled
                          ? "bg-indigo-600 dark:bg-indigo-400"
                          : "bg-indigo-400 dark:bg-indigo-300"
                      }`}
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.5,
                      }}
                    />
                  )}
                </Link>
              ))}

              {/* ✅ Dark Mode Toggle - Desktop */}
              <button
                onClick={handleToggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 "
                    : pathname === "/"
                    ? "text-slate-200 dark:text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-300 hover:bg-white/10 dark:hover:bg-gray-800/30"
                    : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 "
                }`}>
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden">
              {isScrolled ? (
                // When scrolled, show icons
                <div className="flex font-semibold items-center space-x-2">
                  {navItems.map((navItem, idx) => (
                    <Link
                      key={`mobile-icon-${idx}`}
                      href={navItem.link}
                      className={`relative flex items-center p-2 transition-colors ${
                        pathname === navItem.link
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                      }`}>
                      {navItem.icon}
                      {pathname === navItem.link && (
                        <motion.span
                          layoutId="mobile-navbar-indicator"
                          className="absolute -bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                          transition={{
                            type: "spring",
                            bounce: 0.25,
                            duration: 0.5,
                          }}
                        />
                      )}
                    </Link>
                  ))}

                  {/* ✅ Dark Mode Toggle - Mobile Scrolled */}
                  <button
                    onClick={handleToggleTheme}
                    className="p-2 rounded-full text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
                </div>
              ) : (
                // When not scrolled, show hamburger menu
                <div className="relative flex items-center space-x-2">
                  <button
                    onClick={toggleMobileMenu}
                    className={`p-2 rounded-full transition-colors ${
                      pathname === "/"
                        ? "text-slate-200 dark:text-slate-300 hover:text-indigo-400 dark:hover:text-indigo-300"
                        : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>

                  {/* Mobile Menu Horizontal Icons */}
                  <AnimatePresence>
                    {isMobileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-gray-600 px-4 py-2">
                        <div className="flex items-center space-x-4">
                          {navItems.map((navItem, idx) => (
                            <Link
                              key={`mobile-menu-${idx}`}
                              href={navItem.link}
                              onClick={closeMobileMenu}
                              className={`relative flex items-center p-2 rounded-full transition-colors ${
                                pathname === navItem.link
                                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50"
                                  : "text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-gray-700"
                              }`}>
                              {navItem.icon}
                              {pathname === navItem.link && (
                                <motion.span
                                  layoutId="mobile-dropdown-indicator"
                                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                                  transition={{
                                    type: "spring",
                                    bounce: 0.25,
                                    duration: 0.5,
                                  }}
                                />
                              )}
                            </Link>
                          ))}
                          {/* ✅ Dark Mode Toggle - Mobile Top */}
                          <button
                            onClick={handleToggleTheme}
                            className={`p-2 rounded-full transition-colors ${
                              pathname === "/"
                                ? " hover:text-indigo-400 dark:hover:text-indigo-300"
                                : " hover:text-indigo-600 dark:hover:text-indigo-400"
                            }`}>
                            {theme === "dark" ? (
                              <Moon size={20} />
                            ) : (
                              <Sun size={20} />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
