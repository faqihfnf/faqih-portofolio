"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface MobileBottomNavProps {
  navItems: NavItem[];
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ navItems }) => {
  const pathname = usePathname();

  return (
    <div className="flex sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700" style={{ boxShadow: "0 -8px 24px rgba(80, 70, 230, 0.4)" }}>
      {" "}
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
  );
};
