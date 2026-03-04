"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/lib/types";

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        名场面
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="card p-5"
          >
            <span className="text-sm text-[var(--color-accent)] mb-3 block">◈</span>
            <p className="text-sm text-[var(--color-text-secondary)] leading-[1.7]">{h.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
