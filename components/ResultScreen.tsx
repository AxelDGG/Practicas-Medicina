"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Question } from "@/data/types";
import { T, useLang } from "@/lib/i18n";

export default function ResultScreen({
  answers,
  onRetry,
}: {
  answers: { q: Question; pickedCorrect: boolean }[];
  onRetry: () => void;
}) {
  const [lang] = useLang();
  const correct = answers.filter((a) => a.pickedCorrect).length;
  const total = answers.length;
  const pct = Math.round((correct / Math.max(1, total)) * 100);
  const wrong = answers.filter((a) => !a.pickedCorrect);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="rounded-2xl border border-line bg-paper p-8 shadow-soft"
    >
      <p className="text-xs uppercase tracking-wider text-muted">{T.score[lang]}</p>
      <h2 className="font-serif text-4xl text-ink mt-1">
        {correct} / {total}
        <span className="text-base text-muted ml-3">({pct}%)</span>
      </h2>

      {wrong.length === 0 ? (
        <p className="mt-6 text-sage">{T.noMistakes[lang]}</p>
      ) : (
        <div className="mt-8">
          <p className="text-sm uppercase tracking-wider text-muted mb-3">
            {T.reviewMistakes[lang]}
          </p>
          <ul className="space-y-4">
            {wrong.map(({ q }) => (
              <li key={q.id} className="rounded-xl border border-line bg-cream/60 p-4">
                <p className="text-[15px] text-ink leading-snug">{q.prompt[lang]}</p>
                <p className="mt-2 text-sm text-sageDark">
                  ✓ {q.options[q.answerIndex][lang]}
                </p>
                <p className="mt-1 text-xs text-muted">{q.explanation[lang]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={onRetry}
          className="rounded-full bg-ink text-cream px-5 py-2 text-sm hover:opacity-90"
        >
          {T.retry[lang]}
        </button>
        <Link
          href="/"
          className="rounded-full border border-line px-5 py-2 text-sm text-ink hover:bg-stone-100"
        >
          {T.home[lang]}
        </Link>
      </div>
    </motion.div>
  );
}
