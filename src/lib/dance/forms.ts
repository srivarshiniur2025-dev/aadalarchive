/** Supported Indian classical & related forms for discovery personalization. */
export const DANCE_FORM_KEYS = [
  "Bharatanatyam",
  "Kuchipudi",
  "Kathak",
  "Odissi",
  "Mohiniyattam",
  "Manipuri",
  "Sattriya",
  "Kathakali",
  "Chhau",
  "Indian Contemporary",
] as const;

export type DanceFormKey = (typeof DANCE_FORM_KEYS)[number];

export type DanceFacet = {
  id: string;
  label: string;
  /** Safe image-search phrase — descriptive, not doctrinal claims */
  query: string;
};

/** Priority discovery facets per form. Labels are creative filters, not authoritative definitions. */
export const FORM_FACETS: Record<string, DanceFacet[]> = {
  Bharatanatyam: [
    { id: "mudras", label: "Mudras", query: "Bharatanatyam mudra hand gesture close up" },
    { id: "adavus", label: "Adavus", query: "Bharatanatyam dance footwork practice" },
    { id: "abhinaya", label: "Abhinaya", query: "Bharatanatyam abhinaya facial expression" },
    { id: "costume", label: "Costume", query: "Bharatanatyam silk costume performance" },
    { id: "jewellery", label: "Temple jewellery", query: "South Indian temple jewellery gold necklace jhumka" },
    { id: "salangai", label: "Salangai", query: "salangai ankle bells Bharatanatyam close up" },
    { id: "stage", label: "Stage", query: "Bharatanatyam stage performance" },
    { id: "photo", label: "Photography", query: "Bharatanatyam dance photography stage" },
    { id: "temple", label: "Temple", query: "South Indian temple gopuram carved pillars" },
    { id: "varnam", label: "Varnam mood", query: "Bharatanatyam classical dance stage composition" },
  ],
  Kathak: [
    { id: "tatkar", label: "Footwork", query: "Kathak dance footwork" },
    { id: "chakkars", label: "Turns", query: "Kathak dance spins chakkars" },
    { id: "abhinaya", label: "Abhinaya", query: "Kathak abhinaya expression" },
    { id: "ghungroo", label: "Ghungroo", query: "ghungroo ankle bells Kathak" },
    { id: "costume", label: "Costume", query: "Kathak dance costume anarkali" },
    { id: "stage", label: "Stage", query: "Kathak stage performance photography" },
    { id: "rhythm", label: "Rhythm", query: "Kathak dance tabla rhythm performance" },
    { id: "photo", label: "Photography", query: "Kathak dance photography" },
  ],
  Odissi: [
    { id: "pose", label: "Posture studies", query: "Odissi dance pose" },
    { id: "mudras", label: "Mudras", query: "Odissi mudra hand gesture" },
    { id: "costume", label: "Costume", query: "Odissi dance costume" },
    { id: "sculpture", label: "Temple sculpture", query: "Odisha temple dance sculpture" },
    { id: "jewellery", label: "Jewellery", query: "Odissi dance jewellery" },
    { id: "stage", label: "Stage", query: "Odissi stage performance" },
    { id: "photo", label: "Photography", query: "Odissi dance photography" },
  ],
  Kuchipudi: [
    { id: "costume", label: "Costume", query: "Kuchipudi dance costume" },
    { id: "abhinaya", label: "Abhinaya", query: "Kuchipudi abhinaya expression" },
    { id: "stage", label: "Stage", query: "Kuchipudi stage performance" },
    { id: "photo", label: "Photography", query: "Kuchipudi dance photography" },
    { id: "jewellery", label: "Jewellery", query: "South Indian dance jewellery" },
  ],
  Mohiniyattam: [
    { id: "costume", label: "Costume", query: "Mohiniyattam dance costume" },
    { id: "expression", label: "Expression", query: "Mohiniyattam dance expression" },
    { id: "photo", label: "Photography", query: "Mohiniyattam dance photography" },
    { id: "stage", label: "Stage", query: "Mohiniyattam stage performance" },
  ],
  Manipuri: [
    { id: "costume", label: "Costume", query: "Manipuri classical dance costume" },
    { id: "photo", label: "Photography", query: "Manipuri dance performance" },
    { id: "stage", label: "Stage", query: "Manipuri dance stage" },
  ],
  Sattriya: [
    { id: "costume", label: "Costume", query: "Sattriya dance costume Assam" },
    { id: "photo", label: "Photography", query: "Sattriya dance performance" },
    { id: "stage", label: "Stage", query: "Sattriya classical dance stage" },
  ],
  Kathakali: [
    { id: "makeup", label: "Makeup", query: "Kathakali makeup face paint" },
    { id: "costume", label: "Costume", query: "Kathakali dance costume" },
    { id: "expression", label: "Expression", query: "Kathakali facial expression" },
    { id: "photo", label: "Photography", query: "Kathakali performance photography" },
  ],
  Chhau: [
    { id: "mask", label: "Mask / costume", query: "Chhau dance mask costume" },
    { id: "photo", label: "Photography", query: "Chhau dance performance" },
    { id: "movement", label: "Movement", query: "Chhau dance martial movement" },
  ],
  "Indian Contemporary": [
    { id: "fusion", label: "Fusion", query: "Indian contemporary dance fusion" },
    { id: "photo", label: "Photography", query: "contemporary Indian dance photography" },
    { id: "stage", label: "Stage", query: "contemporary dance stage lighting India" },
    { id: "costume", label: "Costume", query: "contemporary Indian dance costume" },
  ],
};

