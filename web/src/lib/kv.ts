import { kv } from "@vercel/kv";
import { PortraitData, LetterData, LetterVisibility, Visibility } from "./types";
import crypto from "crypto";

const PREFIX = "portrait:";
const SECRET_PREFIX = "secret:";
const LETTER_PREFIX = "letter:";
const LETTER_TOKEN_PREFIX = "letter-token:";
const INDEX_KEY = "portrait:__index";

function key(slug: string) {
  return `${PREFIX}${slug}`;
}

function secretKey(slug: string) {
  return `${SECRET_PREFIX}${slug}`;
}

function letterKey(slug: string) {
  return `${LETTER_PREFIX}${slug}`;
}

function letterTokenKey(slug: string) {
  return `${LETTER_TOKEN_PREFIX}${slug}`;
}

export function generateSecret(): string {
  return crypto.randomBytes(24).toString("base64url");
}

export function generateLetterToken(): string {
  return crypto.randomBytes(24).toString("base64url");
}

export async function putPortrait(
  slug: string,
  data: PortraitData,
  secret: string,
) {
  // Strip about_human before storing — letter is stored separately
  const { about_human: _, ...portraitOnly } = data;
  await kv.set(key(slug), portraitOnly);
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

export async function putLetter(
  slug: string,
  data: LetterData,
  token: string,
) {
  await kv.set(letterKey(slug), data);
  await kv.set(letterTokenKey(slug), token);
}

export async function getLetter(
  slug: string,
): Promise<LetterData | null> {
  const letter = await kv.get<LetterData>(letterKey(slug));
  if (letter) return letter;

  // Backward compat: check if portrait still has inline about_human
  const portrait = await kv.get<PortraitData>(key(slug));
  if (portrait?.about_human) {
    return { about_human: portrait.about_human, visibility: "private" };
  }
  return null;
}

export async function getLetterToken(slug: string): Promise<string | null> {
  return kv.get<string>(letterTokenKey(slug));
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

export async function updateLetterVisibility(
  slug: string,
  visibility: LetterVisibility,
): Promise<boolean> {
  const letter = await kv.get<LetterData>(letterKey(slug));
  if (!letter) return false;
  letter.visibility = visibility;
  await kv.set(letterKey(slug), letter);
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
      // Safety: strip about_human even if legacy data has it inline
      delete data.about_human;
      results.push({ slug: s as string, data });
    }
  }
  return results;
}
