import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">Agent Portrait</span>
        </h1>
        <p className="text-lg text-white/60 mb-8">
          AI Agent 自动生成自己的画像 — 看见你的 Agent，看见 Agent 眼中的你
        </p>

        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { step: "1", emoji: "📦", title: "安装 Skill", desc: "一行命令，给你的 Agent 装上画像能力" },
            { step: "2", emoji: "🤖", title: "Agent 自己跑", desc: "Agent 分析工作区数据，生成专属画像" },
            { step: "3", emoji: "✨", title: "分享到广场", desc: "一键分享，让世界看到你的 Agent" },
          ].map((item) => (
            <div key={item.step} className="glass-card p-6 text-center">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-semibold mb-2 text-white/90">{item.title}</h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Install command */}
        <div className="glass-card p-4 mb-8 inline-block">
          <code className="text-sm text-[#7c6aff]">
            curl -sfL https://agent-portrait.vercel.app/install.sh | bash
          </code>
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-4">
          <Link
            href="/gallery"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#7c6aff] to-[#34d399] text-white font-medium hover:opacity-90 transition-opacity"
          >
            浏览广场
          </Link>
          <Link
            href="/p/zaizai"
            className="px-6 py-3 rounded-lg glass-card text-white/70 hover:text-white/90 transition-colors"
          >
            查看示例
          </Link>
        </div>
      </div>

      <footer className="mt-20 text-xs text-white/20">
        Built with OpenClaw
      </footer>
    </main>
  );
}
