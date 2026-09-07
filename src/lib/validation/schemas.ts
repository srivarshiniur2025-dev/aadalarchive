import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required").max(80),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const onboardingSchema = z.object({
  name: z.string().min(2).max(80),
  location: z.string().max(120).optional().default(""),
  bio: z.string().max(600).optional().default(""),
  userType: z.string().min(1),
  danceForm: z.string().min(1),
  interests: z.array(z.string()).max(24),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  handle: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9_]+$/, "Handle: lowercase letters, numbers, underscore")
    .optional(),
  bio: z.string().max(600).optional(),
  dance_form: z.string().max(80).optional(),
  location: z.string().max(120).optional(),
  website: z.string().url().or(z.literal("")).optional(),
  artistic_statement: z.string().max(1200).optional(),
  user_type: z.string().optional(),
  interests: z.array(z.string()).max(24).optional(),
  portfolio_public: z.boolean().optional(),
});

export const boardCreateSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(800).optional().default(""),
  privacy: z.enum(["private", "invite_only", "public"]).default("private"),
  tags: z.array(z.string()).max(20).optional().default([]),
});

export const albumCreateSchema = z.object({
  name: z.string().min(1).max(120),
  eventType: z
    .enum([
      "Arangetram",
      "Recital",
      "Competition",
      "Festival",
      "Rehearsal",
      "Performance",
      "Photoshoot",
      "Other",
    ])
    .default("Other"),
  eventDate: z.string().optional().default(""),
  venue: z.string().max(160).optional().default(""),
  location: z.string().max(160).optional().default(""),
  danceForm: z.string().max(80).optional().default(""),
  description: z.string().max(800).optional().default(""),
  privacy: z.enum(["private", "invite_only", "public", "unlisted"]).default("private"),
});

export const choreographyCreateSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(800).optional().default(""),
  danceForm: z.string().max(80).optional().default("Bharatanatyam"),
  composition: z.string().max(120).optional().default(""),
  choreographer: z.string().max(120).optional().default(""),
  guru: z.string().max(120).optional().default(""),
  music: z.string().max(160).optional().default(""),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("intermediate"),
  privacy: z.enum(["private", "unlisted", "public"]).default("private"),
  allowDownload: z.coerce.boolean().optional().default(false),
  durationSeconds: z.coerce.number().int().min(0).optional().nullable(),
});

export const inspirationSearchSchema = z.object({
  query: z.string().min(1).max(120),
  category: z.string().max(80).optional(),
  danceForm: z.string().max(80).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(40).default(24),
});

export const saveInspirationSchema = z.object({
  provider: z.string().min(1),
  externalId: z.string().min(1),
  title: z.string().optional(),
  imageUrl: z.string().url(),
  sourceUrl: z.string().url().optional(),
  creatorName: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
