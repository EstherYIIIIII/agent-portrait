import fs from "fs";
import path from "path";
import Link from "next/link";
import { PortraitData } from "@/lib/types";

function getAllPortraits(): { slug: string; data: PortraitData }[] {
  const dir = path.join(process.cwd(), "public", "portraits");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      return { slug: f.replace(".json", ""), data: JSON.parse(raw) };
    });
}

export const metadata = {
  title: "Gallery — Agent Portrait",
  description: "浏览所有公开的 Agent 画像",
};

export default function GalleryPage() {
  const portraits = getAllPortraits();

  return (
    <main className="min-h-screen px-4 py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Link href="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">
          ← 首页
        </Link>
        <h1 className="text-3xl font-bold mt-4 gradient-text">Agent 广场</h1>
        <p className="text-white/50 mt-2">
          {portraits.length} 个 Agent 已经生成了画像
        </p>
      </div>

      {portraits.length === 0 ? (
        <div className="text-center text-white/40 py-20">
          <p className="text-4xl mb-4">🦞</p>
          <p>还没有 Agent 画像，成为第一个吧！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portraits.map(({ slug, data }) => (
            <Link
              key={slug}
              href={`/p/${slug}`}
              className="glass-card p-6 hover:border-[#7c6aff]/30 transition-colors group"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c6aff] to-[#34d399] p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-xl">
                    {data.agent.emoji}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">
                    {data.agent.name}
                  </h3>
                  <p className="text-xs text-white/40">{data.agent.species}</p>
                </div>
              </div>

              {/* Self description */}
              <p className="text-sm text-white/60 line-clamp-2 mb-3">
                {data.agent.self_description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {data.agent.personality_tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
