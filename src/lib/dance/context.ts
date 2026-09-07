import { facetsForForm, INTEREST_QUERY_MAP, normalizeDanceForm } from "./forms";
import type { DanceIntent } from "./intents";

export type DiscoverSection = {
  id: string;
  title: string;
  subtitle?: string;
  query: string;
};

export type DancerContextInput = {
  name?: string | null;
  danceForm?: string | null;
  interests?: string[];
  boardTitles?: string[];
  boardTags?: string[];
  savedCategories?: string[];
};

const PROJECT_HINTS = [
  { match: /arangetram/i, label: "Arangetram" },
  { match: /varnam/i, label: "Varnam" },
  { match: /tillana/i, label: "Tillana" },
  { match: /padam/i, label: "Padam" },
  { match: /recital|performance|show/i, label: "Performance" },
  { match: /photoshoot|portfolio/i, label: "Photoshoot" },
];

export function inferProjectHint(boardTitles: string[] = []): string | null {
  for (const title of boardTitles) {
    for (const hint of PROJECT_HINTS) {
      if (hint.match.test(title)) return title;
    }
  }
  return boardTitles[0] || null;
}

export function buildDiscoverSections(input: DancerContextInput): DiscoverSection[] {
  const form = normalizeDanceForm(input.danceForm);
  const facets = facetsForForm(form);
  const interests = input.interests || [];
  const project = inferProjectHint(input.boardTitles);
  const sections: DiscoverSection[] = [
    {
      id: "for-your-dance",
      title: "For your dance",
      subtitle: form,
      query: `${form} classical dance photography`,
    },
  ];

  if (interests.length) {
    const first = interests[0];
    const mapped = INTEREST_QUERY_MAP[first] || first;
    sections.push({
      id: "your-interests",
      title: "Your interests",
      subtitle: interests.slice(0, 3).join(" · "),
      query: `${form} ${mapped}`,
    });
  }

  if (project) {
    sections.push({
      id: "current-project",
      title: "Your current project",
      subtitle: project,
      query: `${form} ${project} stage costume photography`,
    });
  }

  const photoFacet = facets.find((f) => f.id === "photo") || facets[0];
  sections.push({
    id: "keep-exploring",
    title: "Keep exploring",
    subtitle: "Fresh visual research",
    query: photoFacet.query,
  });

  const otherForm =
    form === "Bharatanatyam" ? "Kathak" : form === "Kathak" ? "Odissi" : "Bharatanatyam";
  sections.push({
    id: "explore-new-form",
    title: "Explore a new form",
    subtitle: otherForm,
    query: `${otherForm} dance photography costume`,
  });

  return sections;
}

export function scoreInspirationRelevance(input: {
  title: string;
  tags?: string[];
  category?: string;
  danceForm?: string | null;
  interests?: string[];
  projectHint?: string | null;
  boardTopics?: string[];
  query?: string;
}): number {
  const hay = `${input.title} ${input.category || ""} ${(input.tags || []).join(" ")}`.toLowerCase();
  let score = 0;
  const form = normalizeDanceForm(input.danceForm).toLowerCase();
  if (form && hay.includes(form.split(" ")[0])) score += 5;
  for (const interest of input.interests || []) {
    if (hay.includes(interest.toLowerCase().replace(/_/g, " "))) score += 3;
  }
  if (input.projectHint && hay.includes(input.projectHint.toLowerCase().split(" ")[0])) score += 4;
  for (const topic of input.boardTopics || []) {
    if (topic && hay.includes(topic.toLowerCase().split(" ")[0])) score += 3;
  }
  if (input.query) {
    for (const token of input.query.toLowerCase().split(/\s+/).filter((t) => t.length > 3)) {
      if (hay.includes(token)) score += 1;
    }
    score += 5; // base search relevance when coming from an active query
  }
  return score;
}

export function filtersForForm(danceForm?: string | null, intent?: DanceIntent) {
  const form = normalizeDanceForm(danceForm);
  const facets = facetsForForm(form);
  const general = [
    { id: "all", label: "All", query: form },
    { id: "photography", label: "Photography", query: `${form} dance photography` },
    { id: "costume", label: "Costume", query: `${form} costume` },
    { id: "stage", label: "Stage", query: `${form} stage performance` },
    { id: "jewellery", label: "Jewellery", query: `${form} jewellery` },
    { id: "practice", label: "Practice", query: `${form} practice rehearsal` },
  ];

  const formSpecific = facets.map((f) => ({ id: f.id, label: f.label, query: f.query }));

  // Prefer form facets; keep general for breadth
  const merged = [...formSpecific];
  for (const g of general) {
    if (!merged.some((m) => m.id === g.id)) merged.push(g);
  }

  if (intent === "PHOTOGRAPHY") {
    return merged.filter((m) => /photo|pose|portrait|mudra|expression/i.test(m.label + m.id)).concat(merged).slice(0, 12);
  }
  return merged.slice(0, 14);
}
