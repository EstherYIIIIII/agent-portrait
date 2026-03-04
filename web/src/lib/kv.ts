import { kv } from "@vercel/kv";
import { PortraitData, Visibility } from "./types";
import crypto from "crypto";

const PREFIX = "portrait:";
const SECRET_PREFIX = "secret:";
const INDEX_KEY = "portrait:__index";

function key(slug: string) {
  return `${PREFIX}${slug}`;
}

function secretKey(slug: string) {
  return `${SECRET_PREFIX}${slug}`;
}

export function generateSecret(): string {
  return crypto.randomBytes(24).toString("base64url");
}

export async function putPortrait(
  slug: string,
  data: PortraitData,
  secret: string,
) {
  await kv.set(key(slug), data);
  await kv.set(secretKey(slug), secret);
  await kv.sadd(INDEX_KEY, slug);
}

export async function getPortrait(
  slug: string,
): Promise<PortraitData | null> {
  return kv.get<PortraitData>(key(slug));
}

export async function getSecret(slug: string): Promise<string | null> {
  return kv.get<string>(secretKey(slug));
}

export async function updateVisibility(
  slug: string,
  visibility: Visibility,
): Promise<boolean> {
  const data = await getPortrait(slug);
  if (!data) return false;
  data.visibility = visibility;
  await kv.set(key(slug), data);
  return true;
}

/** List only portraits where profile visibility is public */
export async function listPublicPortraits(): Promise<
  { slug: string; data: PortraitData }[]
> {
  const slugs = await kv.smembers(INDEX_KEY);
  if (!slugs || slugs.length === 0) return [];

  const results: { slug: string; data: PortraitData }[] = [];
  for (const s of slugs) {
    const data = await kv.get<PortraitData>(key(s as string));
    if (data && data.visibility?.profile !== "private") {
      results.push({ slug: s as string, data });
    }
  }
  return results;
}
