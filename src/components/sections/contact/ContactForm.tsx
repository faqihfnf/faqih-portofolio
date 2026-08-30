"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { EditorialButton } from "@/components/editorial/EditorialButton";
import { useTranslation } from "react-i18next";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactFormData = z.infer<typeof contactSchema>;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[var(--ed-accent)]">{error}</p>}
    </div>
  );
}

const underlineInput =
  "w-full border-0 border-b border-[var(--ed-border)] bg-transparent px-0 py-2 text-[var(--ed-text)] placeholder:text-[var(--ed-text-muted)] focus:outline-none focus:border-[var(--ed-accent)] transition-colors rounded-none";

export function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [senderName, setSenderName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const { t } = useTranslation();

  const onSubmit = async (data: ContactFormData) => {
    setIsSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: data.name,
          user_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setSenderName(data.name.split(" ")[0]);
      reset();
      setShowSuccess(true);
    } catch (err) {
      const detail = (err as { text?: string })?.text ?? (err as Error)?.message ?? "Unknown error";
      console.error("EmailJS error:", detail, err);
      alert(`Failed to send message (${detail}). Please try again or email me directly.`);
    } finally {
      setIsSending(false);
    }
  };

  // handleSubmit mengembalikan promise yang selalu resolve:
  // - jika form valid → jalankan onSubmit
  // - jika invalid → tampilkan error validasi (tanpa kirim)
  const handleButtonClick = () => {
    return handleSubmit(onSubmit)();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h2 className="ed-serif text-2xl tracking-tight">Send Message</h2>
      <form className="mt-8 space-y-8">
        {/* Name */}
        <Field label="Name" error={errors.name?.message}>
          <input id="name" {...register("name")} className={underlineInput} placeholder="Your name" />
        </Field>
        {/* Email */}
        <Field label="Email" error={errors.email?.message}>
          <input id="email" {...register("email")} className={underlineInput} placeholder="your.email@example.com" />
        </Field>
        {/* Subject */}
        <Field label="Subject" error={errors.subject?.message}>
          <input id="subject" {...register("subject")} className={underlineInput} placeholder="What's this about?" />
        </Field>
        {/* Message */}
        <Field label="Message" error={errors.message?.message}>
          <textarea id="message" rows={5} {...register("message")} className={`${underlineInput} resize-none`} placeholder="Your message..." />
        </Field>

        {/* Submit — button dengan border tipis */}
        <EditorialButton type="button" onClick={handleButtonClick} disabled={isSending} variant="primary">
          {isSending ? "Sending..." : "Send Message"}
        </EditorialButton>
      </form>

      {/* Popup terima kasih — via portal ke body agar fixed terhadap viewport */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccess(false)}
              >
                <motion.div
                  className="w-full max-w-md rounded-lg border border-[var(--ed-border)] bg-[var(--ed-bg)] p-8 text-center shadow-2xl md:p-10"
                  initial={{ scale: 0.95, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 12 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Angka serif kecil sebagai ornamen */}
                  <span className="ed-serif text-5xl italic leading-none text-[var(--ed-accent)]">&ldquo;</span>
                  <h3 className="ed-serif mt-3 text-2xl tracking-tight md:text-3xl">{t("contact.success-title")}</h3>
                  <p className="mt-4 leading-relaxed text-[var(--ed-text-secondary)]">
                    {senderName ? `${senderName}, ` : ""}
                    {t("contact.success-body")}
                  </p>
                  <div className="mt-8">
                    <EditorialButton variant="secondary" onClick={() => setShowSuccess(false)}>
                      {t("contact.success-close")}
                    </EditorialButton>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.div>
  );
}
