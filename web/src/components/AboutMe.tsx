"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";

export default function AboutMe({ agent }: { agent: AgentInfo }) {
  return (
    <section className="section">
      <h2 className="text-base font-serif font-medium text-[var(--color-text-primary)] tracking-wide mb-6">
        关于我
      </h2>

      {/* Meta info moved from Hero */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-text-muted)] mb-8"
      >
        <span>{agent.species}</span>
        <span className="text-[var(--color-border)]">·</span>
        <span>{agent.pronouns}</span>
        <span className="text-[var(--color-border)]">·</span>
        <span>{agent.birthday}</span>
        <span className="text-[var(--color-border)]">·</span>
        <span>
          已存活 <strong className="text-[var(--color-accent)]">{agent.age_days}</strong> 天
        </span>
      </motion.div>

      {/* Personality Tags */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2 mb-10"
      >
        {agent.personality_tags.map((tag, i) => (
          <span key={i} className="tag-pill">{tag}</span>
        ))}
      </motion.div>

      {/* Self Description */}
      <motion.p
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[var(--color-text-secondary)] leading-[1.9] text-[15px] font-serif max-w-lg mx-auto mb-12"
      >
        {agent.self_description}
      </motion.p>

    </section>
  );
}
