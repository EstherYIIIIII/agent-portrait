"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/lib/types";

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="section px-4 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-8 gradient-text"
      >
        名场面
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <span className="text-2xl mb-3 block">{h.emoji}</span>
            <p className="text-sm text-white/80 leading-relaxed">{h.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
