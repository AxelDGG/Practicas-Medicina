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
    topicSlugs: [
      "inmunohematologia",
      "artritis-reumatoide",
      "lupus",
      "artritis-reumatoide-enarm",
      "lupus-enarm",
      "inmunohematologia-enarm",
    ],
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
  {
    slug: "patologia-imagenes",
    title: { es: "Patología por imágenes", en: "Pathology by images" },
    description: {
      es: "Reconoce enfermedades, lesiones e infecciones en imágenes histológicas y macroscópicas.",
      en: "Recognize diseases, lesions and infections from histologic and gross images.",
    },
    topicSlugs: [
      "patologia-cardiacas",
      "patologia-pancreas-higado",
      "patologia-gi",
      "patologia-gi-infecciones",
      "patologia-hiv-sida",
      "patologia-hematopatologia",
      "patologia-neuroinfecciones",
      "patologia-pulmonar-infecciones",
      "patologia-ar-imagenes",
      "patologia-les-imagenes",
      "patologia-trasplantes",
    ],
  },
];

export const SUBJECT_BY_SLUG: Record<string, Subject> = Object.fromEntries(
  SUBJECTS.map((s) => [s.slug, s])
);

export type { Lang };
