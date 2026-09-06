"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { ALBUMS, FEED_ITEMS } from "@/lib/data";

export default function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const album = ALBUMS.find((a) => a.id === id) ?? ALBUMS[0];
  const items = FEED_ITEMS.filter((f) => album.itemIds.includes(f.id));

  return (
    <div className="mx-auto max-w-6xl">
      <Link href="/albums" className="text-sm text-gold/80 hover:text-gold">
        ← Your Albums
      </Link>

      <section className="relative mt-4 overflow-hidden rounded-2xl border border-gold/18">
        <div className="relative h-56 sm:h-72">
          <Image src={album.cover} alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15161A] via-[#15161A]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">{album.category}</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] text-cream">{album.name}</h2>
            <p className="mt-2 text-sm text-cream/55">
              {album.date} · {album.venue} · {album.location}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] px-4 py-2 text-sm font-semibold text-[#1a1408]">
          Add memories
        </button>
        <button type="button" className="rounded-full border border-gold/30 px-4 py-2 text-sm text-gold">
          Share album
        </button>
        <button type="button" className="rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/60">
          Download memories
        </button>
      </div>

      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <section className="mt-8">
        <h3 className="font-display text-xl text-cream">Photos</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="relative aspect-square overflow-hidden rounded-xl border border-gold/15">
              <Image src={item.mediaUrl} alt={item.title} fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gold/15 bg-[#1a1b20]/80 p-5 sm:p-6">
        <h3 className="font-display text-xl text-cream">Notes</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/50">{album.description}</p>
        <p className="mt-3 text-[0.75rem] text-cream/35">
          Contributors: {album.contributors.join(" · ")}
        </p>
      </section>
    </div>
  );
}
