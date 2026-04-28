import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { SUBJECTS, SUBJECT_BY_SLUG } from "@/data/subjects";
import { TOPIC_BY_SLUG } from "@/data/topics";
import { questionsForTopic } from "@/data/questions";
import SubjectView from "./SubjectView";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ slug: s.slug }));
}

export default function SubjectPage({ params }: { params: { slug: string } }) {
  const subject = SUBJECT_BY_SLUG[params.slug];
  if (!subject) notFound();

  const topics = subject.topicSlugs
    .map((slug) => TOPIC_BY_SLUG[slug])
    .filter(Boolean)
    .map((t) => ({ topic: t, count: questionsForTopic(t.slug).length }));

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <SubjectView subject={subject} topics={topics} />
      </main>
    </>
  );
}
