// Pure functions: apply user-submitted corrections and disable flagged
// questions. The data is passed in (read at request time from KV in production
// or from JSON files in local dev).
import type { Question } from "@/data/types";
import type { OverrideEntry, UselessStore } from "@/lib/kvStore";

export const DISABLE_THRESHOLD = 2;

export function isDisabled(id: string, useless: UselessStore): boolean {
  const reports = useless.byQuestion?.[id];
  return Array.isArray(reports) && reports.length >= DISABLE_THRESHOLD;
}

export function applyOverride(
  q: Question,
  overrides: Record<string, OverrideEntry>
): Question {
  const o = overrides[q.id];
  if (
    o &&
    Number.isInteger(o.answerIndex) &&
    o.answerIndex >= 0 &&
    o.answerIndex <= 3
  ) {
    return { ...q, answerIndex: o.answerIndex };
  }
  return q;
}

export function prepareQuestions(
  qs: Question[],
  overrides: Record<string, OverrideEntry>,
  useless: UselessStore
): Question[] {
  const out: Question[] = [];
  for (const q of qs) {
    if (isDisabled(q.id, useless)) continue;
    out.push(applyOverride(q, overrides));
  }
  return out;
}
