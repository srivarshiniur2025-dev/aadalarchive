"use client";

import { useState } from "react";
import { type ExploreCategory } from "./CategoryNavigation";
import { ExploreHeader } from "./ExploreHeader";
import { FeaturedInspiration } from "./FeaturedInspiration";
import { ExploreCollections } from "./ExploreCollections";
import { ExploreCTA, ExploreFooter } from "./ExploreCTA";
import { FIGMA_EXPLORE } from "./figmaExplore";
import { cn } from "@/lib/utils";

/**
 * Explore archive — Figma Make layout, AadalArchive colour theme.
 * https://www.figma.com/make/20lMpdzXzgym7QrwfySQwO/Landing-page-design-recreation
 */
export function ExploreContent({
  id = "explore",
  className,
  showFooter = true,
  showCta = true,
}: {
  id?: string;
  className?: string;
  showFooter?: boolean;
  showCta?: boolean;
}) {
  const [category, setCategory] = useState<ExploreCategory>("All");

  return (
    <div
      id={id}
      data-figma-file={FIGMA_EXPLORE.fileKey}
      data-explore-layout="figma-make-v2"
      className={cn(
        "relative z-0 scroll-mt-20 overflow-x-hidden bg-charcoal text-cream",
        className,
      )}
    >
      <ExploreHeader active={category} onChange={setCategory} />
      <FeaturedInspiration />
      <ExploreCollections activeCategory={category} />
      {showCta ? <ExploreCTA /> : null}
      {showFooter ? <ExploreFooter /> : null}
    </div>
  );
}
