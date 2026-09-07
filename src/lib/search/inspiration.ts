export type InspirationResult = {
  id: string;
  provider: "unsplash" | "pexels";
  externalId: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  sourceUrl: string;
  creatorName: string;
  creatorUrl: string;
  category: string;
  tags: string[];
  width: number;
  height: number;
  attributionRequired: boolean;
  license?: string;
  /** @deprecated use creatorName */
  creator?: string;
  /** @deprecated use provider */
  source?: "unsplash" | "pexels" | "cache";
};

export type InspirationSearchResponse = {
  results: InspirationResult[];
  query: string;
  expandedQueries?: string[];
  intent?: string;
  providers: string[];
  page: number;
  limit: number;
  hasMore: boolean;
};

function buildQuery(query: string, danceForm?: string, category?: string) {
  return [query, danceForm, category].filter(Boolean).join(" ").trim();
}

function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = [];
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
}

async function searchUnsplash(
  q: string,
  page: number,
  limit: number,
): Promise<{ results: InspirationResult[]; totalPages: number }> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return { results: [], totalPages: 0 };

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", q);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(limit));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${key}`,
      "Accept-Version": "v1",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Unsplash error", res.status, body);
    if (res.status === 403 || res.status === 429) {
      throw new Error(res.status === 429 ? "RATE_LIMITED" : "UNSPLASH_FORBIDDEN");
    }
    return { results: [], totalPages: 0 };
  }

  const data = (await res.json()) as {
    total_pages?: number;
    results: Array<{
      id: string;
      description: string | null;
      alt_description: string | null;
      width: number;
      height: number;
      urls: { regular: string; small: string };
      links: { html: string };
      user: { name: string; links: { html: string } };
      tags?: Array<{ title: string }>;
    }>;
  };

  const results = (data.results || []).map((photo) => ({
    id: `unsplash:${photo.id}`,
    provider: "unsplash" as const,
    externalId: photo.id,
    title: photo.alt_description || photo.description || "Untitled inspiration",
    imageUrl: photo.urls.regular,
    thumbnailUrl: photo.urls.small,
    sourceUrl: photo.links.html,
    creatorName: photo.user.name,
    creatorUrl: photo.user.links.html,
    creator: photo.user.name,
    source: "unsplash" as const,
    category: "Photography",
    tags: (photo.tags || []).map((t) => t.title).slice(0, 8),
    width: photo.width,
    height: photo.height,
    attributionRequired: true,
    license: "Unsplash License",
  }));

  return { results, totalPages: data.total_pages ?? 0 };
}

async function searchPexels(
  q: string,
  page: number,
  limit: number,
): Promise<{ results: InspirationResult[]; totalPages: number }> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return { results: [], totalPages: 0 };

  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", q);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(limit));

  const res = await fetch(url.toString(), {
    headers: { Authorization: key },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Pexels error", res.status, body);
    if (res.status === 429) throw new Error("RATE_LIMITED");
    return { results: [], totalPages: 0 };
  }

  const data = (await res.json()) as {
    total_results?: number;
    photos: Array<{
      id: number;
      width: number;
      height: number;
      url: string;
      alt: string | null;
      photographer: string;
      photographer_url: string;
      src: { large: string; medium: string };
    }>;
  };

  const results = (data.photos || []).map((photo) => ({
    id: `pexels:${photo.id}`,
    provider: "pexels" as const,
    externalId: String(photo.id),
    title: photo.alt || "Untitled inspiration",
    imageUrl: photo.src.large,
    thumbnailUrl: photo.src.medium,
    sourceUrl: photo.url,
    creatorName: photo.photographer,
    creatorUrl: photo.photographer_url,
    creator: photo.photographer,
    source: "pexels" as const,
    category: "Photography",
    tags: [],
    width: photo.width,
    height: photo.height,
    attributionRequired: true,
    license: "Pexels License",
  }));

  const totalPages = data.total_results
    ? Math.ceil(data.total_results / limit)
    : results.length >= limit
      ? page + 1
      : page;

  return { results, totalPages };
}

export async function searchInspirations(input: {
  query: string;
  category?: string;
  danceForm?: string;
  interests?: string[];
  projectHint?: string;
  boardTitles?: string[];
  expand?: boolean;
  page?: number;
  limit?: number;
}): Promise<InspirationSearchResponse> {
  const { detectIntent } = await import("@/lib/dance/intents");
  const { expandDanceQuery, queryForPage } = await import("@/lib/dance/query-expansion");

  const page = input.page ?? 1;
  const limit = Math.min(input.limit ?? 30, 40);
  const intent = detectIntent(input.query || input.category || "");
  const expand = input.expand !== false;

  const expansions = expand
    ? expandDanceQuery(input.query || "", {
        danceForm: input.danceForm,
        interests: input.interests,
        projectHint: input.projectHint,
        boardTitles: input.boardTitles,
        category: input.category,
        intent,
      })
    : [buildQuery(input.query, input.danceForm, input.category)];

  const { primary, secondary } = queryForPage(expansions, page);
  const perProvider = Math.ceil(limit / 2);

  const providers: string[] = [];
  const searches = [
    searchUnsplash(primary, page, perProvider),
    searchPexels(secondary || primary, page, perProvider),
  ];

  // On later pages, also pull a third variant from Unsplash if available to keep stream rich
  if (page > 1 && expansions.length > 2) {
    const third = expansions[(page + 1) % expansions.length];
    searches.push(searchUnsplash(third, page, Math.ceil(perProvider / 2)));
    searches.push(searchPexels(third, page, Math.ceil(perProvider / 2)));
  }

  const settled = await Promise.all(
    searches.map((p) =>
      p.catch((err) => {
        if (err instanceof Error && err.message === "RATE_LIMITED") throw err;
        return { results: [] as InspirationResult[], totalPages: 0 };
      }),
    ),
  );

  for (const s of settled) {
    if (s.results.some((r) => r.provider === "unsplash") && !providers.includes("unsplash")) {
      providers.push("unsplash");
    }
    if (s.results.some((r) => r.provider === "pexels") && !providers.includes("pexels")) {
      providers.push("pexels");
    }
  }

  // Interleave provider batches
  let merged: InspirationResult[] = [];
  if (settled.length >= 2) {
    merged = interleave(settled[0].results, settled[1].results);
    for (let i = 2; i < settled.length; i++) {
      merged = interleave(merged, settled[i].results);
    }
  } else {
    merged = settled[0]?.results || [];
  }

  const seen = new Set<string>();
  const results = merged
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .slice(0, limit);

  const maxPages = Math.max(...settled.map((s) => s.totalPages), page);
  const hasMore =
    settled.some((s) => s.results.length >= Math.max(4, Math.floor(perProvider / 2))) ||
    page < maxPages;

  return {
    results,
    query: primary,
    expandedQueries: expansions,
    intent,
    providers,
    page,
    limit,
    hasMore: hasMore && results.length > 0,
  };
}
