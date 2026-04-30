import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { SUBJECT_BY_SLUG } from "@/data/subjects";
import { RAW_QUESTIONS } from "@/data/questions";
import { getOverrides, getUseless } from "@/lib/kvStore";
import { prepareQuestions } from "@/lib/runtimeBank";
import SubjectRandomQuiz from "./SubjectRandomQuiz";

export const dynamic = "force-dynamic";

export default async function SubjectRandomPage({
  params,
}: {
  params: { slug: string };
}) {
  const subject = SUBJECT_BY_SLUG[params.slug];
  if (!subject) notFound();
  const [overrides, useless] = await Promise.all([getOverrides(), getUseless()]);
  const questions = prepareQuestions(
    RAW_QUESTIONS.filter((q) => subject.topicSlugs.includes(q.topic)),
    overrides,
    useless
  );

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <SubjectRandomQuiz subject={subject} questions={questions} />
      </main>
    </>
  );
}
