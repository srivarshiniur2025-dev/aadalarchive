"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { getAlbum, getFeedItem } from "@/lib/data";
import { Button, PrivacyBadge } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

const sectionLabels: Record<string, string> = {
  inspiration: "Inspiration",
  preparation: "Preparation",
  rehearsal: "Rehearsal",
  costume: "Costume & adornment",
  makeup: "Makeup",
  backstage: "Backstage",
  on_stage: "On stage",
  audience: "Audience",
  after: "After the performance",
};

export default function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const album = getAlbum(id);
  const [opened, setOpened] = useState(false);
  const [section, setSection] = useState(album?.sections[0] ?? "on_stage");

  if (!album) notFound();

  const items = album.itemIds
    .map((itemId) => getFeedItem(itemId))
    .filter(Boolean);

  if (!opened) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="group relative w-full max-w-md overflow-hidden rounded-xl border border-gold/40 shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:-translate-y-1"
          aria-label={`Open album ${album.name}`}
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={album.cover}
              alt={album.name}
              fill
              className="object-cover animate-silk"
              sizes="400px"
              priority
            />
            <div className="absolute inset-5 rounded-lg border border-gold/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-left">
              <p className="font-inscription text-[0.65rem] tracking-[0.22em] text-gold">
                Performance Album
              </p>
              <h1 className="font-display mt-2 text-3xl text-ivory">
                {album.name}
              </h1>
              <p className="mt-2 text-sm text-sandalwood">
                Your album is ready — tap to open
              </p>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-rise">
      <Link href="/albums" className="text-sm text-gold hover:underline">
        ← Albums
      </Link>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <PrivacyBadge privacy={album.privacy} />
          <h1 className="font-display mt-2 text-4xl text-ivory">{album.name}</h1>
          <p className="mt-2 text-muted">
            {album.venue}, {album.location} · {album.date}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-sandalwood">
            {album.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href="/capture">Record your practice</Button>
          <Button variant="secondary">Invite your dance friends</Button>
          <Button variant="ghost">Share</Button>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {album.sections.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSection(s)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors",
              section === s
                ? "border-gold bg-gold/15 text-gold"
                : "border-[var(--border-gold)] text-muted",
            )}
          >
            {sectionLabels[s] ?? s}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-sandalwood">
        Section · {sectionLabels[section]}
      </p>

      <div className="mt-4 masonry">
        {items.map((item) =>
          item ? (
            <Link
              key={item.id}
              href={`/discover/${item.id}`}
              className="masonry-item relative block overflow-hidden rounded-xl border border-[var(--border-gold)]"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="p-3">
                <p className="font-display text-lg text-ivory">{item.title}</p>
                <p className="text-xs text-muted">
                  {item.credits.photographer || item.creator.name}
                </p>
              </div>
            </Link>
          ) : null,
        )}
      </div>

      <div className="mt-8 rounded-xl border border-[var(--border-gold)] bg-charcoal-elevated/60 p-4">
        <h2 className="font-display text-xl text-ivory">Dance friends</h2>
        <p className="mt-2 text-sm text-sandalwood">
          {album.contributors.join(" · ")}
        </p>
        <p className="mt-3 text-xs text-bronze">
          Roles: Owner · Can edit · Can upload · View only · Photographer · Teacher
        </p>
      </div>
    </div>
  );
}
