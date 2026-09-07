/** Pinterest API v5 helpers — server-only. */

export function isPinterestConfigured() {
  return Boolean(process.env.PINTEREST_ACCESS_TOKEN?.trim());
}

export function pinterestSearchMode(): "partner" | "user" {
  const mode = (process.env.PINTEREST_SEARCH_MODE || "user").trim().toLowerCase();
  return mode === "partner" ? "partner" : "user";
}

export function pinterestRedirectUri(siteUrl?: string) {
  const base = (siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return `${base}/api/pinterest/oauth/callback`;
}

export function pinterestAuthorizeUrl(state: string, siteUrl?: string) {
  const appId = process.env.PINTEREST_APP_ID?.trim();
  if (!appId) throw new Error("PINTEREST_APP_ID is not configured.");
  const url = new URL("https://www.pinterest.com/oauth/");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", pinterestRedirectUri(siteUrl));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "pins:read,boards:read");
  url.searchParams.set("state", state);
  return url.toString();
}

export async function exchangePinterestCode(code: string, siteUrl?: string) {
  const appId = process.env.PINTEREST_APP_ID?.trim();
  const secret = process.env.PINTEREST_APP_SECRET?.trim();
  if (!appId || !secret) throw new Error("Pinterest app credentials are not configured.");

  const basic = Buffer.from(`${appId}:${secret}`).toString("base64");
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: pinterestRedirectUri(siteUrl),
  });

  const res = await fetch("https://api.pinterest.com/v5/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: number;
    scope?: string;
    message?: string;
    code?: number;
  };

  if (!res.ok || !data.access_token) {
    throw new Error(data.message || `Pinterest token exchange failed (${res.status})`);
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || null,
    expiresIn: data.expires_in ?? null,
    scope: data.scope ?? null,
  };
}

type PinterestImage = { url?: string; width?: number; height?: number };

type PinterestPin = {
  id?: string;
  title?: string | null;
  description?: string | null;
  alt_text?: string | null;
  link?: string | null;
  board_id?: string;
  media?: {
    media_type?: string;
    images?: Record<string, PinterestImage>;
  };
};

function pickImage(images?: Record<string, PinterestImage>) {
  if (!images) return null;
  const preferred = ["1200x", "600x", "400x300", "150x150", "originals"];
  for (const key of preferred) {
    if (images[key]?.url) return images[key];
  }
  const first = Object.values(images).find((img) => img?.url);
  return first || null;
}

export function mapPinterestPin(pin: PinterestPin): {
  id: string;
  provider: "pinterest";
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
  license: string;
} | null {
  if (!pin.id) return null;
  const large = pickImage(pin.media?.images);
  if (!large?.url) return null;
  const thumb =
    pin.media?.images?.["400x300"] ||
    pin.media?.images?.["150x150"] ||
    large;

  return {
    id: `pinterest:${pin.id}`,
    provider: "pinterest",
    externalId: pin.id,
    title: pin.title || pin.alt_text || pin.description || "Pinterest inspiration",
    imageUrl: large.url,
    thumbnailUrl: thumb?.url || large.url,
    sourceUrl: pin.link || `https://www.pinterest.com/pin/${pin.id}/`,
    creatorName: "Pinterest",
    creatorUrl: pin.link || `https://www.pinterest.com/pin/${pin.id}/`,
    category: "Pinterest",
    tags: [],
    width: large.width || 800,
    height: large.height || 1200,
    attributionRequired: true,
    license: "Pinterest",
  };
}

export async function fetchPinterestPins(
  query: string,
  limit: number,
): Promise<{ pins: PinterestPin[]; error?: string }> {
  const token = process.env.PINTEREST_ACCESS_TOKEN?.trim();
  if (!token) return { pins: [] };

  const mode = pinterestSearchMode();
  const url =
    mode === "partner"
      ? new URL("https://api.pinterest.com/v5/search/partner/pins")
      : new URL("https://api.pinterest.com/v5/search/pins");

  if (mode === "partner") {
    url.searchParams.set("term", query);
    url.searchParams.set("country_code", "IN");
    url.searchParams.set("limit", String(Math.min(limit, 25)));
  } else {
    url.searchParams.set("query", query);
    url.searchParams.set("page_size", String(Math.min(limit, 25)));
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Pinterest search error", res.status, body);
    if (res.status === 429) throw new Error("RATE_LIMITED");
    return { pins: [], error: `Pinterest ${res.status}` };
  }

  const data = (await res.json()) as { items?: PinterestPin[] };
  return { pins: data.items || [] };
}
