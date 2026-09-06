"use client";

import Image from "next/image";
import { useId } from "react";
import { FIGMA_CATEGORIES, type ExploreCategory } from "./figmaExplore";
import { cn } from "@/lib/utils";

export type { ExploreCategory };
export { FIGMA_CATEGORIES as EXPLORE_CATEGORIES };

/** Figma Make arch silhouette — compact category thumb */
function FigmaArchThumb({
  src,
  alt,
  active,
  objectPosition,
}: {
  src: string;
  alt: string;
  active: boolean;
  objectPosition?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const clipId = `figma-arch-${uid}`;

  return (
    <div className="relative h-[90px] w-[72px] shrink-0 sm:h-[100px] sm:w-[80px]">
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.35 Q0,0 0.5,0 Q1,0 1,0.35 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="80px"
          className="object-cover"
          style={{ objectPosition }}
        />
        <div
          className={cn(
            "absolute inset-0 transition-colors",
            active ? "bg-gold/15" : "bg-charcoal/35",
          )}
        />
      </div>
      {active ? (
        <div
          className="pointer-events-none absolute inset-0 border-2 border-gold"
          style={{
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
          }}
          aria-hidden
        />
      ) : null}
    </div>
  );
}

export function CategoryNavigation({
  active,
  onChange,
}: {
  active: ExploreCategory;
  onChange: (c: ExploreCategory) => void;
}) {
  return (
    <nav
      className="relative z-[1] w-full overflow-hidden pb-8 pt-2"
      aria-label="Inspiration categories"
    >
      {/* Figma Make: single horizontal arch row */}
      <ul className="flex gap-3.5 overflow-x-auto px-[8%] pb-2 scrollbar-none justify-start sm:justify-center sm:px-[12%] lg:px-[18%] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FIGMA_CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <li key={cat.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onChange(cat.id)}
                className="group flex flex-col items-center gap-2"
                aria-pressed={isActive}
              >
                <div className="relative">
                  <FigmaArchThumb
                    src={cat.image}
                    alt={cat.label}
                    active={isActive}
                    objectPosition={cat.objectPosition}
                  />
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  />
                </div>
                <span
                  className={cn(
                    "text-[0.7rem] tracking-[0.03em] transition-colors",
                    isActive
                      ? "font-semibold text-gold"
                      : "font-normal text-cream/55 group-hover:text-cream/80",
                  )}
                >
                  {cat.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
