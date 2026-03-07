import { Metadata } from "next";
import CertificatesClient from "@/components/sections/certificates/CertificatesClient";

export const metadata: Metadata = {
  title: "Faqih Nur Fahmi - Certificates",
  description: "Sertifikat dan penghargaan yang telah saya raih.",
};

export default function CertificatesPage() {
  return <CertificatesClient />;
}
