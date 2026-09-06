"use client";

import { TEMPLE } from "@/components/temple";
import { cn } from "@/lib/utils";

/**
 * Explore / Create edge pillars — dancer-carved temple shafts from design asset.
 */
export function ExploreEdgePillars({ className }: { className?: string }) {
  const leftSrc = "/temple/clean/pillar-dancer-left.png?v=1";
  const rightSrc = "/temple/clean/pillar-dancer-right.png?v=1";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 hidden lg:block",
        className,
      )}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={leftSrc}
        alt=""
        draggable={false}
        className="absolute top-0 left-0 h-full w-[88px] select-none object-contain object-left xl:w-[104px]"
        style={{
          opacity: 0.92,
          filter: "drop-shadow(8px 0 18px rgba(0,0,0,0.55))",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 70%, transparent 100%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={rightSrc}
        alt=""
        draggable={false}
        className="absolute top-0 right-0 h-full w-[88px] select-none object-contain object-right xl:w-[104px]"
        style={{
          opacity: 0.92,
          filter: "drop-shadow(-8px 0 18px rgba(0,0,0,0.55))",
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 70%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function GoldOrnament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/55" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={TEMPLE.detail.lotus} alt="" className="h-4 w-4 object-contain opacity-75" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/55" />
    </div>
  );
}

export const EXPLORE_PILLAR_GUTTER =
  "lg:px-16 xl:px-20 2xl:px-24";
