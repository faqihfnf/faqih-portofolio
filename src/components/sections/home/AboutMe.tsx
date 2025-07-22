"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutMe() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-8 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          Who I Am
        </motion.h2>
        {/* Profile & Text */}
        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Image */}
            <div className="mx-auto flex justify-end mb-4 md:mx-0 order-1 md:order-2">
              <div className="relative group">
                <div
                  className="w-[475px] h-[475px] bg-gradient-to-tl from-blue-600 via-teal-500 to-pink-500 p-0.5"
                  style={{
                    WebkitMaskImage: "url('/mask-outline.svg')",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskImage: "url('/mask-outline.svg')",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "cover",
                  }}>
                  <div
                    className="w-[425px] h-[385px] m-6 bg-gradient-to-br from-yellow-500 via-teal-500 to-green-600 p-4 overflow-hidden"
                    style={{
                      WebkitMaskImage: "url('/mask-inline.svg')",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskImage: "url('/mask-inline.svg')",
                      maskRepeat: "no-repeat",
                      maskPosition: "right",
                      maskSize: "cover",
                    }}>
                    <Image
                      src="/profile.jpg"
                      alt="Profile"
                      width={300}
                      height={300}
                      className="mt-14 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* About Text */}
            <motion.p
              className="text-lg text-justify items-center justify-center flex text-gray-600 dark:text-gray-300 mb-6 leading-8 order-2 md:order-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}>
              Saya seorang developer yang passionate dalam menciptakan solusi
              digital yang inovatif dan user-friendly. Dengan pengalaman dalam
              frontend dan backend development, saya senang mengubah ide menjadi
              kenyataan.
              <br />
              Saya seorang developer yang passionate dalam menciptakan solusi
              digital yang inovatif dan user-friendly. Dengan pengalaman dalam
              frontend dan backend development, saya senang mengubah ide menjadi
              kenyataan.
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className=" gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}>
          {/* Motto/Tagline */}
          <div className="text-left order-2 md:order-1">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}>
              <div className="text-center md:text-left">
                <blockquote className="text-2xl font-medium text-gray-800 dark:text-gray-200 italic border-l-4 border-indigo-600 pl-4">
                  "Create with passion, innovate with impact and deliver
                  excellence solutions."
                </blockquote>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  - My Work Philosophy
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-indigo-500 hover:shadow-teal-500">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    2+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tahun Pengalaman
                  </div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-indigo-500 hover:shadow-pink-500">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    15+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Project Selesai
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Info Cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-pink-500 transition-shadow duration-300 shadow-indigo-500">
                <div className="text-3xl mb-3 ">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Fokus pada Detail
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Setiap pixel dan line code memiliki makna untuk menciptakan
                  pengalaman terbaik
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-pink-500 transition-shadow duration-300 shadow-teal-500">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Always Learning
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Teknologi terus berkembang, begitu juga dengan kemampuan dan
                  wawasan saya
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-indigo-500 transition-shadow duration-300 shadow-pink-500">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Team Player
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kolaborasi yang baik menghasilkan solusi yang lebih inovatif
                  dan sustainable
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
