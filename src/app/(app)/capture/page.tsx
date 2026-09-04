"use client";

import { useState } from "react";
import { Button, Input, SectionHeading } from "@/components/ui/Primitives";
import { UploadProgress } from "@/components/animations/Motifs";
import { Icons } from "@/components/icons/Icons";

export default function CapturePage() {
  const [mode, setMode] = useState<"photo" | "video" | "practice">("practice");
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function startUpload() {
    setUploading(true);
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => setUploading(false), 500);
          return 100;
        }
        return p + 10;
      });
    }, 160);
  }

  return (
    <div>
      <SectionHeading
        eyebrow="Create"
        title="Record your practice"
        subtitle="Take a photo, record a video, then save it to a collection, album, or practice project."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["photo", "Take a photo", Icons.Camera],
            ["video", "Record a video", Icons.Video],
            ["practice", "Record practice", Icons.Record],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`inline-flex items-center gap-2 border px-3 py-1.5 text-sm ${
              mode === id
                ? "border-gold bg-gold/15 text-gold"
                : "border-[var(--border-gold)] text-sandalwood"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden border border-[var(--border-gold)] bg-obsidian">
        <div className="relative flex aspect-[9/14] max-h-[70vh] items-center justify-center bg-gradient-to-b from-charcoal to-obsidian sm:aspect-video sm:max-h-none">
          <div className="absolute inset-0 kolam-bg opacity-20" />
          <div className="relative text-center">
            <div
              className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 ${
                recording ? "animate-pulse border-vermilion" : "border-gold/50"
              }`}
            >
              <div
                className={`h-14 w-14 rounded-full ${
                  recording ? "bg-vermilion" : "bg-gold/30"
                }`}
              />
            </div>
            <p className="font-display text-2xl text-ivory">
              {recording ? "Recording…" : "Camera ready"}
            </p>
            <p className="mt-1 text-sm text-sandalwood">
              Easy capture for practice and performances
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 border-t border-[var(--border-gold)] p-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 border border-[var(--border-gold)] px-3 py-2 text-sm text-sandalwood hover:text-gold"
          >
            <Icons.Albums className="h-4 w-4" />
            Gallery
          </button>
          <button
            type="button"
            onClick={() => setRecording((r) => !r)}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-temple text-ivory"
            aria-label={recording ? "Stop" : "Record"}
          >
            <span
              className={`block ${
                recording
                  ? "h-5 w-5 rounded-sm bg-ivory"
                  : "h-10 w-10 rounded-full bg-vermilion"
              }`}
            />
          </button>
          <Button variant="secondary" onClick={startUpload}>
            Save
          </Button>
        </div>
      </div>

      <div className="silk-panel mt-6 space-y-4 p-5">
        <h2 className="font-display text-xl text-ivory">Add details</h2>
        <Input label="Title" id="title" placeholder="Practice — slow footwork" />
        <Input label="Description" id="description" as="textarea" rows={2} />
        <Input label="Tags" id="tags" placeholder="practice, timing, costume" />
        <Input
          label="Credits"
          id="credits"
          placeholder="Photographer / dancer / teacher"
        />
        <label className="block space-y-1.5">
          <span className="label-ui">Save to</span>
          <select className="w-full border border-[var(--border-bronze)] bg-charcoal/60 px-3 py-2.5 text-sm text-ivory">
            <option>Autumn practice days (album)</option>
            <option>Expression studies (collection)</option>
            <option>Dance Videos</option>
            <option>Practice Space project</option>
          </select>
        </label>
        {uploading ? (
          <div className="space-y-2 text-center">
            <UploadProgress progress={progress} />
            <p className="text-sm text-sandalwood">Your video is being prepared.</p>
          </div>
        ) : (
          <Button onClick={startUpload} className="w-full sm:w-auto">
            Upload
          </Button>
        )}
        {!uploading && progress >= 100 ? (
          <p className="text-sm text-gold">Your memories are safe here.</p>
        ) : null}
      </div>
    </div>
  );
}
