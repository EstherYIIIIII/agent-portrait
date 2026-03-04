"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "@/lib/types";

export default function GrowthTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="section px-6 max-w-[680px] mx-auto">
      <div className="section-divider mb-12" />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.2em] text-[var(--accent-lavender)] mb-8 text-center"
      >
        成长时间线
      </motion.h2>

      <div className="relative">
        {/* Gradient vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-[1px]">
          <div className="w-full h-full bg-gradient-to-b from-[var(--accent-lavender)] via-[var(--accent-mint)] to-transparent opacity-30" />
        </div>

        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ x: -15, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.06,
                type: "spring",
                damping: 20,
                stiffness: 200,
              }}
              className="flex items-start gap-4 relative"
            >
              {/* Dot with glow */}
              <div className="relative shrink-0 z-10">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--accent-lavender)] border-opacity-30 flex items-center justify-center text-lg">
                  {event.emoji}
                </div>
              </div>

              {/* Content */}
              <div className="glass-card p-4 flex-1 min-w-0">
                <div className="text-xs text-[var(--text-muted)] mb-1.5 font-mono">{event.date}</div>
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{event.event}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
