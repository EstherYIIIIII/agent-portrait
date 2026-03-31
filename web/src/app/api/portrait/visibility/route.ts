import { NextRequest, NextResponse } from "next/server";
import { getSecret, updateVisibility, updateLetterVisibility } from "@/lib/kv";
import { Visibility } from "@/lib/types";

/**
 * PATCH /api/portrait/visibility
 * Body: { slug, secret, visibility: { profile, letter } }
 */
export async function PATCH(req: NextRequest) {
  let body: { slug: string; secret: string; visibility: Visibility };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (!body.slug || !body.secret || !body.visibility) {
    return NextResponse.json(
      { error: "missing slug, secret, or visibility" },
      { status: 400 },
    );
  }

  const stored = await getSecret(body.slug);
  if (!stored || stored !== body.secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Constraint: profile private → letter must also be private
  if (body.visibility.profile === "private") {
    body.visibility.letter = "private";
  }

  const [portraitOk, letterOk] = await Promise.all([
    updateVisibility(body.slug, body.visibility),
    updateLetterVisibility(body.slug, body.visibility.letter),
  ]);

  if (!portraitOk) {
    return NextResponse.json({ error: "portrait not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, letterUpdated: letterOk });
}
