"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Topic } from "@/data/topics";
import { useLang } from "@/lib/i18n";

export default function TopicCard({ topic, count }: { topic: Topic; count: number }) {
  const [lang] = useLang();
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link
        href={`/tema/${topic.slug}`}
        className="block rounded-2xl border border-line bg-paper p-6 shadow-soft transition-colors hover:border-sage/60"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-lg text-ink">{topic.title[lang]}</h3>
          <span className="text-xs text-muted whitespace-nowrap">{count}</span>
        </div>
        <p className="mt-2 text-sm text-muted leading-relaxed">{topic.description[lang]}</p>
        <p className="mt-3 text-[11px] uppercase tracking-wider text-muted/70">{topic.source}</p>
      </Link>
    </motion.div>
  );
}
