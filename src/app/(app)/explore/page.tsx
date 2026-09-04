"use client";

import { useMemo, useState } from "react";
import { Icons } from "@/components/icons/Icons";
import { FeedCard } from "@/components/feed/FeedCard";
import { CATEGORIES, FEED_ITEMS } from "@/lib/data";
import { Button, SectionHeading } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

const simpleCategories = [
  "All",
  "Poses",
  "Expressions",
  "Costumes",
  "Dance Videos",
  "Practice",
  "Photos",
  "Stage",
  "Jewelry",
  "Albums",
];

const categoryAliases: Record<string, string[]> = {
  Expressions: ["Abhinaya"],
  "Dance Videos": ["Choreography"],
  Practice: ["Rehearsal"],
  Photos: ["Photography", "Performance"],
};

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    return FEED_ITEMS.filter((item) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.tags.some((t) => t.includes(q)) ||
        item.creator.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      const mapped = categoryAliases[category];
      const matchesCategory =
        category === "All" ||
        item.category === category ||
        (mapped?.includes(item.category) ?? false) ||
        (CATEGORIES.includes(category as (typeof CATEGORIES)[number]) &&
          item.category === category);
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div>
      <SectionHeading
        eyebrow="Discover"
        title="Explore"
        subtitle="Find new dance inspiration — poses, costumes, videos, and more."
      />

      <div className="relative mt-6">
        <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sandalwood" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dancers, poses, costumes, videos…"
          className="w-full border border-[var(--border-gold)] bg-charcoal-elevated/70 py-3 pl-10 pr-4 text-sm text-ivory placeholder:text-sandalwood/70"
          aria-label="Search"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-sandalwood">
        <span>Try:</span>
        {["poses", "costume ideas", "practice video", "stage light"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuery(s)}
            className="border border-[var(--border-gold)] px-2 py-1 hover:text-gold"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex flex-1 gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {simpleCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "shrink-0 border px-3 py-1.5 text-xs transition-colors",
                category === cat
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-[var(--border-gold)] text-sandalwood hover:border-gold/50",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 border border-[var(--border-gold)] px-3 py-2 text-xs text-sandalwood hover:text-gold"
        >
          <Icons.Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {filtersOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end bg-obsidian/70 sm:items-center sm:justify-end"
          role="dialog"
          aria-modal
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative w-full border border-[var(--border-gold)] bg-charcoal p-5 sm:h-full sm:max-w-md">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-ivory">Filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close">
                <Icons.Close className="h-5 w-5 text-sandalwood" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {[
                ["Dance style", ["Bharatanatyam", "Kathak", "Contemporary"]],
                ["Type", ["Solo", "Group", "Traditional", "Modern"]],
                ["Level", ["Beginner", "Intermediate", "Advanced"]],
                ["Media", ["Photo", "Video", "Performance", "Practice"]],
              ].map(([label, options]) => (
                <label key={String(label)} className="block space-y-1">
                  <span className="label-ui">{label as string}</span>
                  <select className="w-full border border-[var(--border-bronze)] bg-obsidian/60 px-2 py-2 text-sm text-ivory">
                    <option value="">Any</option>
                    {(options as string[]).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="mt-8 flex gap-2">
              <Button variant="ghost" className="flex-1" onClick={() => setFiltersOpen(false)}>
                Clear all
              </Button>
              <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <p className="mt-6 text-sm text-sandalwood">
        {results.length === 0
          ? "No movement found here yet."
          : `${results.length} results`}
      </p>
      <div className="mt-4 masonry">
        {results.map((item, index) => (
          <FeedCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
