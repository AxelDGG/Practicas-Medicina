"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { SUBJECTS } from "@/data/subjects";
import { ALL_QUESTIONS } from "@/data/questions";
import { T, useLang } from "@/lib/i18n";

export default function HomePage() {
  const [lang] = useLang();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-ink">
            {T.brand[lang]}
          </h1>
          <p className="mt-3 text-muted leading-relaxed max-w-xl mx-auto">
            {T.subtitle[lang]}
          </p>
        </motion.section>

        <section id="materias" className="mt-16">
          <h2 className="font-serif text-2xl text-ink mb-5">{T.bySubject[lang]}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SUBJECTS.map((s) => {
              const count = ALL_QUESTIONS.filter((q) =>
                s.topicSlugs.includes(q.topic)
              ).length;
              return (
                <motion.div
                  key={s.slug}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Link
                    href={`/materia/${s.slug}`}
                    className="block rounded-2xl border border-line bg-paper p-6 shadow-soft transition-colors hover:border-sage/60"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-lg text-ink">{s.title[lang]}</h3>
                      <span className="text-xs text-muted whitespace-nowrap">{count}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {s.description[lang]}
                    </p>
                    <p className="mt-3 text-[11px] uppercase tracking-wider text-muted/70">
                      {s.topicSlugs.length} {T.byTopic[lang].toLowerCase()}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <footer className="mt-20 text-center text-xs text-muted/70">
          Dra. Andrea Ramírez Fontes
        </footer>
      </main>
    </>
  );
}
