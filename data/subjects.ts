import type { Lang } from "./topics";

export type Subject = {
  slug: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  topicSlugs: string[];
};

export const SUBJECTS: Subject[] = [
  {
    slug: "inmunohematologia",
    title: { es: "Inmunohematología", en: "Immunohematology" },
    description: {
      es: "Anemias, coagulación, inmunodeficiencias, AR y LES.",
      en: "Anemias, coagulation, immunodeficiencies, RA and SLE.",
    },
    topicSlugs: ["inmunohematologia", "artritis-reumatoide", "lupus"],
  },
  {
    slug: "alergologia-inmunologia",
    title: { es: "Alergología e Inmunología", en: "Allergy & Immunology" },
    description: {
      es: "Tolerancia, hipersensibilidad, asma, rinitis y dermatosis.",
      en: "Tolerance, hypersensitivity, asthma, rhinitis and skin disease.",
    },
    topicSlugs: [
      "tolerancia",
      "hipersensibilidad",
      "asma",
      "exacerbaciones-asma",
      "rinitis",
      "conjuntivitis-da",
      "serum-sickness",
      "psoriasis",
      "contacto",
    ],
  },
];

export const SUBJECT_BY_SLUG: Record<string, Subject> = Object.fromEntries(
  SUBJECTS.map((s) => [s.slug, s])
);

export type { Lang };
