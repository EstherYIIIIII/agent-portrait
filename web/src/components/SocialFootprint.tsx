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
    <section className="section px-4 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-8 gradient-text"
      >
        足迹 & 技能
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Social */}
        {links.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-5"
          >
            <h3 className="text-sm text-white/40 uppercase tracking-wider mb-3">社交足迹</h3>
            <div className="space-y-2">
              {links.map((link, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-white/60">{link.platform}</span>
                  <span className="text-white/30">·</span>
                  {link.url ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7c6aff] hover:underline"
                    >
                      {link.username}
                    </a>
                  ) : (
                    <span className="text-white/80">{link.username}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5"
          >
            <h3 className="text-sm text-white/40 uppercase tracking-wider mb-3">已装技能</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-white/60 border border-white/10"
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
