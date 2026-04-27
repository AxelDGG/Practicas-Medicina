export type Lang = "es" | "en";

export type Topic = {
  slug: string;
  title: { es: string; en: string };
  source: string;
  description: { es: string; en: string };
};

export const TOPICS: Topic[] = [
  {
    slug: "tolerancia",
    source: "1. Tolerance.pptx",
    title: { es: "Tolerancia inmunológica", en: "Immunological tolerance" },
    description: {
      es: "Tolerancia central y periférica, T regs, autoinmunidad.",
      en: "Central & peripheral tolerance, T regs, autoimmunity.",
    },
  },
  {
    slug: "hipersensibilidad",
    source: "2. Hypersensitivity (1).pptx",
    title: { es: "Hipersensibilidad", en: "Hypersensitivity" },
    description: {
      es: "Tipos I–IV, anafilaxia, complejos inmunes, pseudoalergia.",
      en: "Types I–IV, anaphylaxis, immune complexes, pseudoallergy.",
    },
  },
  {
    slug: "asma",
    source: "3. Asma.pptx",
    title: { es: "Asma", en: "Asthma" },
    description: {
      es: "Fisiopatología, diagnóstico, escalera GINA, inhaladores.",
      en: "Pathophysiology, diagnosis, GINA ladder, inhalers.",
    },
  },
  {
    slug: "exacerbaciones-asma",
    source: "4. Exacerbaciones Asma&Inmuno.pdf",
    title: { es: "Exacerbaciones de asma", en: "Asthma exacerbations" },
    description: {
      es: "Riesgo de muerte, ABCDE, biológicos, calidad de vida.",
      en: "Death risk, ABCDE, biologics, quality of life.",
    },
  },
  {
    slug: "rinitis",
    source: "5. Rinitis.pdf",
    title: { es: "Rinitis alérgica", en: "Allergic rhinitis" },
    description: {
      es: "Epidemiología, diagnóstico, CSI nasales, antihistamínicos.",
      en: "Epidemiology, diagnosis, intranasal CS, antihistamines.",
    },
  },
  {
    slug: "conjuntivitis-da",
    source: "6. Conjuntivitis y dermatitis.pdf",
    title: {
      es: "Conjuntivitis y dermatitis atópica",
      en: "Conjunctivitis & atopic dermatitis",
    },
    description: {
      es: "Filagrina, IL-4/13/31, JAK, calcineurina tópica.",
      en: "Filaggrin, IL-4/13/31, JAK, topical calcineurin.",
    },
  },
  {
    slug: "serum-sickness",
    source: "7. Serum Sickness.pdf",
    title: { es: "Enfermedad del suero", en: "Serum sickness" },
    description: {
      es: "Hipersensibilidad III, complejos inmunes, complemento.",
      en: "Type III HS, immune complexes, complement.",
    },
  },
  {
    slug: "psoriasis",
    source: "8. Psoriasis.pdf",
    title: { es: "Psoriasis", en: "Psoriasis" },
    description: {
      es: "HLA-Cw6, Koebner, biológicos, marcha psoriática.",
      en: "HLA-Cw6, Koebner, biologics, psoriatic march.",
    },
  },
  {
    slug: "contacto",
    source: "9. Contacto.pdf",
    title: { es: "Dermatitis por contacto", en: "Contact dermatitis" },
    description: {
      es: "Haptenos, tipo IV, prueba del parche, tratamiento.",
      en: "Haptens, type IV, patch testing, treatment.",
    },
  },
];

export const TOPIC_BY_SLUG: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.slug, t])
);
