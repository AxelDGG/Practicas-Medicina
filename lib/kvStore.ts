// Storage abstraction: Vercel KV in production, local JSON files in dev.
// Falls back to fs only when KV env vars are missing (so `npm run dev`
// without a KV binding keeps working). On Vercel, set up KV via
// Project → Storage → Connect a database; env vars are auto-injected.
import { promises as fs } from "fs";
import path from "path";
import { kv } from "@vercel/kv";

export const KEYS = {
  overrides: "pm:overrides",
  useless: "pm:useless",
  log: "pm:corrections-log",
} as const;

const JSON_FALLBACK_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILES: Record<string, string> = {
  [KEYS.overrides]: "overrides.json",
  [KEYS.useless]: "useless-reports.json",
  [KEYS.log]: "corrections-log.json",
};

function kvAvailable(): boolean {
  return !!(
    process.env.KV_REST_API_URL ||
    process.env.KV_URL ||
    process.env.UPSTASH_REDIS_REST_URL
  );
}

export type OverrideEntry = {
  questionId: string;
  answerIndex: number;
  reason: string;
  reporter: string;
  appliedAt: number;
};

export type UselessReport = {
  reporter: string;
  reason: string;
  ts: number;
};

export type UselessStore = {
  byQuestion: Record<string, UselessReport[]>;
};

export type LogEntry =
  | (OverrideEntry & { kind: "correction"; previousAnswerIndex?: number })
  | (UselessReport & { kind: "useless"; questionId: string; count: number });

async function fsRead<T>(key: string, fallback: T): Promise<T> {
  const file = FALLBACK_FILES[key];
  if (!file) return fallback;
  try {
    const txt = await fs.readFile(path.join(JSON_FALLBACK_DIR, file), "utf-8");
    return JSON.parse(txt) as T;
  } catch {
    return fallback;
  }
}

async function fsWrite<T>(key: string, value: T) {
  const file = FALLBACK_FILES[key];
  if (!file) return;
  try {
    await fs.writeFile(
      path.join(JSON_FALLBACK_DIR, file),
      JSON.stringify(value, null, 2) + "\n",
      "utf-8"
    );
  } catch {
    // On Vercel without KV: filesystem is read-only and write will throw.
    // Swallow — the API will surface a clearer error if needed.
  }
}

export async function getStore<T>(key: string, fallback: T): Promise<T> {
  if (kvAvailable()) {
    const val = (await kv.get<T>(key)) as T | null;
    return val ?? fallback;
  }
  return fsRead(key, fallback);
}

export async function setStore<T>(key: string, value: T): Promise<void> {
  if (kvAvailable()) {
    await kv.set(key, value);
    return;
  }
  await fsWrite(key, value);
}

export async function getOverrides(): Promise<Record<string, OverrideEntry>> {
  return getStore(KEYS.overrides, {} as Record<string, OverrideEntry>);
}
export async function setOverrides(o: Record<string, OverrideEntry>) {
  return setStore(KEYS.overrides, o);
}

export async function getUseless(): Promise<UselessStore> {
  return getStore(KEYS.useless, { byQuestion: {} } as UselessStore);
}
export async function setUseless(u: UselessStore) {
  return setStore(KEYS.useless, u);
}

export async function getLog(): Promise<LogEntry[]> {
  return getStore(KEYS.log, [] as LogEntry[]);
}
export async function setLog(l: LogEntry[]) {
  return setStore(KEYS.log, l);
}
