import { detectIntent, type DanceIntent } from "./intents";
import { INTEREST_QUERY_MAP, normalizeDanceForm } from "./forms";

export type ExpansionContext = {
  danceForm?: string | null;
  interests?: string[];
  projectHint?: string | null;
  boardTitles?: string[];
  category?: string | null;
  intent?: DanceIntent;
};

/** Topic-locked stock-photo phrases — keep providers on the same subject. */
const TOPIC_QUERIES: Record<DanceIntent, (form: string) => string[]> = {
  JEWELLERY: (form) => [
    `South Indian temple jewellery gold necklace close up`,
    `traditional Indian temple jewelry jhumka earrings`,
    `${form} dancer temple jewellery ornaments`,
    `Indian classical dance gold haar necklace`,
    `temple jewellery South Indian gold set`,
  ],
  MUDRAS: (form) => [
    `${form} mudra hand gesture close up`,
    `${form} hasta mudra hands detail`,
    `Indian classical dance hand mudra close up`,
    `Bharatanatyam dancer hands mudra`,
    `classical Indian dance hasta gesture fingers`,
  ],
  SALANGAI: (form) => [
    `salangai ankle bells Bharatanatyam close up`,
    `ghungroo ankle bells classical dance feet`,
    `${form} salangai feet detail`,
    `Indian dance ankle bells ghungroo close up`,
  ],
  COSTUME: (form) => [
    `${form} silk costume performance`,
    `${form} dance costume traditional`,
    `Indian classical dance costume silk`,
    `${form} dancer costume stage`,
  ],
  ABHINAYA: (form) => [
    `${form} abhinaya facial expression`,
    `${form} expressive eyes dance portrait`,
    `Indian classical dance abhinaya expression`,
    `classical dancer facial expression bhava`,
  ],
  TEMPLE: () => [
    `South Indian temple gopuram Dravidian architecture`,
    `Meenakshi temple Madurai gopuram`,
    `Brihadeeswara temple Thanjavur stone`,
    `Tamil Nadu temple carved pillars corridor`,
    `Hampi Dravidian temple architecture`,
  ],
  PHOTOGRAPHY: (form) => [
    `${form} dance photography`,
    `${form} dancer portrait stage`,
    `Indian classical dance photoshoot`,
  ],
  STAGE: (form) => [
    `${form} stage design lighting`,
    `classical dance stage backdrop`,
    `Indian classical dance performance stage`,
  ],
  LIGHTING: (form) => [
    `${form} stage lighting performance`,
    `theatrical spotlight classical dance`,
    `dance stage warm lighting`,
  ],
  PRACTICE: (form) => [
    `${form} practice rehearsal studio`,
    `classical dance rehearsal mirror`,
    `Indian dance practice studio`,
  ],
  CHOREOGRAPHY: (form) => [
    `${form} choreography stage movement`,
    `${form} dance sequence performance`,
    `Indian classical dance choreography`,
  ],
  PERFORMANCE: (form) => [
    `${form} stage performance recital`,
    `${form} arangetram performance`,
    `Indian classical dance stage show`,
  ],
  MAKEUP: (form) => [
    `${form} stage makeup`,
    `classical Indian dance eye makeup`,
    `Bharatanatyam dancer makeup bindi`,
  ],
  MUSIC: (form) => [
    `${form} music rhythm performance`,
    `Indian classical dance mridangam stage`,
    `nattuvangam classical dance concert`,
  ],
  STORYTELLING: (form) => [
    `${form} storytelling expression`,
    `devotional classical dance expression`,
    `narrative Indian classical dance`,
  ],
  PORTFOLIO: (form) => [
    `${form} dancer portfolio portrait`,
    `Indian classical dancer headshot`,
    `${form} press photography`,
  ],
  RESEARCH: () => [
    `South Indian temple gopuram heritage`,
    `Indian classical dance cultural heritage`,
    `Dravidian temple architecture archive`,
  ],
  INSPIRATION: (form) => [
    `${form} classical dance photography`,
    `${form} dancer stage performance`,
    `Indian classical dance inspiration`,
  ],
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

function isGenericQuery(q: string, form: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  if (/^(inspiration|ideas?|dance|classical|photos?|images?)$/i.test(lower)) return true;
  if (lower === form.toLowerCase()) return true;
  if (lower === "indian classical dance") return true;
  return false;
}

/** Steer temple architecture searches toward Dravidian / South Indian (not Taj Mahal). */
function southIndianizeTempleQuery(q: string): string {
  const lower = q.toLowerCase();
  if (!/temple|gopuram|mandapa|dravidian|chola|meenakshi|brihadeeswara|hampi|architecture/.test(lower)) {
    return q;
  }
  // Jewellery queries that mention temple must stay jewellery
  if (/jewel|ornament|necklace|jhumka|haar/.test(lower)) return q;
  if (/taj|agra|mughal|marble mausoleum/.test(lower)) {
    return "South Indian temple gopuram Dravidian architecture Tamil Nadu";
  }
  if (/south indian|dravidian|gopuram|meenakshi|thanjavur|madurai|hampi|chola|tamil|kerala|karnataka/.test(lower)) {
    return q;
  }
  return `South Indian ${q} gopuram carved stone temple`;
}

/**
 * Expand a dancer query into a small set of on-topic API phrases.
 * Specific topics (mudras, jewellery, etc.) stay locked — no board/interest pollution.
 */
export function expandDanceQuery(rawQuery: string, ctx: ExpansionContext = {}): string[] {
  const form = normalizeDanceForm(ctx.danceForm);
  const intent = ctx.intent || detectIntent([rawQuery, ctx.category].filter(Boolean).join(" "));
  const raw = (rawQuery || ctx.category || "").trim();
  const q = southIndianizeTempleQuery(raw);
  const expansions: string[] = [];
  const topicPhrases = TOPIC_QUERIES[intent](form).map(southIndianizeTempleQuery);
  const shortTopic = !q || q.split(/\s+/).length <= 2;

  // Short topic words ("mudras", "jewellery") are weak for stock APIs —
  // lead with crafted phrases, then keep the user's words as support.
  if (shortTopic && intent !== "INSPIRATION") {
    expansions.push(...topicPhrases);
    if (q) {
      expansions.push(q);
      if (!new RegExp(form.split(/\s+/)[0], "i").test(q)) {
        expansions.push(`${form} ${q}`);
      }
    }
  } else {
    if (q && !isGenericQuery(q, form)) {
      expansions.push(q);
      if (!new RegExp(form.split(/\s+/)[0], "i").test(q)) {
        expansions.push(`${form} ${q}`);
      }
    }
    expansions.push(...topicPhrases);
  }

  // Category hint only when it reinforces the same topic
  if (ctx.category) {
    const catIntent = detectIntent(ctx.category);
    if (catIntent === intent || isGenericQuery(q, form)) {
      expansions.push(southIndianizeTempleQuery(`${form} ${ctx.category}`));
    }
  }

  // Soft personalization ONLY for open/generic browsing
  if (isGenericQuery(q, form)) {
    for (const interest of (ctx.interests || []).slice(0, 3)) {
      const mapped = INTEREST_QUERY_MAP[interest] || INTEREST_QUERY_MAP[interest.toLowerCase()];
      if (mapped) expansions.push(`${form} ${mapped}`);
    }
    if (ctx.projectHint) {
      expansions.push(`${form} ${ctx.projectHint}`);
    }
    for (const title of (ctx.boardTitles || []).slice(0, 2)) {
      expansions.push(`${form} ${title}`);
    }
  }

  return uniq(expansions).slice(0, 6);
}

/**
 * Keep both providers on the same topic.
 * Page rotation only moves between close variants of that topic.
 */
export function queryForPage(
  expansions: string[],
  page: number,
): { primary: string; secondary: string } {
  if (!expansions.length) {
    return {
      primary: "Indian classical dance photography",
      secondary: "Indian classical dancer stage performance",
    };
  }
  const i = (Math.max(1, page) - 1) % expansions.length;
  const j = Math.min(i + 1, expansions.length - 1);
  return {
    primary: expansions[i],
    secondary: expansions[j] || expansions[i],
  };
}
