"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { toggleTheme } from "@/app/redux/features/themeSlices";

import { DesktopNav } from "./navbar/DesktopNav";
import { MobileTopBar } from "./navbar/MobileTopBar";
import { MobileBottomNav } from "./navbar/MobileBottomNav";

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
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  const logoClass = pathname === "/" ? "sm:invert dark:invert" : "dark:invert";

  return (
    <>
      {/* Mobile backdrop — klik di mana saja untuk close menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex sm:hidden fixed inset-0 z-40 bg-black/20 dark:bg-black/40" onClick={closeMobileMenu} />
        )}
      </AnimatePresence>

      <DesktopNav navItems={navItems} isScrolled={isScrolled} theme={theme} logoClass={logoClass} onToggleTheme={handleToggleTheme} className={className} />

      <MobileTopBar navItems={navItems} theme={theme} logoClass={logoClass} isMobileMenuOpen={isMobileMenuOpen} onToggleTheme={handleToggleTheme} onToggleMenu={toggleMobileMenu} onCloseMenu={closeMobileMenu} />

      <MobileBottomNav navItems={navItems} />
    </>
  );
};
