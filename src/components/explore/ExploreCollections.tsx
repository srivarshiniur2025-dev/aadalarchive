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
          <h2 className="font-display text-[1.625rem] font-medium text-[#F4EBDD]">
            Explore Collections
          </h2>
          <p className="mt-1.5 text-[0.85rem] text-[#D8C6A7]/55">
            Curated visuals to spark your creativity.
          </p>
        </div>
        <Link
          href="/#explore"
          className="inline-flex shrink-0 items-center gap-1.5 text-[0.85rem] font-medium text-gold transition-colors hover:text-[#F0C56A]"
        >
          View All →
        </Link>
      </div>

      <div className="mb-8 h-px bg-gradient-to-r from-[#A8752B]/40 via-gold/20 to-transparent" />

      <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-5">
        {visible.map((item, idx) => (
          <li
            key={item.id}
            className={cn(
              idx === 0 && "md:col-span-2 xl:col-span-2",
            )}
          >
            <Link href={item.href} className="group block">
              <div className="relative mb-3.5">
                <div
                  className="archive-niche-card relative overflow-hidden bg-[#1C1E24]"
                  style={{
                    borderRadius: "50% 50% 0 0 / 28% 28% 0 0",
                    paddingTop: idx === 0 ? "72%" : "130%",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 45vw, 20vw"
                    className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.45,0.05,0.25,1)] group-hover:scale-[1.05]"
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div className="archive-teal-veil absolute inset-0 opacity-80" />
                  <div
                    className="pointer-events-none absolute inset-0 border border-gold/25 transition-colors duration-500 group-hover:border-gold/55"
                    style={{ borderRadius: "50% 50% 0 0 / 28% 28% 0 0" }}
                  />
                  <span className="absolute left-3 top-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="block h-2.5 w-2.5 border-l border-t border-gold/70" />
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 flex h-[30px] w-[30px] items-center justify-center border border-gold/70 bg-[#15161A]/75 text-[0.7rem] text-gold transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </div>
              <div className="archive-plaque inline-block px-2.5 py-1.5">
                <p className="text-[0.82rem] font-medium text-[#F4EBDD]">{item.title}</p>
                <p className="mt-0.5 font-inscription text-[0.55rem] tracking-[0.12em] text-[#D8C6A7]/50">
                  {item.count}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
