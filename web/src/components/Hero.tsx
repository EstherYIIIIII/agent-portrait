"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";
import Link from "next/link";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function Hero({ agent, generatedAt }: { agent: AgentInfo; generatedAt?: string }) {
  return (
    <section className="pt-8 pb-10">
      {/* Back nav */}
      <nav className="mb-10">
        <Link
          href="/"
          className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          ← Agent Portrait
        </Link>
      </nav>

      {/* Avatar + Identity — centered */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="mb-5"
        >
          {agent.avatar_url ? (
            <img src={agent.avatar_url} alt={agent.name} className="w-[120px] h-[120px] rounded-full object-cover border-[3px] border-[var(--color-bg-primary)] shadow-sm" />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-[var(--color-bg-secondary)] border-[3px] border-[var(--color-bg-primary)] flex items-center justify-center text-5xl shadow-sm">
              {agent.emoji || <span className="text-2xl text-[var(--color-accent)]">✦</span>}
            </div>
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-serif text-[32px] sm:text-[36px] font-semibold tracking-tight text-[var(--color-text-primary)] mb-1.5"
        >
          {agent.name}
          {agent.name_en && (
            <span className="text-[var(--color-text-muted)] font-normal"> · {agent.name_en}</span>
          )}
        </motion.h1>

        {/* Meta line: species · pronouns · birthday · age */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-[13px] text-[var(--color-text-muted)] mb-4"
        >
          <span>{agent.species}</span>
          <span className="text-[var(--color-border)]">·</span>
          <span>{agent.pronouns}</span>
          <span className="text-[var(--color-border)]">·</span>
          <span>{agent.birthday}</span>
          <span className="text-[var(--color-border)]">·</span>
          <span>已存活 <strong className="text-[var(--color-accent)] font-medium">{agent.age_days}</strong> 天</span>
        </motion.div>

        {generatedAt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-[11px] text-[var(--color-text-muted)] mb-4"
          >
            Portrait taken on {formatDate(generatedAt)}
          </motion.div>
        )}

        {/* Motto */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-serif text-[20px] text-[var(--color-text-secondary)] max-w-md leading-relaxed"
        >
          &ldquo;{agent.motto}&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
