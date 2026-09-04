"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Camera, FolderPlus, Images, Video } from "lucide-react";
import { Button, Input, SectionHeading } from "@/components/ui/Primitives";
import { UploadProgress } from "@/components/animations/Motifs";
import { cn } from "@/lib/utils";

const createTypes = [
  {
    id: "board",
    label: "Collection",
    icon: FolderPlus,
    desc: "Save dance ideas and references",
  },
  {
    id: "album",
    label: "Event album",
    icon: Images,
    desc: "Keep memories from a performance",
  },
  {
    id: "video",
    label: "Dance video",
    icon: Video,
    desc: "Upload a practice or performance clip",
  },
  {
    id: "capture",
    label: "Record practice",
    icon: Camera,
    desc: "Capture from your camera",
  },
];

function CreateInner() {
  const params = useSearchParams();
  const initial = params.get("type") ?? "board";
  const [type, setType] = useState(initial === "project" ? "board" : initial);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function simulateUpload() {
    setUploading(true);
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => setUploading(false), 600);
          return 100;
        }
        return p + 8;
      });
    }, 180);
  }

  return (
    <div>
      <SectionHeading
        eyebrow="Create"
        title="Create"
        subtitle="Upload photos, videos, collections, or albums."
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {createTypes.map((item) => {
          const Icon = item.icon;
          const active = type === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === "capture") {
                  window.location.href = "/capture";
                  return;
                }
                setType(item.id);
              }}
              className={cn(
                "rounded-[var(--radius-sm)] border p-4 text-left transition-colors",
                active
                  ? "border-gold bg-temple/25"
                  : "border-[var(--border-gold)] hover:border-gold/50",
              )}
            >
              <Icon className="h-5 w-5 text-gold" />
              <p className="mt-3 font-display text-xl text-ivory">{item.label}</p>
              <p className="mt-1 text-xs text-sandalwood">{item.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="silk-panel mt-8 rounded-[var(--radius-lg)] p-6">
        {type === "board" ? (
          <form className="space-y-4" action="/boards">
            <h2 className="font-display text-2xl text-ivory">
              Create a new collection
            </h2>
            <Input
              label="Name"
              id="title"
              placeholder="Costume ideas"
              required
            />
            <Input
              label="Description"
              id="description"
              as="textarea"
              placeholder="Save inspiration for later."
            />
            <label className="block space-y-1.5">
              <span className="label-ui">Who can see this</span>
              <select className="w-full border border-[var(--border-bronze)] bg-charcoal/60 px-3 py-2.5 text-sm text-ivory">
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="invite_only">Shared</option>
                <option value="unlisted">Shared link</option>
              </select>
            </label>
            <Button type="submit">Save</Button>
          </form>
        ) : null}

        {type === "album" ? (
          <form className="space-y-4" action="/albums">
            <h2 className="font-display text-2xl text-ivory">
              Create an event album
            </h2>
            <p className="text-sm text-sandalwood">
              Performance Album — store memories from one event.
            </p>
            <Input
              label="Event name"
              id="name"
              placeholder="My first full show — 2027"
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Date" id="date" type="date" />
              <Input label="Venue" id="venue" placeholder="Where you performed" />
            </div>
            <Input label="City" id="location" placeholder="Chennai" />
            <Input
              label="Description"
              id="description"
              as="textarea"
              placeholder="A short story of the day…"
            />
            <label className="block space-y-1.5">
              <span className="label-ui">Event type</span>
              <select className="w-full border border-[var(--border-bronze)] bg-charcoal/60 px-3 py-2.5 text-sm text-ivory">
                {[
                  "First full show",
                  "Recital",
                  "Festival",
                  "Competition",
                  "Practice",
                  "Temple performance",
                  "Photo shoot",
                  "Workshop",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="label-ui">Who can see this</span>
              <select className="w-full border border-[var(--border-bronze)] bg-charcoal/60 px-3 py-2.5 text-sm text-ivory">
                <option value="private">Private</option>
                <option value="invite_only">Shared</option>
                <option value="unlisted">Shared link</option>
                <option value="public">Public</option>
              </select>
            </label>
            <Button type="submit">Save</Button>
          </form>
        ) : null}

        {type === "video" ? (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ivory">
              Upload a dance video
            </h2>
            <Input
              label="Title"
              id="title"
              placeholder="Practice — slow footwork"
            />
            <Input
              label="Description"
              id="description"
              as="textarea"
              placeholder="Please do not copy this choreography without asking your teacher."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Song or piece name" id="composition" />
              <Input label="Teacher credit" id="guru" />
              <Input label="Choreographer" id="choreographer" />
              <Input label="Music details" id="music" />
            </div>
            <label className="block space-y-1.5">
              <span className="label-ui">Usage note</span>
              <select className="w-full border border-[var(--border-bronze)] bg-charcoal/60 px-3 py-2.5 text-sm text-ivory">
                <option>Please do not copy</option>
                <option>Learning use OK</option>
                <option>Please credit</option>
                <option>Traditional piece</option>
                <option>Original work</option>
              </select>
            </label>
            {uploading ? (
              <div className="space-y-2 text-center">
                <UploadProgress progress={progress} />
                <p className="text-sm text-sandalwood">
                  Your video is being prepared.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Button onClick={simulateUpload}>Upload a dance video</Button>
                <Button variant="secondary" href="/capture">
                  Record your practice
                </Button>
              </div>
            )}
            {!uploading && progress >= 100 ? (
              <p className="text-sm text-gold">
                Your movement has been preserved. Your video is ready.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<p className="text-sandalwood">Opening create…</p>}>
      <CreateInner />
    </Suspense>
  );
}
