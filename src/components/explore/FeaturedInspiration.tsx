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
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-gold">
            Featured
          </p>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.625rem)] font-bold leading-[1.15] text-cream">
            <span className="italic font-normal text-gold">Inspiration</span>
          </h2>
          <p className="mt-4 text-[0.85rem] leading-[1.75] text-cream/60">
            A closer look at the elements
            <br />
            that keep our traditions alive.
          </p>
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2.5 rounded-lg border border-gold px-5 py-2.5 text-[0.85rem] font-medium text-gold transition-colors hover:bg-gold/10"
          >
            View Collection
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Figma: wide featured panel with subtle gold frame */}
        <Link
          href={href}
          className="group relative block h-[280px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[380px]"
        >
          <Image
            src={imageUrl}
            alt="Bharatanatyam dancer performing"
            fill
            priority
            sizes="(max-width:1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#15161A]/50 via-transparent to-[#15161A]/60" />
          <div className="pointer-events-none absolute inset-3 rounded-xl border border-gold/30" />

          <div className="absolute bottom-7 left-7">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-gold/15 text-gold">
              →
            </span>
          </div>

          <div className="absolute bottom-7 right-7 text-right">
            <p className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-gold">
              Performance
            </p>
            <p className="mt-1 font-display text-[1.35rem] font-semibold text-cream">
              Bharatanatyam
            </p>
            <p className="mt-0.5 text-[0.75rem] text-cream/55">
              Tradition in Motion
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
