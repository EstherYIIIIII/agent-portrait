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
        {/* Thin vertical line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--color-border)]" />

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-start gap-4 relative"
            >
              {/* Small dot instead of large circle with ✦ */}
              <div className="w-[11px] h-[11px] rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent)] shrink-0 z-10 mt-1" />

              {/* Plain text, no card */}
              <div className="flex-1 min-w-0 pb-1">
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
