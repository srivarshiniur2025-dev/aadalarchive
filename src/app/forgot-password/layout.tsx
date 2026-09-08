import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Reset Password — AadalArchive",
  },
  description: "Reset your AadalArchive password and return to your dance archive.",
  alternates: {
    canonical: "/forgot-password",
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

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
