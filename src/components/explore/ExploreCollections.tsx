"use client";

import Image from "next/image";
import Link from "next/link";
import { FIGMA_COLLECTIONS, type ExploreCategory } from "./figmaExplore";
import { EXPLORE_PILLAR_GUTTER } from "./ExploreChrome";
import { cn } from "@/lib/utils";

export function ExploreCollections({
  activeCategory,
}: {
  activeCategory: ExploreCategory;
  onSelectCategory?: (c: ExploreCategory) => void;
}) {
  const visible =
    activeCategory === "All"
      ? [...FIGMA_COLLECTIONS]
      : FIGMA_COLLECTIONS.filter((c) => c.category === activeCategory).length > 0
        ? FIGMA_COLLECTIONS.filter((c) => c.category === activeCategory)
        : [...FIGMA_COLLECTIONS];

  return (
    <section
      className={cn(
        "relative z-0 mx-auto max-w-[1120px] px-5 pb-14 sm:px-10",
        EXPLORE_PILLAR_GUTTER,
      )}
    >
      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[1.625rem] font-bold text-cream">
            Explore Collections
          </h2>
          <p className="mt-1.5 text-[0.85rem] text-cream/50">
            Curated visuals to spark your creativity.
          </p>
        </div>
        <Link
          href="/#explore"
          className="inline-flex shrink-0 items-center gap-1.5 text-[0.85rem] font-medium text-gold hover:text-gold/90"
        >
          View All →
        </Link>
      </div>

      <div className="mb-8 h-px bg-gradient-to-r from-gold/25 to-transparent" />

      {/* Figma: 5-up arch cards via CSS radius */}
      <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-5">
        {visible.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="group block">
              <div className="relative mb-3.5">
                <div
                  className="relative overflow-hidden bg-[#1e1610]"
                  style={{
                    borderRadius: "50% 50% 0 0 / 32% 32% 0 0",
                    paddingTop: "130%",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 45vw, 20vw"
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/50 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 border border-gold/25"
                    style={{ borderRadius: "50% 50% 0 0 / 32% 32% 0 0" }}
                  />
                </div>
                <span className="absolute bottom-3 right-3 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gold bg-gold/15 text-[0.7rem] text-gold">
                  →
                </span>
              </div>
              <p className="text-[0.85rem] font-semibold text-cream">{item.title}</p>
              <p className="mt-1 text-[0.7rem] text-cream/45">{item.count}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
