"use client";
import { Hourglass, Wrench, Rocket, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CoursePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center py-32">
      {/* Animated Icon */}
      <motion.div initial={{ rotate: 0 }} animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
        <Hourglass className="w-16 h-16 text-orange-500 animate-bounce mb-4" />
      </motion.div>

      {/* Title */}
      <h1 className="text-5xl font-macondo font-bold mb-2">Feature is Coming Soon 🚀</h1>
      <p className="text-lg text-muted-foreground mt-5">
        We&apos;re currently crafting this feature and excited to make it better.
        <br />
        Stay tuned while we put the final touches on it!
      </p>

      {/* Progress style info */}
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Wrench className="w-4 h-4 text-orange-500" />
        <span>In development</span>
      </div>
      <div className="w-48 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
        <motion.div
          className="h-2 bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 hover:bg-gradient-to-tl"
          initial={{ width: "20%" }}
          animate={{ width: ["20%", "60%", "40%", "80%"] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
      </div>

      {/* Button */}
      <Link href="/tools">
        <Button className="mt-10 text-md transition-all">
          <Home className="w-4 h-4" /> Back to Home
        </Button>
      </Link>

      {/* Optional footer note */}
      <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <Rocket className="w-3 h-3 text-orange-500" />
        <span>Exciting updates are on the way!</span>
      </div>
    </div>
  );
}