const FALLBACK_FACETS: DanceFacet[] = [
  { id: "classical", label: "Classical", query: "Indian classical dance performance" },
  { id: "costume", label: "Costume", query: "Indian classical dance costume" },
  { id: "photo", label: "Photography", query: "Indian classical dance photography" },
  { id: "temple", label: "Temple", query: "South Indian temple gopuram Dravidian architecture" },
  { id: "stage", label: "Stage", query: "classical dance stage performance" },
  { id: "expression", label: "Expression", query: "classical dance expression portrait" },
];

export function normalizeDanceForm(raw?: string | null): string {
  const value = (raw || "").trim();
  if (!value) return "Indian classical dance";
  const lower = value.toLowerCase();
  const hit = DANCE_FORM_KEYS.find((f) => f.toLowerCase() === lower);
  if (hit) return hit;
  if (lower.includes("contemporary") || lower.includes("fusion")) return "Indian Contemporary";
  if (lower.includes("bharata")) return "Bharatanatyam";
  return value;
}

export function facetsForForm(danceForm?: string | null): DanceFacet[] {
  const form = normalizeDanceForm(danceForm);
  return FORM_FACETS[form] || FALLBACK_FACETS;
}

export const INTEREST_QUERY_MAP: Record<string, string> = {
  poses: "classical dance pose photography",
  abhinaya: "classical dance abhinaya expression",
  mudras: "Bharatanatyam mudra hand gesture close up",
  costumes: "Bharatanatyam silk costume performance",
  jewelry: "South Indian temple jewellery gold necklace jhumka",
  jewellery: "South Indian temple jewellery gold necklace jhumka",
  makeup: "classical dance stage makeup",
  choreography: "classical Indian dance choreography stage",
  rehearsal: "dance rehearsal practice studio",
  stage_design: "dance stage design lighting",
  photography: "Indian classical dance photography",
  event_albums: "classical dance performance stage",
  classical_videos: "classical Indian dance performance",
  music: "Indian classical music dance performance",
  rhythm: "classical dance rhythm footwork",
  storytelling: "classical dance storytelling expression",
  textiles: "Indian silk textile costume",
  temple_architecture: "South Indian temple gopuram Dravidian architecture",
  lighting: "stage lighting dance performance",
  hair: "classical dance hair ornament",
  nritta: "classical dance nritta movement",
  nritya: "classical dance nritya expression",
  adavus: "Bharatanatyam adavu practice",
  jathis: "classical dance rhythmic composition",
};
