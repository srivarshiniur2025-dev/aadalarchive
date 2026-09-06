"use client";

import Image from "next/image";
import { TEMPLE } from "@/components/temple";

const ARCHIVE = [
  {
    title: "Temple sculpture",
    caption: "Carved nritta postures in stone",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=700&q=80",
  },
  {
    title: "Performance photography",
    caption: "Archival stage light studies",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=700&q=80",
  },
  {
    title: "Traditional instruments",
    caption: "Mridangam · nattuvangam · veena",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=700&q=80",
  },
  {
    title: "Jewelry & costume",
    caption: "Temple set details for reference",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=80",
  },
  {
    title: "Manuscript motifs",
    caption: "Lineage notes and notation",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80",
  },
] as const;

export function ArchiveSection() {
  return (
    <section className="relative mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={TEMPLE.pillar.floral}
        alt=""
        className="pointer-events-none absolute bottom-8 left-2 hidden h-64 w-12 object-contain opacity-30 lg:block xl:left-4"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={TEMPLE.pillar.simple}
        alt=""
        className="pointer-events-none absolute bottom-8 right-2 hidden h-64 w-12 scale-x-[-1] object-contain opacity-30 lg:block xl:right-4"
      />

      <div className="relative z-[1] lg:px-14">
        <h2 className="font-display text-2xl text-cream/90 sm:text-[1.75rem]">
          From the Archive
        </h2>
        <p className="mt-2 max-w-lg text-[0.85rem] text-cream/45">
          Historical and cultural references — sculpture, instruments, costume, and lineage.
        </p>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-3 scrollbar-thin">
          {ARCHIVE.map((item) => (
            <article
              key={item.title}
              className="group w-56 shrink-0 sm:w-64"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#1a1b20]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="256px"
                  className="object-cover transition-transform duration-[380ms] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-[1.05rem] text-cream/90">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[0.7rem] text-cream/45">{item.caption}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
