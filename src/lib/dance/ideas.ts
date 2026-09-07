import type { DanceIntent } from "./intents";
import { normalizeDanceForm } from "./forms";

export type IdeaCategory =
  | "CHOREOGRAPHY"
  | "PERFORMANCE"
  | "COSTUME"
  | "PHOTOGRAPHY"
  | "STAGE"
  | "LIGHTING"
  | "ABHINAYA"
  | "MUSIC"
  | "STORY"
  | "PORTFOLIO"
  | "COLLABORATION"
  | "PRACTICE";

export type DanceIdea = {
  id: string;
  title: string;
  description: string;
  category: IdeaCategory;
  danceForm: string;
  relatedQueries: string[];
  aiGenerated: true;
  label: "AI CREATIVE SUGGESTION";
};

type IdeaSeed = {
  category: IdeaCategory;
  title: string;
  description: (form: string) => string;
  query: (form: string) => string;
  intents?: DanceIntent[];
};

/**
 * Curated creative prompts — not historical or doctrinal authority.
 * Practice prompts avoid medical/physical prescriptions.
 */
const SEEDS: IdeaSeed[] = [
  {
    category: "CHOREOGRAPHY",
    title: "Stillness before rhythm",
    description: (form) =>
      `For a ${form} phrase: begin in stillness for 4 counts, then introduce rhythmic footwork gradually. Use the contrast as your opening arc.`,
    query: (form) => `${form} stage composition stillness`,
    intents: ["CHOREOGRAPHY", "INSPIRATION", "PERFORMANCE"],
  },
  {
    category: "CHOREOGRAPHY",
    title: "Symmetry and break",
    description: (form) =>
      `Sketch a ${form} section that starts in symmetrical spacing, then breaks the mirror line with a single traveler pathway across stage.`,
    query: (form) => `${form} stage formation dance`,
    intents: ["CHOREOGRAPHY", "STAGE"],
  },
  {
    category: "STAGE",
    title: "Temple corridor framing",
    description: () =>
      `Use architectural symmetry (columns, corridors, doorways) as a mental stage plan: center line clear, depth layers for entrance and exit.`,
    query: () => `South Indian temple corridor architecture`,
    intents: ["STAGE", "PERFORMANCE", "RESEARCH"],
  },
  {
    category: "PHOTOGRAPHY",
    title: "Architecture as a frame",
    description: (form) =>
      `Plan a ${form} portrait where stone or doorway edges act as a natural frame. Keep the dancer centered; let architecture do the border work.`,
    query: (form) => `${form} dance photography temple`,
    intents: ["PHOTOGRAPHY", "PORTFOLIO"],
  },
  {
    category: "COSTUME",
    title: "Palette study: gold and depth",
    description: (form) =>
      `Build a ${form} costume mood board around antique gold accents against a deep solid base color. Collect 6 fabric/jewellery references before deciding.`,
    query: (form) => `${form} costume jewellery gold`,
    intents: ["COSTUME", "JEWELLERY"],
  },
  {
    category: "COSTUME",
    title: "Detail board: ornaments",
    description: (form) =>
      `Create a board titled “Ornaments for ${form}” and save only close-up jewellery/hair references. Review silhouette separately from sparkle.`,
    query: (form) => `${form} temple jewellery close up`,
    intents: ["COSTUME", "JEWELLERY"],
  },
  {
    category: "ABHINAYA",
    title: "Expression study in silence",
    description: () =>
      `Practice one short narrative phrase without music. Focus on eyes and breath timing. This is a creative study — not a substitute for guru guidance on repertoire meaning.`,
    query: () => `classical dance abhinaya expression portrait`,
    intents: ["ABHINAYA", "PRACTICE", "STORYTELLING"],
  },
  {
    category: "ABHINAYA",
    title: "Portrait references for mood",
    description: () =>
      `Collect 8 portrait references that match the emotional tone of your piece (devotional, playful, majestic). Use them as mood — not as fixed facial templates.`,
    query: () => `classical dancer expressive portrait`,
    intents: ["ABHINAYA", "PHOTOGRAPHY"],
  },
  {
    category: "PRACTICE",
    title: "Slow-motion clarity",
    description: () =>
      `Practice the same sequence at a slower tempo. Watch mudra and line clarity on video. Adjust pacing with your teacher’s guidance.`,
    query: () => `classical dance practice rehearsal`,
    intents: ["PRACTICE"],
  },
  {
    category: "PRACTICE",
    title: "Upper-body take",
    description: () =>
      `Record one take focusing only on upper-body alignment and gesture clarity. Review once, note two adjustments, then film again.`,
    query: () => `dance rehearsal studio practice`,
    intents: ["PRACTICE"],
  },
  {
    category: "PRACTICE",
    title: "Transition loop",
    description: () =>
      `Isolate one transition. Repeat it without music until the entry and exit feel intentional. Then restore the musical cue.`,
    query: () => `classical dance footwork practice`,
    intents: ["PRACTICE", "CHOREOGRAPHY"],
  },
  {
    category: "PRACTICE",
    title: "Front and side review",
    description: () =>
      `Record the phrase from front and side angles. Compare line continuity — especially spine and arm pathways.`,
    query: () => `dance practice video studio`,
    intents: ["PRACTICE"],
  },
  {
    category: "LIGHTING",
    title: "Warm key, cool depth",
    description: () =>
      `For photoshoot or stage: try a warm key light on the dancer with cooler fill in the background to separate figure from space.`,
    query: () => `stage lighting dance warm spotlight`,
    intents: ["LIGHTING", "PHOTOGRAPHY", "STAGE"],
  },
  {
    category: "PERFORMANCE",
    title: "Entrance as ceremony",
    description: (form) =>
      `Design your ${form} entrance as a short ceremony: walk, pause, acknowledge space, then begin. Collect stage photos that feel ceremonial rather than casual.`,
    query: (form) => `${form} stage entrance performance`,
    intents: ["PERFORMANCE", "STAGE"],
  },
  {
    category: "STORY",
    title: "Devotional tone board",
    description: () =>
      `If building a devotionally toned piece, gather temple, lamp, and soft-gold visual references. Treat them as atmosphere — consult your guru for repertoire-appropriate interpretation.`,
    query: () => `temple lamps South Indian architecture`,
    intents: ["STORYTELLING", "PERFORMANCE", "RESEARCH"],
  },
  {
    category: "PORTFOLIO",
    title: "Three-shot portfolio set",
    description: (form) =>
      `Plan a ${form} portfolio set: 1 full-body stage, 1 mid-shot gesture, 1 close portrait. Keep costume consistent across the three.`,
    query: (form) => `${form} dance portfolio photography`,
    intents: ["PORTFOLIO", "PHOTOGRAPHY"],
  },
  {
    category: "MUSIC",
    title: "Structure notes, not downloads",
    description: () =>
      `Create a board note for musical structure (opening, development, climax, close). Link references you have rights to use — do not download copyrighted tracks here.`,
    query: () => `Indian classical music concert stage`,
    intents: ["MUSIC"],
  },
  {
    category: "COLLABORATION",
    title: "Shared visual brief",
    description: () =>
      `Make a board for collaborators (photographer, costume, lighting) with 12 reference images and 5 written constraints (mood, color, must-avoid).`,
    query: () => `classical dance photoshoot behind the scenes`,
    intents: ["PHOTOGRAPHY", "COSTUME"],
  },
  {
    category: "PHOTOGRAPHY",
    title: "Motion blur vs freeze",
    description: (form) =>
      `For a ${form} shoot: plan two looks — one frozen mudra/line, one intentional motion blur on turns or footwork.`,
    query: (form) => `${form} dance movement photography`,
    intents: ["PHOTOGRAPHY"],
  },
  {
    category: "STAGE",
    title: "Minimal modern stage",
    description: () =>
      `Contrast traditional ornament with a minimal stage: clean floor, one light pool, restrained décor. Save both ornate and minimal references.`,
    query: () => `minimal dance stage lighting modern`,
    intents: ["STAGE", "PERFORMANCE"],
  },
];

