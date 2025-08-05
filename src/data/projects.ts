export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  stackIcons: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Islamic Website",
    description: "A Islamic website that provides information about the Holy Quran, Hadith, Islamic knowledge and Free Islamic Ebook.",
    image: "/projects/marifah.png",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind", "Express.js"],
    stackIcons: ["/stack/react.svg", "/stack/expressjs.svg", "/stack/mongodb.svg", "/stack/tailwind.svg", "/stack/javascript.svg"],
    githubUrl: "https://github.com/faqihfnf",
    liveUrl: "https://marifah.id",
  },
  {
    title: "Job Portal Website",
    description: "A job portal website that allows users to search for jobs, apply for them, and manage their applications.",
    image: "/projects/jobportal.jpg",
    technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    stackIcons: ["/stack/nextjs.svg", "/stack/typescript.svg", "/stack/supabase.svg", "/stack/prisma.svg"],
    githubUrl: "https://github.com/faqihfnf",
    liveUrl: "https://marifah-job.vercel.app",
  },
  {
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with location-based forecasts and interactive charts.",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "Chart.js", "OpenWeatherMap API"],
    stackIcons: ["/stack/nextjs.svg"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing creative work with smooth animations and modern design.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    stackIcons: ["/stack/nextjs.svg"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Social Media App",
    description: "A social media platform with real-time messaging, post sharing, and user profiles.",
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React Native", "Firebase", "Redux"],
    stackIcons: ["/stack/nextjs.svg"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Learning Management System",
    description: "An LMS platform for online courses with video streaming, quizzes, and progress tracking.",
    image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Vue.js", "Node.js", "MongoDB", "AWS"],
    stackIcons: ["/stack/nextjs.svg"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Learning Management System",
    description: "An LMS platform for online courses with video streaming, quizzes, and progress tracking.",
    image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Vue.js", "Node.js", "MongoDB", "AWS"],
    stackIcons: ["/stack/nextjs.svg"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Learning Management System",
    description: "An LMS platform for online courses with video streaming, quizzes, and progress tracking.",
    image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Vue.js", "Node.js", "MongoDB", "AWS"],
    stackIcons: ["/stack/nextjs.svg"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Learning Management System",
    description: "An LMS platform for online courses with video streaming, quizzes, and progress tracking.",
    image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Vue.js", "Node.js", "MongoDB", "AWS"],
    stackIcons: ["/stack/nextjs.svg"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];
