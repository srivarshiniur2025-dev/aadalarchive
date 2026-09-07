import { detectIntent, type DanceIntent } from "./intents";
import { facetsForForm, INTEREST_QUERY_MAP, normalizeDanceForm } from "./forms";

export type ExpansionContext = {
  danceForm?: string | null;
  interests?: string[];
  projectHint?: string | null;
  boardTitles?: string[];
  category?: string | null;
  intent?: DanceIntent;
};

const INTENT_SUFFIX: Record<DanceIntent, string[]> = {
  INSPIRATION: ["inspiration", "visual reference", "creative mood"],
  CHOREOGRAPHY: ["choreography inspiration", "stage composition", "movement photography"],
  COSTUME: ["costume", "silk costume", "performance costume", "costume color"],
  PHOTOGRAPHY: ["dance photography", "photoshoot pose", "portrait composition"],
  STAGE: ["stage design", "stage lighting", "performance stage"],
  PERFORMANCE: ["stage performance", "recital stage", "performance photography"],
  PRACTICE: ["practice studio", "rehearsal", "dance training"],
  ABHINAYA: ["abhinaya expression", "expressive portrait", "storytelling dance"],
  MUSIC: ["classical music performance", "rhythm dance", "concert stage"],
  STORYTELLING: ["narrative dance", "devotional dance mood", "expressive storytelling"],
  PORTFOLIO: ["dance portfolio photography", "dancer portrait", "press photography"],
  RESEARCH: ["classical dance heritage", "South Indian temple gopuram", "cultural archive"],
  JEWELLERY: ["temple jewellery", "classical dance ornaments", "gold jewellery dance"],
  LIGHTING: ["stage lighting dance", "theatrical lighting", "spotlight performance"],
  MAKEUP: ["classical dance makeup", "stage makeup", "performance eye makeup"],
};

function uniq(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of list) {
    const key = item.toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item.trim());
  }
  return out;
}

/** Steer temple searches toward Dravidian / South Indian architecture (not Taj Mahal). */
function southIndianizeTempleQuery(q: string): string {
  const lower = q.toLowerCase();
  if (!/temple|gopuram|mandapa|dravidian|chola|meenakshi|brihadeeswara|hampi/.test(lower)) {
    return q;
  }
  if (/taj|agra|mughal|marble mausoleum/.test(lower)) {
    return "South Indian temple gopuram Dravidian architecture Tamil Nadu";
  }
  if (/south indian|dravidian|gopuram|meenakshi|thanjavur|madurai|hampi|chola|tamil|kerala|karnataka/.test(lower)) {
    return q;
  }
  return `South Indian ${q} gopuram carved stone temple`;
}

const SOUTH_INDIAN_TEMPLE_QUERIES = [
  "South Indian temple gopuram Dravidian architecture",
  "Meenakshi temple Madurai gopuram",
  "Brihadeeswara temple Thanjavur",
  "Hampi stone temple carved pillars",
  "Tamil Nadu temple corridor carved pillars",
];

/** Expand a dancer query into multiple API-ready search phrases. */
export function expandDanceQuery(rawQuery: string, ctx: ExpansionContext = {}): string[] {
  const form = normalizeDanceForm(ctx.danceForm);
  const intent = ctx.intent || detectIntent(rawQuery);
  const q = southIndianizeTempleQuery(rawQuery.trim());
  const facets = facetsForForm(form);
  const expansions: string[] = [];

  if (q) {
    expansions.push(q);
    // If query is short / generic, bind to dance form
    const generic =
      q.split(/\s+/).length <= 2 &&
      !new RegExp(form.split(/\s+/)[0], "i").test(q) &&
      !/indian|classical|temple|dance|gopuram/i.test(q);
    if (generic) {
      expansions.push(`${form} ${q}`);
    }
  } else {
    expansions.push(form);
  }

  for (const suffix of INTENT_SUFFIX[intent].slice(0, 3)) {
    expansions.push(southIndianizeTempleQuery(`${form} ${suffix}`));
  }

  // Interest-aware expansions
  for (const interest of ctx.interests || []) {
    const mapped = INTEREST_QUERY_MAP[interest] || INTEREST_QUERY_MAP[interest.toLowerCase()];
    if (mapped) expansions.push(southIndianizeTempleQuery(`${form} ${mapped}`));
  }

  // Facet expansions for current form
  for (const facet of facets.slice(0, 5)) {
    if (!q || facet.label.toLowerCase().includes(q.toLowerCase()) || intent !== "INSPIRATION") {
      expansions.push(facet.query);
    }
  }

  if (ctx.category) {
    expansions.push(southIndianizeTempleQuery(`${form} ${ctx.category}`));
  }

  if (ctx.projectHint) {
    expansions.push(`${form} ${ctx.projectHint}`);
    expansions.push(`${ctx.projectHint} stage costume photography`);
  }

  for (const title of (ctx.boardTitles || []).slice(0, 3)) {
    expansions.push(`${form} ${title}`);
  }

  if (/temple|gopuram|architecture/i.test(q) || intent === "RESEARCH") {
    expansions.push(...SOUTH_INDIAN_TEMPLE_QUERIES);
  }

  return uniq(expansions).slice(0, 10);
}

/** Pick which expanded query to use for a given page (keeps infinite scroll fresh). */
export function queryForPage(expansions: string[], page: number): { primary: string; secondary?: string } {
  if (!expansions.length) return { primary: "Indian classical dance" };
  const i = (Math.max(1, page) - 1) % expansions.length;
  const j = page % expansions.length;
  return {
    primary: expansions[i],
    secondary: expansions[j] !== expansions[i] ? expansions[j] : expansions[(j + 1) % expansions.length],
  };
}
