import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Faqih Nur Fahmi",
  description: "Get in touch with Faqih Nur Fahmi for conversations about HR management, organizational development, digital transformation, and practical technology solutions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
