import type { Question } from "../types";
import { prepareQuestions } from "@/lib/runtimeBank";
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
import { patologiaCardiacas } from "./patologia-cardiacas";
import { patologiaPancreasHigado } from "./patologia-pancreas-higado";
import { patologiaGi } from "./patologia-gi";
import { patologiaGiInfecciones } from "./patologia-gi-infecciones";
import { patologiaHivSida } from "./patologia-hiv-sida";
import { patologiaHematopatologia } from "./patologia-hematopatologia";
import { patologiaNeuroinfecciones } from "./patologia-neuroinfecciones";
import { patologiaPulmonarInfecciones } from "./patologia-pulmonar-infecciones";
import { patologiaArImagenes } from "./patologia-ar-imagenes";
import { patologiaLesImagenes } from "./patologia-les-imagenes";
import { patologiaTrasplantes } from "./patologia-trasplantes";

const RAW_QUESTIONS: Question[] = [
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
  ...patologiaCardiacas,
  ...patologiaPancreasHigado,
  ...patologiaGi,
  ...patologiaGiInfecciones,
  ...patologiaHivSida,
  ...patologiaHematopatologia,
  ...patologiaNeuroinfecciones,
  ...patologiaPulmonarInfecciones,
  ...patologiaArImagenes,
  ...patologiaLesImagenes,
  ...patologiaTrasplantes,
];

// Apply runtime corrections (overrides) and remove questions flagged as useless.
export const ALL_QUESTIONS: Question[] = prepareQuestions(RAW_QUESTIONS);

export function questionsForTopic(slug: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.topic === slug);
}
