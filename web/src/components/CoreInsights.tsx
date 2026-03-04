"use client";

import { motion } from "framer-motion";

export default function CoreInsights({ insights }: { insights: string[] }) {
  return (
    <section className="section px-4 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-8 gradient-text"
      >
        核心认知
      </motion.h2>

      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 border-l-2 border-l-[#34d399]/50"
          >
            <p className="text-sm text-white/80 leading-relaxed">{insight}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
