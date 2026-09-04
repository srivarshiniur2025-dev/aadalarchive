import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { Button, EmptyState, SectionHeading } from "@/components/ui/Primitives";

const statusLabel: Record<string, string> = {
  concept: "Idea",
  research: "Research",
  choreography: "Creating steps",
  rehearsal: "Practice",
  revision: "Changes",
  performance_ready: "Ready to perform",
  archived: "Saved away",
};

export default function PracticePage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Practice Space"
          title="Practice"
          subtitle="Store rehearsal and choreography videos. Keep notes, references, and friends in one place."
        />
        <Button href="/create?type=video">Start a practice project</Button>
      </div>

      {PROJECTS.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Your dance videos will appear here."
            description="Begin with one movement."
            illustration="curtain"
            action={<Button href="/create?type=video">Upload a dance video</Button>}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={`/studio/${project.id}`}
              className="silk-panel group overflow-hidden transition-transform hover:-translate-y-0.5"
            >
              <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[200px]">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                </div>
                <div className="p-5">
                  <p className="label-ui text-gold">
                    {statusLabel[project.status]}
                  </p>
                  <h3 className="font-display mt-2 text-2xl text-ivory">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-sandalwood">
                    {project.description}
                  </p>
                  <p className="mt-4 text-xs text-bronze">
                    {project.collaborators.join(" · ")}
                  </p>
                  <ul className="mt-4 space-y-1">
                    {project.notes.slice(0, 2).map((note) => (
                      <li key={note} className="text-xs italic text-muted">
                        · {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
