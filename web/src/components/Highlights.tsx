"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/lib/types";

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        <span className="mr-2 text-[var(--color-accent)] opacity-60">◈</span>名场面
      </h2>

      <div className="space-y-6">
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="relative pl-6"
          >
            {/* Left accent bar instead of card + icon */}
            <div className="absolute left-0 top-0.5 bottom-0.5 w-[2px] bg-[var(--color-accent)] opacity-30 rounded-full" />
            <p className="text-sm text-[var(--color-text-secondary)] leading-[1.8] font-serif">{h.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
