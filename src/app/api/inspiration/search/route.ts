import { NextResponse } from "next/server";
import { inspirationSearchSchema } from "@/lib/validation/schemas";
import { searchInspirations } from "@/lib/search/inspiration";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentProfile } from "@/lib/services/profiles";
import { listUserBoards } from "@/lib/services/boards";
import { inferProjectHint } from "@/lib/dance";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = inspirationSearchSchema.safeParse({
    query: searchParams.get("query") || searchParams.get("q") || "",
    category: searchParams.get("category") || undefined,
    danceForm: searchParams.get("danceForm") || undefined,
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 30,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid search", results: [], hasMore: false },
      { status: 400 },
    );
  }

  const hasUnsplash = Boolean(process.env.UNSPLASH_ACCESS_KEY?.trim());
  const hasPexels = Boolean(process.env.PEXELS_API_KEY?.trim());

  if (!hasUnsplash && !hasPexels) {
    return NextResponse.json(
      {
        error:
          "Unable to load inspiration right now. Add UNSPLASH_ACCESS_KEY and PEXELS_API_KEY to .env.local (or your host env), then restart the server.",
        results: [],
        hasMore: false,
      },
      { status: 503 },
    );
  }

  try {
    const profile = await getCurrentProfile();
    const boards = await listUserBoards();
    const boardTitles = boards.map((b) => b.title);
    const projectHint =
      profile?.current_project || inferProjectHint(boardTitles) || undefined;

    const data = await searchInspirations({
      ...parsed.data,
      danceForm: parsed.data.danceForm || profile?.dance_form || undefined,
      interests: profile?.interests || [],
      projectHint,
      boardTitles,
      expand: searchParams.get("expand") !== "0",
    });

    if (isSupabaseConfigured() && data.results.length && parsed.data.page === 1) {
      try {
        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("search_history").insert({
            user_id: user.id,
            query: data.query,
          });

          const rows = data.results.map((r) => ({
            provider: r.provider,
            external_id: r.externalId,
            title: r.title,
            image_url: r.imageUrl,
            thumbnail_url: r.thumbnailUrl,
            source_url: r.sourceUrl,
            creator_name: r.creatorName,
            creator_url: r.creatorUrl,
            category: r.category,
            tags: r.tags,
            width: r.width,
            height: r.height,
            attribution_required: r.attributionRequired,
            license: r.license ?? null,
            query_key: data.query.toLowerCase(),
          }));

          await supabase.from("inspiration_cache").upsert(rows, {
            onConflict: "provider,external_id",
            ignoreDuplicates: false,
          });
        }
      } catch (cacheErr) {
        console.error("inspiration cache", cacheErr);
      }
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Search failed";
    if (message === "RATE_LIMITED") {
      return NextResponse.json(
        {
          error: "Inspiration providers are rate-limited right now. Please retry shortly.",
          results: [],
          hasMore: false,
        },
        { status: 429 },
      );
    }
    console.error("inspiration search", err);
    return NextResponse.json(
      { error: "Unable to load inspiration right now.", results: [], hasMore: false },
      { status: 500 },
    );
  }
}
