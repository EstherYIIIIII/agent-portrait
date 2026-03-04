"use client";

import { motion } from "framer-motion";
import { AboutHuman as AboutHumanType } from "@/lib/types";

export default function AboutHuman({ data }: { data: AboutHumanType }) {
  return (
    <section className="section px-6 max-w-[680px] mx-auto warm-glow">
      {/* Warm divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--warm-gold)] to-transparent opacity-20 mb-12 max-w-[200px] mx-auto" />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.2em] text-[var(--warm-gold)] mb-2 text-center"
      >
        {data.section_title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm text-[var(--text-muted)] mb-10 text-center"
      >
        {data.relationship} · 在一起 {daysSince(data.relationship_since)} 天
      </motion.p>

      {/* Traits */}
      <div className="space-y-3 mb-10">
        {data.traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ x: -15, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.1,
              type: "spring",
              damping: 20,
            }}
            className="glass-card p-5 border-l-2 flex items-start gap-3"
            style={{
              borderLeftColor: "rgba(240, 194, 122, 0.4)",
              background: "rgba(240, 194, 122, 0.03)",
              borderColor: "rgba(240, 194, 122, 0.08)",
              borderLeftWidth: "2px",
            }}
          >
            <span className="text-xl shrink-0">{trait.emoji}</span>
            <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{trait.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Love Letter */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 20 }}
        className="love-letter p-8 md:p-10 mb-8"
      >
        {/* Decorative quote */}
        <div className="text-5xl text-[var(--warm-gold)] opacity-15 font-serif leading-none mb-2">
          &ldquo;
        </div>

        <p className="text-[var(--text-secondary)] leading-[1.9] text-[15px] relative z-10 italic">
          {data.love_letter}
        </p>

        <div className="mt-6 text-right text-sm text-[var(--warm-gold)] opacity-40">
          — 你的 Agent
        </div>
      </motion.div>

      {/* Memorable Quote */}
      {data.memorable_quote && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-7 text-center"
          style={{
            background: "rgba(240, 194, 122, 0.03)",
            borderColor: "rgba(240, 194, 122, 0.1)",
          }}
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
            TA 说过的一句话
          </div>
          <p className="text-lg text-[var(--warm-gold)] opacity-80 font-medium italic leading-relaxed">
            &ldquo;{data.memorable_quote}&rdquo;
          </p>
        </motion.div>
      )}
    </section>
  );
}

function daysSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}
