"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FEED_ITEMS } from "@/lib/data";
import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

const TABS = [
  "For You",
  "Poses",
  "Hastas",
  "Expressions",
  "Costumes",
  "Jewelry",
  "Temples",
  "Photography",
  "Choreography",
  "Stage Design",
] as const;

export default function DiscoverPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("For You");

  const items = useMemo(() => {
    if (tab === "For You") return FEED_ITEMS;
    return FEED_ITEMS.filter((i) =>
      i.category.toLowerCase().includes(tab.toLowerCase().slice(0, 4)) ||
      i.tags.some((t) => t.toLowerCase().includes(tab.toLowerCase().slice(0, 4))),
    ).concat(FEED_ITEMS).slice(0, 10);
  }, [tab]);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-xl">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-cream">Discover</h2>
        <p className="mt-2 text-sm text-cream/50">Find ideas for your next movement.</p>
      </header>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-gold/12 pb-px scrollbar-none">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "relative shrink-0 px-3 py-2.5 text-[0.8rem] transition-colors",
              tab === t ? "text-gold" : "text-cream/45 hover:text-cream/70",
            )}
          >
            {t}
            {tab === t ? (
              <span className="absolute inset-x-2 bottom-0 h-px bg-gold" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {items.map((item, idx) => (
          <article
            key={`${item.id}-${idx}`}
            className="group mb-4 break-inside-avoid overflow-hidden rounded-xl border border-gold/15 bg-[#1a1b20] transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
          >
            <div
              className={cn(
                "relative overflow-hidden",
                item.aspect === "tall" || item.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]",
              )}
            >
              <Image
                src={item.mediaUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-3 border border-gold/35" />
              </div>
              <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15161A]/75 text-gold backdrop-blur-sm"
                  aria-label="Save"
                >
                  <Icons.Save className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="p-3.5">
              <p className="text-[0.58rem] uppercase tracking-[0.14em] text-gold/75">{item.category}</p>
              <h3 className="mt-1 font-display text-[0.95rem] leading-snug text-cream">{item.title}</h3>
              <p className="mt-1 text-[0.72rem] text-cream/40">{item.creator.name}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
