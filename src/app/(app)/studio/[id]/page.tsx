import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeedItem, getProject } from "@/lib/data";
import { Button } from "@/components/ui/Primitives";

export default async function StudioProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const refs = project.referenceImageIds
    .map((rid) => getFeedItem(rid))
    .filter(Boolean);

  return (
    <div>
      <Link href="/studio" className="text-sm text-gold hover:underline">
        ← Practice
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-inscription text-[0.65rem] tracking-[0.2em] text-gold">
            {project.status.replaceAll("_", " ")}
          </p>
          <h1 className="font-display mt-2 text-4xl text-ivory">
            {project.title}
          </h1>
          <p className="mt-2 max-w-2xl text-muted">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Invite collaborator</Button>
          <Button variant="ghost">Version history</Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-display text-2xl text-ivory">References</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {refs.map((item) =>
              item ? (
                <Link
                  key={item.id}
                  href={`/discover/${item.id}`}
                  className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[var(--border-gold)]"
                >
                  <Image
                    src={item.mediaUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </Link>
              ) : null,
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border-gold)] bg-charcoal-elevated/60 p-4">
            <h2 className="font-display text-xl text-ivory">Notebook</h2>
            <ul className="mt-3 space-y-2">
              {project.notes.map((note) => (
                <li
                  key={note}
                  className="rounded-md border border-gold/15 bg-charcoal/40 px-3 py-2 text-sm text-sandalwood"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--border-gold)] bg-charcoal-elevated/60 p-4">
            <h2 className="font-display text-xl text-ivory">Collaborators</h2>
            <p className="mt-2 text-sm text-muted">
              {project.collaborators.join(" · ")}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border-gold)] bg-charcoal-elevated/60 p-4">
            <h2 className="font-display text-xl text-ivory">Linked videos</h2>
            <div className="mt-2 space-y-2">
              {project.videoIds.map((vid) => (
                <Link
                  key={vid}
                  href={`/choreography/${vid}`}
                  className="block text-sm text-gold hover:underline"
                >
                  Open choreography {vid}
                </Link>
              ))}
              {project.videoIds.length === 0 ? (
                <p className="text-sm text-muted">No videos linked yet.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
