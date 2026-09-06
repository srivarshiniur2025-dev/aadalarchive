"use client";

import Image from "next/image";
import Link from "next/link";
import { BOARDS } from "@/lib/data";

export default function BoardsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-cream">Your Boards</h2>
          <p className="mt-2 text-sm text-cream/50">Arrange the ideas that move you.</p>
        </div>
        <Link
          href="/boards?create=1"
          className="inline-flex rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] px-5 py-2.5 text-sm font-semibold text-[#1a1408]"
        >
          Create a board
        </Link>
      </header>

      {BOARDS.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="font-display text-2xl text-cream">Your first board is waiting.</p>
          <p className="mt-2 text-sm text-cream/50">
            Save a pose, costume, or idea and begin your collection.
          </p>
          <Link
            href="/boards?create=1"
            className="mt-6 inline-flex rounded-full border border-gold/40 px-5 py-2.5 text-sm text-gold"
          >
            Create your first board
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BOARDS.map((board) => (
            <article
              key={board.id}
              className="group overflow-hidden rounded-2xl border border-gold/18 bg-[#1a1b20] transition-all hover:-translate-y-1 hover:border-gold/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={board.cover}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/70 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-[#15161A]/60 px-2.5 py-0.5 text-[0.62rem] uppercase tracking-wide text-gold/90 backdrop-blur-sm">
                  {board.privacy}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg text-cream">{board.title}</h3>
                  <button type="button" className="text-cream/40 hover:text-gold" aria-label="Board menu">
                    ···
                  </button>
                </div>
                <p className="mt-1 line-clamp-2 text-[0.8rem] text-cream/45">{board.description}</p>
                <p className="mt-3 text-[0.72rem] text-cream/35">
                  {board.itemIds.length} saved · Updated recently
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
