import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { PortraitData } from "@/lib/types";
import { getPortrait as getFromKV, getSecret } from "@/lib/kv";
import PortraitView from "./PortraitView";

async function getPortrait(slug: string): Promise<PortraitData | null> {
  // Try KV first
  try {
    const kv = await getFromKV(slug);
    if (kv) return kv;
  } catch {
    // KV not configured (local dev) — fall through to filesystem
  }

  // Fallback: filesystem (for existing portraits + local dev)
  const filePath = path.join(process.cwd(), "public", "portraits", `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
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

  // Compare secret from URL with stored secret to determine owner
  let isOwner = false;
  const urlSecret = typeof query.secret === "string" ? query.secret : undefined;
  if (urlSecret) {
    try {
      const storedSecret = await getSecret(slug);
      if (storedSecret && urlSecret === storedSecret) {
        isOwner = true;
      }
    } catch {
      // KV not available — treat as non-owner
    }
  }

  return <PortraitView data={data} slug={slug} isOwner={isOwner} />;
}
