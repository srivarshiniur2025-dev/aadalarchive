export type DanceIntent =
  | "INSPIRATION"
  | "CHOREOGRAPHY"
  | "COSTUME"
  | "PHOTOGRAPHY"
  | "STAGE"
  | "PERFORMANCE"
  | "PRACTICE"
  | "ABHINAYA"
  | "MUDRAS"
  | "SALANGAI"
  | "TEMPLE"
  | "MUSIC"
  | "STORYTELLING"
  | "PORTFOLIO"
  | "RESEARCH"
  | "JEWELLERY"
  | "LIGHTING"
  | "MAKEUP";

/** Ordered most-specific first so "temple jewellery" hits JEWELLERY before TEMPLE. */
const INTENT_PATTERNS: Array<{ intent: DanceIntent; patterns: RegExp[] }> = [
  {
    intent: "JEWELLERY",
    patterns: [
      /jewel+e?ry/,
      /ornament/,
      /temple\s*jewel/,
      /haar\b|necklace|jhumka|jhumki|maang\s*tikka|oddiyana|vanki|armlet/,
    ],
  },
  {
    intent: "MUDRAS",
    patterns: [/mudra/, /\bhasta\b/, /hand\s*gesture/, /asamyuta|samyuta/, /kataka\s*mukha|pataka|alapadma/],
  },
  {
    intent: "SALANGAI",
    patterns: [/salangai/, /ghungroo|ghunghru|ghunguru/, /ankle\s*bell/, /nupur/],
  },
  {
    intent: "COSTUME",
    patterns: [/costume/, /saree|sari/, /silk/, /pleat/, /fan\s*skirt/, /color\s*combination/, /outfit/, /pavadai|lehenga/],
  },
  {
    intent: "MAKEUP",
    patterns: [/makeup|make-up/, /eye\s*liner|eyeliner/, /bindi/, /alta\b/],
  },
  {
    intent: "PHOTOGRAPHY",
    patterns: [/photo(shoot|graphy)?/, /portrait/, /pose(s)?\s+for/, /camera/, /portfolio\s*shot/],
  },
  {
    intent: "LIGHTING",
    patterns: [/lighting/, /light\s*design/, /spotlight/, /gel\s*light/],
  },
  {
    intent: "STAGE",
    patterns: [/stage\s*design/, /backdrop/, /set\s*design/, /entrance\s*design/, /proscenium/],
  },
  {
    intent: "ABHINAYA",
    patterns: [/abhinaya/, /expression/, /bhava/, /eye\s*movement/, /navarasa/, /character\s*study/],
  },
  {
    intent: "CHOREOGRAPHY",
    patterns: [/choreograph/, /jathi|jathis/, /adavu/, /composition/, /sequence/, /korvai/, /movement\s*idea/],
  },
  {
    intent: "PRACTICE",
    patterns: [/practice/, /rehearsal/, /improve/, /drill/, /slow(er)?\s*speed/, /alignment/, /studio\s*rehearsal/],
  },
  {
    intent: "PERFORMANCE",
    patterns: [/arangetram/, /performance/, /recital/, /debut/, /show\s*concept/],
  },
  {
    intent: "MUSIC",
    patterns: [/music/, /rhythm/, /tala|taal/, /padam|varnam|tillana/, /nattuvangam|mridangam/],
  },
  {
    intent: "STORYTELLING",
    patterns: [/story/, /narrative/, /devotional\s*piece/, /theme\s*for/, /concept\s*for/],
  },
  {
    intent: "PORTFOLIO",
    patterns: [/portfolio/, /headshot/, /branding/, /press\s*kit/],
  },
  {
    intent: "TEMPLE",
    patterns: [/temple/, /gopuram/, /mandapa/, /dravidian/, /architecture/, /sculpted\s*pillar/],
  },
  {
    intent: "RESEARCH",
    patterns: [/research/, /reference/, /history/, /study/, /how\s+can\s+i/],
  },
];

export function detectIntent(query: string): DanceIntent {
  const q = query.toLowerCase().trim();
  if (!q) return "INSPIRATION";
  for (const row of INTENT_PATTERNS) {
    if (row.patterns.some((p) => p.test(q))) return row.intent;
  }
  return "INSPIRATION";
}

export function intentLabel(intent: DanceIntent): string {
  return intent.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

/** Keywords used to rank / keep stock-photo results on-topic. */
export function relevanceKeywords(intent: DanceIntent, query: string): string[] {
  const qWords = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

  const byIntent: Record<DanceIntent, string[]> = {
    INSPIRATION: ["dance", "dancer", "classical", "bharatanatyam", "india", "indian"],
    CHOREOGRAPHY: ["dance", "dancer", "choreography", "movement", "classical", "stage"],
    COSTUME: ["costume", "saree", "sari", "silk", "dance", "dancer", "outfit", "traditional"],
    PHOTOGRAPHY: ["dance", "dancer", "photography", "portrait", "pose"],
    STAGE: ["stage", "theatre", "theater", "performance", "backdrop", "dance"],
    PERFORMANCE: ["performance", "stage", "recital", "dance", "dancer"],
    PRACTICE: ["practice", "rehearsal", "studio", "dance", "training"],
    ABHINAYA: ["expression", "abhinaya", "face", "eyes", "dance", "portrait", "emotion"],
    MUDRAS: ["mudra", "hasta", "hand", "gesture", "fingers", "dance", "bharatanatyam", "classical"],
    SALANGAI: ["salangai", "ghungroo", "ghunghru", "ankle", "bell", "nupur", "feet", "dance"],
    TEMPLE: [
      "temple",
      "gopuram",
      "mandapa",
      "dravidian",
      "hindu",
      "carved",
      "pillar",
      "south",
      "india",
      "tamil",
      "kerala",
      "karnataka",
      "madurai",
      "thanjavur",
      "hampi",
    ],
    MUSIC: ["music", "rhythm", "tabla", "mridangam", "concert", "classical", "dance"],
    STORYTELLING: ["story", "expression", "devotional", "dance", "narrative"],
    PORTFOLIO: ["portrait", "dancer", "portfolio", "headshot", "dance"],
    RESEARCH: ["temple", "heritage", "classical", "dance", "culture", "india"],
    JEWELLERY: [
      "jewellery",
      "jewelry",
      "necklace",
      "jhumka",
      "ornament",
      "gold",
      "temple",
      "indian",
      "traditional",
      "dancer",
      "dance",
      "earring",
      "maang",
    ],
    LIGHTING: ["lighting", "spotlight", "stage", "theatre", "theater", "light"],
    MAKEUP: ["makeup", "make-up", "eyes", "bindi", "face", "dance", "stage"],
  };

  return Array.from(new Set([...byIntent[intent], ...qWords]));
}

const STOP = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "your",
  "our",
  "this",
  "that",
  "into",
  "over",
  "under",
  "about",
  "idea",
  "ideas",
  "inspiration",
  "reference",
  "references",
  "search",
]);
