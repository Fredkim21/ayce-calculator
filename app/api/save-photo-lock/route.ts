import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "ayce-data.json");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { itemId, photoLock, photoUrl, keywords } = body;

  if (!itemId) return NextResponse.json({ error: "missing itemId" }, { status: 400 });

  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const data = JSON.parse(raw);

  let found = false;
  for (const section of Object.values(data) as any[]) {
    for (const cat of section.categories) {
      for (const item of cat.items) {
        if (item.id === itemId) {
          if (typeof photoLock === "number") item.photoLock = photoLock;
          if (typeof photoUrl === "string") item.photoUrl = photoUrl;
          if (photoUrl === null) delete item.photoUrl;
          if (typeof keywords === "string") item.image = keywords;
          found = true;
        }
      }
    }
  }

  if (!found) return NextResponse.json({ error: "item not found" }, { status: 404 });

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json({ ok: true });
}
