"use client";

import Link from "next/link";
import { fraunces, inter } from "@/components/editorial/fonts";
import EditorialTheme from "@/components/editorial/EditorialTheme";

const socialLinks = [
  { href: "https://github.com/faqihfnf", label: "GitHub" },
  { href: "https://www.linkedin.com/in/faqih-nur-fahmi-b51bb1ab/", label: "LinkedIn" },
  { href: "https://www.facebook.com/faqihnurfahmi", label: "Facebook" },
  { href: "https://www.youtube.com/@marifahid", label: "YouTube" },
  { href: "https://www.instagram.com/faqih.me", label: "Instagram" },
];

export default function Footer() {
  return (
    <div className={`${fraunces.variable} ${inter.variable} editorial`}>
      <EditorialTheme />
      <footer className="border-t border-[var(--ed-border)] bg-[var(--ed-bg)]">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="ed-serif text-base tracking-tight">Faqih Nur Fahmi</p>

          <div className="flex flex-wrap gap-6">
            {socialLinks.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ed-link text-[11px] uppercase tracking-[0.18em]">
                {label}
              </a>
            ))}
          </div>

          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
