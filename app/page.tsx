"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import TopicCard from "@/components/TopicCard";
import { TOPICS } from "@/data/topics";
import { questionsForTopic } from "@/data/questions";
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

        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          <ModeCard
            href="#temas"
            title={T.byTopic[lang]}
            description={T.pickTopic[lang]}
            scrollTarget="temas"
          />
          <ModeCard
            href="/aleatorio"
            title={T.random[lang]}
            description={T.randomMix[lang]}
          />
        </section>

        <section id="temas" className="mt-16">
          <h2 className="font-serif text-2xl text-ink mb-5">{T.byTopic[lang]}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {TOPICS.map((t) => (
              <TopicCard key={t.slug} topic={t} count={questionsForTopic(t.slug).length} />
            ))}
          </div>
        </section>

        <footer className="mt-20 text-center text-xs text-muted/70">
          Dra. Andrea Ramírez Fontes
        </footer>
      </main>
    </>
  );
}

function ModeCard({
  href,
  title,
  description,
  scrollTarget,
}: {
  href: string;
  title: string;
  description: string;
  scrollTarget?: string;
}) {
  const onClick = scrollTarget
    ? (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
      }
    : undefined;
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
      <Link
        href={href}
        onClick={onClick}
        className="block rounded-2xl border border-line bg-paper p-7 shadow-soft hover:border-sage/60 transition-colors"
      >
        <h3 className="font-serif text-2xl text-ink">{title}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>
      </Link>
    </motion.div>
  );
}
