"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "10K+", label: "Dancers" },
  { value: "50K+", label: "Inspiration Pieces" },
  { value: "5K+", label: "Performances" },
  { value: "∞", label: "A Global Community" },
] as const;

/** Stats row — each metric in a subtle arched niche */
export function StatsBar() {
  return (
    <section
      className="relative border-y border-gold/10 bg-surface/40"
      aria-label="Community stats"
    >
      <div className="ds-container-wide py-8 sm:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(12rem,0.9fr)] lg:gap-3 xl:gap-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "relative flex flex-col items-center justify-center px-3 py-5 text-center sm:py-6",
                i < STATS.length - 1 && "lg:border-r lg:border-gold/15",
              )}
            >
              {/* Soft arch niche behind each stat */}
              <svg
                viewBox="0 0 120 100"
                className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-[9rem] opacity-40"
                aria-hidden
              >
                <path
                  d="M18 96 V42 C18 18 40 8 60 8 C80 8 102 18 102 42 V96"
                  fill="none"
                  stroke="#E5A93C"
                  strokeOpacity="0.35"
                  strokeWidth="1.2"
                />
              </svg>
              <p className="relative font-display text-2xl text-gold sm:text-3xl">{stat.value}</p>
              <p className="relative mt-1.5 text-[0.65rem] font-medium tracking-wide text-cream/45 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}

          <Link
            href="/about"
            className="group col-span-2 mt-1 flex items-center justify-between gap-4 rounded-[1rem] border border-gold/25 bg-charcoal/50 px-5 py-4 transition-colors hover:border-gold/50 lg:col-span-1 lg:mt-0 lg:flex-col lg:items-start lg:justify-between"
          >
            <p className="font-display text-base leading-snug text-cream/80 sm:text-lg">
              Rooted in culture.
              <br />
              <span className="italic text-gold">Created for today.</span>
            </p>
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
