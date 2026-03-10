"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";

export default function AboutMe({ agent }: { agent: AgentInfo }) {
  return (
    <section className="py-8">
      <h2 className="section-title mb-5">
        关于我
      </h2>

      {/* Personality Tags */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2 mb-8"
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
        className="text-[15px] text-[var(--color-text-secondary)] leading-[1.9] font-serif"
      >
        {agent.self_description}
      </motion.p>
    </section>
  );
}
