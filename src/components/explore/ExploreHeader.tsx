"use client";

import { ExploreEdgePillars, GoldOrnament } from "./ExploreChrome";
import {
  CategoryNavigation,
  type ExploreCategory,
} from "./CategoryNavigation";

/**
 * Explore intro — header + arch categories, framed by side pillars.
 */
export function ExploreHeader({
  active,
  onChange,
}: {
  active: ExploreCategory;
  onChange: (c: ExploreCategory) => void;
}) {
  return (
    <header className="relative overflow-hidden pb-2 pt-8 sm:pt-10 lg:min-h-[440px] lg:pt-12">
      <ExploreEdgePillars />

      <div className="relative z-[1] mx-auto max-w-[540px] px-5 text-center lg:px-8">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-gold">
          Moods · Movements · Stories
        </p>
        <h1 className="mt-3.5 font-display text-[clamp(2.35rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-cream">
          Find Your{" "}
          <span className="italic font-normal text-gold">Inspiration</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[420px] text-[0.9rem] leading-[1.75] text-cream/65">
          Discover visual references, movements, costumes, expressions and stories
          that inspire your next performance.
        </p>
        <GoldOrnament className="mt-5" />
      </div>

      <div className="relative z-[1] mt-8">
        <CategoryNavigation active={active} onChange={onChange} />
      </div>
    </header>
  );
}
