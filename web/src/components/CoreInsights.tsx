"use client";

import { motion } from "framer-motion";

export default function CoreInsights({ insights }: { insights: string[] }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        核心认知
      </h2>

      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="card p-5 border-l-2 border-l-[var(--color-accent-light)]"
          >
            <p className="text-sm text-[var(--color-text-secondary)] leading-[1.7]">{insight}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
