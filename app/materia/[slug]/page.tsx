import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { SUBJECT_BY_SLUG } from "@/data/subjects";
import { TOPIC_BY_SLUG } from "@/data/topics";
import { RAW_QUESTIONS } from "@/data/questions";
import { getUseless } from "@/lib/kvStore";
import { isDisabled } from "@/lib/runtimeBank";
import SubjectView from "./SubjectView";

export const dynamic = "force-dynamic";

export default async function SubjectPage({ params }: { params: { slug: string } }) {
  const subject = SUBJECT_BY_SLUG[params.slug];
  if (!subject) notFound();

  const useless = await getUseless();
  const topics = subject.topicSlugs
    .map((slug) => TOPIC_BY_SLUG[slug])
    .filter(Boolean)
    .map((t) => ({
      topic: t,
      count: RAW_QUESTIONS.filter(
        (q) => q.topic === t.slug && !isDisabled(q.id, useless)
      ).length,
    }));

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <SubjectView subject={subject} topics={topics} />
      </main>
    </>
  );
}
