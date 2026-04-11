"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Building2, Linkedin, MessageSquareText, Send, CheckCircle2, Heart } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().optional(),
  company: z.string().optional(),
  testimonial: z.string().min(10, "Testimoni minimal 10 karakter").max(250, "Testimoni maksimal 250 karakter"),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-10 shadow-lg">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Terima Kasih!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Terima kasih sudah meluangkan waktu untuk memberikan testimoni.
              Masukan Anda sangat berarti dan akan sangat berguna bagi saya
              dalam terus berkembang dan memberikan yang terbaik.
            </p>
            <div className="flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              <Heart className="w-4 h-4 fill-current" />
              <span>Salam hangat, Faqih Nur Fahmi</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <MessageSquareText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tulis Testimoni
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bagikan pengalaman Anda bekerja sama dengan Faqih.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <User className="w-4 h-4 text-gray-400" />
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="Nama lengkap Anda"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Position & Company - 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  Posisi
                </label>
                <input
                  {...register("position")}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  Perusahaan
                </label>
                <input
                  {...register("company")}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="PT ABC Indonesia"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Linkedin className="w-4 h-4 text-gray-400" />
                LinkedIn <span className="text-gray-400 dark:text-gray-600 font-normal">(opsional)</span>
              </label>
              <input
                {...register("linkedinUrl")}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="https://linkedin.com/in/namaanda"
              />
              {errors.linkedinUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.linkedinUrl.message}</p>
              )}
            </div>

            {/* Testimonial */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <MessageSquareText className="w-4 h-4 text-gray-400" />
                Testimoni <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("testimonial", {
                  onChange: (e) => setCharCount(e.target.value.length),
                })}
                rows={5}
                maxLength={MAX_CHARS}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                placeholder="Bagikan pengalaman Anda bekerja sama dengan Faqih..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.testimonial ? (
                  <p className="text-red-500 text-xs">{errors.testimonial.message}</p>
                ) : (
                  <span />
                )}
                <span className={`text-xs ${charCount >= MAX_CHARS ? "text-red-500" : "text-gray-400 dark:text-gray-600"}`}>
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Kirim Testimoni
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
