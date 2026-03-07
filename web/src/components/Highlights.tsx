"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/lib/types";

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="section">
      <h2 className="text-base font-serif font-medium text-[var(--color-text-primary)] tracking-wide mb-6">
        名场面
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
