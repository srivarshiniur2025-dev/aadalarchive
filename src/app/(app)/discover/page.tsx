"use client";

import { useState } from "react";
import { FeedCard, SaveToBoardModal } from "@/components/feed/FeedCard";
import { FEED_ITEMS } from "@/lib/data";
import { Button, PageIntro } from "@/components/ui/Primitives";

const categories = [
  "All",
  "Poses",
  "Expressions",
  "Costumes",
  "Dance Videos",
  "Photos",
  "Jewelry",
  "Stage",
];

export default function DiscoverPage() {
  const [saveId, setSaveId] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const saving = FEED_ITEMS.find((i) => i.id === saveId);

  const categoryMap: Record<string, string[]> = {
    Expressions: ["Abhinaya"],
    "Dance Videos": ["Choreography"],
    Photos: ["Photography", "Performance"],
  };

  const items =
    category === "All"
      ? FEED_ITEMS
      : FEED_ITEMS.filter((i) => {
          const mapped = categoryMap[category];
          if (mapped) return mapped.includes(i.category);
          return i.category === category;
        });

  return (
    <div>
      <PageIntro
        greeting="Welcome to your dance space."
        subtitle="Find your next idea."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button href="/create" variant="doorway">
              Create
            </Button>
            <Button href="/capture" variant="secondary">
              Record your practice
            </Button>
          </div>
        }
      />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`shrink-0 border px-3 py-2 text-xs tracking-[0.1em] uppercase transition-colors ${
              category === cat
                ? "border-temple bg-temple/10 text-temple"
                : "border-[var(--border-gold)] bg-paper text-bronze hover:border-temple/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="masonry">
        {items.map((item, index) => (
          <FeedCard
            key={item.id}
            item={item}
            index={index}
            onSave={(id) => setSaveId(id)}
          />
        ))}
      </div>
      <SaveToBoardModal
        open={!!saveId}
        onClose={() => setSaveId(null)}
        itemTitle={saving?.title ?? ""}
      />
    </div>
  );
}
