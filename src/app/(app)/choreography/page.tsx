"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CHOREOGRAPHY } from "@/lib/data";
import { cn } from "@/lib/utils";

const FILTERS = ["All videos", "My uploads", "Saved videos", "Practice studies", "Full choreography", "Reference videos"] as const;

export default function ChoreographyPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All videos");

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-cream">Choreography</h2>
          <p className="mt-2 text-sm text-cream/50">Store the movement. Return to it anytime.</p>
        </div>
        <Link
          href="/choreography?upload=1"
          className="inline-flex rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] px-5 py-2.5 text-sm font-semibold text-[#1a1408]"
        >
          Upload choreography
        </Link>
      </header>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[0.78rem] transition-colors",
              filter === f
                ? "border-gold/45 bg-gold/15 text-gold"
                : "border-cream/10 text-cream/45 hover:border-gold/25 hover:text-cream/70",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CHOREOGRAPHY.map((video) => (
          <article
            key={video.id}
            className="overflow-hidden rounded-2xl border border-gold/18 bg-[#1a1b20] transition-all hover:-translate-y-1 hover:border-gold/40"
          >
            <div className="relative aspect-video">
              <Image src={video.poster} alt="" fill className="object-cover" sizes="33vw" />
              <div className="absolute inset-0 bg-[#15161A]/25" />
              <span className="absolute bottom-2 right-2 rounded bg-black/55 px-2 py-0.5 text-[0.68rem] text-cream/85">
                {video.duration}
              </span>
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-gold/20 text-gold">
                <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-gold" />
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg text-cream">{video.title}</h3>
              <p className="mt-1 text-[0.8rem] text-cream/45">
                {video.composition} · {video.difficulty}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {video.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full border border-gold/15 px-2 py-0.5 text-[0.65rem] text-cream/40">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.7rem] text-cream/40">
                <span className="rounded-full border border-gold/20 px-2 py-1">Slow playback</span>
                <span className="rounded-full border border-gold/20 px-2 py-1">Mirror</span>
                <span className="rounded-full border border-gold/20 px-2 py-1">Loop</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
