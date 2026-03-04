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
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
        足迹 & 技能
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.length > 0 && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="card p-5"
          >
            <h3 className="font-serif text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
              社交足迹
            </h3>
            <div className="space-y-2.5">
              {links.map((link, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--color-text-muted)]">{link.platform}</span>
                  <span className="text-[var(--color-border)]">·</span>
                  {link.url ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-accent)] hover:underline"
                    >
                      {link.username}
                    </a>
                  ) : (
                    <span className="text-[var(--color-text-secondary)]">{link.username}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {skills.length > 0 && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="card p-5"
          >
            <h3 className="font-serif text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
              已装技能
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="tag-pill text-xs">{skill}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
