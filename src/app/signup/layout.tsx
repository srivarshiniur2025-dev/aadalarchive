import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Create Your Account — AadalArchive",
  },
  description:
    "Create your AadalArchive account and begin building your personal dance creative archive.",
  alternates: {
    canonical: "/signup",
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

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
