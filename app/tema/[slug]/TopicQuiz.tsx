"use client";
import Link from "next/link";
import Quiz from "@/components/Quiz";
import { useLang, T } from "@/lib/i18n";
import type { Topic } from "@/data/topics";
import type { Question } from "@/data/types";

export default function TopicQuiz({
  topic,
  questions,
}: {
  topic: Topic;
  questions: Question[];
}) {
  const [lang] = useLang();
  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-xs text-muted hover:text-ink">
          ← {T.home[lang]}
        </Link>
        <h1 className="font-serif text-3xl text-ink mt-3">{topic.title[lang]}</h1>
        <p className="text-sm text-muted mt-1">{topic.description[lang]}</p>
        <p className="text-[11px] uppercase tracking-wider text-muted/70 mt-2">
          {T.source[lang]}: {topic.source}
        </p>
      </div>
      <Quiz questions={questions} title={topic.title[lang]} />
    </>
  );
}
