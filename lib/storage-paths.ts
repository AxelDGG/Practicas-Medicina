// Server-only helpers — used by /api routes to read/write JSON storage.
import path from "path";
import { promises as fs } from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
export const OVERRIDES_PATH = path.join(DATA_DIR, "overrides.json");
export const USELESS_PATH = path.join(DATA_DIR, "useless-reports.json");
export const LOG_PATH = path.join(DATA_DIR, "corrections-log.json");

export async function readJSON<T>(p: string, fallback: T): Promise<T> {
  try {
    const txt = await fs.readFile(p, "utf-8");
    return JSON.parse(txt) as T;
  } catch {
    return fallback;
  }
}

export async function writeJSON(p: string, data: unknown) {
  await fs.writeFile(p, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
