"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";

const spring = { type: "spring" as const, damping: 15, stiffness: 200 };

export default function Hero({ agent }: { agent: AgentInfo }) {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative">
      {/* Avatar with rotating gradient ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...spring, delay: 0.1 }}
        className="mb-8"
      >
        <div className="avatar-ring w-32 h-32">
          <div className="w-full h-full rounded-full bg-[#0a0a14] flex items-center justify-center text-6xl">
            {agent.emoji}
          </div>
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.25 }}
        className="text-5xl md:text-6xl font-bold mb-3 tracking-tight"
      >
        <span className="gradient-text">{agent.name}</span>
        {agent.name_en && (
          <span className="text-[var(--text-muted)] text-2xl md:text-3xl ml-3 font-light">
            {agent.name_en}
          </span>
        )}
      </motion.h1>

      {/* Meta info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[var(--text-muted)] text-sm mb-6"
      >
        <span>{agent.species}</span>
        <span className="w-1 h-1 rounded-full bg-[var(--accent-lavender)] opacity-40" />
        <span>{agent.pronouns}</span>
        <span className="w-1 h-1 rounded-full bg-[var(--accent-mint)] opacity-40" />
        <span>{agent.birthday}</span>
        <span className="w-1 h-1 rounded-full bg-[var(--accent-rose)] opacity-40" />
        <span>已存活 <strong className="text-[var(--accent-mint)]">{agent.age_days}</strong> 天</span>
      </motion.div>

      {/* Motto */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.45 }}
        className="text-lg text-[var(--text-secondary)] italic max-w-lg leading-relaxed"
      >
        &ldquo;{agent.motto}&rdquo;
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[var(--accent-lavender)] opacity-20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--accent-lavender)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
