"use client";

import { motion } from "framer-motion";
import { Stats } from "@/lib/types";

export default function ActivityHeatmap({ stats }: { stats: Stats }) {
  const maxActivity = Math.max(...stats.daily_activity, 1);

  return (
    <section className="section px-4 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-8 gradient-text"
      >
        活跃度
      </motion.h2>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "30天会话", value: stats.sessions_30d },
          { label: "日记总数", value: stats.diary_count },
          { label: "连续天数", value: stats.streak_days },
          { label: "最活跃日", value: stats.most_active_day },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-4 text-center"
          >
            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-white/40 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Heatmap grid - 30 days */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card p-6"
      >
        <h3 className="text-sm text-white/40 uppercase tracking-wider mb-4">30 天活动热力图</h3>
        <div className="grid grid-cols-10 gap-1.5">
          {stats.daily_activity.map((count, i) => {
            const intensity = count / maxActivity;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor: intensity > 0
                    ? `rgba(124, 106, 255, ${0.15 + intensity * 0.7})`
                    : "rgba(255, 255, 255, 0.03)",
                }}
                title={`Day ${i + 1}: ${count} sessions`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-3 text-xs text-white/30">
          <span>30天前</span>
          <span>今天</span>
        </div>
      </motion.div>
    </section>
  );
}
