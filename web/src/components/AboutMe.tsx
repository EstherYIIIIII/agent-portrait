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
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {agent.personality_tags.map((tag, i) => (
          <span key={i} className="tag-pill">{tag}</span>
        ))}
      </motion.div>

      {/* Self Description */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-4"
      >
        <p className="text-[var(--color-text-secondary)] leading-[1.8] text-[15px]">
          {agent.self_description}
        </p>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="card p-6"
      >
        <h3 className="font-serif text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
          核心价值观
        </h3>
        <ul className="space-y-2.5">
          {agent.core_values.map((value, i) => (
            <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-light)] mt-2 shrink-0" />
              {value}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
