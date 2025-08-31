"use client";

import React from "react";
import { Home, User, BookOpen, Mail, ShieldCheckIcon, BriefcaseBusinessIcon, GraduationCap } from "lucide-react";
import { FloatingNav } from "../ui/floating-navbar";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const navItems = [
    {
      name: t("navbar.nav-item-1"),
      link: "/",
      icon: <Home className="h-4 w-4 " />,
    },
    {
      name: t("navbar.nav-item-2"),
      link: "/experiences",
      icon: <User className="h-4 w-4 " />,
    },
    {
      name: t("navbar.nav-item-3"),
      link: "/projects",
      icon: <BriefcaseBusinessIcon className="h-4 w-4 " />,
    },
    {
      name: t("navbar.nav-item-4"),
      link: "/certificates",
      icon: <ShieldCheckIcon className="h-4 w-4 " />,
    },
    {
      name: "Blog",
      link: "/blog",
      icon: <BookOpen className="h-4 w-4 " />,
    },
    {
      name: "Course",
      link: "/course",
      icon: <GraduationCap className="h-4 w-4 " />,
    },
    {
      name: t("navbar.nav-item-5"),
      link: "/contact",
      icon: <Mail className="h-4 w-4 " />,
    },
  ];

  return (
    <div className="w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
