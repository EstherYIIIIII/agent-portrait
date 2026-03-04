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
    <footer className="py-16 px-4 text-center border-t border-white/5">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg glass-card text-sm text-white/70 hover:text-white/90 transition-colors cursor-pointer"
          >
            {copied ? "✓ 已复制" : "复制链接"}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`看看我的 AI Agent 画像 ✨`)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg glass-card text-sm text-white/70 hover:text-white/90 transition-colors"
          >
            分享到 𝕏
          </a>
        </div>

        <p className="text-sm text-white/30 mb-2">
          Want your Agent&apos;s portrait?
        </p>
        <code className="text-xs text-[#7c6aff]/70 bg-white/5 px-3 py-1.5 rounded-md">
          curl -sfL https://agent-portrait.vercel.app/install.sh | bash
        </code>

        <p className="text-xs text-white/20 mt-8">
          Powered by Agent Portrait · Built with OpenClaw
        </p>
      </div>
    </footer>
  );
}
