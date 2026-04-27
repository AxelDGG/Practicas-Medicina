import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { TOPIC_BY_SLUG, TOPICS } from "@/data/topics";
import { questionsForTopic } from "@/data/questions";
import TopicQuiz from "./TopicQuiz";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = TOPIC_BY_SLUG[params.slug];
  if (!topic) notFound();
  const questions = questionsForTopic(topic.slug);

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <TopicQuiz topic={topic} questions={questions} />
      </main>
    </>
  );
}
