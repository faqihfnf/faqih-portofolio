"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Mails,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/stateful-button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
            {
              user_name: data.name,
              user_email: data.email,
              subject: data.subject,
              message: data.message,
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
          );
          // setSubmitStatus("success");
          reset();
          toast("Message sent successfully!", {
            className: "bg-green-500 text-white border-none",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          resolve();
        } catch (error) {
          console.error("EmailJS Error:", error);
          toast("Failed to send message!", {
            className: "bg-red-500 text-white border-none",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          // setSubmitStatus("error");
          reject();
        }
      })(); // langsung jalankan
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            I'd love to hear from you. Send me a message and I'll respond as
            soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg shadow-indigo-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium  mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium  mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium  mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject")}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium  mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* ✅ Tombol pakai Stateful Button */}
              <Button
                onClick={handleButtonClick}
                className="inline-flex items-center justify-center w-full rounded-md bg-indigo-600 hover:bg-indigo-700 gap-2"
                type="button">
                <span className="text-md font-semibold text-white flex items-center">
                  Send Message <Mails className="w-5 h-5 ml-2" />
                </span>
              </Button>

              {/* {submitStatus === "success" && <p className="text-green-600 text-center">✅ Message sent successfully!</p>}
              {submitStatus === "error" && <p className="text-red-600 text-center">❌ Failed to send. Please try again.</p>} */}
            </form>
          </motion.div>

          {/* Contact Info tetap sama */}
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg shadow-indigo-500">
              <h2 className="text-2xl font-bold mb-6">Contact Info</h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-indigo-500 mr-3" />
                  <span className="">faqih.fnf@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-indigo-500 mr-3" />
                  <span className="">+62 899 6423 135</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-indigo-500 mr-3" />
                  <span className="">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Follow Me */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg shadow-indigo-500">
              <h2 className="text-2xl font-bold mb-6">Follow Me</h2>

              <div className="flex justify-center sm:justify-start gap-4">
                <Link
                  href="https://github.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 rounded-lg bg-black-200 border border-indigo-400 dark:border-indigo-500 hover:bg-indigo-600 hover:text-white  hover:border-indigo-600">
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 rounded-lg bg-black-200 border border-indigo-400 dark:border-indigo-500 hover:bg-indigo-600 hover:text-white  hover:border-indigo-600">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 rounded-lg bg-black-200 border border-indigo-400 dark:border-indigo-500 hover:bg-indigo-600 hover:text-white  hover:border-indigo-600">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 rounded-lg bg-black-200 border border-indigo-400 dark:border-indigo-500 hover:bg-indigo-600 hover:text-white  hover:border-indigo-600">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
