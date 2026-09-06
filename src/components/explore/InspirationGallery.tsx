"use client";

import type { FeedItem } from "@/lib/types";
import { InspirationCard } from "./InspirationCard";
import { ExploreEdgePillars } from "./ExploreChrome";

/** Categories / tags that get a temple-niche treatment (~20–30%). */
const NICHE_IDS = new Set(["f5", "f6", "f8", "f9"]);

export function InspirationGallery({ items }: { items: FeedItem[] }) {
  return (
    <section
      id="inspiration-gallery"
      className="relative mx-auto max-w-[1320px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14"
    >
      <ExploreEdgePillars />

      <div className="relative z-[1] lg:px-16 xl:px-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-cream/90 sm:text-[1.75rem]">
              Inspiration Gallery
            </h2>
            <p className="mt-1 text-[0.8rem] text-cream/40">
              {items.length === 0
                ? "No inspiration matches yet — try another mood or search."
                : `${items.length} curated references`}
            </p>
          </div>
        </div>

        {/* Asymmetric masonry: 2 / 3 / 4 columns */}
        <div className="columns-2 gap-4 sm:gap-5 md:columns-3 xl:columns-4">
          {items.map((item, index) => (
            <InspirationCard
              key={item.id}
              item={item}
              niche={NICHE_IDS.has(item.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
