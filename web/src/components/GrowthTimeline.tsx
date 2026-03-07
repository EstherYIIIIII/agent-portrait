"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "@/lib/types";

export default function GrowthTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        <span className="mr-2 text-[var(--color-accent)] opacity-60">◦</span>成长时间线
      </h2>

      <div className="relative">
        {/* Thin vertical line */}
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-[var(--color-border)] opacity-40" />

        <div className="space-y-5">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-start gap-4 relative"
            >
              <div className="w-[7px] h-[7px] rounded-full bg-[var(--color-accent)] opacity-40 shrink-0 z-10 mt-1.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[var(--color-text-muted)] mb-1 font-mono">{event.date}</div>
                <div className="text-sm text-[var(--color-text-secondary)] leading-[1.8]">{event.event}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
