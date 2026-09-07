import type { InspirationResult } from "@/lib/search/inspiration";
import { detectIntent } from "./intents";

export type CreativeLens =
  | "COSTUME"
  | "STAGE"
  | "PHOTOGRAPHY"
  | "CHOREOGRAPHY"
  | "MOOD"
  | "COLOR PALETTE"
  | "POSE"
  | "STORYTELLING";

export type ImageDancePrompt = {
  lens: CreativeLens;
  suggestion: string;
};

function textOf(item: InspirationResult) {
  return `${item.title} ${item.category} ${(item.tags || []).join(" ")}`.toLowerCase();
}

/**
 * Creative interpretations for an image — prompts for practice/creation,
 * not authoritative cultural explanations.
 */
export function promptsForImage(item: InspirationResult): ImageDancePrompt[] {
  const t = textOf(item);
  const prompts: ImageDancePrompt[] = [];

  if (/temple|architecture|corridor|pillar|stone|sculpture|mandapa/.test(t)) {
    prompts.push({
      lens: "STAGE",
      suggestion:
        "Use the symmetry of this space as inspiration for a centered stage composition and clear entrance path.",
    });
    prompts.push({
      lens: "PHOTOGRAPHY",
      suggestion:
        "Create a dancer portrait using architecture as a natural frame — keep lines clean and centered.",
    });
    prompts.push({
      lens: "COLOR PALETTE",
      suggestion:
        "Explore stone, ivory, and antique gold tones for costume/jewellery mood boards.",
    });
  }

  if (/costume|silk|saree|sari|dress|fabric|textile/.test(t)) {
    prompts.push({
      lens: "COSTUME",
      suggestion:
        "Save this as a costume silhouette or drape reference. Note fabric weight and border emphasis separately.",
    });
    prompts.push({
      lens: "COLOR PALETTE",
      suggestion: "Pull 3 dominant colors from this image into your next costume board.",
    });
  }

  if (/jewel|ornament|gold|necklace|earring/.test(t)) {
    prompts.push({
      lens: "COSTUME",
      suggestion:
        "Use this as a jewellery density reference — decide what stays close-up vs what reads from stage distance.",
    });
  }

  if (/portrait|face|expression|abhinaya|eye/.test(t)) {
    prompts.push({
      lens: "STORYTELLING",
      suggestion:
        "Treat this as a mood reference for expressive work. Discuss repertoire-specific interpretation with your guru.",
    });
    prompts.push({
      lens: "PHOTOGRAPHY",
      suggestion: "Recreate the lighting direction on the face for a portfolio close-up.",
    });
  }

  if (/dance|pose|performance|stage|mudra|hand/.test(t)) {
    prompts.push({
      lens: "POSE",
      suggestion:
        "Study line and negative space. Adapt the geometry to your form — do not copy another dancer’s signature phrase.",
    });
    prompts.push({
      lens: "CHOREOGRAPHY",
      suggestion:
        "Ask: what entrance or stillness could lead into a shape with this kind of clarity?",
    });
  }

  if (/light|spotlight|dark|night|lamp/.test(t)) {
    prompts.push({
      lens: "MOOD",
      suggestion: "Borrow the light contrast for stage or photoshoot mood — warm key vs deep shadow.",
    });
  }

  if (!prompts.length) {
    const intent = detectIntent(item.title);
    prompts.push({
      lens: "MOOD",
      suggestion: `Use this as a ${intent.toLowerCase()} mood reference for your next board or rehearsal plan.`,
    });
    prompts.push({
      lens: "PHOTOGRAPHY",
      suggestion: "Note composition and negative space — what would change if a dancer entered this frame?",
    });
  }

  // Dedupe by lens
  const seen = new Set<string>();
  return prompts.filter((p) => {
    if (seen.has(p.lens)) return false;
    seen.add(p.lens);
    return true;
  }).slice(0, 4);
}
