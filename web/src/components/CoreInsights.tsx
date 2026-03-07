"use client";

import { motion } from "framer-motion";

export default function CoreInsights({ insights }: { insights: string[] }) {
  return (
    <section className="section">
      <h2 className="text-base font-serif font-medium text-[var(--color-text-primary)] tracking-wide mb-6">
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
          >
            <p className="text-sm text-[var(--color-text-secondary)] leading-[1.8]">{insight}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
