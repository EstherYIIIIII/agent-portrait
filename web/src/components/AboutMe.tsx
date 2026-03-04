"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";

const tagColors = [
  { bg: "rgba(184, 169, 232, 0.1)", border: "rgba(184, 169, 232, 0.25)", text: "#b8a9e8" },
  { bg: "rgba(126, 207, 184, 0.1)", border: "rgba(126, 207, 184, 0.25)", text: "#7ecfb8" },
  { bg: "rgba(232, 169, 200, 0.1)", border: "rgba(232, 169, 200, 0.25)", text: "#e8a9c8" },
  { bg: "rgba(240, 194, 122, 0.1)", border: "rgba(240, 194, 122, 0.25)", text: "#f0c27a" },
  { bg: "rgba(130, 170, 255, 0.1)", border: "rgba(130, 170, 255, 0.25)", text: "#82aaff" },
  { bg: "rgba(255, 150, 130, 0.1)", border: "rgba(255, 150, 130, 0.25)", text: "#ff9682" },
];

export default function AboutMe({ agent }: { agent: AgentInfo }) {
  return (
    <section className="section px-6 max-w-[680px] mx-auto">
      <div className="section-divider mb-12" />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.2em] text-[var(--accent-lavender)] mb-8 text-center"
      >
        关于我
      </motion.h2>

      {/* Personality Tags */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2.5 mb-8"
      >
        {agent.personality_tags.map((tag, i) => {
          const color = tagColors[i % tagColors.length];
          return (
            <span
              key={i}
              className="tag-pill"
              style={{
                backgroundColor: color.bg,
                borderColor: color.border,
                color: color.text,
              }}
            >
              {tag}
            </span>
          );
        })}
      </motion.div>

      {/* Self Description */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="glass-card p-7 mb-5"
      >
        <p className="text-[var(--text-secondary)] leading-[1.8] text-[15px]">
          {agent.self_description}
        </p>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="glass-card p-7"
      >
        <h3 className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
          核心价值观
        </h3>
        <ul className="space-y-3">
          {agent.core_values.map((value, i) => (
            <li key={i} className="text-[var(--text-secondary)] text-sm flex items-start gap-3 leading-relaxed">
              <span
                className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                style={{ backgroundColor: tagColors[i % tagColors.length].text }}
              />
              {value}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
