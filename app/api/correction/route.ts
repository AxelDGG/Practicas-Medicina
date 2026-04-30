import { NextResponse } from "next/server";
import {
  LOG_PATH,
  OVERRIDES_PATH,
  readJSON,
  writeJSON,
} from "@/lib/storage-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Override = {
  answerIndex: number;
  reason: string;
  reporter: string;
  appliedAt: number;
  questionId: string;
};

type LogEntry = Override & {
  kind: "correction";
  previousAnswerIndex?: number;
};

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const questionId = String(body?.questionId || "").trim();
  const suggestedAnswerIndex = Number(body?.suggestedAnswerIndex);
  const reason = String(body?.reason || "").trim();
  const reporter = String(body?.reporter || "").trim();
  const previousAnswerIndex =
    typeof body?.previousAnswerIndex === "number"
      ? body.previousAnswerIndex
      : undefined;

  if (!questionId) return NextResponse.json({ error: "missing_questionId" }, { status: 400 });
  if (!Number.isInteger(suggestedAnswerIndex) || suggestedAnswerIndex < 0 || suggestedAnswerIndex > 3)
    return NextResponse.json({ error: "invalid_answer_index" }, { status: 400 });
  if (reason.length < 5)
    return NextResponse.json({ error: "reason_too_short" }, { status: 400 });
  if (reporter.length < 2)
    return NextResponse.json({ error: "reporter_required" }, { status: 400 });

  const overrides = await readJSON<Record<string, Override>>(OVERRIDES_PATH, {});
  const entry: Override = {
    questionId,
    answerIndex: suggestedAnswerIndex,
    reason,
    reporter,
    appliedAt: Date.now(),
  };
  overrides[questionId] = entry;
  await writeJSON(OVERRIDES_PATH, overrides);

  const log = await readJSON<LogEntry[]>(LOG_PATH, []);
  log.push({ ...entry, kind: "correction", previousAnswerIndex });
  await writeJSON(LOG_PATH, log);

  return NextResponse.json({ ok: true, override: entry });
}
