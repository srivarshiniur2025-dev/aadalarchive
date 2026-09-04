import Image from "next/image";
import Link from "next/link";
import { ALBUMS } from "@/lib/data";
import { Button, EmptyState, PrivacyBadge, SectionHeading } from "@/components/ui/Primitives";

export default function AlbumsPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Stage Memories"
          title="Albums"
          subtitle="Keep memories from a performance — photos, videos, and the story behind the day."
        />
        <Button href="/create?type=album">Create an event album</Button>
      </div>

      {ALBUMS.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Your first album starts here."
            description="Your memories are safe here."
            illustration="frame"
            action={<Button href="/create?type=album">Create an event album</Button>}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ALBUMS.map((album) => (
            <Link
              key={album.id}
              href={`/albums/${album.id}`}
              className="silk-panel group overflow-hidden p-3 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={album.cover}
                  alt={album.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="33vw"
                />
                <div className="pointer-events-none absolute inset-3 border border-gold/35" />
                <div className="absolute left-4 top-4">
                  <PrivacyBadge privacy={album.privacy} />
                </div>
              </div>
              <div className="px-1 pb-2 pt-4">
                <p className="label-ui text-gold">{album.category}</p>
                <h3 className="font-display mt-1 text-2xl text-ivory">
                  {album.name}
                </h3>
                <p className="mt-1 text-sm text-sandalwood">
                  {album.venue} · {album.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
