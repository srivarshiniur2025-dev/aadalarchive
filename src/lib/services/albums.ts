"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { albumCreateSchema } from "@/lib/validation/schemas";
import type { MutationState } from "@/lib/services/boards";

export async function createAlbumAction(
  _prev: MutationState,
  formData: FormData,
): Promise<MutationState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };

  const parsed = albumCreateSchema.safeParse({
    name: formData.get("name"),
    eventType: formData.get("eventType") || "Other",
    eventDate: formData.get("eventDate") || "",
    venue: formData.get("venue") || "",
    location: formData.get("location") || "",
    danceForm: formData.get("danceForm") || "",
    description: formData.get("description") || "",
    privacy: formData.get("privacy") || "private",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid album" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const { data, error } = await supabase
    .from("albums")
    .insert({
      owner_id: user.id,
      name: parsed.data.name,
      event_type: parsed.data.eventType,
      event_date: parsed.data.eventDate || null,
      venue: parsed.data.venue,
      location: parsed.data.location,
      dance_form: parsed.data.danceForm,
      description: parsed.data.description,
      privacy: parsed.data.privacy,
      cover_url: "/explore/categories/photography.jpg",
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/albums");
  revalidatePath("/home");
  return { success: "Album created", id: data.id as string };
}
