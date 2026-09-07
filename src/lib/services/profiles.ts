import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Profile } from "@/lib/supabase/database.types";
import type { User } from "@/lib/types";

export async function getAuthUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("getCurrentProfile", error.message);
    return null;
  }
  return (data as Profile | null) ?? null;
}

/** Maps DB profile → existing UI User shape so pages keep working. */
export function profileToUser(profile: Profile, emailFallback = ""): User {
  const socials = Array.isArray(profile.socials)
    ? (profile.socials as { label: string; url: string }[])
    : [];

  return {
    id: profile.id,
    name: profile.name || "Dancer",
    email: profile.email || emailFallback,
    handle: profile.handle || "dancer",
    avatar: profile.avatar_url || "/explore/categories/expressions.jpg",
    danceForm: profile.dance_form || "Classical dance",
    location: profile.location || "",
    bio: profile.bio || "",
    artisticStatement: profile.artistic_statement || "",
    userType: (profile.user_type as User["userType"]) || "dancer",
    interests: (profile.interests || []) as User["interests"],
    website: profile.website || undefined,
    socials,
  };
}
