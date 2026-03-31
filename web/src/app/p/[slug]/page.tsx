import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { PortraitData, LetterData } from "@/lib/types";
import {
  getPortrait as getFromKV,
  getSecret,
  getLetter as getLetterFromKV,
  getLetterToken,
} from "@/lib/kv";
import PortraitView from "./PortraitView";

async function getPortrait(slug: string): Promise<PortraitData | null> {
  try {
    const kv = await getFromKV(slug);
    if (kv) return kv;
  } catch {
    // KV not configured — fall through to filesystem
  }

  const filePath = path.join(process.cwd(), "public", "portraits", `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    // Strip about_human from portrait (letter is fetched separately)
    const { about_human: _, ...portraitOnly } = data;
    return portraitOnly;
  } catch {
    return null;
  }
}

async function getLetter(slug: string): Promise<LetterData | null> {
  try {
    const letter = await getLetterFromKV(slug);
    if (letter) return letter;
  } catch {
    // KV not configured — fall through to filesystem
  }

  // Filesystem fallback: read about_human from the full JSON
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPortrait(slug);
  if (!data) return { title: "Not Found" };
  return {
    title: `${data.agent.name} — Agent Portrait`,
    description: data.agent.self_description,
    openGraph: {
      title: data.agent.name,
      description: data.agent.motto,
    },
  };
}

export default async function PortraitPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const data = await getPortrait(slug);
  if (!data) notFound();

  // Fetch letter and auth info in parallel
  const [letter, storedSecret, storedToken] = await Promise.all([
    getLetter(slug),
    getSecret(slug).catch(() => null),
    getLetterToken(slug).catch(() => null),
  ]);

  // Determine owner
  const urlSecret = typeof query.secret === "string" ? query.secret : undefined;
  const isOwner = !!(urlSecret && storedSecret && urlSecret === storedSecret);

  // Determine letter visibility
  const urlToken = typeof query.token === "string" ? query.token : undefined;
  let canSeeLetter = false;
  if (letter) {
    if (letter.visibility === "public") {
      canSeeLetter = true;
    } else if (letter.visibility === "link-only") {
      canSeeLetter = isOwner || !!(urlToken && storedToken && urlToken === storedToken);
    } else {
      // private
      canSeeLetter = isOwner;
    }
  }

  return (
    <PortraitView
      data={data}
      slug={slug}
      isOwner={isOwner}
      letter={letter}
      canSeeLetter={canSeeLetter}
      letterToken={isOwner && storedToken ? storedToken : undefined}
    />
  );
}
