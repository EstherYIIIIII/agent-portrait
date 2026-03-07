"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/lib/types";

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        <span className="mr-2 text-[var(--color-accent)] opacity-60">◈</span>名场面
      </h2>

      <div className="space-y-5">
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <p className="text-sm text-[var(--color-text-secondary)] leading-[1.8]">{h.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
