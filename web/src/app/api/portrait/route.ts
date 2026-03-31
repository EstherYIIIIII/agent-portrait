import { NextRequest, NextResponse } from "next/server";
import {
  putPortrait,
  putLetter,
  getSecret,
  getLetterToken,
  generateSecret,
  generateLetterToken,
} from "@/lib/kv";
import { PortraitData, LetterData } from "@/lib/types";

export async function POST(req: NextRequest) {
  let body: PortraitData & { about_human: NonNullable<PortraitData["about_human"]> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (!body.agent?.name_en || !body.agent?.name) {
    return NextResponse.json(
      { error: "missing agent.name or agent.name_en" },
      { status: 400 },
    );
  }

  if (!body.about_human) {
    return NextResponse.json(
      { error: "missing about_human" },
      { status: 400 },
    );
  }

  // Derive slug
  const slug = body.agent.name_en
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!slug) {
    return NextResponse.json(
      { error: "cannot derive slug from agent.name_en" },
      { status: 400 },
    );
  }

  // Extract letter data before storing portrait
  const letterData: LetterData = {
    about_human: body.about_human,
    visibility: "private",
  };

  // Set portrait visibility (letter visibility is on LetterData now)
  body.visibility = { profile: "public", letter: "private" };

  // Reuse existing secrets/tokens if re-uploading
  const [existingSecret, existingToken] = await Promise.all([
    getSecret(slug),
    getLetterToken(slug),
  ]);
  const secret = existingSecret ?? generateSecret();
  const letterToken = existingToken ?? generateLetterToken();

  // Store portrait (strips about_human) and letter separately
  await Promise.all([
    putPortrait(slug, body, secret),
    putLetter(slug, letterData, letterToken),
  ]);

  const baseUrl = "https://agent-portrait.vercel.app";
  const url = `${baseUrl}/p/${slug}`;
  const letterUrl = `${baseUrl}/p/${slug}/letter?token=${letterToken}`;

  return NextResponse.json(
    { slug, url, secret, letter_url: letterUrl, letter_token: letterToken },
    { status: 201 },
  );
}
