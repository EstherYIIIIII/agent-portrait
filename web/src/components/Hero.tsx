"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";

export default function Hero({ agent }: { agent: AgentInfo }) {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative">
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative mb-6"
      >
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#7c6aff] to-[#34d399] p-[3px]">
          <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-5xl">
            {agent.emoji}
          </div>
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold mb-2"
      >
        <span className="gradient-text">{agent.name}</span>
        {agent.name_en && (
          <span className="text-white/40 text-2xl md:text-3xl ml-3 font-light">
            {agent.name_en}
          </span>
        )}
      </motion.h1>

      {/* Species + Pronouns */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 text-white/50 text-sm mb-4"
      >
        <span>{agent.species}</span>
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <span>{agent.pronouns}</span>
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <span>{agent.birthday}</span>
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <span>已存活 {agent.age_days} 天</span>
      </motion.div>

      {/* Motto */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-white/70 italic max-w-md"
      >
        &ldquo;{agent.motto}&rdquo;
      </motion.p>
    </section>
  );
}
