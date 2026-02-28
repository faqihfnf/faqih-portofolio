//@ts-ignore
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import ReduxProvider from "@/providers/ReduxProvider";
import I18nProvider from "@/providers/I18nProvider";

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
        <I18nProvider>
          <ReduxProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Toaster />
            <Footer />
          </ReduxProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
