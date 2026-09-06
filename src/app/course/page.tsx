import type { Metadata } from "next";
import CoursePageClient from "./CoursePageClient";

export const metadata: Metadata = {
  title: "Courses and Learning",
  description: "Courses and learning resources covering HR, organizational development, data, automation, and full-stack development.",
  alternates: { canonical: "/course" },
};

export default function CoursePage() {
  return <CoursePageClient />;
}
