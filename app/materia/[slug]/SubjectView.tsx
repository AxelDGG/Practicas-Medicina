"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import TopicCard from "@/components/TopicCard";
import type { Subject } from "@/data/subjects";
import type { Topic } from "@/data/topics";
import { T, useLang } from "@/lib/i18n";

export default function SubjectView({
  subject,
  topics,
}: {
  subject: Subject;
  topics: { topic: Topic; count: number }[];
}) {
  const [lang] = useLang();
  const total = topics.reduce((acc, t) => acc + t.count, 0);

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-xs text-muted hover:text-ink">
          ← {T.home[lang]}
        </Link>
        <h1 className="font-serif text-3xl text-ink mt-3">{subject.title[lang]}</h1>
        <p className="text-sm text-muted mt-1">{subject.description[lang]}</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {topics.map(({ topic, count }) => (
          <TopicCard key={topic.slug} topic={topic} count={count} />
        ))}

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Link
            href={`/materia/${subject.slug}/aleatorio`}
            className="block rounded-2xl border border-line bg-paper p-6 shadow-soft transition-colors hover:border-sage/60"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-serif text-lg text-ink">{T.subjectRandom[lang]}</h3>
              <span className="text-xs text-muted whitespace-nowrap">{total}</span>
            </div>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {T.subjectRandomMix[lang]}
            </p>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
