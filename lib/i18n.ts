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
  bySubject: { es: "Por materia", en: "By subject" },
  pickSubject: { es: "Elige una materia", en: "Pick a subject" },
  subjectRandom: { es: "Aleatorio de la materia", en: "Random within subject" },
  subjectRandomMix: { es: "Mezcla todas las preguntas de esta materia", en: "Mix all questions in this subject" },
  source: { es: "Fuente", en: "Source" },
  questions: { es: "preguntas", en: "questions" },
  home: { es: "Inicio", en: "Home" },
  subtitle: {
    es: "Quizzes basados en las clases de inmunología y dermatología.",
    en: "Quizzes based on the immunology & dermatology lectures.",
  },
  brand: { es: "Prácticas — Medicina", en: "Practice — Medicine" },
  langToggleAria: { es: "Cambiar idioma", en: "Toggle language" },
  // ── Corrections feature ───────────────────────────────────────────
  reportCorrection: { es: "Reportar / corregir", en: "Report / correct" },
  cancel: { es: "Cancelar", en: "Cancel" },
  close: { es: "Cerrar", en: "Close" },
  sending: { es: "Enviando…", en: "Sending…" },
  correctionTitle: {
    es: "¿Esta pregunta tiene un problema?",
    en: "Is this question wrong?",
  },
  correctionHint: {
    es: "Corrige la respuesta correcta o márcala como inservible.",
    en: "Fix the correct answer or flag it as useless.",
  },
  modeCorrection: { es: "Corregir respuesta", en: "Fix answer" },
  modeUseless: { es: "Marcar inservible", en: "Mark as useless" },
  correctionPickRight: {
    es: "Opción que debería ser correcta",
    en: "Option that should be correct",
  },
  uselessExplain: {
    es: "Si dos personas la marcan, la pregunta se desactiva y deja de aparecer en los quizzes.",
    en: "If two people flag it, the question is disabled and stops appearing in quizzes.",
  },
  uselessReasonPh: {
    es: "Por qué no sirve (imagen ilegible, ambigua, error de extracción…)",
    en: "Why it's useless (unreadable image, ambiguous, extraction error…)",
  },
  correctionReason: { es: "Por qué", en: "Why" },
  correctionReasonPh: {
    es: "Explica brevemente la razón (mínimo 5 caracteres)…",
    en: "Briefly explain the reason (5+ characters)…",
  },
  correctionReporter: { es: "Tu nombre (opcional)", en: "Your name (optional)" },
  correctionReporterRequired: { es: "Tu nombre", en: "Your name" },
  correctionReporterPh: { es: "Pepis, Dr. X…", en: "Pepis, Dr. X…" },
  correctionSend: { es: "Enviar", en: "Submit" },
  correctionThanks: { es: "¡Gracias!", en: "Thanks!" },
  correctionApplied: {
    es: "La corrección se aplicó al banco. Quedará registrada con tu nombre.",
    en: "The correction was applied to the bank. It will be logged with your name.",
  },
  uselessRecorded: {
    es: "Reporte guardado ({n} de 2). Si otra persona la marca, se desactivará.",
    en: "Report saved ({n} of 2). One more report will disable it.",
  },
  uselessDisabled: {
    es: "Pregunta desactivada — ya no aparecerá en los quizzes.",
    en: "Question disabled — it will no longer appear in quizzes.",
  },
  errReporter: { es: "Pon tu nombre.", en: "Enter your name." },
  errReason: { es: "Explica la razón (mínimo 5 caracteres).", en: "Explain the reason (5+ characters)." },
  errPickRight: { es: "Selecciona la opción correcta.", en: "Pick the correct option." },
  errSubmit: { es: "No se pudo enviar.", en: "Could not submit." },
  corrections: { es: "Correcciones", en: "Corrections" },
  correctionsEmpty: {
    es: "Aún no hay correcciones reportadas.",
    en: "No corrections reported yet.",
  },
  correctionsAuditTitle: {
    es: "Historial",
    en: "Audit log",
  },
  correctionsActiveOverridesTitle: {
    es: "Correcciones aplicadas",
    en: "Applied corrections",
  },
  correctionsDisabledTitle: {
    es: "Preguntas desactivadas",
    en: "Disabled questions",
  },
  correctionsBy: { es: "Por", en: "By" },
  correctionsCurrentAns: { es: "Era", en: "Was" },
  correctionsSuggested: { es: "Ahora", en: "Now" },
  correctionsCount: { es: "{n} reporte(s)", en: "{n} report(s)" },
};
