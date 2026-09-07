import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangePinterestCode } from "@/lib/pinterest";

/** Exchange Pinterest auth code for tokens. Paste tokens into .env.local / Vercel. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error: `Pinterest OAuth denied: ${error}` }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: "Missing authorization code." }, { status: 400 });
  }

  const jar = await cookies();
  const expected = jar.get("pinterest_oauth_state")?.value;
  if (expected && state && expected !== state) {
    return NextResponse.json({ error: "OAuth state mismatch. Retry /api/pinterest/oauth." }, { status: 400 });
  }

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
    const tokens = await exchangePinterestCode(code, siteUrl);

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Pinterest connected — AadalArchive</title>
  <style>
    body { font-family: Georgia, serif; background:#15161A; color:#F4EBDD; padding:2rem; max-width:42rem; margin:0 auto; }
    code, pre { background:#1C1E24; border:1px solid #A8752B55; padding:0.75rem 1rem; display:block; overflow:auto; white-space:pre-wrap; word-break:break-all; }
    h1 { color:#E5A93C; font-weight:500; }
    p { color:#D8C6A7; line-height:1.5; }
    .label { color:#A8752B; font-size:0.75rem; letter-spacing:0.12em; text-transform:uppercase; }
  </style>
</head>
<body>
  <h1>Pinterest connected</h1>
  <p>Copy these into <strong>.env.local</strong> and your Vercel environment, then restart / redeploy. Do not share them publicly.</p>
  <p class="label">PINTEREST_ACCESS_TOKEN</p>
  <pre>${tokens.accessToken}</pre>
  ${
    tokens.refreshToken
      ? `<p class="label">PINTEREST_REFRESH_TOKEN</p><pre>${tokens.refreshToken}</pre>`
      : ""
  }
  <p class="label">Suggested .env lines</p>
  <pre>PINTEREST_ACCESS_TOKEN=${tokens.accessToken}
${tokens.refreshToken ? `PINTEREST_REFRESH_TOKEN=${tokens.refreshToken}\n` : ""}PINTEREST_SEARCH_MODE=user</pre>
  <p>Then open Discover — Pinterest pins will appear beside Unsplash and Pexels when the token is loaded.</p>
</body>
</html>`;

    const res = new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
    res.cookies.set("pinterest_oauth_state", "", { path: "/", maxAge: 0 });
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Pinterest token exchange failed" },
      { status: 500 },
    );
  }
}
