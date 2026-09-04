import Image from "next/image";
import Link from "next/link";
import { ALBUMS, BOARDS, CHOREOGRAPHY, CURRENT_USER } from "@/lib/data";
import { Button, SectionHeading } from "@/components/ui/Primitives";

export default function ProfilePage() {
  const user = CURRENT_USER;
  const publicBoards = BOARDS.filter((b) => b.privacy === "public");
  const featured = CHOREOGRAPHY.slice(0, 2);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-gold)]">
        <div className="absolute inset-0">
          <Image
            src={ALBUMS[0].cover}
            alt=""
            fill
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40" />
          <div className="absolute inset-0 kolam-bg opacity-30" />
        </div>
        <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-end md:p-10">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gold/60 shadow-[0_0_40px_rgba(201,162,39,0.25)] md:h-40 md:w-40">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <div className="flex-1">
            <p className="font-inscription text-[0.65rem] tracking-[0.22em] text-gold">
              Dance Journey
            </p>
            <h1 className="font-display mt-2 text-4xl text-ivory md:text-5xl">
              {user.name}
            </h1>
            <p className="mt-2 text-sandalwood">
              {user.danceForm} · {user.location} · @{user.handle}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {user.artisticStatement}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button href="/create">Create</Button>
              <Button variant="secondary">Edit profile</Button>
              <Button variant="ghost">Share</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SectionHeading eyebrow="Featured" title="Performances" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {featured.map((video) => (
            <Link
              key={video.id}
              href={`/choreography/${video.id}`}
              className="overflow-hidden rounded-xl border border-[var(--border-gold)]"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.poster}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl text-ivory">{video.title}</h3>
                <p className="text-xs text-muted">{video.composition}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-ivory">Public collections</h2>
          <div className="mt-4 space-y-3">
            {publicBoards.map((board) => (
              <Link
                key={board.id}
                href={`/boards/${board.id}`}
                className="flex gap-3 rounded-xl border border-[var(--border-gold)] p-3 hover:border-gold/50"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image src={board.cover} alt="" fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="font-display text-lg text-ivory">{board.title}</p>
                  <p className="text-xs text-muted">{board.itemIds.length} pieces</p>
                </div>
              </Link>
            ))}
            {publicBoards.length === 0 ? (
              <p className="text-sm text-sandalwood">No public collections yet.</p>
            ) : null}
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ivory">About</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{user.bio}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-sandalwood">
            Interests
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[var(--border-gold)] px-2.5 py-0.5 text-xs text-gold"
              >
                {interest.replaceAll("_", " ")}
              </span>
            ))}
          </div>
          {user.website ? (
            <p className="mt-4 text-sm">
              <a href={user.website} className="text-gold hover:underline">
                {user.website}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
