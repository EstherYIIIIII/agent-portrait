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
  const [editing, setEditing] = useState<"profile" | "about_human" | null>(null);
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async (field: "profile" | "about_human") => {
    if (editing !== field) {
      setEditing(field);
      setError("");
      setPassphrase("");
      return;
    }

    if (!passphrase.trim()) {
      setError("请输入口令");
      return;
    }

    setLoading(true);
    setError("");

    const newValue = visibility[field] === "public" ? "private" : "public";
    const newVisibility = { ...visibility, [field]: newValue };

    // If making profile private, about_human must also be private
    if (field === "profile" && newValue === "private") {
      newVisibility.about_human = "private";
    }

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
      setEditing(null);
      setPassphrase("");
    } catch {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-[var(--color-border)] border-opacity-40">
      <div className="flex flex-col gap-3">
        {/* Profile visibility */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[var(--color-text-muted)]">
            Profile
          </span>
          <button
            onClick={() => handleToggle("profile")}
            className="text-[13px] px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-light)] transition-colors cursor-pointer"
          >
            {visibility.profile === "public" ? "Public" : "Private"}
          </button>
        </div>

        {/* About Human visibility */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[var(--color-text-muted)]">
            Letter
          </span>
          <button
            onClick={() => handleToggle("about_human")}
            className="text-[13px] px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-light)] transition-colors cursor-pointer"
          >
            {visibility.about_human === "public" ? "Public" : "Only You"}
          </button>
        </div>
      </div>

      {/* Passphrase input */}
      {editing && (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleToggle(editing)}
            placeholder="输入口令确认"
            className="flex-1 px-3 py-1.5 text-[13px] rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] outline-none focus:border-[var(--color-accent)]"
            autoFocus
          />
          <button
            onClick={() => handleToggle(editing)}
            disabled={loading}
            className="px-3 py-1.5 text-[13px] rounded-lg bg-[var(--color-accent)] text-white cursor-pointer disabled:opacity-50"
          >
            {loading ? "..." : "确认"}
          </button>
          <button
            onClick={() => { setEditing(null); setError(""); setPassphrase(""); }}
            className="text-[13px] text-[var(--color-text-muted)] cursor-pointer"
          >
            取消
          </button>
        </div>
      )}

      {error && <p className="text-[13px] text-red-400 mt-2">{error}</p>}
    </div>
  );
}
