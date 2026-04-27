import Header from "@/components/Header";
import { ALL_QUESTIONS } from "@/data/questions";
import RandomQuiz from "./RandomQuiz";

export default function RandomPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <RandomQuiz questions={ALL_QUESTIONS} />
      </main>
    </>
  );
}
