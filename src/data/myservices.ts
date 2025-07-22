import { Code, Palette, Zap, Users } from "lucide-react";

export const myServices = [
  {
    id: 1,
    title: "Full Stack Development",
    desc: "Building robust web applications with modern technologies like React, Next.js, and Node.js",
    className: "md:col-span-2",
    // thumbnail: "/exp1.svg",
    icon: Code,
  },
  {
    id: 2,
    title: "UI/UX Design",
    desc: "Creating beautiful and intuitive user interfaces that provide excellent user experience",
    className: "md:col-span-2", // change to md:col-span-2
    // thumbnail: "/exp2.svg",
    icon: Palette,
  },
  {
    id: 3,
    title: "Performance Optimization",
    desc: "Optimizing applications for speed, scalability, and better user experience",
    className: "md:col-span-2", // change to md:col-span-2
    // thumbnail: "/exp3.svg",
    icon: Zap,
  },
  {
    id: 4,
    title: "Collaboration",
    desc: "Working effectively with teams to deliver high-quality software solutions",
    className: "md:col-span-2",
    // thumbnail: "/exp4.svg",
    icon: Users,
  },
];
