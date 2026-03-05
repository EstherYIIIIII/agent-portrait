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
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPublic = visibility.profile === "public";

  const handleToggleClick = () => {
    setShowInput(true);
    setError("");
  };

  const handleConfirm = async () => {
    if (!passphrase.trim()) {
      setError("请输入口令");
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
        body: JSON.stringify({ slug, secret: passphrase.trim(), visibility: newVisibility }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error === "unauthorized" ? "口令不正确" : "操作失败");
        return;
      }

      setVisibility(newVisibility);
      setShowInput(false);
      setPassphrase("");
    } catch {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {/* Toggle switch */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-[var(--color-text-muted)]">
          {isPublic ? "公开中" : "仅自己可见"}
        </span>
        <button
          onClick={handleToggleClick}
          className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer"
          style={{
            backgroundColor: isPublic
              ? "var(--color-accent)"
              : "var(--color-border)",
          }}
          aria-label="切换公开状态"
        >
          <span
            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
            style={{
              transform: isPublic ? "translateX(20px)" : "translateX(0)",
            }}
          />
        </button>
      </div>

      {/* Passphrase input */}
      {showInput && (
        <div className="flex items-center gap-2 animate-in fade-in duration-200">
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
            placeholder="输入口令"
            className="px-3 py-1.5 text-xs rounded-lg bg-[var(--color-card-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] outline-none focus:border-[var(--color-accent)] w-36"
            autoFocus
          />
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-3 py-1.5 text-xs rounded-lg bg-[var(--color-accent)] text-white cursor-pointer disabled:opacity-50"
          >
            {loading ? "..." : "确认"}
          </button>
          <button
            onClick={() => { setShowInput(false); setError(""); setPassphrase(""); }}
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
