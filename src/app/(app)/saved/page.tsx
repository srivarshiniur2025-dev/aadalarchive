"use client";

import Image from "next/image";
import Link from "next/link";
import { FEED_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-xl">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] text-cream">Saved</h2>
        <p className="mt-2 text-sm text-cream/50">Inspiration waiting for your next rehearsal.</p>
      </header>

      <div className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4">
        {FEED_ITEMS.map((item, idx) => (
          <Link
            key={item.id}
            href="/discover"
            className={cn(
              "studio-media group mb-3 block break-inside-avoid",
              idx % 4 === 0 ? "aspect-[3/4]" : idx % 4 === 1 ? "aspect-square" : "aspect-[4/5]",
            )}
          >
            <div className="relative h-full min-h-[150px] w-full">
              <Image
                src={item.mediaUrl}
                alt={item.title}
                fill
                className="media-zoom object-cover"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                <p className="text-[0.55rem] uppercase tracking-[0.12em] text-gold/80">{item.category}</p>
                <p className="mt-0.5 line-clamp-2 font-display text-sm text-cream">{item.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
