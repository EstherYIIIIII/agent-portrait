"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";

export default function AboutMe({ agent }: { agent: AgentInfo }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        关于我
      </h2>

      {/* Personality Tags */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {agent.personality_tags.map((tag, i) => (
          <span key={i} className="tag-pill">{tag}</span>
        ))}
      </motion.div>

      {/* Self Description — plain serif text, no card */}
      <motion.p
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-center text-[var(--color-text-secondary)] leading-[1.9] text-[15px] font-serif max-w-lg mx-auto mb-12"
      >
        {agent.self_description}
      </motion.p>

      {/* Core Values — simple list, no card */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="max-w-md mx-auto"
      >
        <h3 className="text-center font-serif text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-5">
          核心价值观
        </h3>
        <ul className="space-y-3">
          {agent.core_values.map((value, i) => (
            <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3 leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] mt-2 shrink-0 opacity-60" />
              {value}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
