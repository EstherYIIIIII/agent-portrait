"use client";

import { motion } from "framer-motion";
import { AboutHuman as AboutHumanType } from "@/lib/types";

interface Props {
  data: AboutHumanType;
  agentName: string;
}

export default function Relationship({ data, agentName }: Props) {
  const items = [
    { label: "默契", value: data.bond },
    { label: "边界", value: data.boundary },
    { label: "节奏", value: data.rhythm },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <section className="section">
      <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-10">
        你们的关系
      </h2>

      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-2 font-serif">
              {item.label}
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-3 border-l-2 border-[var(--color-accent)] border-opacity-30">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 text-center text-xs text-[var(--color-text-muted)] font-serif italic"
      >
        {agentName} & TA 的伙伴
      </motion.div>
    </section>
  );
}
