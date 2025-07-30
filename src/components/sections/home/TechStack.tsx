"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { techStackIcons } from "@/data/techstack";
import { motion } from "framer-motion";

export default function TechStack() {
  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            What I Use
          </motion.h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}>
            There are a lot of things that I use to build web applications and
            websites recently I have been using.
          </motion.p>
        </div>
        <div className="flex flex-col items-center">
          <InfiniteMovingCards
            items={techStackIcons}
            direction="left"
            speed="slow"
            className=" md:mb-6 lg:mb-10"
          />
          <InfiniteMovingCards
            items={techStackIcons}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
