export type InspirationResult = {
  id: string;
  provider: "unsplash" | "pexels" | "openverse" | "pixabay";
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
  source?: "unsplash" | "pexels" | "openverse" | "pixabay" | "cache";
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
  color?: string,
): Promise<{ results: InspirationResult[]; totalPages: number }> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return { results: [], totalPages: 0 };

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", q);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(limit));
  if (color) url.searchParams.set("color", color);

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

async function searchOpenverse(
  q: string,
  page: number,
  limit: number,
): Promise<{ results: InspirationResult[]; totalPages: number }> {
  const url = new URL("https://api.openverse.org/v1/images/");
  url.searchParams.set("q", q.slice(0, 200));
  url.searchParams.set("page", String(Math.max(1, page)));
  url.searchParams.set("page_size", String(Math.min(Math.max(limit, 3), 20)));
  url.searchParams.set("mature", "false");
  // Flickr + cultural institutions tend to have real performance / temple / costume photos
  url.searchParams.set(
    "source",
    "flickr,wikimedia,met,smithsonian_openaccess,rijksmuseum,europeana,nypl,rawpixel",
  );

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "AadalArchive/1.0 (classical dance archive; hello@aadalarchive.com)",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Openverse error", res.status, body);
    if (res.status === 429) throw new Error("RATE_LIMITED");
    return { results: [], totalPages: 0 };
  }

  const data = (await res.json()) as {
    page_count?: number;
    results?: Array<{
      id: string;
      title?: string | null;
      url?: string;
      thumbnail?: string | null;
      foreign_landing_url?: string | null;
      creator?: string | null;
      creator_url?: string | null;
      license?: string | null;
      license_version?: string | null;
      width?: number | null;
      height?: number | null;
      tags?: Array<{ name?: string } | string>;
      source?: string | null;
      provider?: string | null;
    }>;
  };

  const results: InspirationResult[] = [];
  for (const item of data.results || []) {
    if (!item.id || !item.url) continue;
    const tags = (item.tags || [])
      .map((t) => (typeof t === "string" ? t : t.name || ""))
      .filter(Boolean)
      .slice(0, 10);
    results.push({
      id: `openverse:${item.id}`,
      provider: "openverse",
      externalId: item.id,
      title: item.title || "Open inspiration",
      imageUrl: item.url,
      thumbnailUrl: item.thumbnail || item.url,
      sourceUrl: item.foreign_landing_url || item.url,
      creatorName: item.creator || item.source || item.provider || "Openverse",
      creatorUrl: item.creator_url || item.foreign_landing_url || item.url,
      creator: item.creator || undefined,
      source: "openverse",
      category: item.source || item.provider || "Openverse",
      tags,
      width: item.width || 800,
      height: item.height || 1200,
      attributionRequired: true,
      license: [item.license, item.license_version].filter(Boolean).join(" ") || "Creative Commons",
    });
  }

  return { results, totalPages: data.page_count ?? (results.length ? page + 1 : page) };
}

