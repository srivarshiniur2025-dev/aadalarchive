"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FlipHorizontal,
  Maximize,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { LampGlow } from "@/components/animations/Motifs";
import { cn } from "@/lib/utils";

export function DancePlayer({
  title,
  poster,
  notes,
}: {
  title: string;
  poster: string;
  notes: {
    id: string;
    time: number;
    text: string;
    category: string;
    author: string;
  }[];
}) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [mirrored, setMirrored] = useState(false);
  const [progress, setProgress] = useState(18);
  const [looping] = useState(false);
  const processing = false;

  const speeds = [0.5, 0.75, 1, 1.25];

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-gold)] bg-charcoal">
      <div className="relative aspect-video bg-charcoal-elevated">
        {processing ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <LampGlow />
            <p className="text-sm text-muted">Processing video…</p>
          </div>
        ) : (
          <>
            <Image
              src={poster}
              alt={title}
              fill
              className={cn(
                "object-cover transition-transform duration-500",
                mirrored && "scale-x-[-1]",
              )}
              sizes="80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
            {!playing ? (
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => setPlaying(true)}
                aria-label="Play"
              >
                <span className="rounded-full border border-gold bg-charcoal/70 p-4 text-gold">
                  <Play className="h-7 w-7" fill="currentColor" />
                </span>
              </button>
            ) : null}
            {looping ? (
              <span className="absolute right-3 top-3 rounded-full border border-gold/40 bg-charcoal/70 px-2 py-0.5 text-[0.65rem] text-gold">
                Loop
              </span>
            ) : null}
          </>
        )}
      </div>

      <div className="space-y-3 p-4">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-[var(--gold)]"
          aria-label="Seek"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-md p-2 text-muted hover:text-gold"
              aria-label="Frame back"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-md p-2 text-gold hover:bg-gold/10"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              className="rounded-md p-2 text-muted hover:text-gold"
              aria-label="Frame forward"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            {speeds.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={cn(
                  "rounded px-2 py-1 text-xs",
                  speed === s
                    ? "bg-gold/20 text-gold"
                    : "text-muted hover:text-ivory",
                )}
              >
                {s}x
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMirrored((m) => !m)}
              className={cn(
                "ml-1 rounded-md p-2",
                mirrored ? "text-gold" : "text-muted hover:text-gold",
              )}
              aria-label="Mirror mode"
              aria-pressed={mirrored}
            >
              <FlipHorizontal className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-md p-2 text-muted hover:text-gold"
              aria-label="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border-gold)] bg-charcoal-elevated/50 p-3">
          <h3 className="font-display text-lg text-ivory">Rhythm Notes</h3>
          <p className="mt-1 text-xs text-sandalwood">
            Add a note about timing, movement, or expression.
          </p>
          <ul className="mt-3 space-y-2">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-[var(--radius-sm)] border border-gold/15 bg-obsidian/40 px-3 py-2"
              >
                <p className="text-[0.65rem] uppercase tracking-wider text-gold">
                  {Math.floor(note.time / 60)}:
                  {String(note.time % 60).padStart(2, "0")} · {note.category} ·{" "}
                  {note.author}
                </p>
                <p className="mt-1 text-sm text-ivory">“{note.text}”</p>
              </li>
            ))}
          </ul>
          <label className="mt-3 block">
            <span className="sr-only">Add note</span>
            <input
              placeholder="Hold this pose for one more beat."
              className="w-full border border-[var(--border-bronze)] bg-charcoal/60 px-3 py-2 text-sm text-ivory placeholder:text-sandalwood/60"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
