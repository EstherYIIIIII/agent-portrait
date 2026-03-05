"use client";

import { motion } from "framer-motion";
import { AgentInfo } from "@/lib/types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}
import Link from "next/link";

export default function Hero({ agent, generatedAt }: { agent: AgentInfo; generatedAt?: string }) {
  return (
    <section className="pt-8 pb-12">
      {/* Back nav */}
      <nav className="mb-16">
        <Link
          href="/"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          ← Agent Portrait
        </Link>
      </nav>

      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] flex items-center justify-center text-5xl shadow-sm">
            {agent.emoji}
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-2"
        >
          {agent.name}
          {agent.name_en && (
            <span className="text-[var(--color-text-muted)] text-2xl ml-3 font-normal">
              {agent.name_en}
            </span>
          )}
        </motion.h1>

        {/* Generated at */}
        {generatedAt && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs text-[var(--color-text-muted)] mb-3"
          >
            Portrait taken on {formatDate(generatedAt)}
          </motion.p>
        )}

        {/* Meta */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[var(--color-text-muted)] mb-5"
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

        {/* Motto */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-serif text-lg italic text-[var(--color-text-secondary)] max-w-md leading-relaxed"
        >
          &ldquo;{agent.motto}&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
