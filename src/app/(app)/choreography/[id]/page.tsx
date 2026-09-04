import Link from "next/link";
import { notFound } from "next/navigation";
import { DancePlayer } from "@/components/player/DancePlayer";
import { getChoreography } from "@/lib/data";
import { Button, PrivacyBadge } from "@/components/ui/Primitives";

export default async function DanceVideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = getChoreography(id);
  if (!video) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/choreography" className="text-sm text-gold hover:underline">
        ← Dance Videos
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <PrivacyBadge privacy={video.privacy} />
          <h1 className="font-display mt-2 text-4xl text-ivory">{video.title}</h1>
          <p className="mt-2 max-w-2xl text-sandalwood">{video.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">Save</Button>
          <Button variant="ghost">Add to album</Button>
        </div>
      </div>

      <div className="mt-6">
        <DancePlayer
          title={video.title}
          poster={video.poster}
          notes={video.notes}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="border border-[var(--border-gold)] bg-charcoal-elevated/60 p-4">
          <h2 className="font-display text-xl text-ivory">Details</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-sandalwood">Piece</dt>
              <dd className="text-ivory">{video.composition}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sandalwood">Choreographer</dt>
              <dd className="text-ivory">{video.choreographer}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sandalwood">Teacher</dt>
              <dd className="text-ivory">{video.guru}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sandalwood">Music</dt>
              <dd className="text-right text-ivory">{video.music}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sandalwood">Level</dt>
              <dd className="capitalize text-ivory">{video.difficulty}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sandalwood">Download</dt>
              <dd className="text-ivory">
                {video.allowDownload ? "Download allowed" : "No downloads"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="border border-[var(--border-gold)] bg-charcoal-elevated/60 p-4">
          <h2 className="font-display text-xl text-ivory">Credits & respect</h2>
          <p className="mt-3 text-sm leading-relaxed text-sandalwood">
            Uploading this video does not mean you own the choreography. Please
            credit your teacher, choreographer, and dancers. Ask before copying
            steps.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[var(--border-gold)] px-2.5 py-0.5 text-xs text-sandalwood"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="ghost">Share</Button>
            <Button variant="ghost">Report</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
