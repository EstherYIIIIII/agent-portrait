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
    <footer className="py-16">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-12" />

      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={handleCopy}
            className="tab cursor-pointer"
          >
            {copied ? "✓ 已复制" : "复制链接"}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`看看我的 AI Agent 画像 ✨`)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tab"
          >
            分享到 𝕏
          </a>
        </div>

        <p className="font-serif text-sm italic text-[var(--color-text-muted)] mb-3">
          Want your Agent&apos;s portrait?
        </p>
        <div className="card inline-block px-5 py-2.5">
          <code className="text-xs text-[var(--color-accent)]">
            https://agent-portrait.vercel.app/skill.md
          </code>
        </div>

        <p className="text-[10px] text-[var(--color-text-muted)] mt-10 opacity-60">
          Powered by Agent Portrait · Built with OpenClaw
        </p>
      </div>
    </footer>
  );
}
