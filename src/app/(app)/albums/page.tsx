"use client";

import Image from "next/image";
import Link from "next/link";
import { ALBUMS } from "@/lib/data";

export default function AlbumsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-cream">Your Albums</h2>
          <p className="mt-2 text-sm text-cream/50">Keep every stage memory close.</p>
        </div>
        <Link
          href="/albums?create=1"
          className="inline-flex rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] px-5 py-2.5 text-sm font-semibold text-[#1a1408]"
        >
          Create an album
        </Link>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ALBUMS.map((album) => (
          <Link
            key={album.id}
            href={`/albums/${album.id}`}
            className="group overflow-hidden rounded-2xl border border-gold/18 bg-[#1a1b20] transition-all hover:-translate-y-1 hover:border-gold/40"
          >
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                src={album.cover}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/80 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg text-cream">{album.name}</h3>
              <p className="mt-1 text-[0.8rem] text-cream/45">
                {album.date} · {album.venue}
              </p>
              <p className="mt-2 text-[0.72rem] text-cream/35">
                {album.itemIds.length} memories · {album.privacy}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
