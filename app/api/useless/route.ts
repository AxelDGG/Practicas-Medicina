import { NextResponse } from "next/server";
import {
  LOG_PATH,
  USELESS_PATH,
  readJSON,
  writeJSON,
} from "@/lib/storage-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type UselessReport = {
  reporter: string;
  reason: string;
  ts: number;
};

type UselessStore = {
  byQuestion: Record<string, UselessReport[]>;
};

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

  if (!questionId) return NextResponse.json({ error: "missing_questionId" }, { status: 400 });
  if (reason.length < 5) return NextResponse.json({ error: "reason_too_short" }, { status: 400 });
  if (reporter.length < 2) return NextResponse.json({ error: "reporter_required" }, { status: 400 });

  const store = await readJSON<UselessStore>(USELESS_PATH, { byQuestion: {} });
  if (!store.byQuestion) store.byQuestion = {};
  const list = (store.byQuestion[questionId] ||= []);
  // Allow at most one report per (reporter, question) — overwrite reason if reported again.
  const existing = list.findIndex((r) => r.reporter.toLowerCase() === reporter.toLowerCase());
  const entry: UselessReport = { reporter, reason, ts: Date.now() };
  if (existing >= 0) list[existing] = entry;
  else list.push(entry);
  await writeJSON(USELESS_PATH, store);

  const log = await readJSON<any[]>(LOG_PATH, []);
  log.push({ ...entry, questionId, kind: "useless", count: list.length });
  await writeJSON(LOG_PATH, log);

  return NextResponse.json({
    ok: true,
    count: list.length,
    disabled: list.length >= DISABLE_THRESHOLD,
  });
}
