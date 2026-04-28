"use client";
import { useMemo } from "react";
import Link from "next/link";
import Quiz from "@/components/Quiz";
import type { Subject } from "@/data/subjects";
import type { Question } from "@/data/types";
import { shuffle } from "@/lib/shuffle";
import { T, useLang } from "@/lib/i18n";

export default function SubjectRandomQuiz({
  subject,
  questions,
}: {
  subject: Subject;
  questions: Question[];
}) {
  const [lang] = useLang();
  const sample = useMemo(() => shuffle(questions), [questions]);
  return (
    <>
      <div className="mb-8">
        <Link
          href={`/materia/${subject.slug}`}
          className="text-xs text-muted hover:text-ink"
        >
          ← {subject.title[lang]}
        </Link>
        <h1 className="font-serif text-3xl text-ink mt-3">
          {T.subjectRandom[lang]}
        </h1>
        <p className="text-sm text-muted mt-1">{T.subjectRandomMix[lang]}</p>
      </div>
      <Quiz questions={sample} title={subject.title[lang]} />
    </>
  );
}
