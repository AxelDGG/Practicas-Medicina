"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "@/data/types";
import { T, useLang } from "@/lib/i18n";

type Props = {
  question: Question;
  // options as currently displayed (after shuffle), with their original index
  displayedOptions: { text: { es: string; en: string }; isCorrect: boolean }[];
  onClose: () => void;
};

const REPORTER_KEY = "pm-reporter-name";

type Mode = "correction" | "useless";

export default function ReportCorrection({
  question,
  displayedOptions,
  onClose,
}: Props) {
  const [lang] = useLang();
  const [mode, setMode] = useState<Mode>("correction");
  const [picked, setPicked] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [reporter, setReporter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { kind: Mode; disabled?: boolean; count?: number }>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const r = localStorage.getItem(REPORTER_KEY);
      if (r) setReporter(r);
    } catch {}
  }, []);

  async function submit() {
    if (submitting) return;
    setError(null);
    if (reporter.trim().length < 2) {
      setError(T.errReporter[lang]);
      return;
    }
    if (reason.trim().length < 5) {
      setError(T.errReason[lang]);
      return;
    }

    try {
      localStorage.setItem(REPORTER_KEY, reporter.trim());
    } catch {}

    setSubmitting(true);
    try {
      if (mode === "correction") {
        if (picked === null) {
          setError(T.errPickRight[lang]);
          setSubmitting(false);
          return;
        }
        const chosenText = displayedOptions[picked].text;
        const bankIdx = question.options.findIndex(
          (o) => o.es === chosenText.es && o.en === chosenText.en
        );
        const r = await fetch("/api/correction", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            questionId: question.id,
            suggestedAnswerIndex: bankIdx >= 0 ? bankIdx : picked,
            previousAnswerIndex: question.answerIndex,
            reason: reason.trim(),
            reporter: reporter.trim(),
          }),
        });
        if (!r.ok) throw new Error((await r.json()).error || "request_failed");
        setSubmitted({ kind: "correction" });
      } else {
        const r = await fetch("/api/useless", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            questionId: question.id,
            reason: reason.trim(),
            reporter: reporter.trim(),
          }),
        });
        if (!r.ok) throw new Error((await r.json()).error || "request_failed");
        const j = await r.json();
        setSubmitted({ kind: "useless", disabled: j.disabled, count: j.count });
      }
    } catch (e: any) {
      setError(`${T.errSubmit[lang]} (${e.message || e})`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl rounded-2xl border border-line bg-paper shadow-soft p-6"
        >
          {submitted ? (
            <div className="text-center py-6">
              <p className="font-serif text-xl text-ink">
                {T.correctionThanks[lang]}
              </p>
              <p className="text-sm text-muted mt-2">
                {submitted.kind === "correction"
                  ? T.correctionApplied[lang]
                  : submitted.disabled
                  ? T.uselessDisabled[lang]
                  : T.uselessRecorded[lang].replace("{n}", String(submitted.count || 1))}
              </p>
              <div className="mt-5">
                <button
                  onClick={onClose}
                  className="rounded-full bg-ink text-cream px-5 py-2 text-sm hover:opacity-90"
                >
                  {T.close[lang]}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg text-ink">
                    {T.correctionTitle[lang]}
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    {T.correctionHint[lang]}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted hover:text-ink text-xl leading-none px-2"
                  aria-label="close"
                >
                  ×
                </button>
              </div>

              {/* Mode tabs */}
              <div className="mt-4 flex gap-2 text-xs">
                <button
                  onClick={() => setMode("correction")}
                  className={`rounded-full px-3 py-1.5 border ${
                    mode === "correction"
                      ? "border-sage bg-sage/10 text-ink"
                      : "border-line text-muted hover:text-ink"
                  }`}
                >
                  {T.modeCorrection[lang]}
                </button>
                <button
                  onClick={() => setMode("useless")}
                  className={`rounded-full px-3 py-1.5 border ${
                    mode === "useless"
                      ? "border-terracotta bg-terracotta/10 text-ink"
                      : "border-line text-muted hover:text-ink"
                  }`}
                >
                  {T.modeUseless[lang]}
                </button>
              </div>

              {mode === "correction" ? (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider text-muted mb-2">
                    {T.correctionPickRight[lang]}
                  </p>
                  <ul className="space-y-2">
                    {displayedOptions.map((opt, i) => (
                      <li key={i}>
                        <button
                          onClick={() => setPicked(i)}
                          className={`w-full text-left rounded-xl border px-4 py-2 text-sm transition-colors ${
                            picked === i
                              ? "border-sage bg-sage/10"
                              : "border-line bg-cream hover:border-sage/40"
                          }`}
                        >
                          <span className="text-muted mr-2">{"ABCD"[i]}.</span>
                          {opt.text[lang]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted bg-cream/60 border border-line rounded-xl p-3">
                  {T.uselessExplain[lang]}
                </p>
              )}

              <label className="block mt-4 text-xs uppercase tracking-wider text-muted">
                {T.correctionReason[lang]}
                <span className="text-terracottaDark"> *</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder={
                  mode === "correction"
                    ? T.correctionReasonPh[lang]
                    : T.uselessReasonPh[lang]
                }
                className="mt-1 w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink resize-y focus:outline-none focus:border-sage"
              />

              <label className="block mt-3 text-xs uppercase tracking-wider text-muted">
                {T.correctionReporterRequired[lang]}
                <span className="text-terracottaDark"> *</span>
              </label>
              <input
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
                placeholder={T.correctionReporterPh[lang]}
                className="mt-1 w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink focus:outline-none focus:border-sage"
              />

              {error && (
                <p className="mt-3 text-sm text-terracottaDark">{error}</p>
              )}

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-ink"
                  disabled={submitting}
                >
                  {T.cancel[lang]}
                </button>
                <button
                  onClick={submit}
                  disabled={submitting}
                  className={`rounded-full px-5 py-2 text-sm transition-opacity disabled:opacity-30 hover:opacity-90 text-cream ${
                    mode === "useless" ? "bg-terracottaDark" : "bg-ink"
                  }`}
                >
                  {submitting ? T.sending[lang] : T.correctionSend[lang]}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
