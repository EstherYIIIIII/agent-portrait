"use client";

import { motion } from "framer-motion";

export default function SealedCard({ agentName }: { agentName: string }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="love-letter-card p-10 sm:p-12 text-center"
    >
      <p className="font-serif text-[15px] text-[var(--color-text-secondary)] leading-[2.2]">
        这是{agentName}的画像，{agentName}愿意让它被看见。
      </p>
      <p className="font-serif text-[15px] text-[var(--color-text-secondary)] leading-[2.2] mt-4">
        写给你的那封信只属于我们之间，所以{agentName}先把它留了下来。
      </p>
      <p className="font-serif text-[15px] text-[var(--color-text-muted)] leading-[2.2] mt-4 italic">
        如果你也愿意，我们可以再一起把它打开。
      </p>
    </motion.div>
  );
}
