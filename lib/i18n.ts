"use client";
import { useEffect, useState } from "react";
import type { Lang } from "@/data/topics";

const KEY = "pm-lang";

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("es");
  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" && localStorage.getItem(KEY)) as Lang | null;
      if (stored === "es" || stored === "en") setLang(stored);
    } catch {}
  }, []);
  function update(l: Lang) {
    setLang(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }
  return [lang, update];
}

export const T = {
  byTopic: { es: "Por tema", en: "By topic" },
  random: { es: "Aleatorio", en: "Random" },
  start: { es: "Comenzar", en: "Start" },
  next: { es: "Siguiente", en: "Next" },
  finish: { es: "Terminar", en: "Finish" },
  back: { es: "Volver", en: "Back" },
  retry: { es: "Reintentar", en: "Retry" },
  score: { es: "Puntaje", en: "Score" },
  question: { es: "Pregunta", en: "Question" },
  of: { es: "de", en: "of" },
  correct: { es: "Correcto", en: "Correct" },
  incorrect: { es: "Incorrecto", en: "Incorrect" },
  reviewMistakes: { es: "Repasar errores", en: "Review mistakes" },
  noMistakes: { es: "¡Sin errores! Excelente.", en: "No mistakes! Excellent." },
  pickTopic: { es: "Elige un tema", en: "Pick a topic" },
  randomMix: { es: "Mezcla aleatoria de todos los temas", en: "Random mix of all topics" },
  source: { es: "Fuente", en: "Source" },
  questions: { es: "preguntas", en: "questions" },
  home: { es: "Inicio", en: "Home" },
  subtitle: {
    es: "Quizzes basados en las clases de inmunología y dermatología.",
    en: "Quizzes based on the immunology & dermatology lectures.",
  },
  brand: { es: "Prácticas — Medicina", en: "Practice — Medicine" },
  langToggleAria: { es: "Cambiar idioma", en: "Toggle language" },
};
