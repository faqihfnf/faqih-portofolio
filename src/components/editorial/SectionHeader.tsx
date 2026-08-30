import { ReactNode } from "react";
import RoleTag from "./RoleTag";

export default function SectionHeader({
  tag,
  title,
  description,
}: {
  tag: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-[180px_1fr] md:gap-12">
      <div className="pt-2">
        <RoleTag>{tag}</RoleTag>
      </div>
      <div>
        <h2 className="ed-serif text-3xl leading-tight tracking-tight md:text-[2.75rem] md:leading-[1.15]">{title}</h2>
        {description && <p className="mt-4 max-w-xl leading-relaxed text-[var(--ed-text-secondary)]">{description}</p>}
      </div>
    </div>
  );
}
