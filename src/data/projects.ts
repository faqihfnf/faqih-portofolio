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
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "Supabase"],
    stackIcons: ["/stack/nextjs.svg", "/stack/typescript.svg", "/stack/supabase.svg", "/stack/prisma.svg", "/stack/react.svg"],
    githubUrl: "https://github.com/faqihfnf",
    liveUrl: "https://marifah-job.vercel.app",
  },
  {
    title: "Resumeaizer",
    description: "A resume analyzer website that helps users analyze and match their resumes with job postings.",
    image: "/projects/resumeaizer.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind", "React"],
    stackIcons: ["/stack/nextjs.svg", "/stack/typescript.svg", "/stack/tailwind.svg", "/stack/react.svg"],
    githubUrl: "https://github.com/faqihfnf/ai-resume-analyzer",
    liveUrl: "https://www.resumeaizer.my.id",
  },
  {
    title: "Digiquran",
    description: "A responsive portfolio website showcasing creative work with smooth animations and modern design.",
    image: "/projects/digiquran.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind", "React"],
    stackIcons: ["/stack/nextjs.svg", "/stack/typescript.svg", "/stack/tailwind.svg", "/stack/react.svg"],
    githubUrl: "https://github.com/faqihfnf/digiquran",
    liveUrl: "https://digiquran.vercel.app",
  },
  {
    title: "Ai Expense Tracker",
    description: "An expense tracker website that helps users track their expenses and budget with AI Insights.",
    image: "/projects/aiexpensetracker.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind", "React"],
    stackIcons: ["/stack/nextjs.svg", "/stack/typescript.svg", "/stack/tailwind.svg", "/stack/react.svg"],
    githubUrl: "https://github.com/faqihfnf/ai-expense-tracker",
    liveUrl: "https://aiexpensetracker.my.id",
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
