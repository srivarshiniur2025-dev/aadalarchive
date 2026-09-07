import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { MutationState } from "@/lib/services/boards";

export const saveIdeaSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(2000),
  category: z.string().min(1).max(60),
  danceForm: z.string().max(80).optional(),
  sourceContext: z.string().max(240).optional(),
  relatedQueries: z.array(z.string()).max(12).optional(),
  relatedImageUrl: z.string().url().optional().or(z.literal("")),
  boardId: z.string().uuid().optional(),
  aiGenerated: z.boolean().optional().default(true),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function listSavedIdeas() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("creative_ideas")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listSavedIdeas", error.message);
    return [];
  }
  return data ?? [];
}

export async function saveIdeaAction(input: unknown): Promise<MutationState & { ideaId?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };
  const parsed = saveIdeaSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid idea" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const { data, error } = await supabase
    .from("creative_ideas")
    .insert({
      user_id: user.id,
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      dance_form: parsed.data.danceForm ?? null,
      source_context: parsed.data.sourceContext ?? null,
      related_queries: parsed.data.relatedQueries ?? [],
      related_image_url: parsed.data.relatedImageUrl || null,
      board_id: parsed.data.boardId ?? null,
      ai_generated: parsed.data.aiGenerated ?? true,
      metadata: (parsed.data.metadata ?? {}) as import("@/lib/supabase/database.types").Json,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };
  return { success: "Idea saved", ideaId: data.id, id: data.id };
}

export async function addIdeaToBoardAction(
  ideaId: string,
  boardId: string,
): Promise<MutationState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const { error } = await supabase
    .from("creative_ideas")
    .update({ board_id: boardId })
    .eq("id", ideaId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  return { success: "Added to board" };
}
