import { ReactNode } from "react";

export default function RoleTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block border-l-2 border-[var(--ed-accent)] pl-3 text-[11px] uppercase tracking-[0.22em] text-[var(--ed-text-muted)] ${className}`}
    >
      {children}
    </span>
  );
}
