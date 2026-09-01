const css = `
.editorial {
  --ed-bg: #F4F3EF;
  --ed-bg-elevated: #ECEBE5;
  --ed-text: #1B1C1E;
  --ed-text-secondary: #4A4A46;
  --ed-text-muted: #8B897F;
  --ed-border: #D8D6CE;
  --ed-accent: #8A6F3F;
  background-color: var(--ed-bg);
  color: var(--ed-text);
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  text-align: justify;
  text-justify: inter-word;
}

/* Elemen yang tidak boleh rata kanan-kiri */
.editorial h1,
.editorial h2,
.editorial h3,
.editorial h4,
.editorial blockquote,
.editorial figcaption,
.editorial button,
.editorial nav,
.editorial dl,
.editorial dt,
.editorial dd,
.editorial p:has(button),
.editorial [data-no-justify],
.editorial [data-no-justify] * {
  text-align: left;
}

.editorial .text-center,
.editorial .text-center * {
  text-align: center;
}

.dark .editorial {
  --ed-bg: #1B1C1E;
  --ed-bg-elevated: #202124;
  --ed-text: #EDEBE4;
  --ed-text-secondary: #A5A39A;
  --ed-text-muted: #86847A;      /* was #6B6A64 — 3.14:1 → 4.54:1 */
  --ed-border: #2E2F31;
  --ed-accent: #A2895B;          /* sudah aman, tidak perlu diubah */
  --ed-accent-text: #A2895B;
}

.ed-serif {
  font-family: var(--font-fraunces), Georgia, "Times New Roman", serif;
  font-optical-sizing: auto;
}

/* Variant: pertahankan font Poppins bawaan body (dipakai halaman blog) */
.editorial.ed-poppins {
  font-family: inherit;
}

.ed-accent-em {
  font-style: italic;
  color: var(--ed-accent);
}

.ed-link {
  color: var(--ed-text);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

.ed-link:hover {
  color: var(--ed-accent);
  text-decoration-color: var(--ed-accent);
}

.editorial ::selection {
  background: var(--ed-accent);
  color: var(--ed-bg);
}

.editorial .react-activity-calendar {
  color: var(--ed-text-secondary) !important;
}
`;

export default function EditorialTheme() {
  return <style>{css}</style>;
}
