import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
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
