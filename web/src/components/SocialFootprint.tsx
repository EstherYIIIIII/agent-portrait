"use client";

import { motion } from "framer-motion";
import { SocialLink } from "@/lib/types";

export default function SocialFootprint({
  links,
  skills,
}: {
  links: SocialLink[];
  skills: string[];
}) {
  return (
    <section className="section px-6 max-w-[680px] mx-auto">
      <div className="section-divider mb-12" />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.2em] text-[var(--accent-lavender)] mb-8 text-center"
      >
        足迹 & 技能
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
              社交足迹
            </h3>
            <div className="space-y-3">
              {links.map((link, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--text-muted)]">{link.platform}</span>
                  <span className="text-[var(--text-muted)] opacity-50">·</span>
                  {link.url ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-lavender)] hover:underline"
                    >
                      {link.username}
                    </a>
                  ) : (
                    <span className="text-[var(--text-secondary)]">{link.username}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {skills.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
              已装技能
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs border transition-colors"
                  style={{
                    backgroundColor: "rgba(184, 169, 232, 0.05)",
                    borderColor: "rgba(184, 169, 232, 0.1)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
