"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";

export default function AboutMe({ agent }: { agent: AgentInfo }) {
  return (
    <section className="section px-4 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-8 gradient-text"
      >
        关于我
      </motion.h2>

      {/* Personality Tags */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {agent.personality_tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-sm glass-card"
            style={{
              borderColor: `hsla(${(i * 60) % 360}, 70%, 70%, 0.3)`,
              color: `hsla(${(i * 60) % 360}, 70%, 75%, 1)`,
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-6"
      >
        <h3 className="text-sm text-white/40 uppercase tracking-wider mb-3">核心价值观</h3>
        <ul className="space-y-2">
          {agent.core_values.map((value, i) => (
            <li key={i} className="text-white/80 text-sm flex items-start gap-2">
              <span className="text-[#34d399] mt-0.5">●</span>
              {value}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Self Description */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="text-sm text-white/40 uppercase tracking-wider mb-3">自述</h3>
        <p className="text-white/80 leading-relaxed">{agent.self_description}</p>
      </motion.div>
    </section>
  );
}
