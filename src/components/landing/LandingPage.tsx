"use client";

import { SiteHeader } from "./SiteHeader";
import { Hero } from "./Hero";
import { StatsBar } from "./StatsBar";
import { InspirationSection } from "./InspirationSection";
import { QuoteBridgeSection } from "./QuoteBridgeSection";
import { DanceJourneySection } from "./DanceJourneySection";
import { StoriesCtaSection } from "./StoriesCtaSection";
import { SiteFooter } from "./SiteFooter";
import { SectionReveal } from "@/components/ui/Motion";

/**
 * AadalCanvas landing — temple-arch editorial gallery.
 * Flat SVG arches only; no parallax / 3D clutter.
 */
export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-charcoal text-cream">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-md bg-gold px-4 py-2 text-sm font-medium text-charcoal transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <StatsBar />
        <SectionReveal>
          <InspirationSection />
        </SectionReveal>
        <SectionReveal delay={0.03}>
          <QuoteBridgeSection />
        </SectionReveal>
        <SectionReveal delay={0.03}>
          <DanceJourneySection />
        </SectionReveal>
        <SectionReveal delay={0.03}>
          <StoriesCtaSection />
        </SectionReveal>
      </main>
      <SiteFooter />
    </div>
  );
}
