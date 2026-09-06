"use client";

import { cn } from "@/lib/utils";

const STATS = [
  { value: "10K+", label: "Dancers" },
  { value: "50K+", label: "Inspiration Pieces" },
  { value: "5K+", label: "Performances" },
  { value: "A Global", label: "Community" },
] as const;

/**
 * Restrained stats strip — thin gold hairlines only.
 */
export function StatsBar() {
  return (
    <section className="relative border-t border-gold/12 bg-[#15161A]" aria-label="Community stats">
      <div className="ds-container-wide py-6 sm:py-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-stretch gap-y-4">
            {STATS.map((stat, i) => (
              <li key={stat.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    className="mx-5 hidden h-9 w-px bg-gold/20 sm:mx-6 sm:block lg:mx-8"
                    aria-hidden
                  />
                ) : null}
                <div className={cn("min-w-[7rem] sm:min-w-0")}>
                  <p className="font-display text-xl leading-none text-gold sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[0.68rem] font-medium tracking-[0.04em] text-cream/45">
                    {stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="font-display text-sm leading-snug text-cream/50 lg:text-right">
            Rooted in culture.
            <br />
            <span className="italic text-cream/72">Created for today.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
