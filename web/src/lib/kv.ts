import { kv } from "@vercel/kv";
import { PortraitData } from "./types";

const PREFIX = "portrait:";
const INDEX_KEY = "portrait:__index";

function key(slug: string) {
  return `${PREFIX}${slug}`;
}

export async function putPortrait(slug: string, data: PortraitData) {
  await kv.set(key(slug), data);
  // Add slug to the index set
  await kv.sadd(INDEX_KEY, slug);
}

export async function getPortrait(slug: string): Promise<PortraitData | null> {
  return kv.get<PortraitData>(key(slug));
}

export async function listPortraits(): Promise<
  { slug: string; data: PortraitData }[]
> {
  const slugs = await kv.smembers(INDEX_KEY);
  if (!slugs || slugs.length === 0) return [];

  const results: { slug: string; data: PortraitData }[] = [];
  for (const s of slugs) {
    const data = await kv.get<PortraitData>(key(s as string));
    if (data) results.push({ slug: s as string, data });
  }
  return results;
}
