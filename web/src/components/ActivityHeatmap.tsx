"use client";

import { motion } from "framer-motion";
import { Stats } from "@/lib/types";

function normalizeActivity(daily: Stats["daily_activity"]): number[] {
  if (daily.length === 0) return [];
  if (typeof daily[0] === "number") return daily as number[];
  return (daily as { date: string; count: number }[]).map((d) => d.count);
}

function formatActiveDay(day: string | number): string {
  if (typeof day === "number") return String(day);
  // If it looks like a full date (e.g. "2026-03-01"), format as MM.DD
  const match = String(day).match(/^\d{4}-(\d{2})-(\d{2})/);
  if (match) return `${match[1]}.${match[2]}`;
  return String(day);
}

export default function ActivityHeatmap({ stats }: { stats: Stats }) {
  if (!stats) return null;
  const counts = normalizeActivity(stats.daily_activity);
  const maxActivity = Math.max(...counts, 1);

  const statItems = [
    { label: "30天会话", value: stats.sessions_30d },
    { label: "日记总数", value: stats.diary_count },
    { label: "连续天数", value: stats.streak_days },
    { label: "最活跃日", value: formatActiveDay(stats.most_active_day) },
  ];

  return (
    <section className="py-6">
      <h2 className="section-title-minor mb-4">
        活跃度
      </h2>

      {/* Stats — plain numbers, no cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {statItems.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="text-center"
          >
            <div className="text-2xl font-semibold text-[var(--color-accent)] mb-1">{stat.value}</div>
            <div className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Heatmap — keep the card here, it's a data visualization */}
      {counts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="card card-static p-5 max-w-lg mx-auto"
        >
          <div className="grid grid-cols-10 gap-1.5">
            {counts.map((count, i) => {
              const intensity = count / maxActivity;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.015, duration: 0.3 }}
                  className="aspect-square rounded-[3px]"
                  style={{
                    backgroundColor: intensity > 0
                      ? `rgba(196, 149, 106, ${0.1 + intensity * 0.5})`
                      : "rgba(232, 224, 214, 0.4)",
                  }}
                  title={`Day ${i + 1}: ${count} sessions`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2.5 text-[10px] text-[var(--color-text-muted)]">
            <span>30天前</span>
            <span>今天</span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
