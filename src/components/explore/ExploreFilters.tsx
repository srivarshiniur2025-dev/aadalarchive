"use client";

import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "danceForm", label: "Dance Form", options: ["Any", "Bharatanatyam", "Kathak", "Odissi"] },
  { id: "category", label: "Category", options: ["Any", "Poses", "Costumes", "Mudras", "Jewelry"] },
  { id: "mood", label: "Mood", options: ["Any", "Graceful", "Powerful", "Devotional", "Dramatic"] },
  { id: "era", label: "Era", options: ["Any", "Classical", "Temple era", "Contemporary"] },
  { id: "style", label: "Style", options: ["Any", "Solo", "Group", "Traditional"] },
] as const;

export function ExploreFilters({
  query,
  onQueryChange,
  className,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        <label className="relative flex-1">
          <span className="sr-only">Search inspiration</span>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cream/35"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16.2 16.2 20 20" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search inspiration, dancers, poses..."
            className="w-full border border-gold/20 bg-[#1a1b20]/80 py-2.5 pl-9 pr-3 text-[0.82rem] text-cream/85 placeholder:text-cream/35 outline-none transition-colors focus:border-gold/45"
          />
        </label>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin lg:pb-0">
          {FILTERS.map((f) => (
            <label key={f.id} className="shrink-0">
              <span className="sr-only">{f.label}</span>
              <select
                defaultValue="Any"
                aria-label={f.label}
                className="appearance-none border border-gold/15 bg-[#1a1b20]/70 py-2 pl-3 pr-7 text-[0.72rem] tracking-wide text-cream/55 outline-none transition-colors hover:border-gold/35 focus:border-gold/40"
              >
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "Any" ? f.label : opt}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