async function searchPixabay(
  q: string,
  page: number,
  limit: number,
): Promise<{ results: InspirationResult[]; totalPages: number }> {
  const key = process.env.PIXABAY_API_KEY?.trim();
  if (!key) return { results: [], totalPages: 0 };

  const url = new URL("https://pixabay.com/api/");
  url.searchParams.set("key", key);
  url.searchParams.set("q", q.slice(0, 100));
  url.searchParams.set("image_type", "photo");
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("order", "popular");
  url.searchParams.set("page", String(Math.max(1, page)));
  url.searchParams.set("per_page", String(Math.min(Math.max(limit, 3), 40)));

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Pixabay error", res.status, body);
    if (res.status === 429) throw new Error("RATE_LIMITED");
    return { results: [], totalPages: 0 };
  }

  const data = (await res.json()) as {
    totalHits?: number;
    hits?: Array<{
      id: number;
      pageURL: string;
      largeImageURL: string;
      webformatURL: string;
      previewURL: string;
      imageWidth: number;
      imageHeight: number;
      user: string;
      user_id: number;
      tags?: string;
    }>;
  };

  const results = (data.hits || []).map((photo) => ({
    id: `pixabay:${photo.id}`,
    provider: "pixabay" as const,
    externalId: String(photo.id),
    title: (photo.tags || "Pixabay inspiration").split(",")[0]?.trim() || "Pixabay inspiration",
    imageUrl: photo.largeImageURL || photo.webformatURL,
    thumbnailUrl: photo.webformatURL || photo.previewURL,
    sourceUrl: photo.pageURL,
    creatorName: photo.user || "Pixabay",
    creatorUrl: `https://pixabay.com/users/${encodeURIComponent(photo.user)}-${photo.user_id}/`,
    creator: photo.user,
    source: "pixabay" as const,
    category: "Photography",
    tags: (photo.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 10),
    width: photo.imageWidth || 800,
    height: photo.imageHeight || 1200,
    attributionRequired: true,
    license: "Pixabay License",
  }));

  const totalPages = data.totalHits ? Math.ceil(data.totalHits / limit) : results.length >= limit ? page + 1 : page;
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
  const {
    detectIntent,
    relevanceKeywords,
    extractColors,
    unsplashColorsForQuery,
    CLASSICAL_DANCE_RE,
    OFF_TOPIC_DANCE_RE,
  } = await import("@/lib/dance/intents");
  const { expandDanceQuery, queryForPage } = await import("@/lib/dance/query-expansion");

  const page = input.page ?? 1;
  const limit = Math.min(input.limit ?? 30, 40);
  const userQuery = input.query || input.category || "";
  const intent = detectIntent(userQuery);
  const expand = input.expand !== false;
  const colors = extractColors(userQuery);
  const unsplashColors = unsplashColorsForQuery(userQuery);

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
  const keywords = relevanceKeywords(intent, userQuery || primary);

  const providers: string[] = [];
  const perArchive = Math.max(6, Math.ceil(limit / 3));
  const searches = [
    searchUnsplash(primary, page, perProvider, unsplashColors[0]),
    searchPexels(secondary || primary, page, perProvider),
    // Openverse: Flickr / museums / Wikimedia — real classical performance & temple photos
    searchOpenverse(primary, page, perArchive),
    // Pixabay (optional key): popular stock moodboard-style photos
    searchPixabay(secondary || primary, page, perArchive),
  ];

  // Extra Unsplash pass for a second color (e.g. blue + red costumes)
  if (unsplashColors[1] && page === 1) {
    searches.push(searchUnsplash(primary, page, Math.ceil(perProvider / 2), unsplashColors[1]));
  }

  if (page > 1 && expansions.length > 2) {
    const third = expansions[(page + 1) % expansions.length];
    searches.push(searchUnsplash(third, page, Math.ceil(perProvider / 2)));
    searches.push(searchPexels(third, page, Math.ceil(perProvider / 2)));
    searches.push(searchOpenverse(third, page, Math.ceil(perArchive / 2)));
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
    for (const p of ["unsplash", "pexels", "openverse", "pixabay"] as const) {
      if (s.results.some((r) => r.provider === p) && !providers.includes(p)) {
        providers.push(p);
      }
    }
  }

  let merged: InspirationResult[] = [];
  if (settled.length >= 2) {
    merged = interleave(settled[0].results, settled[1].results);
    for (let i = 2; i < settled.length; i++) {
      merged = interleave(merged, settled[i].results);
    }
  } else {
    merged = settled[0]?.results || [];
  }

  const scored = merged
    .map((item) => {
      const hay = `${item.title} ${(item.tags || []).join(" ")}`.toLowerCase();

      if (/taj\s*mahal|\bagra\b|mughal mausoleum/.test(hay)) {
        return { item, score: -100 };
      }
      if (OFF_TOPIC_DANCE_RE.test(hay)) {
        return { item, score: -100 };
      }
      if (intent === "JEWELLERY" && /diamond ring|wedding ring|engagement|watch\b|bracelet fashion/.test(hay) && !/indian|temple|dance|traditional|jhumka|gold/.test(hay)) {
        return { item, score: -50 };
      }
      if (intent === "MUDRAS" && /yoga pose|meditation|namaste stock|tattoo/.test(hay) && !/dance|mudra|hasta|bharata|classical|indian/.test(hay)) {
        return { item, score: -40 };
      }
      if (intent === "COSTUME" && /superhero|halloween|cosplay|comic|marvel|batman|spiderman/.test(hay)) {
        return { item, score: -80 };
      }
      if (intent === "TEMPLE" && /taj|mosque|church|cathedral|pagoda china|japanese shrine/.test(hay) && !/gopuram|dravidian|tamil|madurai|thanjavur|hampi|south indian/.test(hay)) {
        return { item, score: -40 };
      }

      // Soft classical gate: demote results with no Indian/classical dance signal
      const classicalHit =
        CLASSICAL_DANCE_RE.test(hay) ||
        /indian|bharata|traditional attire|temple|saree|sari|anjali|arangetram/.test(hay);
      const danceHit = /dance|dancer|costume|mudra|performance|recital/.test(hay);

      let score = 0;
      if (!classicalHit && intent !== "TEMPLE") score -= 8;
      if (!danceHit && intent !== "TEMPLE" && intent !== "JEWELLERY") score -= 6;
      if (classicalHit) score += 8;
      if (danceHit) score += 3;

      for (const kw of keywords) {
        if (hay.includes(kw)) score += kw.length > 5 ? 3 : 2;
      }

      // Color matches for costume / outfit searches
      if (colors.length) {
        let colorHits = 0;
        for (const c of colors) {
          if (hay.includes(c)) colorHits += 1;
        }
        if (colorHits === 0) score -= 6;
        else score += colorHits * 5;
        if (colorHits === colors.length) score += 4;
      }

      if ((intent === "MUDRAS" || intent === "JEWELLERY" || intent === "SALANGAI") && item.height >= item.width) score += 1;
      if (intent === "MUDRAS" && /mudra|hasta|hand gesture|hands/.test(hay)) score += 6;
      if (intent === "JEWELLERY" && /jewel|necklace|jhumka|ornament|earring|gold/.test(hay)) score += 6;
      if (intent === "SALANGAI" && /ghungroo|salangai|ankle|bell|nupur|feet|foot/.test(hay)) score += 6;
      if (intent === "TEMPLE" && /gopuram|temple|carved|pillar|dravidian/.test(hay)) score += 5;
      if ((intent === "COSTUME" || intent === "ABHINAYA" || intent === "PERFORMANCE") && /bharatanatyam|kuchipudi|kathak|odissi|classical dance|indian dancer/.test(hay)) {
        score += 6;
      }
      return { item, score };
    })
    .filter((row) => row.score > -40);

  scored.sort((a, b) => b.score - a.score);

  // Prefer classical-relevant hits; only fall back if the pool is thin
  const classicalEnough = scored.filter((r) => r.score >= 4);
  const ranked = (classicalEnough.length >= Math.min(6, Math.ceil(limit / 3))
    ? classicalEnough
    : scored
  ).map((r) => r.item);

  const seen = new Set<string>();
  const results = ranked
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
