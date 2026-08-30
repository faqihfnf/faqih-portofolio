"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { EditorialButton } from "@/components/editorial/EditorialButton";
import { fraunces, inter } from "@/components/editorial/fonts";
import EditorialTheme from "@/components/editorial/EditorialTheme";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().optional(),
  company: z.string().optional(),
  testimonial: z.string().min(25, "Testimoni minimal 25 karakter").max(250, "Testimoni maksimal 250 karakter"),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">
        {label}
        {required && <span className="ml-1 text-[var(--ed-accent)]">*</span>}
        {optional && <span className="ml-2 normal-case tracking-normal opacity-70">(opsional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[var(--ed-accent)]">{error}</p>}
    </div>
  );
}

const underlineInput =
  "w-full border-0 border-b border-[var(--ed-border)] bg-transparent px-0 py-2 text-sm text-[var(--ed-text)] placeholder:text-[var(--ed-text-muted)] focus:outline-none focus:border-[var(--ed-accent)] transition-colors rounded-none";

export default function CreateTestimonial() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 250;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${fraunces.variable} ${inter.variable} editorial min-h-screen`}>
      <EditorialTheme />
      <div className="mx-auto w-full max-w-[920px] px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        {success ? (
          /* Ucapan terima kasih */
          <div className="mx-auto max-w-xl text-center">
            <span className="ed-serif block text-6xl italic leading-none text-[var(--ed-accent)]">&ldquo;</span>
            <h1 className="ed-serif mt-4 text-3xl tracking-tight md:text-4xl">Terima Kasih!</h1>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--ed-text-secondary)]">
              Terima kasih sudah meluangkan waktu untuk memberikan testimoni. Masukan Anda sangat berarti dan akan sangat berguna bagi saya dalam terus berkembang dan memberikan yang terbaik.
            </p>
            <p className="ed-serif mt-6 text-lg italic text-[var(--ed-text-muted)]">Salam hangat, Faqih Nur Fahmi</p>
            <div className="mt-9">
              <EditorialButton variant="secondary" onClick={() => window.location.reload()}>
                Tulis Testimoni Lagi
              </EditorialButton>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--ed-text-muted)]">Testimonial</p>
              <h1 className="ed-serif mt-3 text-3xl leading-tight tracking-tight md:text-[2.5rem] md:leading-[1.2]">Tulis Testimoni</h1>
              <p className="mt-3 max-w-xl leading-relaxed text-[var(--ed-text-secondary)]">
                Ceritakan bagaimana pengalaman Anda saat bekerja sama dengan Faqih Nur Fahmi.
              </p>
            </div>

            {/* Form — underline inputs */}
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-8">
              {/* Name */}
              <Field label="Nama" required error={errors.name?.message}>
                <input {...register("name")} className={underlineInput} placeholder="Nama lengkap Anda" />
              </Field>

              {/* Position & Company - 2 columns */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Field label="Posisi" error={errors.position?.message}>
                  <input {...register("position")} className={underlineInput} placeholder="Supervisor HR, Manager IT, dll" />
                </Field>
                <Field label="Perusahaan" error={errors.company?.message}>
                  <input {...register("company")} className={underlineInput} placeholder="PT ABC Indonesia" />
                </Field>
              </div>

              {/* LinkedIn */}
              <Field label="LinkedIn" optional error={errors.linkedinUrl?.message}>
                <input {...register("linkedinUrl")} className={underlineInput} placeholder="https://linkedin.com/in/namaanda" />
              </Field>

              {/* Testimonial */}
              <Field label="Testimoni" required error={errors.testimonial?.message}>
                <textarea
                  {...register("testimonial", {
                    onChange: (e) => setCharCount(e.target.value.length),
                  })}
                  rows={6}
                  maxLength={MAX_CHARS}
                  className={`${underlineInput} resize-none`}
                  placeholder="Bagikan pengalaman Anda bekerja sama dengan Faqih..."
                />
                <div className="mt-1.5 flex items-center justify-between">
                  <span />
                  <span className={`text-xs ${charCount >= MAX_CHARS ? "text-[var(--ed-accent)]" : "text-[var(--ed-text-muted)]"}`}>
                    {charCount}/{MAX_CHARS}
                  </span>
                </div>
              </Field>

              {/* Submit */}
              <EditorialButton type="submit" disabled={loading} variant="primary">
                {loading ? "Mengirim..." : "Kirim Testimoni"}
              </EditorialButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
