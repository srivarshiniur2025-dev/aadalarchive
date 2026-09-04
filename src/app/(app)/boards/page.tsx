import Image from "next/image";
import Link from "next/link";
import { BOARDS } from "@/lib/data";
import { Button, EmptyState, PrivacyBadge, SectionHeading } from "@/components/ui/Primitives";

export default function CollectionsPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Collections"
          title="Saved"
          subtitle="Save dance ideas and references for later."
        />
        <Button href="/create?type=board">Create a new collection</Button>
      </div>

      {BOARDS.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No saved ideas yet."
            description="Your inspiration library is waiting for its first rhythm."
            illustration="kolam"
            action={<Button href="/create?type=board">Create a new collection</Button>}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BOARDS.map((board) => (
            <Link
              key={board.id}
              href={`/boards/${board.id}`}
              className="group overflow-hidden border border-[var(--border-gold)] bg-charcoal-elevated/70 transition-all hover:-translate-y-0.5 hover:border-gold/60"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={board.cover}
                  alt={board.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <PrivacyBadge privacy={board.privacy} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-2xl text-ivory">{board.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-sandalwood">
                  {board.description}
                </p>
                <p className="mt-3 text-xs text-bronze">
                  {board.itemIds.length} items ·{" "}
                  {board.collaborative ? "Shared" : "Private"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
