"use client";

import { motion } from "framer-motion";
import { Stats } from "@/lib/types";

export default function ActivityHeatmap({ stats }: { stats: Stats }) {
  const maxActivity = Math.max(...stats.daily_activity, 1);

  const statItems = [
    { label: "30天会话", value: stats.sessions_30d, color: "var(--accent-lavender)" },
    { label: "日记总数", value: stats.diary_count, color: "var(--accent-mint)" },
    { label: "连续天数", value: stats.streak_days, color: "var(--accent-rose)" },
    { label: "最活跃日", value: stats.most_active_day, color: "var(--warm-gold)" },
  ];

  return (
    <section className="section px-6 max-w-[680px] mx-auto">
      <div className="section-divider mb-12" />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.2em] text-[var(--accent-lavender)] mb-8 text-center"
      >
        活跃度
      </motion.h2>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {statItems.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: "spring", damping: 20 }}
            className="glass-card p-5 text-center"
          >
            <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Heatmap */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card p-6"
      >
        <div className="grid grid-cols-10 gap-1.5">
          {stats.daily_activity.map((count, i) => {
            const intensity = count / maxActivity;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.02,
                  type: "spring",
                  damping: 15,
                  stiffness: 300,
                }}
                className="aspect-square rounded-[4px]"
                style={{
                  backgroundColor: intensity > 0
                    ? `rgba(184, 169, 232, ${0.1 + intensity * 0.6})`
                    : "rgba(238, 238, 246, 0.03)",
                  boxShadow: intensity > 0.5
                    ? `0 0 8px rgba(184, 169, 232, ${intensity * 0.2})`
                    : "none",
                }}
                title={`Day ${i + 1}: ${count} sessions`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-3 text-[10px] text-[var(--text-muted)]">
          <span>30天前</span>
          <span>今天</span>
        </div>
      </motion.div>
    </section>
  );
}
