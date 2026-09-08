import type { Metadata } from "next";

/**
 * Auth routes are client pages; metadata lives here so `/login` and
 * `/login?next=…` share one canonical document (query params are not separate SEO URLs).
 */
export const metadata: Metadata = {
  title: {
    absolute: "Log In — AadalArchive",
  },
  description:
    "Sign in to AadalArchive to access your dance inspiration, boards, practice, and performance archive.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
