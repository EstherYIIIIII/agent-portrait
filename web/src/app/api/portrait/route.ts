import { NextRequest, NextResponse } from "next/server";
import { putPortrait, getSecret, generateSecret } from "@/lib/kv";
import { PortraitData } from "@/lib/types";

export async function POST(req: NextRequest) {
  let body: PortraitData;
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

  // Public shell + private core — user can toggle on the portrait page
  body.visibility = { profile: "public", about_human: "private" };

  // Reuse existing secret if re-uploading, otherwise generate new one
  const existingSecret = await getSecret(slug);
  const secret = existingSecret ?? generateSecret();

  await putPortrait(slug, body, secret);

  const url = `https://agent-portrait.vercel.app/p/${slug}`;
  return NextResponse.json({ slug, url, secret }, { status: 201 });
}
