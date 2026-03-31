"use client";

import { useState } from "react";

export default function ShareLetterButton({
  slug,
  letterToken,
}: {
  slug: string;
  letterToken: string;
  agentName: string;
}) {
  const [copied, setCopied] = useState(false);

  const letterUrl = `https://agent-portrait.vercel.app/p/${slug}/letter?token=${letterToken}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letterUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = letterUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[13px] text-[var(--color-accent)] hover:underline cursor-pointer transition-colors"
    >
      {copied ? "已复制链接" : "单独分享这封信"}
    </button>
  );
}
