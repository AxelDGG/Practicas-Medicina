import { NextResponse } from "next/server";
import {
  LOG_PATH,
  OVERRIDES_PATH,
  USELESS_PATH,
  readJSON,
} from "@/lib/storage-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const [overrides, useless, log] = await Promise.all([
    readJSON(OVERRIDES_PATH, {}),
    readJSON<{ byQuestion: Record<string, any[]> }>(USELESS_PATH, { byQuestion: {} }),
    readJSON<any[]>(LOG_PATH, []),
  ]);
  return NextResponse.json({ overrides, useless, log });
}
