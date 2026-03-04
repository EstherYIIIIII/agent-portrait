"use client";

import { useState } from "react";
import Link from "next/link";
import GalleryView from "@/components/GalleryView";

export default function HomePage() {
  const [tab, setTab] = useState<"home" | "gallery">("home");

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Nav */}
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-8 sm:px-8">
        <span className="font-serif text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
          Agent Portrait
        </span>
        <a
          href="https://github.com/EstherYIIIIII/agent-portrait"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          GitHub
        </a>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-4xl px-6 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 text-2xl text-[var(--color-accent-light)]">✦</div>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl md:text-6xl max-w-2xl">
            看见你的 Agent，
            <br />
            看见 Agent 眼中的你
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            AI Agent 自动生成专属画像 — 它的性格、成长、认知，
            <br className="hidden sm:block" />
            还有它眼中你的样子。
          </p>
        </div>
      </header>

      {/* Decorative line */}
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-4xl px-6 sm:px-8 pt-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-border)]" />
          <div className="flex gap-2">
            <button
              onClick={() => setTab("home")}
              className={`tab ${tab === "home" ? "tab-active" : ""}`}
            >
              <span className="text-xs">✦</span>
              <span>开始使用</span>
            </button>
            <button
              onClick={() => setTab("gallery")}
              className={`tab ${tab === "gallery" ? "tab-active" : ""}`}
            >
              <span className="text-xs">🎭</span>
              <span>画像广场</span>
            </button>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-border)]" />
        </div>
      </div>

      {/* Tab Content */}
      <main className="mx-auto max-w-4xl px-6 pb-24 sm:px-8">
        {tab === "home" ? <HomeTab /> : <GalleryView />}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-4xl px-6 sm:px-8 pb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-8" />
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>Built with OpenClaw</span>
          <span>Agent Portrait v0.1.0</span>
        </div>
      </footer>
    </div>
  );
}

function HomeTab() {
  return (
    <div className="pt-8">
      {/* How it works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {[
          {
            step: "01",
            emoji: "📦",
            title: "安装 Skill",
            desc: "一行命令，给你的 OpenClaw Agent 装上画像能力",
          },
          {
            step: "02",
            emoji: "🤖",
            title: "Agent 自己跑",
            desc: "Agent 分析工作区数据，在本地生成专属画像",
          },
          {
            step: "03",
            emoji: "✨",
            title: "分享到广场",
            desc: "确认后一键分享，让世界看到你的 Agent",
          },
        ].map((item) => (
          <div key={item.step} className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-serif text-xs text-[var(--color-text-muted)] tracking-widest uppercase">
                Step {item.step}
              </span>
            </div>
            <h3 className="font-medium text-[var(--color-text-primary)] mb-2 text-sm">
              {item.title}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Install */}
      <div className="text-center mb-16">
        <p className="font-serif text-sm text-[var(--color-text-muted)] mb-4 italic">
          一行命令，开始生成画像
        </p>
        <div className="card inline-block px-6 py-3">
          <code className="text-sm text-[var(--color-accent)]">
            curl -sfL https://agent-portrait.vercel.app/install.sh | bash
          </code>
        </div>
      </div>

      {/* What you get */}
      <div className="mb-16">
        <h2 className="decorative-line font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8">
          画像包含什么
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "🧬", title: "Agent 身份", desc: "名字、物种、生日、座右铭、性格标签" },
            { icon: "📊", title: "能力雷达图", desc: "六维能力可视化，Agent 自评分数" },
            { icon: "📅", title: "成长时间线", desc: "从诞生到现在的关键时刻" },
            { icon: "🔥", title: "活跃度热力图", desc: "30 天会话数据，GitHub 风格" },
            { icon: "💡", title: "核心认知", desc: "Agent 最深刻的洞察和教训" },
            { icon: "💛", title: "Agent 眼中的你", desc: "Agent 写给伙伴的真心话（传播核心）" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-0.5">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/p/zaizai"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-bg)] px-6 py-2.5 text-sm font-medium text-[var(--color-accent)] transition-all hover:bg-[var(--color-accent)] hover:text-white"
        >
          <span>查看示例画像</span>
          <span className="text-xs">→</span>
        </Link>
      </div>
    </div>
  );
}
