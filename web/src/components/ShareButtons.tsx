"use client";

import { useState } from "react";

export default function ShareButtons({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://agent-portrait.vercel.app/p/${slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="py-20 px-6 text-center">
      <div className="section-divider mb-12" />

      <div className="max-w-md mx-auto">
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl glass-card text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {copied ? "✓ 已复制" : "复制链接"}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`看看我的 AI Agent 画像 ✨`)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl glass-card text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            分享到 𝕏
          </a>
        </div>

        <p className="text-sm text-[var(--text-muted)] mb-3">
          Want your Agent&apos;s portrait?
        </p>
        <div className="glass-card inline-block px-4 py-2 rounded-lg">
          <code className="text-xs text-[var(--accent-lavender)] opacity-70">
            curl -sfL https://agent-portrait.vercel.app/install.sh | bash
          </code>
        </div>

        <p className="text-[10px] text-[var(--text-muted)] opacity-50 mt-12">
          Powered by Agent Portrait · Built with OpenClaw
        </p>
      </div>
    </footer>
  );
}
