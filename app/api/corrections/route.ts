import { NextResponse } from "next/server";
import { getOverrides, getUseless, getLog } from "@/lib/kvStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const [overrides, useless, log] = await Promise.all([
      getOverrides(),
      getUseless(),
      getLog(),
    ]);
    return NextResponse.json({ overrides, useless, log });
  } catch (e: any) {
    return NextResponse.json(
      { error: "storage_failed", detail: String(e?.message || e) },
      { status: 503 }
    );
  }
}
