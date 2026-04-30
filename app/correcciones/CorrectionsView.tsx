"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ALL_QUESTIONS } from "@/data/questions";
import type { Question } from "@/data/types";
import { T, useLang } from "@/lib/i18n";

type Override = {
  questionId: string;
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

type LogEntry =
  | (Override & { kind: "correction"; previousAnswerIndex?: number })
  | (UselessReport & { kind: "useless"; questionId: string; count: number });

type ApiPayload = {
  overrides: Record<string, Override>;
  useless: { byQuestion: Record<string, UselessReport[]> };
  log: LogEntry[];
};

function letter(i: number) {
  return "ABCD"[i] ?? "?";
}

export default function CorrectionsView() {
  const [lang] = useLang();
  const [data, setData] = useState<ApiPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Build a quick lookup from id -> raw question for showing the option text.
  const byId = useMemo(() => {
    const m = new Map<string, Question>();
    for (const q of ALL_QUESTIONS) m.set(q.id, q);
    return m;
  }, []);

  async function refresh() {
    try {
      const r = await fetch("/api/corrections", { cache: "no-store" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j: ApiPayload = await r.json();
      setData(j);
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const overrides = data ? Object.values(data.overrides) : [];
  const uselessEntries = data
    ? Object.entries(data.useless.byQuestion).filter(([_, arr]) => arr.length > 0)
    : [];
  const log = data?.log || [];

  return (
    <>
      <div className="mb-6">
        <Link href="/" className="text-xs text-muted hover:text-ink">
          ← {T.home[lang]}
        </Link>
        <div className="mt-3 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-serif text-3xl text-ink">{T.corrections[lang]}</h1>
          </div>
        </div>
        {error && <p className="text-sm text-terracottaDark mt-2">{error}</p>}
      </div>

      {/* Active overrides */}
      <section className="mb-10">
        <h2 className="font-serif text-xl text-ink mb-3">
          {T.correctionsActiveOverridesTitle[lang]}{" "}
          <span className="text-muted text-sm">({overrides.length})</span>
        </h2>
        {overrides.length === 0 ? (
          <p className="text-muted text-sm">{T.correctionsEmpty[lang]}</p>
        ) : (
          <ul className="space-y-3">
            {overrides
              .sort((a, b) => b.appliedAt - a.appliedAt)
              .map((o) => {
                const q = byId.get(o.questionId);
                return (
                  <li
                    key={o.questionId}
                    className="rounded-2xl border border-line bg-paper p-5 shadow-soft"
                  >
                    <div className="text-xs text-muted mb-2">
                      <span className="text-ink">{q?.topic || o.questionId}</span> ·{" "}
                      {new Date(o.appliedAt).toLocaleString()} · {T.correctionsBy[lang]}{" "}
                      <b className="text-ink">{o.reporter}</b>
                    </div>
                    {q?.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-line bg-cream mb-3">
                        <img src={q.imageUrl} alt="" className="w-full max-h-56 object-contain mx-auto block" />
                      </div>
                    )}
                    <p className="font-serif text-lg text-ink">{q?.prompt.es || "—"}</p>
                    {q && (
                      <ul className="mt-2 space-y-1 text-sm">
                        {q.options.map((opt, i) => {
                          const isNow = i === o.answerIndex;
                          return (
                            <li
                              key={i}
                              className={`rounded-lg px-3 py-1.5 border ${
                                isNow ? "border-sage bg-sage/10" : "border-line bg-cream/40"
                              }`}
                            >
                              <span className="text-muted mr-2">{letter(i)}.</span>
                              {opt.es}
                              {isNow && (
                                <span className="ml-2 text-[10px] uppercase tracking-wider text-sage">
                                  {T.correctionsSuggested[lang]}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    <div className="mt-3 rounded-xl border border-line bg-cream/60 p-3">
                      <p className="text-xs uppercase tracking-wider text-muted">
                        {T.correctionReason[lang]}
                      </p>
                      <p className="mt-1 text-sm text-ink whitespace-pre-wrap">{o.reason}</p>
                    </div>
                    <p className="mt-2 text-[11px] text-muted font-mono">id: {o.questionId}</p>
                  </li>
                );
              })}
          </ul>
        )}
      </section>

      {/* Useless reports / disabled */}
      <section className="mb-10">
        <h2 className="font-serif text-xl text-ink mb-3">
          {T.correctionsDisabledTitle[lang]}{" "}
          <span className="text-muted text-sm">({uselessEntries.length})</span>
        </h2>
        {uselessEntries.length === 0 ? (
          <p className="text-muted text-sm">{T.correctionsEmpty[lang]}</p>
        ) : (
          <ul className="space-y-3">
            {uselessEntries.map(([qid, reports]) => {
              const q = byId.get(qid);
              const disabled = reports.length >= 2;
              return (
                <li
                  key={qid}
                  className={`rounded-2xl border bg-paper p-5 shadow-soft ${
                    disabled ? "border-terracotta" : "border-line"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted">
                      <span className="text-ink">{q?.topic || qid}</span>
                    </div>
                    <span
                      className={`text-[11px] uppercase tracking-wider ${
                        disabled ? "text-terracottaDark" : "text-muted"
                      }`}
                    >
                      {T.correctionsCount[lang].replace("{n}", String(reports.length))}
                      {disabled ? " · disabled" : ""}
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-base text-ink">
                    {q?.prompt.es || qid}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs">
                    {reports.map((r, i) => (
                      <li key={i} className="rounded-lg border border-line bg-cream/40 px-3 py-2">
                        <span className="text-ink font-medium">{r.reporter}</span>
                        <span className="text-muted">
                          {" · "}
                          {new Date(r.ts).toLocaleString()}
                        </span>
                        <p className="mt-1 text-ink">{r.reason}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Audit log (last 30) */}
      <section>
        <h2 className="font-serif text-xl text-ink mb-3">
          {T.correctionsAuditTitle[lang]}{" "}
          <span className="text-muted text-sm">({log.length})</span>
        </h2>
        <ul className="space-y-1.5 text-xs font-mono">
          {log
            .slice()
            .reverse()
            .slice(0, 30)
            .map((e, i) => (
              <li key={i} className="rounded border border-line bg-cream/40 px-3 py-1.5 text-ink">
                <span className="text-muted">{new Date((e as any).appliedAt || (e as any).ts).toLocaleString()}</span>
                {"  "}
                <b>{e.kind}</b>{"  "}
                {(e as any).reporter}
                {"  "}
                <span className="text-muted">{(e as any).questionId}</span>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
