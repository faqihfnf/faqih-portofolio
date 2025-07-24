import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import ReduxProvider from "../components/providers/ReduxProvider";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Faqih Nur Fahmi - Portfolio",
  description: "Faqih Nur Fahmi Portfolio - A passionate full-stack developer creating amazing web experiences",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="">
      <body className={`${inter.className} ${poppins.className}`}>
        {/* ✅ Bungkus semuanya dalam komponen client */}
        <ReduxProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Toaster />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
