import { ReactNode } from "react";

export interface NumberedItem {
  title: ReactNode;
  desc?: ReactNode;
}

export default function NumberedList({ items }: { items: NumberedItem[] }) {
  return (
    <ol className="border-t border-[var(--ed-border)]">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-1 gap-2 border-b border-[var(--ed-border)] py-8 md:grid-cols-[80px_1fr] md:gap-8 md:py-10">
          <span className="ed-serif text-2xl italic text-[var(--ed-text-muted)]">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="ed-serif text-xl tracking-tight md:text-2xl">{item.title}</h3>
            {item.desc && <p className="mt-2 max-w-2xl leading-relaxed text-[var(--ed-text-secondary)]">{item.desc}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