function hashIdea(seed: IdeaSeed, form: string, batch: number, index: number) {
  return `idea:${seed.category}:${seed.title}:${form}:${batch}:${index}`
    .toLowerCase()
    .replace(/[^a-z0-9:]+/g, "-");
}

export function generateDanceIdeas(input: {
  danceForm?: string | null;
  intent?: DanceIntent;
  batch?: number;
  limit?: number;
  excludeIds?: string[];
  projectHint?: string | null;
}): DanceIdea[] {
  const form = normalizeDanceForm(input.danceForm);
  const batch = input.batch ?? 1;
  const limit = Math.min(input.limit ?? 6, 12);
  const exclude = new Set(input.excludeIds || []);
  const intent = input.intent;

  const ranked = [...SEEDS].sort((a, b) => {
    const aScore = intent && a.intents?.includes(intent) ? 2 : 0;
    const bScore = intent && b.intents?.includes(intent) ? 2 : 0;
    return bScore - aScore;
  });

  // Rotate seeds by batch for “infinite ideas”
  const offset = ((batch - 1) * limit) % ranked.length;
  const rotated = [...ranked.slice(offset), ...ranked.slice(0, offset)];

  const ideas: DanceIdea[] = [];
  for (let i = 0; i < rotated.length && ideas.length < limit; i++) {
    const seed = rotated[i];
    const id = hashIdea(seed, form, batch, i);
    if (exclude.has(id)) continue;

    let description = seed.description(form);
    if (input.projectHint) {
      description += ` Tie this toward your current focus: “${input.projectHint}”.`;
    }

    ideas.push({
      id,
      title: seed.title,
      description,
      category: seed.category,
      danceForm: form,
      relatedQueries: [seed.query(form)],
      aiGenerated: true,
      label: "AI CREATIVE SUGGESTION",
    });
  }

  return ideas;
}
