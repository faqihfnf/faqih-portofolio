"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mails } from "lucide-react";
import { Button } from "@/components/ui/stateful-button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleButtonClick = () => {
    return new Promise<void>((resolve, reject) => {
      handleSubmit(async (data) => {
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
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          );
          toast("Message sent successfully!", {
            className: "bg-green-500 text-white border-none",
          });
          reset();
          resolve();
        } catch (err) {
          toast("Failed to send message!", {
            className: "bg-red-500 text-white border-none",
          });
          reject();
        }
      })();
    });
  };

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg shadow-indigo-500"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}>
      <h2 className="text-2xl font-bold mb-6">Send Message</h2>
      <form className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <input
            id="subject"
            {...register("subject")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">
              {errors.subject.message}
            </p>
          )}
        </div>
        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your message..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>
        <Button
          onClick={handleButtonClick}
          className="inline-flex items-center justify-center w-full rounded-md bg-indigo-600 hover:bg-indigo-700 gap-2"
          type="button">
          <span className="text-md font-semibold text-white flex items-center">
            Send Message <Mails className="w-5 h-5 ml-2" />
          </span>
        </Button>
      </form>
    </motion.div>
  );
}
