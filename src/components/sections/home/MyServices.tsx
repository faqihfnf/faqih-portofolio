"use client";

import { Button } from "@/components/ui/moving-border";
import { myServices } from "@/data/myservices";
import { motion } from "framer-motion";

export default function MyServices() {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            What I Do
          </motion.h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}>
            I specialize in creating digital experiences that are both beautiful
            and functional
          </motion.p>
        </div>
        <div className="w-full mt-20 grid lg:grid-cols-4 grid-cols-1 gap-10">
          {myServices.map((card) => (
            <Button
              key={card.id}
              duration={Math.floor(Math.random() * 10000 + 10000)}
              borderRadius="1rem"
              className="flex-1 text-white border-slate-200 dark:border-slate-700">
              <div className="flex lg:flex-row flex-col lg:items-center p-3 md:p-5 lg:p-10 gap-2">
                <card.icon className="h-14 w-14 text-indigo-200" />
              </div>
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold ">
                  {card.title}
                </h1>
                <p className="text-start text-white mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
