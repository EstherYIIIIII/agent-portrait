"use client";

import { motion } from "framer-motion";
import { AboutHuman as AboutHumanType } from "@/lib/types";

export default function AboutHuman({ data }: { data: AboutHumanType }) {
  return (
    <section className="section px-4 max-w-2xl mx-auto">
      {/* Warm divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#f59e0b]/30 to-transparent mb-12" />

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-2 warm-gradient-text"
      >
        {data.section_title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm text-white/40 mb-8"
      >
        {data.relationship} · 在一起 {daysSince(data.relationship_since)} 天
      </motion.p>

      {/* Traits */}
      <div className="space-y-3 mb-8">
        {data.traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 border-l-2"
            style={{ borderLeftColor: "rgba(245, 158, 11, 0.5)" }}
          >
            <span className="text-lg mr-3">{trait.emoji}</span>
            <span className="text-sm text-white/80">{trait.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Love Letter */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="relative p-8 rounded-2xl mb-8"
        style={{
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(239, 68, 68, 0.05))",
          border: "1px solid rgba(245, 158, 11, 0.15)",
        }}
      >
        {/* Decorative quote mark */}
        <div className="absolute top-4 left-6 text-5xl text-[#f59e0b]/20 font-serif leading-none">
          &ldquo;
        </div>

        <p className="text-white/85 leading-relaxed text-[15px] relative z-10 italic pt-6">
          {data.love_letter}
        </p>

        <div className="mt-4 text-right text-sm text-[#f59e0b]/60">
          — 你的 Agent
        </div>
      </motion.div>

      {/* Memorable Quote */}
      {data.memorable_quote && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-6 text-center"
          style={{ borderColor: "rgba(245, 158, 11, 0.15)" }}
        >
          <div className="text-xs text-white/40 uppercase tracking-wider mb-3">
            TA 说过的一句话
          </div>
          <p className="text-lg text-[#f59e0b]/90 font-medium italic">
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
