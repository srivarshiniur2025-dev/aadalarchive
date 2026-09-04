import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBoard, getFeedItem } from "@/lib/data";
import { Button, PrivacyBadge } from "@/components/ui/Primitives";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const board = getBoard(id);
  if (!board) notFound();

  const items = board.itemIds
    .map((itemId) => getFeedItem(itemId))
    .filter(Boolean);

  return (
    <div>
      <Link href="/boards" className="text-sm text-gold hover:underline">
        ← Collections
      </Link>
      <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden border border-[var(--border-gold)]">
          <Image
            src={board.cover}
            alt={board.title}
            fill
            className="object-cover"
            sizes="40vw"
            priority
          />
          <div className="pointer-events-none absolute inset-4 border border-gold/25" />
        </div>
        <div>
          <PrivacyBadge privacy={board.privacy} />
          <h1 className="font-display mt-3 text-4xl text-ivory md:text-5xl">
            {board.title}
          </h1>
          <p className="mt-3 max-w-xl text-sandalwood">{board.description}</p>
          <p className="mt-2 text-sm text-bronze">
            Dance Collection — save images and videos in one place.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {board.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[var(--border-gold)] px-2.5 py-0.5 text-xs text-sandalwood"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button>Invite your dance friends</Button>
            <Button variant="secondary">Share</Button>
            <Button variant="ghost">Delete</Button>
          </div>
        </div>
      </div>

      <div className="mt-10 masonry">
        {items.map((item) =>
          item ? (
            <article
              key={item.id}
              className="masonry-item overflow-hidden border border-[var(--border-gold)] bg-charcoal-elevated/70"
            >
              <Link href={`/discover/${item.id}`} className="relative block aspect-[3/4]">
                <Image
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </Link>
              <div className="p-3">
                <h3 className="font-display text-lg text-ivory">{item.title}</h3>
                {board.notes[item.id] ? (
                  <p className="mt-2 border border-gold/20 bg-obsidian/50 p-2 text-xs italic text-sandalwood">
                    “{board.notes[item.id]}”
                  </p>
                ) : null}
              </div>
            </article>
          ) : null,
        )}
      </div>
    </div>
  );
}
