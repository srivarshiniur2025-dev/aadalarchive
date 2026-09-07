"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { boardCreateSchema, saveInspirationSchema } from "@/lib/validation/schemas";

export type MutationState = { error?: string; success?: string; id?: string };

export async function createBoardAction(
  _prev: MutationState,
  formData: FormData,
): Promise<MutationState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };

  const parsed = boardCreateSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || "",
    privacy: formData.get("privacy") || "private",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid board" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const { data, error } = await supabase
    .from("boards")
    .insert({
      owner_id: user.id,
      title: parsed.data.title,
      description: parsed.data.description,
      privacy: parsed.data.privacy,
      tags: parsed.data.tags,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/boards");
  revalidatePath("/home");
  return { success: "Board created", id: data.id };
}

export async function deleteBoardAction(boardId: string): Promise<MutationState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const { error } = await supabase.from("boards").delete().eq("id", boardId).eq("owner_id", user.id);
  if (error) return { error: error.message };

  revalidatePath("/boards");
  revalidatePath("/home");
  return { success: "Board deleted" };
}

export async function saveInspirationAction(input: unknown): Promise<MutationState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };

  const parsed = saveInspirationSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid inspiration" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const { error } = await supabase.from("saved_items").upsert(
    {
      user_id: user.id,
      provider: parsed.data.provider,
      external_id: parsed.data.externalId,
      title: parsed.data.title ?? null,
      image_url: parsed.data.imageUrl,
      source_url: parsed.data.sourceUrl ?? null,
      creator_name: parsed.data.creatorName ?? null,
      category: parsed.data.category ?? null,
      tags: parsed.data.tags ?? [],
      metadata: (parsed.data.metadata ?? {}) as import("@/lib/supabase/database.types").Json,
    },
    { onConflict: "user_id,provider,external_id" },
  );

  if (error) return { error: error.message };

  revalidatePath("/saved");
  revalidatePath("/home");
  return { success: "Saved" };
}

export async function unsaveInspirationAction(
  provider: string,
  externalId: string,
): Promise<MutationState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const { error } = await supabase
    .from("saved_items")
    .delete()
    .eq("user_id", user.id)
    .eq("provider", provider)
    .eq("external_id", externalId);

  if (error) return { error: error.message };
  revalidatePath("/saved");
  return { success: "Removed" };
}

export async function listUserBoards() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("owner_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("listUserBoards", error.message);
    return [];
  }
  return data ?? [];
}

export async function listSavedItems() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("saved_items")
    .select("*")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  if (error) {
    console.error("listSavedItems", error.message);
    return [];
  }
  return data ?? [];
}

export async function addInspirationToBoardAction(input: {
  boardId: string;
  provider: string;
  externalId: string;
  title?: string;
  imageUrl: string;
  sourceUrl?: string;
  note?: string;
}): Promise<MutationState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };
  if (!input.boardId || !input.provider || !input.externalId || !input.imageUrl) {
    return { error: "Missing board or inspiration fields." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const { count } = await supabase
    .from("board_items")
    .select("*", { count: "exact", head: true })
    .eq("board_id", input.boardId);

  const { data, error } = await supabase
    .from("board_items")
    .insert({
      board_id: input.boardId,
      added_by: user.id,
      provider: input.provider,
      external_id: input.externalId,
      title: input.title ?? null,
      image_url: input.imageUrl,
      source_url: input.sourceUrl ?? null,
      note: input.note ?? "",
      position: count ?? 0,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/boards");
  revalidatePath(`/boards`);
  return { success: "Added to board", id: data.id as string };
}
