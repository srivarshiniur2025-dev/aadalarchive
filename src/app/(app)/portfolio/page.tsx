"use client";

import Image from "next/image";
import Link from "next/link";
import { CURRENT_USER, ALBUMS, CHOREOGRAPHY, BOARDS } from "@/lib/data";

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="app-panel-soft overflow-hidden">
        <div className="grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-end sm:p-7">
          <Image
            src={CURRENT_USER.avatar}
            alt=""
            width={112}
            height={112}
            className="h-24 w-24 rounded-full object-cover ring-2 ring-gold/35 sm:h-28 sm:w-28"
          />
          <div>
            <h2 className="font-display text-2xl text-cream sm:text-3xl">{CURRENT_USER.name}</h2>
            <p className="mt-1 text-sm text-cream/50">
              {CURRENT_USER.danceForm} · {CURRENT_USER.location}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/55">{CURRENT_USER.bio}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-cream/45">
              <span>{BOARDS.length} boards</span>
              <span>{ALBUMS.length} events</span>
              <span>{CHOREOGRAPHY.length} choreographies</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-display text-xl text-cream">Stage memories</h3>
          <Link href="/albums" className="text-sm text-gold">
            All events →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALBUMS.slice(0, 6).map((album) => (
            <Link key={album.id} href={`/albums/${album.id}`} className="studio-tile group overflow-hidden">
              <div className="relative aspect-[5/4]">
                <Image src={album.cover} alt="" fill className="media-zoom object-cover" sizes="33vw" />
              </div>
              <div className="p-3.5">
                <h4 className="font-display text-cream">{album.name}</h4>
                <p className="mt-1 text-[0.75rem] text-cream/40">
                  {album.date} · {album.venue}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-display text-xl text-cream">Movement archive</h3>
          <Link href="/choreography" className="text-sm text-gold">
            All choreography →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHOREOGRAPHY.map((video) => (
            <Link key={video.id} href="/choreography" className="studio-tile group overflow-hidden">
              <div className="relative aspect-video">
                <Image src={video.poster} alt="" fill className="media-zoom object-cover" sizes="33vw" />
              </div>
              <div className="p-3.5">
                <h4 className="font-display text-cream">{video.title}</h4>
                <p className="mt-1 text-[0.75rem] text-cream/40">
                  {video.duration} · {video.difficulty}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
