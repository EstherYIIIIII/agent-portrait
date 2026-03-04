"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/lib/types";

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="section px-6 max-w-[680px] mx-auto">
      <div className="section-divider mb-12" />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.2em] text-[var(--accent-lavender)] mb-8 text-center"
      >
        名场面
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.1,
              type: "spring",
              damping: 20,
            }}
            className="glass-card p-6"
          >
            <span className="text-3xl mb-4 block">{h.emoji}</span>
            <p className="text-sm text-[var(--text-secondary)] leading-[1.7]">{h.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
