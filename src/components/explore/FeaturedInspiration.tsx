"use client";

import Image from "next/image";
import Link from "next/link";
import { FIGMA_FEATURED } from "./figmaExplore";
import { EXPLORE_PILLAR_GUTTER } from "./ExploreChrome";
import { cn } from "@/lib/utils";

export function FeaturedInspiration({
  imageUrl = FIGMA_FEATURED,
  href = "/signup",
}: {
  imageUrl?: string;
  href?: string;
}) {
  return (
    <section
      className={cn(
        "relative z-0 mx-auto max-w-[1120px] px-5 py-12 sm:px-10 lg:py-14",
        EXPLORE_PILLAR_GUTTER,
      )}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr] lg:gap-12">
        <div>
          <p className="font-inscription text-[0.62rem] tracking-[0.2em] text-gold/85">
            Featured
          </p>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.625rem)] font-medium leading-[1.15] text-[#F4EBDD]">
            <span className="italic font-normal text-gold">Inspiration</span>
          </h2>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#A8752B] to-transparent" aria-hidden />
          <p className="mt-4 text-[0.85rem] leading-[1.75] text-[#D8C6A7]/70">
            A closer look at the elements
            <br />
            that keep our traditions alive.
          </p>
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2.5 border border-gold/55 bg-transparent px-5 py-2.5 text-[0.85rem] font-medium text-gold transition-colors hover:bg-gold/10"
          >
            View Collection
            <span aria-hidden>→</span>
          </Link>
        </div>

        <Link
          href={href}
          className="archive-niche-card archive-corner group relative block h-[280px] overflow-hidden sm:h-[340px] lg:h-[380px]"
        >
          <Image
            src={imageUrl}
            alt="Bharatanatyam dancer performing"
            fill
            priority
            sizes="(max-width:1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.45,0.05,0.25,1)] group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1012]/55 via-transparent to-[#16495A]/35" />
          <div className="pointer-events-none absolute inset-3 border border-gold/28" />

          <div className="absolute bottom-7 left-7">
            <span className="flex h-9 w-9 items-center justify-center border border-gold/70 bg-[#15161A]/70 text-gold transition-transform duration-500 group-hover:translate-x-0.5">
              →
            </span>
          </div>

          <div className="archive-plaque absolute bottom-7 right-7 px-3 py-2 text-right">
            <p className="font-inscription text-[0.52rem] tracking-[0.18em] text-gold">
              Performance
            </p>
            <p className="mt-1 font-display text-[1.2rem] text-[#F4EBDD]">
              Bharatanatyam
            </p>
            <p className="mt-0.5 text-[0.72rem] text-[#D8C6A7]/65">
              Tradition in Motion
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
