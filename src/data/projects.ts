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
    image: "/projects/marifah.jpg",
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
    title: "Resumefly",
    description: "A resume builder website that allows users to create and customize resumes with AI-powered suggestions.",
    image: "/projects/resumefly.jpg",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Tailwind", "React"],
    stackIcons: ["/stack/nextjs.svg", "/stack/typescript.svg", "/stack/tailwind.svg", "/stack/react.svg", "/stack/postgresql.svg"],
    githubUrl: "https://github.com/faqihfnf/resume-builder",
    liveUrl: "https://resumefly.my.id",
  },
];
