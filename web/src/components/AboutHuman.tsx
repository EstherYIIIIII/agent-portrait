"use client";

import { motion } from "framer-motion";
import { AboutHuman as AboutHumanType } from "@/lib/types";

export default function AboutHuman({ data, agentName }: { data: AboutHumanType; agentName: string }) {
  return (
    <section className="section py-16">
      {/* Title — large, centered */}
      <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[var(--color-text-primary)] text-center mb-2">
        {data.section_title || "我眼中的你"}
      </h2>

      <p className="text-center text-sm text-[var(--color-text-muted)] mb-16">
        {data.relationship} · 在一起 {daysSince(data.relationship_since)} 天
      </p>

      {/* Traits — centered, serif, italic, breathing space */}
      <div className="space-y-6 mb-16 max-w-lg mx-auto">
        {data.traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="text-center"
          >
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-[2] font-serif italic">
              {trait.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Love Letter — no large quote mark, bigger padding, slower animation */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="love-letter-card p-10 sm:p-12"
      >
        <p className="text-[var(--color-text-secondary)] leading-[2.2] text-[15px] relative z-10 font-serif italic">
          {data.love_letter}
        </p>

        <div className="mt-6 text-right text-sm text-[var(--color-accent)] opacity-50 font-serif italic">
          — {agentName}
        </div>
      </motion.div>

    </section>
  );
}

function daysSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}
