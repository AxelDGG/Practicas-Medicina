import Header from "@/components/Header";
import CorrectionsView from "./CorrectionsView";

export const metadata = {
  title: "Correcciones — Prácticas Medicina",
};

export default function CorreccionesPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        <CorrectionsView />
      </main>
    </>
  );
}
