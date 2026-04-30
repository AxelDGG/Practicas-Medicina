// Storage abstraction:
//   - Production (Vercel + Marketplace Redis): uses node-redis. The integration
//     injects REDIS_URL automatically. Connection is reused across invocations.
//   - Local dev (no REDIS_URL): falls back to JSON files in /data so
//     `npm run dev` works without any setup.
import { promises as fs } from "fs";
import path from "path";
import { createClient, type RedisClientType } from "redis";

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

function redisUrl(): string | undefined {
  return (
    process.env.REDIS_URL ||
    process.env.REDIS_TLS_URL ||
    process.env.KV_URL // legacy Vercel KV that exposes redis://
  );
}

// Cache the client across serverless invocations within the same warm container.
let _client: RedisClientType | null = null;
let _connectPromise: Promise<RedisClientType> | null = null;

async function getClient(): Promise<RedisClientType> {
  const url = redisUrl();
  if (!url) throw new Error("no_redis_url");
  if (_client && _client.isOpen) return _client;
  if (!_connectPromise) {
    _connectPromise = (async () => {
      const c: RedisClientType = createClient({
        url,
        socket: { reconnectStrategy: false },
      });
      c.on("error", (err) => {
        // Log but don't crash; next call will try a new client.
        console.error("[redis] client error:", err?.message || err);
      });
      await c.connect();
      _client = c;
      return c;
    })().catch((e) => {
      _connectPromise = null;
      throw e;
    });
  }
  return _connectPromise;
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
    // Read-only filesystem (e.g. Vercel without Redis): swallow.
  }
}

export async function getStore<T>(key: string, fallback: T): Promise<T> {
  if (redisUrl()) {
    try {
      const c = await getClient();
      const raw = await c.get(key);
      if (raw == null) return fallback;
      return JSON.parse(raw) as T;
    } catch (e: any) {
      console.error("[redis] getStore failed, falling back to fs:", e?.message);
    }
  }
  return fsRead(key, fallback);
}

export async function setStore<T>(key: string, value: T): Promise<void> {
  if (redisUrl()) {
    const c = await getClient();
    await c.set(key, JSON.stringify(value));
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
