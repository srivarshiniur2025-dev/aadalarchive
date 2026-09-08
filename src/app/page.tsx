import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: {
    absolute: "AadalArchive — Where Every Movement Becomes a Memory",
  },
  description:
    "Discover, create, practice, and preserve your dance journey with AadalArchive.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <LandingPage />;
}
