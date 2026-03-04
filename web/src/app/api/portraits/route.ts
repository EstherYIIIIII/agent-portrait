import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { listPublicPortraits } from "@/lib/kv";

export async function GET() {
  // Try KV first
  try {
    const portraits = await listPublicPortraits();
    if (portraits.length > 0) {
      return NextResponse.json(portraits);
    }
  } catch {
    // KV not configured — fall through to filesystem
  }

  // Fallback: filesystem (local dev)
  const dir = path.join(process.cwd(), "public", "portraits");
  if (!fs.existsSync(dir)) {
    return NextResponse.json([]);
  }

  const portraits = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      return { slug: f.replace(".json", ""), data: JSON.parse(raw) };
    });

  return NextResponse.json(portraits);
}
