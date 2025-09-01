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
    title: "Responsive Web Design",
    organization: "FreeCodeCamp",
    date: "Sep 2024",
    image: "/certificates/responsive-web-design.jpg",
    link: "/certificates/responsive-web-design.jpg",
  },
  {
    id: 2,
    title: "React Basic",
    organization: "Hacker Rank",
    date: "Feb 2024",
    image: "/certificates/react-basic.jpg",
    link: "/certificates/react-basic.jpg",
  },
  {
    id: 3,
    title: "JavaScript Algorithms and Data Structures",
    organization: "FreeCodeCamp",
    date: "Mar 2024",
    image: "/certificates/js-algorithms.jpg",
    link: "/certificates/js-algorithms.jpg",
  },
  {
    id: 4,
    title: "Full Stack MERN Bootcamp",
    organization: "Devscale",
    date: "Mar 2024",
    image: "/certificates/mern.jpg",
    link: "/certificates/mern.jpg",
  },
  {
    id: 5,
    title: "React Fundamentals",
    organization: "Dicoding",
    date: "Mar 2025",
    image: "/certificates/react-fundamental.jpg",
    link: "/certificates/react-fundamental.pdf",
  },
  {
    id: 6,
    title: "React Intermediate",
    organization: "ID Camp",
    date: "Mar 2025",
    image: "/certificates/react-intermediate.jpg",
    link: "/certificates/react-intermediate.pdf",
  },
  {
    id: 7,
    title: "Junior Web Developer",
    organization: "Komdigi",
    date: "Aug 2025",
    image: "/certificates/junior-web.jpg",
    link: "/certificates/junior-web.pdf",
  },
];
