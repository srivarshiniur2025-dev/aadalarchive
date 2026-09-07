import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { DEMO_COOKIE } from "@/lib/auth/constants";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const PROTECTED_PREFIXES = [
  "/home",
  "/explore",
  "/discover",
  "/boards",
  "/albums",
  "/choreography",
  "/studio",
  "/saved",
  "/portfolio",
  "/profile",
  "/notifications",
  "/settings",
  "/onboarding",
];

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];

function demoLoginAllowed() {
  return process.env.NEXT_PUBLIC_ALLOW_DEMO_LOGIN !== "false";
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
  const hasDemo = demoLoginAllowed() && request.cookies.get(DEMO_COOKIE)?.value === "1";

  if (!isSupabaseConfigured()) {
    if (isProtected && !hasDemo) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", path);
      return NextResponse.redirect(url);
    }
    if (hasDemo && isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/home";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signedIn = Boolean(user) || hasDemo;

  if (isProtected && !signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (signedIn && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
