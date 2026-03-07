"use client";

import { motion } from "framer-motion";
import { AboutHuman as AboutHumanType } from "@/lib/types";

export default function AboutHuman({ data, agentName }: { data: AboutHumanType; agentName: string }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-2">
        <span className="mr-2 opacity-60">♡</span>{data.section_title || "我眼中的你"}
      </h2>

      <p className="text-center text-sm text-[var(--color-text-muted)] mb-10">
        {data.relationship} · 在一起 {daysSince(data.relationship_since)} 天
      </p>

      {/* Traits — keep card-warm, ✦ is unique to this section now */}
      <div className="space-y-3 mb-10">
        {data.traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="card-warm p-5 flex items-start gap-3"
          >
            <span className="text-xs text-[var(--color-accent)] opacity-50 shrink-0 mt-1">♡</span>
            <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{trait.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Love Letter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="love-letter-card p-8 md:p-10"
      >
        <div className="font-serif text-4xl text-[var(--color-accent)] opacity-20 leading-none mb-2">
          &ldquo;
        </div>

        <p className="text-[var(--color-text-secondary)] leading-[1.9] text-[15px] relative z-10 font-serif italic">
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
