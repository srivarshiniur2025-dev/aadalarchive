"use client";

import Image from "next/image";
import Link from "next/link";
import { FEED_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

const ROOMS = [
  { name: "Temples", desc: "Sacred spaces that hold rhythm and light.", image: FEED_ITEMS[4]?.mediaUrl, span: "lg:col-span-2 lg:row-span-2" },
  { name: "Salangai", desc: "Bells that mark every step.", image: FEED_ITEMS[6]?.mediaUrl, span: "" },
  { name: "Hastas", desc: "Hands that speak without words.", image: FEED_ITEMS[0]?.mediaUrl, span: "" },
  { name: "Expressions", desc: "Eyes that hold the story.", image: FEED_ITEMS[1]?.mediaUrl, span: "lg:col-span-2" },
  { name: "Costumes", desc: "Silk, border, and stage color.", image: FEED_ITEMS[2]?.mediaUrl, span: "" },
  { name: "Jewelry", desc: "Gold that frames the face.", image: FEED_ITEMS[5]?.mediaUrl ?? FEED_ITEMS[2]?.mediaUrl, span: "" },
  { name: "Poses", desc: "Stillness before movement.", image: FEED_ITEMS[0]?.mediaUrl, span: "" },
  { name: "History", desc: "Lineage, memory, and archive.", image: FEED_ITEMS[8]?.mediaUrl ?? FEED_ITEMS[4]?.mediaUrl, span: "" },
  { name: "Stage Design", desc: "Light, space, and presence.", image: FEED_ITEMS[9]?.mediaUrl ?? FEED_ITEMS[11]?.mediaUrl, span: "lg:col-span-2" },
  { name: "Photography", desc: "Frames that keep the moment.", image: FEED_ITEMS[11]?.mediaUrl ?? FEED_ITEMS[5]?.mediaUrl, span: "" },
] as const;

export default function ExploreAppPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-xl">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-cream">Explore</h2>
        <p className="mt-2 text-sm text-cream/50">
          Walk through the rooms of the archive.
        </p>
      </header>

      <div className="mt-8 grid auto-rows-[180px] gap-4 sm:auto-rows-[200px] sm:grid-cols-2 lg:grid-cols-4">
        {ROOMS.map((room) => (
          <Link
            key={room.name}
            href={`/discover?tab=${encodeURIComponent(room.name)}`}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-gold/18",
              room.span,
            )}
          >
            <Image
              src={room.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/90 via-[#15161A]/35 to-[#15161A]/20" />
            <div className="absolute inset-3 border border-gold/0 transition-colors group-hover:border-gold/30" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <h3 className="font-display text-xl text-gold sm:text-2xl">{room.name}</h3>
              <p className="mt-1 max-w-[24ch] text-[0.8rem] text-cream/55">{room.desc}</p>
              <span className="mt-3 inline-flex text-sm text-cream/70 transition-transform group-hover:translate-x-1">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
