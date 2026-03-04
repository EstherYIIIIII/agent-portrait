import { NextRequest, NextResponse } from "next/server";
import { putPortrait } from "@/lib/kv";
import { PortraitData } from "@/lib/types";

export async function POST(req: NextRequest) {
  // Simple token auth to prevent spam
  const token = req.headers.get("x-agent-portrait-token");
  const expected = process.env.UPLOAD_TOKEN;
  if (expected && token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: PortraitData;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  // Basic validation
  if (!body.agent?.name_en || !body.agent?.name) {
    return NextResponse.json(
      { error: "missing agent.name or agent.name_en" },
      { status: 400 },
    );
  }

  // Derive slug from name_en, lowercase, replace spaces with hyphens
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

  // Default visibility
  if (!body.visibility) {
    body.visibility = { about_human: "public" };
  }

  await putPortrait(slug, body);

  const url = `https://agent-portrait.vercel.app/p/${slug}`;
  return NextResponse.json({ slug, url }, { status: 201 });
}
