import { NextResponse } from "next/server";
import { pinterestAuthorizeUrl } from "@/lib/pinterest";

/** Start Pinterest OAuth — open this once as an operator to obtain an access token. */
export async function GET(request: Request) {
  const appId = process.env.PINTEREST_APP_ID?.trim();
  const secret = process.env.PINTEREST_APP_SECRET?.trim();
  if (!appId || !secret) {
    return NextResponse.json(
      {
        error:
          "Set PINTEREST_APP_ID and PINTEREST_APP_SECRET in .env.local, then restart the server.",
      },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const state = searchParams.get("state") || crypto.randomUUID().slice(0, 12);

  try {
    const authorize = pinterestAuthorizeUrl(state, siteUrl);
    const res = NextResponse.redirect(authorize);
    res.cookies.set("pinterest_oauth_state", state, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 600,
    });
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not start Pinterest OAuth" },
      { status: 500 },
    );
  }
}
