import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { SUBJECTS, SUBJECT_BY_SLUG } from "@/data/subjects";
import { ALL_QUESTIONS } from "@/data/questions";
import SubjectRandomQuiz from "./SubjectRandomQuiz";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ slug: s.slug }));
}

export default function SubjectRandomPage({
  params,
}: {
  params: { slug: string };
}) {
  const subject = SUBJECT_BY_SLUG[params.slug];
  if (!subject) notFound();
  const questions = ALL_QUESTIONS.filter((q) => subject.topicSlugs.includes(q.topic));

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <SubjectRandomQuiz subject={subject} questions={questions} />
      </main>
    </>
  );
}
