export type DanceIntent =
  | "INSPIRATION"
  | "CHOREOGRAPHY"
  | "COSTUME"
  | "PHOTOGRAPHY"
  | "STAGE"
  | "PERFORMANCE"
  | "PRACTICE"
  | "ABHINAYA"
  | "MUSIC"
  | "STORYTELLING"
  | "PORTFOLIO"
  | "RESEARCH"
  | "JEWELLERY"
  | "LIGHTING"
  | "MAKEUP";

const INTENT_PATTERNS: Array<{ intent: DanceIntent; patterns: RegExp[] }> = [
  { intent: "COSTUME", patterns: [/costume/, /saree|sari/, /silk/, /pleat/, /fan skirt/, /color combination/, /outfit/] },
  { intent: "JEWELLERY", patterns: [/jewel+e?ry/, /ornament/, /temple jewel/, /haar|necklace|jhumka/] },
  { intent: "PHOTOGRAPHY", patterns: [/photo(shoot|graphy)?/, /portrait/, /pose(s)? for/, /camera/, /frame/] },
  { intent: "STAGE", patterns: [/stage/, /backdrop/, /set design/, /entrance/, /lighting for stage/] },
  { intent: "LIGHTING", patterns: [/lighting/, /light design/, /spotlight/] },
  { intent: "ABHINAYA", patterns: [/abhinaya/, /expression/, /bhava/, /eye movement/, /character/] },
  { intent: "CHOREOGRAPHY", patterns: [/choreograph/, /jathi|jathi|jathis/, /adavu/, /composition/, /sequence/, /movement idea/] },
  { intent: "PRACTICE", patterns: [/practice/, /rehearsal/, /improve/, /drill/, /slow(er)? speed/, /alignment/] },
  { intent: "PERFORMANCE", patterns: [/arangetram/, /performance/, /recital/, /debut/, /show concept/] },
  { intent: "MUSIC", patterns: [/music/, /rhythm/, /tala|taal/, /composition name/, /padam|varnam|tillana/] },
  { intent: "STORYTELLING", patterns: [/story/, /narrative/, /devotional piece/, /theme/, /concept for/] },
  { intent: "PORTFOLIO", patterns: [/portfolio/, /headshot/, /branding/, /press kit/] },
  { intent: "MAKEUP", patterns: [/makeup|make-up/, /eye liner|eyeliner/, /bindi/] },
  { intent: "RESEARCH", patterns: [/research/, /reference/, /history/, /study/, /how can i/] },
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
