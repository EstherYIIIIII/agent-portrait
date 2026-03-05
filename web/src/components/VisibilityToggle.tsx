"use client";

import { useState } from "react";
import { Visibility } from "@/lib/types";

export default function VisibilityToggle({
  slug,
  initialVisibility,
}: {
  slug: string;
  initialVisibility: Visibility;
}) {
  const [visibility, setVisibility] = useState(initialVisibility);
  const [showInput, setShowInput] = useState(false);
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPublic = visibility.profile === "public";

  const handleToggle = async () => {
    if (!showInput) {
      setShowInput(true);
      setError("");
      return;
    }

    if (!secret.trim()) {
      setError("请输入 secret");
      return;
    }

    setLoading(true);
    setError("");

    const newVisibility: Visibility = isPublic
      ? { profile: "private", about_human: "private" }
      : { profile: "public", about_human: "public" };

    try {
      const res = await fetch("/api/portrait/visibility", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, secret: secret.trim(), visibility: newVisibility }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error === "unauthorized" ? "Secret 不正确" : "操作失败");
        return;
      }

      setVisibility(newVisibility);
      setShowInput(false);
      setSecret("");
    } catch {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <button
        onClick={handleToggle}
        disabled={loading}
        className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer disabled:opacity-50"
      >
        {isPublic ? "🔓 公开中" : "🔒 仅自己可见"}
      </button>

      {showInput && (
        <div className="flex items-center gap-2">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleToggle()}
            placeholder="输入 secret"
            className="px-3 py-1.5 text-xs rounded-lg bg-[var(--color-card-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] outline-none focus:border-[var(--color-accent)] w-40"
            autoFocus
          />
          <button
            onClick={handleToggle}
            disabled={loading}
            className="px-3 py-1.5 text-xs rounded-lg bg-[var(--color-accent)] text-white cursor-pointer disabled:opacity-50"
          >
            {loading ? "..." : "确认"}
          </button>
          <button
            onClick={() => { setShowInput(false); setError(""); setSecret(""); }}
            className="text-xs text-[var(--color-text-muted)] cursor-pointer"
          >
            取消
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
