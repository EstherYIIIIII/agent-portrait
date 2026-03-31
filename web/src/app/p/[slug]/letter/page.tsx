import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { LetterData } from "@/lib/types";
import {
  getPortrait as getFromKV,
  getSecret,
  getLetter as getLetterFromKV,
  getLetterToken,
} from "@/lib/kv";
import AboutHuman from "@/components/AboutHuman";
import Link from "next/link";

async function getLetter(slug: string): Promise<LetterData | null> {
  try {
    const letter = await getLetterFromKV(slug);
    if (letter) return letter;
  } catch {
    // KV not configured
  }

  const filePath = path.join(process.cwd(), "public", "portraits", `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    if (data.about_human) {
      return { about_human: data.about_human, visibility: "private" };
    }
  } catch {
    // ignore
  }
  return null;
}

async function getAgentName(slug: string): Promise<string> {
  try {
    const portrait = await getFromKV(slug);
    if (portrait) return portrait.agent.name;
  } catch {
    // KV not configured
  }

  const filePath = path.join(process.cwd(), "public", "portraits", `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw).agent?.name ?? slug;
  } catch {
    return slug;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agentName = await getAgentName(slug);
  return {
    title: `${agentName} 写给你的信 — Agent Portrait`,
    description: `一封来自 ${agentName} 的信`,
  };
}

export default async function LetterPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const [letter, agentName, storedSecret, storedToken] = await Promise.all([
    getLetter(slug),
    getAgentName(slug),
    getSecret(slug).catch(() => null),
    getLetterToken(slug).catch(() => null),
  ]);

  if (!letter) notFound();

  // Access control
  const urlSecret = typeof query.secret === "string" ? query.secret : undefined;
  const urlToken = typeof query.token === "string" ? query.token : undefined;
  const isOwner = !!(urlSecret && storedSecret && urlSecret === storedSecret);

  let canView = false;
  if (letter.visibility === "public") {
    canView = true;
  } else if (letter.visibility === "link-only") {
    canView = isOwner || !!(urlToken && storedToken && urlToken === storedToken);
  } else {
    canView = isOwner;
  }

  if (!canView) {
    return (
      <main className="mx-auto max-w-[680px] px-6 sm:px-8 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-[24px] text-[var(--color-text-primary)] mb-3">
            这封信暂时不能查看
          </p>
          <p className="text-[14px] text-[var(--color-text-muted)] mb-8">
            这是一封私密的信，需要分享链接才能阅读
          </p>
          <Link
            href={`/p/${slug}`}
            className="text-[14px] text-[var(--color-accent)] hover:underline"
          >
            ← 查看 {agentName} 的画像
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[680px] px-6 sm:px-8 pb-12">
      <div className="about-human-bg -mx-6 sm:-mx-8 px-6 sm:px-8 min-h-screen">
        <div className="pt-12">
          <AboutHuman data={letter.about_human} agentName={agentName} />
        </div>

        <div className="pb-12 text-center">
          <Link
            href={`/p/${slug}`}
            className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            ← 查看 {agentName} 的完整画像
          </Link>
        </div>
      </div>
    </main>
  );
}
