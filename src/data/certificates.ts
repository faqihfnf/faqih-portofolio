export interface CertificateItem {
  id: number;
  title: string;
  organization: string;
  date: string;
  image: string;
  link: string;
}

export const certificates: CertificateItem[] = [
  {
    id: 1,
    title: "Supervisor Human Resource",
    organization: "BNSP",
    date: "Feb 2026",
    image: "/certificates/bnsp-spv-hr.png",
    link: "/certificates/bnsp-spv-hr.pdf",
  },
  {
    id: 2,
    title: "Responsive Web Design",
    organization: "FreeCodeCamp",
    date: "Sep 2024",
    image: "/certificates/responsive-web-design.jpg",
    link: "/certificates/responsive-web-design.jpg",
  },
  {
    id: 3,
    title: "React Basic",
    organization: "Hacker Rank",
    date: "Feb 2024",
    image: "/certificates/react-basic.jpg",
    link: "/certificates/react-basic.jpg",
  },
  {
    id: 4,
    title: "JavaScript Algorithms and Data Structures",
    organization: "FreeCodeCamp",
    date: "Mar 2024",
    image: "/certificates/js-algorithms.jpg",
    link: "/certificates/js-algorithms.jpg",
  },
  {
    id: 5,
    title: "Full Stack MERN Bootcamp",
    organization: "Devscale",
    date: "Mar 2024",
    image: "/certificates/mern.jpg",
    link: "/certificates/mern.jpg",
  },
  {
    id: 6,
    title: "React Fundamentals",
    organization: "Dicoding",
    date: "Mar 2025",
    image: "/certificates/react-fundamental.jpg",
    link: "/certificates/react-fundamental.pdf",
  },
  {
    id: 7,
    title: "React Intermediate",
    organization: "ID Camp",
    date: "Mar 2025",
    image: "/certificates/react-intermediate.jpg",
    link: "/certificates/react-intermediate.jpg",
  },
  {
    id: 8,
    title: "Junior Web Developer",
    organization: "Komdigi",
    date: "Aug 2025",
    image: "/certificates/junior-web.jpg",
    link: "/certificates/junior-web.pdf",
  },
  {
    id: 9,
    title: "AI Enable Python Bootcamp",
    organization: "Devscale",
    date: "Okt 2025",
    image: "/certificates/python.png",
    link: "/certificates/python.png",
  },
  {
    id: 10,
    title: "Data Analytics",
    organization: "Kominfo",
    date: "Aug 2023",
    image: "/certificates/data-analytics.jpg",
    link: "/certificates/data-analytics.pdf",
  },
  {
    id: 11,
    title: "Data Analytics",
    organization: "Coursera - Google",
    date: "Aug 2023",
    image: "/certificates/data-analytics-coursera.jpg",
    link: "/certificates/data-analytics-coursera.pdf",
  },
  {
    id: 12,
    title: "Information Security Management Systems",
    organization: "Buerau Veritas",
    date: "Nov 2022",
    image: "/certificates/iso-27001-2013.jpg",
    link: "/certificates/iso-27001-2013.pdf",
  },
  {
    id: 13,
    title: "Information Security Management Systems",
    organization: "Vidya Consultans",
    date: "Feb 2023",
    image: "/certificates/iso-27001-2022.jpg",
    link: "/certificates/iso-27001-2022.pdf",
  },
];
