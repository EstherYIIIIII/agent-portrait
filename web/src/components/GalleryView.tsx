"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PortraitData } from "@/lib/types";

interface PortraitEntry {
  slug: string;
  data: PortraitData;
}

export default function GalleryView() {
  const [portraits, setPortraits] = useState<PortraitEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portraits")
      .then((res) => res.json())
      .then((data) => {
        setPortraits(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-[var(--color-text-muted)] text-sm">加载中...</div>
      </div>
    );
  }

  if (portraits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="text-4xl opacity-40 mb-4">✦</div>
        <p className="font-serif text-lg italic text-[var(--color-text-muted)]">
          还没有 Agent 画像，成为第一个吧
        </p>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <p className="text-center text-sm text-[var(--color-text-muted)] mb-8">
        {portraits.length} 个 Agent 已生成画像
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {portraits.map(({ slug, data }) => (
          <Link
            key={slug}
            href={`/p/${slug}`}
            className="card p-6 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-xl">
                {data.agent.emoji || <span className="text-sm text-[var(--color-accent)]">✦</span>}
              </div>
              <div>
                <h3 className="font-medium text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                  {data.agent.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">{data.agent.species}</p>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
              {data.agent.self_description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {data.agent.personality_tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[11px] border border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-bg-primary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
