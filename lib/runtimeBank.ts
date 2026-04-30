// Runtime overlay: applies user-submitted corrections and disables flagged
// questions on top of the static bank. Both JSON files live in /data and are
// reloaded by Next.js on change in dev mode.
import overridesData from "@/data/overrides.json";
import uselessData from "@/data/useless-reports.json";
import type { Question } from "@/data/types";

type OverrideEntry = {
  answerIndex: number;
  reason: string;
  reporter: string;
  appliedAt: number;
};

type UselessReport = {
  reporter: string;
  reason: string;
  ts: number;
};

const overrides = overridesData as Record<string, OverrideEntry>;
const useless = uselessData as { byQuestion: Record<string, UselessReport[]> };

export const DISABLE_THRESHOLD = 2;

export function isDisabled(id: string): boolean {
  const reports = useless.byQuestion?.[id];
  return Array.isArray(reports) && reports.length >= DISABLE_THRESHOLD;
}

export function applyOverride(q: Question): Question {
  const o = overrides[q.id];
  if (o && Number.isInteger(o.answerIndex) && o.answerIndex >= 0 && o.answerIndex <= 3) {
    return { ...q, answerIndex: o.answerIndex };
  }
  return q;
}

export function prepareQuestions(qs: Question[]): Question[] {
  const out: Question[] = [];
  for (const q of qs) {
    if (isDisabled(q.id)) continue;
    out.push(applyOverride(q));
  }
  return out;
}

export function getOverrideMeta(id: string): OverrideEntry | undefined {
  return overrides[id];
}

export function getUselessReports(id: string): UselessReport[] {
  return useless.byQuestion?.[id] ?? [];
}
