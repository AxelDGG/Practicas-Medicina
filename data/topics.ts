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
  {
    slug: "inmunohematologia",
    source: "Inmunohematología — Quiz 1",
    title: { es: "Inmunohematología", en: "Immunohematology" },
    description: {
      es: "Anemias, coagulación, LAD, CGD, deficiencias humorales.",
      en: "Anemias, coagulation, LAD, CGD, humoral deficiencies.",
    },
  },
  {
    slug: "artritis-reumatoide",
    source: "Inmunohematología — Quiz 2",
    title: { es: "Artritis reumatoide", en: "Rheumatoid arthritis" },
    description: {
      es: "Sinovitis, pannus, ACPA, HLA-DRB1, citoquinas.",
      en: "Synovitis, pannus, ACPA, HLA-DRB1, cytokines.",
    },
  },
  {
    slug: "lupus",
    source: "Inmunohematología — Quiz 3",
    title: { es: "Lupus eritematoso sistémico", en: "Systemic lupus erythematosus" },
    description: {
      es: "ANA, anti-dsDNA, IFN-I, complemento, daño multisistémico.",
      en: "ANA, anti-dsDNA, type I IFN, complement, multisystem damage.",
    },
  },
  {
    slug: "artritis-reumatoide-enarm",
    source: "Inmunohematología — ENARM 1",
    title: { es: "Artritis reumatoide (ENARM)", en: "Rheumatoid arthritis (ENARM)" },
    description: {
      es: "Casos clínicos: ACPA, criterios ACR/EULAR, DMARDs y biológicos.",
      en: "Cases: ACPA, ACR/EULAR criteria, DMARDs and biologics.",
    },
  },
  {
    slug: "lupus-enarm",
    source: "Inmunohematología — ENARM 2",
    title: { es: "Lupus eritematoso sistémico (ENARM)", en: "Systemic lupus erythematosus (ENARM)" },
    description: {
      es: "Casos clínicos: criterios EULAR/ACR, nefritis, biológicos.",
      en: "Cases: EULAR/ACR criteria, nephritis, biologics.",
    },
  },
  {
    slug: "inmunohematologia-enarm",
    source: "Inmunohematología — ENARM 3",
    title: { es: "Inmunohematología (ENARM)", en: "Immunohematology (ENARM)" },
    description: {
      es: "Casos clínicos: LAD, CGD, XLA, anemias y trastornos plaquetarios.",
      en: "Cases: LAD, CGD, XLA, anemias and platelet disorders.",
    },
  },
  // ── Patología por imágenes ─────────────────────────────────────────
  {
    slug: "patologia-cardiacas",
    source: "2026 Cardiac Infections (1).pdf",
    title: { es: "Infecciones cardíacas (imágenes)", en: "Cardiac infections (images)" },
    description: {
      es: "Endocarditis, miocarditis, pericarditis, Chagas. Casos visuales.",
      en: "Endocarditis, myocarditis, pericarditis, Chagas. Visual cases.",
    },
  },
  {
    slug: "patologia-pancreas-higado",
    source: "2026 Exocrine pancreas and liver pathology (1).pdf",
    title: {
      es: "Páncreas exocrino e hígado (imágenes)",
      en: "Exocrine pancreas & liver (images)",
    },
    description: {
      es: "Hepatocarcinoma, adenoma, pancreatitis, NAFLD/EHNA.",
      en: "HCC, adenoma, pancreatitis, NAFLD.",
    },
  },
  {
    slug: "patologia-gi",
    source: "2026 GI pathology.pdf",
    title: { es: "Patología GI (imágenes)", en: "GI pathology (images)" },
    description: {
      es: "Esófago, estómago, intestino: lesiones, neoplasias, EII.",
      en: "Esophagus, stomach, intestine: lesions, neoplasms, IBD.",
    },
  },
  {
    slug: "patologia-gi-infecciones",
    source: "2026 Gastrointestinal infections (1).pdf",
    title: {
      es: "Infecciones gastrointestinales (imágenes)",
      en: "Gastrointestinal infections (images)",
    },
    description: {
      es: "H. pylori, Whipple, parásitos, virales y bacterianas.",
      en: "H. pylori, Whipple, parasites, viral & bacterial.",
    },
  },
  {
    slug: "patologia-hiv-sida",
    source: "2026 HIV-AIDS.pdf",
    title: { es: "VIH/SIDA (imágenes)", en: "HIV/AIDS (images)" },
    description: {
      es: "Infecciones oportunistas y manifestaciones histológicas.",
      en: "Opportunistic infections and histologic findings.",
    },
  },
  {
    slug: "patologia-hematopatologia",
    source: "2026 Hematopathology.pdf",
    title: { es: "Hematopatología (imágenes)", en: "Hematopathology (images)" },
    description: {
      es: "Linfomas, leucemias, anemias, trastornos plaquetarios.",
      en: "Lymphomas, leukemias, anemias, platelet disorders.",
    },
  },
  {
    slug: "patologia-neuroinfecciones",
    source: "2026 Neuroinfections (1).pdf",
    title: { es: "Neuroinfecciones (imágenes)", en: "Neuroinfections (images)" },
    description: {
      es: "Meningitis, encefalitis, abscesos cerebrales.",
      en: "Meningitis, encephalitis, brain abscesses.",
    },
  },
  {
    slug: "patologia-pulmonar-infecciones",
    source: "2026 Pulmonary infections (1).pdf",
    title: { es: "Infecciones pulmonares (imágenes)", en: "Pulmonary infections (images)" },
    description: {
      es: "Neumonías bacterianas, virales, micóticas, TB.",
      en: "Bacterial, viral, fungal pneumonias, TB.",
    },
  },
  {
    slug: "patologia-ar-imagenes",
    source: "2026 Rheumatoid Arthritis.pdf",
    title: { es: "Artritis reumatoide (imágenes)", en: "Rheumatoid arthritis (images)" },
    description: {
      es: "Sinovitis, pannus, deformidades, hallazgos extraarticulares.",
      en: "Synovitis, pannus, deformities, extra-articular findings.",
    },
  },
  {
    slug: "patologia-les-imagenes",
    source: "2026 Systemic Lupus Erythematosus.pdf",
    title: { es: "LES (imágenes)", en: "SLE (images)" },
    description: {
      es: "Glomerulonefritis, eritema, lesiones cutáneas, vasculitis.",
      en: "Glomerulonephritis, rashes, skin lesions, vasculitis.",
    },
  },
  {
    slug: "patologia-trasplantes",
    source: "2026 Tissue Transplant Pathology.pdf",
    title: { es: "Patología de trasplantes (imágenes)", en: "Transplant pathology (images)" },
    description: {
      es: "Rechazo agudo, crónico, hiperagudo. Riñón, hígado, médula.",
      en: "Acute, chronic, hyperacute rejection. Kidney, liver, marrow.",
    },
  },
];

export const TOPIC_BY_SLUG: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.slug, t])
);
