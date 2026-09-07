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

/** Named colors dancers commonly search for in costumes. */
const COLOR_ALIASES: Array<{ name: string; patterns: RegExp[]; unsplash?: string }> = [
  { name: "red", patterns: [/\bred\b/, /\bmaroon\b/, /\bcrimson\b/], unsplash: "red" },
  { name: "blue", patterns: [/\bblue\b/, /\bnavy\b/, /\bindigo\b/], unsplash: "blue" },
  { name: "green", patterns: [/\bgreen\b/, /\bemerald\b/], unsplash: "green" },
  { name: "yellow", patterns: [/\byellow\b/], unsplash: "yellow" },
  { name: "orange", patterns: [/\borange\b/, /\bsaffron\b/], unsplash: "orange" },
  { name: "purple", patterns: [/\bpurple\b/, /\bviolet\b/, /\blavender\b/], unsplash: "purple" },
  { name: "pink", patterns: [/\bpink\b/, /\bmagenta\b/], unsplash: "magenta" },
  { name: "gold", patterns: [/\bgold\b/, /\bgolden\b/], unsplash: "yellow" },
  { name: "white", patterns: [/\bwhite\b/, /\bivory\b/, /\bcream\b/], unsplash: "white" },
  { name: "black", patterns: [/\bblack\b/], unsplash: "black" },
  { name: "teal", patterns: [/\bteal\b/, /\bturquoise\b/, /\baqua\b/], unsplash: "teal" },
];

export function extractColors(query: string): string[] {
  const q = query.toLowerCase();
  const hits: Array<{ name: string; index: number }> = [];
  for (const c of COLOR_ALIASES) {
    for (const p of c.patterns) {
      const m = q.match(p);
      if (m && m.index != null) {
        hits.push({ name: c.name, index: m.index });
        break;
      }
    }
  }
  hits.sort((a, b) => a.index - b.index);
  return hits.map((h) => h.name);
}

export function unsplashColorsForQuery(query: string): string[] {
  const names = extractColors(query);
  return names
    .map((name) => COLOR_ALIASES.find((c) => c.name === name)?.unsplash)
    .filter((c): c is string => Boolean(c));
}

export const CLASSICAL_DANCE_RE =
  /bharatanatyam|kuchipudi|kathak|odissi|mohiniyattam|manipuri|sattriya|kathakali|chhau|indian classical|classical indian|classical dance|south indian dance/;

export const OFF_TOPIC_DANCE_RE =
  /ballet|ballroom|hip[\s-]?hop|breakdance|break dance|salsa|tango|flamenco|cheerleader|broadway|jazz dance|tap dance|pole dance|belly dance|folklorico|waltz|foxtrot|contemporary ballet|irish dance|scottish dance|ballerina/;

/** Keywords used to rank / keep stock-photo results on-topic. */
export function relevanceKeywords(intent: DanceIntent, query: string): string[] {
  const qWords = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

  const byIntent: Record<DanceIntent, string[]> = {
    INSPIRATION: ["dance", "dancer", "classical", "bharatanatyam", "india", "indian"],
    CHOREOGRAPHY: ["dance", "dancer", "choreography", "movement", "classical", "stage"],
    COSTUME: [
      "costume",
      "saree",
      "sari",
      "silk",
      "dance",
      "dancer",
      "outfit",
      "traditional",
      "bharatanatyam",
      "classical",
      "indian",
    ],
    PHOTOGRAPHY: ["dance", "dancer", "photography", "portrait", "pose", "classical", "indian"],
    STAGE: ["stage", "theatre", "theater", "performance", "backdrop", "dance", "classical"],
    PERFORMANCE: ["performance", "stage", "recital", "dance", "dancer", "classical", "indian"],
    PRACTICE: ["practice", "rehearsal", "studio", "dance", "training", "classical"],
    ABHINAYA: ["expression", "abhinaya", "face", "eyes", "dance", "portrait", "emotion", "classical"],
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
    STORYTELLING: ["story", "expression", "devotional", "dance", "narrative", "classical"],
    PORTFOLIO: ["portrait", "dancer", "portfolio", "headshot", "dance", "classical"],
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

  return Array.from(new Set([...byIntent[intent], ...qWords, ...extractColors(query)]));
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
