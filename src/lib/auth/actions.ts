"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_COOKIE } from "@/lib/auth/constants";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  forgotPasswordSchema,
  loginSchema,
  onboardingSchema,
  signupSchema,
} from "@/lib/validation/schemas";

export type AuthActionState = {
  error?: string;
  success?: string;
};

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

export async function signUpAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured. Add credentials to .env.local (see .env.example)." };
  }

  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { name: parsed.data.name },
      emailRedirectTo: `${siteUrl()}/auth/callback?next=/onboarding`,
    },
  });

  if (error) return { error: error.message };

  redirect("/onboarding");
}

export async function signInAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured. Add credentials to .env.local (see .env.example)." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { error: error.message };

  const next = String(formData.get("next") || "/home");
  redirect(next.startsWith("/") ? next : "/home");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_COOKIE);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
  }
  redirect("/login");
}

export async function signInDemoAction(
  _prev: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  if (process.env.NEXT_PUBLIC_ALLOW_DEMO_LOGIN === "false") {
    return { error: "Demo login is disabled." };
  }

  const email = process.env.DEMO_EMAIL || "demo@aadalarchive.app";
  const password = process.env.DEMO_PASSWORD || "DemoArchive123!";

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const existing = await supabase.auth.signInWithPassword({ email, password });

      if (!existing.error) {
        redirect("/home");
      }

      const created = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: "Demo Dancer" },
        },
      });

      if (!created.error) {
        const again = await supabase.auth.signInWithPassword({ email, password });
        if (!again.error) {
          redirect("/home");
        }
      }
    } catch (err) {
      if (err && typeof err === "object" && "digest" in err) throw err;
    }
  }

  const cookieStore = await cookies();
  cookieStore.set(DEMO_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/home");
}

export async function forgotPasswordAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured. Add credentials to .env.local (see .env.example)." };
  }

  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteUrl()}/auth/callback?next=/settings`,
  });

  if (error) return { error: error.message };

  return { success: "If an account exists for that email, a reset link is on its way." };
}

export async function completeOnboardingAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  const interestsRaw = formData.getAll("interests").map(String);
  const parsed = onboardingSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location") || "",
    bio: formData.get("bio") || "",
    userType: formData.get("userType"),
    danceForm: formData.get("danceForm"),
    interests: interestsRaw,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid profile data" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in to finish onboarding." };

  const { error } = await supabase
    .from("profiles")
    .update({
      name: parsed.data.name,
      location: parsed.data.location,
      bio: parsed.data.bio,
      user_type: parsed.data.userType,
      dance_form: parsed.data.danceForm,
      interests: parsed.data.interests,
      onboarding_completed: true,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  redirect("/home");
}

export async function signInWithGoogleAction(
  _prev: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  if (process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH !== "true") {
    return {
      error:
        "Google sign-in isn’t enabled yet. Use demo or email for now, or enable Google in Supabase → Authentication → Providers.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl()}/auth/callback?next=/home`,
    },
  });

  if (error) {
    const msg = error.message.includes("provider is not enabled")
      ? "Google is not enabled in your Supabase project. Enable it under Authentication → Providers."
      : error.message;
    return { error: msg };
  }

  if (data.url) redirect(data.url);
  return { error: "Could not start Google sign-in." };
}
