"use client";

import { motion } from "framer-motion";

export default function CoreInsights({ insights }: { insights: string[] }) {
  if (!insights || insights.length === 0) return null;
  return (
    <section className="py-8">
      <h2 className="section-title mb-5">
        核心认知
      </h2>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.8]">{insight}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
