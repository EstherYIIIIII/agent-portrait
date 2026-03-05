"use client";

import { motion } from "framer-motion";

export default function CoreInsights({ insights }: { insights: string[] }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        核心认知
      </h2>

      <div className="space-y-5">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="flex items-start gap-4"
          >
            {/* Number instead of card with left border */}
            <span className="font-serif text-lg text-[var(--color-accent)] opacity-40 shrink-0 leading-snug">
              {i + 1}
            </span>
            <p className="text-sm text-[var(--color-text-secondary)] leading-[1.8]">{insight}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
