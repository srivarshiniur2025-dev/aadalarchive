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
        ← Events / Albums
      </Link>

      <section className="studio-tile relative mt-4 overflow-hidden">
        <div className="relative h-52 sm:h-64">
          <Image src={album.cover} alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15161A] via-[#15161A]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-[0.62rem] uppercase tracking-[0.14em] text-gold/80">{album.category}</p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,3vw,2.4rem)] text-cream">{album.name}</h2>
            <p className="mt-2 text-sm text-cream/55">
              {album.date} · {album.venue} · {album.location}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="studio-btn px-4 py-2">
          Add memories
        </button>
        <button type="button" className="studio-btn-ghost px-4 py-2">
          Share album
        </button>
      </div>

      <section className="mt-8">
        <h3 className="font-display text-xl text-cream">Photos</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="studio-media relative aspect-square">
              <Image src={item.mediaUrl} alt={item.title} fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="app-panel mt-10 p-5 sm:p-6">
        <h3 className="font-display text-xl text-cream">Notes</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/55">{album.description}</p>
      </section>
    </div>
  );
}
