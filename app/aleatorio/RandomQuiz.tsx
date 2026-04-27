"use client";
import { useMemo } from "react";
import Link from "next/link";
import Quiz from "@/components/Quiz";
import type { Question } from "@/data/types";
import { shuffle } from "@/lib/shuffle";
import { T, useLang } from "@/lib/i18n";

export default function RandomQuiz({ questions }: { questions: Question[] }) {
  const [lang] = useLang();
  const sample = useMemo(() => shuffle(questions), [questions]);
  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-xs text-muted hover:text-ink">
          ← {T.home[lang]}
        </Link>
        <h1 className="font-serif text-3xl text-ink mt-3">{T.random[lang]}</h1>
        <p className="text-sm text-muted mt-1">{T.randomMix[lang]}</p>
      </div>
      <Quiz questions={sample} title={T.random[lang]} />
    </>
  );
}
