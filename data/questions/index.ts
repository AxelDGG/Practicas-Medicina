import type { Question } from "../types";
import { tolerancia } from "./tolerancia";
import { hipersensibilidad } from "./hipersensibilidad";
import { asma } from "./asma";
import { exacerbacionesAsma } from "./exacerbaciones-asma";
import { rinitis } from "./rinitis";
import { conjuntivitisDa } from "./conjuntivitis-da";
import { serumSickness } from "./serum-sickness";
import { psoriasis } from "./psoriasis";
import { contacto } from "./contacto";
import { inmunohematologia } from "./inmunohematologia";
import { artritisReumatoide } from "./artritis-reumatoide";
import { lupus } from "./lupus";
import { artritisReumatoideEnarm } from "./artritis-reumatoide-enarm";
import { lupusEnarm } from "./lupus-enarm";
import { inmunohematologiaEnarm } from "./inmunohematologia-enarm";

export const ALL_QUESTIONS: Question[] = [
  ...tolerancia,
  ...hipersensibilidad,
  ...asma,
  ...exacerbacionesAsma,
  ...rinitis,
  ...conjuntivitisDa,
  ...serumSickness,
  ...psoriasis,
  ...contacto,
  ...inmunohematologia,
  ...artritisReumatoide,
  ...lupus,
  ...artritisReumatoideEnarm,
  ...lupusEnarm,
  ...inmunohematologiaEnarm,
];

export function questionsForTopic(slug: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.topic === slug);
}
