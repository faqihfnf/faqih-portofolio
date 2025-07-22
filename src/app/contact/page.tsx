"use client";
import BusinessHours from "@/components/sections/contact/BusinessHours";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { FollowMe } from "@/components/sections/contact/FollowMe";
import { motion } from "framer-motion";

export default function ContactPage() {
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
          <ContactForm />
          <div className="space-y-8">
            <ContactInfo />
            <FollowMe />
            <BusinessHours />
          </div>
        </div>
      </div>
    </div>
  );
}
