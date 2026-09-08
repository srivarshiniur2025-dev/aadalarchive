import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Great_Vibes, Cinzel } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "@/components/temple/temple.css";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inscription = Cinzel({
  variable: "--font-inscription",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://aadalarchive.vercel.app",
  ),
  title: {
    default: "AadalArchive — Where Every Movement Becomes a Memory",
    template: "%s · AadalArchive",
  },
  description:
    "Discover, create, practice, and preserve your dance journey with AadalArchive.",
  keywords: [
    "Bharatanatyam",
    "classical dance",
    "AadalArchive",
    "dance archive",
    "practice videos",
    "choreography",
  ],
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#15161A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${inscription.variable} ${script.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-body)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
