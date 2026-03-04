"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "@/lib/types";

export default function GrowthTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="section px-4 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-8 gradient-text"
      >
        成长时间线
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7c6aff] via-[#34d399] to-transparent" />

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 relative"
            >
              {/* Dot */}
              <div className="w-10 h-10 rounded-full bg-[#050505] border-2 border-[#7c6aff]/50 flex items-center justify-center text-lg shrink-0 z-10">
                {event.emoji}
              </div>

              {/* Content */}
              <div className="glass-card p-4 flex-1">
                <div className="text-xs text-white/40 mb-1">{event.date}</div>
                <div className="text-sm text-white/80">{event.event}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
