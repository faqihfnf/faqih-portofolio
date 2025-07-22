"use client";

import TouchButton from "@/components/ui/button-touch";
import { motion } from "framer-motion";
import { SendIcon } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          Ready to Work{" "}
          <span>
            <span className="text-indigo-700 dark:text-indigo-500">
              Together?
            </span>
          </span>
        </motion.h2>
        <motion.p
          className="text-xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}>
          Let's reach out me to discuss your{" "}
          <span className="text-teal-600 dark:text-teal-500 font-semibold">
            project
          </span>{" "}
          needs. I'm always open to new{" "}
          <span className="text-indigo-600 dark:text-indigo-500 font-semibold">
            opportunities
          </span>{" "}
          and{" "}
          <span className="text-pink-600 dark:text-pink-500 font-semibold">
            collaborations
          </span>
          .
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}>
          <Link href="/contact">
            <TouchButton
              otherClasses="hover:text-pink-500 dark:hover:text-pink-500 hover:bg-indigo-200 text-indigo-700 dark:text-indigo-100 font-semibold text-lg"
              title="Let's get in touch"
              icon={<SendIcon className="w-4 h-4" />}
              position="right"></TouchButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
