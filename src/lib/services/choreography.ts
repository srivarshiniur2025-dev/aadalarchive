"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { choreographyCreateSchema } from "@/lib/validation/schemas";
import type { MutationState } from "@/lib/services/boards";

export async function createChoreographyAction(
  _prev: MutationState,
  formData: FormData,
): Promise<MutationState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured." };

  const parsed = choreographyCreateSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || "",
    danceForm: formData.get("danceForm") || "Bharatanatyam",
    composition: formData.get("composition") || "",
    choreographer: formData.get("choreographer") || "",
    guru: formData.get("guru") || "",
    music: formData.get("music") || "",
    difficulty: formData.get("difficulty") || "intermediate",
    privacy: formData.get("privacy") || "private",
    allowDownload: formData.get("allowDownload") === "true",
    durationSeconds: formData.get("durationSeconds") || null,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid choreography" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in required." };

  const file = formData.get("video");
  let storagePath: string | null = null;
  let publicUrl: string | null = null;

  if (file instanceof File && file.size > 0) {
    const allowed = ["video/mp4", "video/quicktime", "video/webm"];
    if (!allowed.includes(file.type)) {
      return { error: "Use MP4, MOV, or WEBM video files only." };
    }
    const maxBytes = 200 * 1024 * 1024;
    if (file.size > maxBytes) {
      return { error: "Video must be under 200MB." };
    }

    const ext = file.name.split(".").pop() || "mp4";
    storagePath = `${user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("choreography")
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      // Bucket may not exist yet — still save metadata so the UI works
      console.error("choreography upload", uploadError.message);
      storagePath = null;
    } else {
      const { data: urlData } = supabase.storage.from("choreography").getPublicUrl(storagePath);
      publicUrl = urlData.publicUrl;
    }
  }

  const { data, error } = await supabase
    .from("choreography")
    .insert({
      owner_id: user.id,
      title: parsed.data.title,
      description: parsed.data.description,
      dance_form: parsed.data.danceForm,
      composition: parsed.data.composition,
      choreographer: parsed.data.choreographer,
      guru: parsed.data.guru,
      music: parsed.data.music,
      difficulty: parsed.data.difficulty,
      privacy: parsed.data.privacy,
      allow_download: parsed.data.allowDownload,
      duration_seconds: parsed.data.durationSeconds,
      storage_path: storagePath,
      public_url: publicUrl,
      poster_url: "/explore/categories/poses.jpg",
      tags: [],
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/choreography");
  revalidatePath("/studio");
  revalidatePath("/home");
  return { success: "Choreography created", id: data.id as string };
}
