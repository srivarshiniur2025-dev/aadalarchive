import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cinzel, Outfit } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inscription = Cinzel({
  variable: "--font-inscription",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Aadal Archive — Where movement becomes memory",
    template: "%s · Aadal Archive",
  },
  description:
    "Discover inspiration, shape choreography, preserve performances, and share your artistic journey. A premium visual platform for Bharatanatyam and classical dance.",
  keywords: [
    "Bharatanatyam",
    "classical dance",
    "choreography",
    "dance archive",
    "arangetram",
    "moodboard",
  ],
};

export const viewport: Viewport = {
  themeColor: "#120e0c",
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
      className={`${display.variable} ${inscription.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
