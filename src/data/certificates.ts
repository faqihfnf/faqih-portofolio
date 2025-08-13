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
    link: "/certificates/js-algorithms.jpgcv.pdf",
  },
  {
    id: 4,
    title: "Full Stack MERN Bootcamp",
    organization: "FreeCodeCamp",
    date: "Mar 2024",
    image: "/certificates/mern.jpg",
    link: "/certificates/mern.jpg",
  },
];
