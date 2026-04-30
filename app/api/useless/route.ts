import { NextResponse } from "next/server";
import {
  getUseless,
  setUseless,
  getLog,
  setLog,
  type UselessReport,
} from "@/lib/kvStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DISABLE_THRESHOLD = 2;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const questionId = String(body?.questionId || "").trim();
  const reason = String(body?.reason || "").trim();
  const reporter = String(body?.reporter || "").trim();

  if (!questionId)
    return NextResponse.json({ error: "missing_questionId" }, { status: 400 });
  if (reason.length < 5)
    return NextResponse.json({ error: "reason_too_short" }, { status: 400 });
  if (reporter.length < 2)
    return NextResponse.json({ error: "reporter_required" }, { status: 400 });

  try {
    const store = await getUseless();
    if (!store.byQuestion) store.byQuestion = {};
    const list = (store.byQuestion[questionId] ||= []);
    const existing = list.findIndex(
      (r) => r.reporter.toLowerCase() === reporter.toLowerCase()
    );
    const entry: UselessReport = { reporter, reason, ts: Date.now() };
    if (existing >= 0) list[existing] = entry;
    else list.push(entry);
    await setUseless(store);

    const log = await getLog();
    log.push({ ...entry, questionId, kind: "useless", count: list.length });
    await setLog(log);

    return NextResponse.json({
      ok: true,
      count: list.length,
      disabled: list.length >= DISABLE_THRESHOLD,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "storage_failed", detail: String(e?.message || e) },
      { status: 503 }
    );
  }
}
