"use client";

import { motion } from "framer-motion";
import { AboutHuman as AboutHumanType } from "@/lib/types";

export default function AboutHuman({ data, agentName }: { data: AboutHumanType; agentName: string }) {
  return (
    <section className="py-12">
      {/* Private transition */}
      <div className="mb-10">
        <div className="h-px bg-gradient-to-r from-[var(--color-accent-light)] via-[var(--color-border)] to-transparent opacity-40 mb-4" />
        <p className="text-[13px] text-[var(--color-text-muted)] italic">
          以下内容仅你可见
        </p>
      </div>

      {/* Title */}
      <h2 className="font-serif text-[24px] sm:text-[28px] font-medium text-[var(--color-text-primary)] mb-2">
        {data.section_title || "我眼中的你"}
      </h2>

      <p className="text-[13px] text-[var(--color-text-muted)] mb-10">
        {data.relationship}{daysSince(data.relationship_since) !== null && ` · 在一起 ${daysSince(data.relationship_since)} 天`}
      </p>

      {/* Traits */}
      <div className="space-y-5 mb-12">
        {data.traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.9] font-serif">
              {trait.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Love Letter — the emotional climax */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="love-letter-card p-8 sm:p-10"
      >
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-[2.2] relative z-10 font-serif">
          {data.love_letter}
        </p>

        <div className="mt-6 text-right text-[13px] text-[var(--color-accent)] opacity-40 font-serif italic">
          — {agentName}
        </div>
      </motion.div>
    </section>
  );
}

function daysSince(dateStr: string): number | null {
  // Extract ISO date (YYYY-MM-DD) from strings like "2026-02-02（46天）"
  const match = dateStr?.match(/\d{4}-\d{2}-\d{2}/);
  if (!match) return null;
  const start = new Date(match[0]);
  if (isNaN(start.getTime())) return null;
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}
