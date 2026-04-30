import Header from "@/components/Header";
import { RAW_QUESTIONS } from "@/data/questions";
import { getOverrides, getUseless } from "@/lib/kvStore";
import { prepareQuestions } from "@/lib/runtimeBank";
import RandomQuiz from "./RandomQuiz";

export const dynamic = "force-dynamic";

export default async function RandomPage() {
  const [overrides, useless] = await Promise.all([getOverrides(), getUseless()]);
  const questions = prepareQuestions(RAW_QUESTIONS, overrides, useless);
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <RandomQuiz questions={questions} />
      </main>
    </>
  );
}
