import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { CHOREOGRAPHY } from "@/lib/data";
import { Button, EmptyState, PrivacyBadge, SectionHeading } from "@/components/ui/Primitives";

export default function DanceVideosPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Gallery"
          title="Dance Videos"
          subtitle="Upload a dance video or open a practice clip. New videos start as Private."
        />
        <Button href="/create?type=video">Upload a dance video</Button>
      </div>

      {CHOREOGRAPHY.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Your dance videos will appear here."
            description="Begin with one movement."
            illustration="lamp"
            action={<Button href="/create?type=video">Upload a dance video</Button>}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CHOREOGRAPHY.map((video) => (
            <Link
              key={video.id}
              href={`/choreography/${video.id}`}
              className="group overflow-hidden border border-[var(--border-gold)] bg-charcoal-elevated/70 transition-colors hover:border-gold/60"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.poster}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
                <div className="absolute left-3 top-3">
                  <PrivacyBadge privacy={video.privacy} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full border border-gold bg-obsidian/70 p-3 text-gold">
                    <Play className="h-5 w-5" fill="currentColor" />
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl text-ivory">{video.title}</h3>
                <p className="mt-1 text-xs text-sandalwood">
                  {video.composition} · {video.duration} · {video.difficulty}
                </p>
                <p className="mt-2 text-xs text-bronze">Teacher: {video.guru}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
