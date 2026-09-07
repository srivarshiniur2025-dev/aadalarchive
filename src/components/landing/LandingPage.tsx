"use client";

import { useEffect } from "react";
import { SiteHeader } from "./SiteHeader";
import { Hero, LandingSidePillars } from "./Hero";
import { StatsBar } from "./StatsBar";
import { ExploreContent } from "@/components/explore/ExploreContent";
import { CreateSection } from "./CreateSection";
import { ContactSection } from "./ContactSection";
import { SiteFooter } from "./SiteFooter";

/** Clears hero edge pillars (viewport gutters — hero stage only). */
const PILLAR_GUTTER =
  "lg:pl-[8.75rem] lg:pr-[8.75rem] xl:pl-[10rem] xl:pr-[10rem] 2xl:pl-[11.25rem] 2xl:pr-[11.25rem]";

function scrollToLandingHash() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash || hash === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(hash);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * AadalArchive landing — Hero entrance (with pillars), then scroll into Explore.
 */
export function LandingPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    scrollToLandingHash();
    window.addEventListener("hashchange", scrollToLandingHash);
    return () => window.removeEventListener("hashchange", scrollToLandingHash);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0D1012] text-[#F4EBDD]">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-md bg-gold px-4 py-2 text-sm font-medium text-[#15161A] transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
      >
        Skip to content
      </a>

      <SiteHeader contentClassName={PILLAR_GUTTER} overlay />

      <main id="main" tabIndex={-1} className="relative outline-none">
        {/* Hero stage — large temple pillars live only here */}
        <div className="relative">
          <LandingSidePillars />
          <div className={PILLAR_GUTTER}>
            <Hero />
          </div>
        </div>

        <div className={PILLAR_GUTTER}>
          <StatsBar />
        </div>

        {/* Explore archive — no hero pillars */}
        <ExploreContent id="explore" showCta={false} showFooter={false} />

        <CreateSection />

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
