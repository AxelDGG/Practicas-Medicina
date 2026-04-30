import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { TOPIC_BY_SLUG } from "@/data/topics";
import { RAW_QUESTIONS } from "@/data/questions";
import { getOverrides, getUseless } from "@/lib/kvStore";
import { prepareQuestions } from "@/lib/runtimeBank";
import TopicQuiz from "./TopicQuiz";

export const dynamic = "force-dynamic";

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const topic = TOPIC_BY_SLUG[params.slug];
  if (!topic) notFound();
  const [overrides, useless] = await Promise.all([getOverrides(), getUseless()]);
  const questions = prepareQuestions(
    RAW_QUESTIONS.filter((q) => q.topic === topic.slug),
    overrides,
    useless
  );

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <TopicQuiz topic={topic} questions={questions} />
      </main>
    </>
  );
}
