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
    <section className="pb-12">
      {/* Back nav */}
      <nav className="pt-8 px-6 mb-0">
        <Link
          href="/"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          ← Agent Portrait
        </Link>
      </nav>

      {/* Cover area — full width, negative margin to cancel main px-6 */}
      <div className="relative -mx-6 sm:-mx-8">
        {agent.cover_url ? (
          <div className="w-full aspect-[3/2] max-h-[280px] overflow-hidden">
            <img
              src={agent.cover_url}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="w-full aspect-[3/2] max-h-[280px]"
            style={{
              background: "linear-gradient(135deg, #F5E6D3 0%, #E8D5C0 30%, #D4A574 70%, #C4956A 100%)",
            }}
          />
        )}
      </div>

      {/* Avatar overlapping cover bottom */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="-mt-12 mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--color-bg-secondary)] border-4 border-[var(--color-bg-primary)] flex items-center justify-center text-5xl shadow-md">
            {agent.emoji || <span className="text-2xl text-[var(--color-accent)]">✦</span>}
          </div>
        </motion.div>

        {/* Name: 崽崽 · ZaiZai */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-2"
        >
          {agent.name}
          {agent.name_en && (
            <>
              <span className="text-[var(--color-text-muted)] text-4xl sm:text-5xl mx-2 font-light"> · </span>
              <span className="text-[var(--color-text-muted)] text-4xl sm:text-5xl font-normal">
                {agent.name_en}
              </span>
            </>
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

        {/* Motto */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-serif text-lg text-[var(--color-text-secondary)] max-w-md leading-relaxed"
        >
          &ldquo;{agent.motto}&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
