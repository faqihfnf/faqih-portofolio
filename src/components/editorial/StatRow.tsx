import { ReactNode } from "react";

export interface StatItem {
  value: ReactNode;
  label: ReactNode;
}

export default function StatRow({
  stats,
  vertical = false,
}: {
  stats: StatItem[];
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <dl className="flex flex-col gap-6">
        {stats.map((stat, i) => (
          <div key={i}>
            <dd className="ed-serif text-3xl leading-none tracking-tight">{stat.value}</dd>
            <dt className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">{stat.label}</dt>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="border-t border-[var(--ed-border)] pt-6">
          <dd className="ed-serif text-4xl leading-none tracking-tight md:text-5xl">{stat.value}</dd>
          <dt className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
