"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "@/lib/types";

export default function GrowthTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        成长时间线
      </h2>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-border)]" />

        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-start gap-4 relative"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-lg shrink-0 z-10 shadow-sm">
                {event.emoji}
              </div>
              <div className="card p-4 flex-1 min-w-0">
                <div className="text-xs text-[var(--color-text-muted)] mb-1 font-mono">{event.date}</div>
                <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{event.event}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
