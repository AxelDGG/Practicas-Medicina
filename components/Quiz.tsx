"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Question } from "@/data/types";
import { shuffle } from "@/lib/shuffle";
import { T, useLang } from "@/lib/i18n";
import ProgressBar from "./ProgressBar";
import ResultScreen from "./ResultScreen";
import ReportCorrection from "./ReportCorrection";

type Prepared = {
  q: Question;
  options: { text: { es: string; en: string }; isCorrect: boolean }[];
};

function prepare(questions: Question[]): Prepared[] {
  return shuffle(questions).map((q) => {
    const opts = q.options.map((text, i) => ({
      text,
      isCorrect: i === q.answerIndex,
    }));
    return { q, options: shuffle(opts) };
  });
}

export default function Quiz({
  questions,
  title,
}: {
  questions: Question[];
  title: string;
}) {
  const [lang] = useLang();
  const [seed, setSeed] = useState(0);
  const prepared = useMemo(() => prepare(questions), [questions, seed]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ q: Question; pickedCorrect: boolean }[]>([]);
  const [done, setDone] = useState(false);
  const [reporting, setReporting] = useState(false);

  const total = prepared.length;
  const current = prepared[index];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const correct = current.options[i].isCorrect;
    setAnswers((a) => [...a, { q: current.q, pickedCorrect: correct }]);
  }

  function next() {
    if (index + 1 >= total) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function restart() {
    setSeed((s) => s + 1);
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  }

  if (done) {
    return <ResultScreen answers={answers} onRetry={restart} />;
  }

  const correctIndex = current.options.findIndex((o) => o.isCorrect);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{title}</span>
        <span>
          {T.question[lang]} {index + 1} {T.of[lang]} {total}
        </span>
      </div>
      <ProgressBar value={index + (picked !== null ? 1 : 0)} max={total} />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.q.id + "-" + seed}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-2xl border border-line bg-paper p-6 sm:p-8 shadow-soft"
        >
          {current.q.imageUrl && (
            <div className="mb-5 rounded-xl overflow-hidden border border-line bg-cream">
              <img
                src={current.q.imageUrl}
                alt=""
                className="w-full max-h-[60vh] object-contain block mx-auto"
              />
            </div>
          )}
          <h2 className="font-serif text-xl sm:text-2xl text-ink leading-snug">
            {current.q.prompt[lang]}
          </h2>

          <ul className="mt-6 space-y-3">
            {current.options.map((opt, i) => {
              const chosen = picked === i;
              const showCorrect = picked !== null && i === correctIndex;
              const showWrong = chosen && !opt.isCorrect;
              const base =
                "w-full text-left rounded-xl border px-4 py-3 transition-colors text-[15px] leading-relaxed";
              const state =
                picked === null
                  ? "border-line bg-cream hover:bg-stone-100 hover:border-sage/40"
                  : showCorrect
                  ? "border-sage bg-sage/10 text-ink"
                  : showWrong
                  ? "border-terracottaDark bg-terracotta/10 text-ink"
                  : "border-line bg-cream/60 text-muted";
              return (
                <li key={i}>
                  <motion.button
                    whileHover={picked === null ? { scale: 1.005 } : undefined}
                    onClick={() => pick(i)}
                    disabled={picked !== null}
                    className={`${base} ${state}`}
                  >
                    {opt.text[lang]}
                  </motion.button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence>
            {picked !== null && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="mt-6 rounded-xl border border-line bg-cream/60 p-4"
              >
                <p className="text-xs uppercase tracking-wider text-muted">
                  {current.options[picked].isCorrect ? T.correct[lang] : T.incorrect[lang]}
                </p>
                <p className="mt-1 text-sm text-ink leading-relaxed">
                  {current.q.explanation[lang]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-end gap-3">
            {picked !== null && (
              <button
                onClick={() => setReporting(true)}
                className="text-xs text-muted hover:text-terracottaDark underline-offset-4 hover:underline"
              >
                {T.reportCorrection[lang]}
              </button>
            )}
            <button
              onClick={next}
              disabled={picked === null}
              className="rounded-full bg-ink text-cream px-5 py-2 text-sm transition-opacity disabled:opacity-30 hover:opacity-90"
            >
              {index + 1 >= total ? T.finish[lang] : T.next[lang]} →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {reporting && (
        <ReportCorrection
          question={current.q}
          displayedOptions={current.options}
          onClose={() => setReporting(false)}
        />
      )}
    </div>
  );
}
