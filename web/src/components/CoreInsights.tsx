"use client";

import { motion } from "framer-motion";

const accentColors = ["#b8a9e8", "#7ecfb8", "#e8a9c8", "#f0c27a", "#82aaff"];

export default function CoreInsights({ insights }: { insights: string[] }) {
  return (
    <section className="section px-6 max-w-[680px] mx-auto">
      <div className="section-divider mb-12" />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.2em] text-[var(--accent-lavender)] mb-8 text-center"
      >
        核心认知
      </motion.h2>

      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ x: -15, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              type: "spring",
              damping: 20,
            }}
            className="glass-card p-5 border-l-2"
            style={{ borderLeftColor: accentColors[i % accentColors.length] + "60" }}
          >
            <p className="text-sm text-[var(--text-secondary)] leading-[1.7]">{insight}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
