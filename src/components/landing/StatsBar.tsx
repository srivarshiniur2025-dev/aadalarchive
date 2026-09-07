"use client";

import { cn } from "@/lib/utils";

const STATS = [
  { value: "10K+", label: "Dancers" },
  { value: "50K+", label: "Inspiration Pieces" },
  { value: "5K+", label: "Performances" },
  { value: "A Global", label: "Community" },
] as const;

function LotusTiny({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3 w-3 text-gold/70", className)} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M12 20c0-3 2-5 2-8 0 0-2 1-2 3 0-2-2-3-2-3 0 3 2 5 2 8Z" />
      <path d="M12 15c-2-1-4-1-6 0 2 1 4 2 6 2 2 0 4-1 6-2-2-1-4-1-6 0Z" />
    </svg>
  );
}

function BellTiny({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3 w-3 text-gold/60", className)} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M12 3v2M8 9a4 4 0 0 1 8 0c0 4 1.5 5.5 1.5 5.5H6.5S8 13 8 9Z" />
      <path d="M10 16.5a2 2 0 0 0 4 0" />
    </svg>
  );
}

/**
 * Temple inscription rail — engraved stats band.
 */
export function StatsBar() {
  return (
    <section className="archive-inscription-rail relative" aria-label="Community stats">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center" aria-hidden>
        <div className="h-px w-[min(70%,42rem)] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      </div>

      <div className="ds-container-wide py-7 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-stretch gap-y-5">
            {STATS.map((stat, i) => (
              <li key={stat.label} className="flex items-center">
                {i > 0 ? (
                  <span className="mx-4 flex items-center gap-2 sm:mx-6 lg:mx-8" aria-hidden>
                    <span className="hidden h-10 w-px bg-gradient-to-b from-transparent via-[#A8752B]/50 to-transparent sm:block" />
                    {i % 2 === 0 ? <LotusTiny className="hidden sm:block" /> : <BellTiny className="hidden sm:block" />}
                    <span className="hidden h-10 w-px bg-gradient-to-b from-transparent via-[#A8752B]/50 to-transparent sm:block" />
                  </span>
                ) : null}
                <div className="min-w-[7rem] sm:min-w-0">
                  <p className="font-display text-xl leading-none tracking-wide text-gold sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-inscription text-[0.58rem] tracking-[0.16em] text-[#F4EBDD]/55">
                    {stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="font-display text-sm leading-snug text-[#D8C6A7]/65 lg:text-right">
            Rooted in culture.
            <br />
            <span className="italic text-[#F4EBDD]/80">Created for today.</span>
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center" aria-hidden>
        <div className="h-px w-[min(70%,42rem)] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      </div>
    </section>
  );
}
