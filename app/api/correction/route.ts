import { NextResponse } from "next/server";
import {
  getOverrides,
  setOverrides,
  getLog,
  setLog,
  type OverrideEntry,
  type LogEntry,
} from "@/lib/kvStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

  if (!questionId)
    return NextResponse.json({ error: "missing_questionId" }, { status: 400 });
  if (
    !Number.isInteger(suggestedAnswerIndex) ||
    suggestedAnswerIndex < 0 ||
    suggestedAnswerIndex > 3
  )
    return NextResponse.json({ error: "invalid_answer_index" }, { status: 400 });
  if (reason.length < 5)
    return NextResponse.json({ error: "reason_too_short" }, { status: 400 });
  if (reporter.length < 2)
    return NextResponse.json({ error: "reporter_required" }, { status: 400 });

  try {
    const overrides = await getOverrides();
    const entry: OverrideEntry = {
      questionId,
      answerIndex: suggestedAnswerIndex,
      reason,
      reporter,
      appliedAt: Date.now(),
    };
    overrides[questionId] = entry;
    await setOverrides(overrides);

    const log = await getLog();
    const logEntry: LogEntry = { ...entry, kind: "correction", previousAnswerIndex };
    log.push(logEntry);
    await setLog(log);

    return NextResponse.json({ ok: true, override: entry });
  } catch (e: any) {
    return NextResponse.json(
      { error: "storage_failed", detail: String(e?.message || e) },
      { status: 503 }
    );
  }
}
