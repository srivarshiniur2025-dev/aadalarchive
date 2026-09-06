"use client";

import { useState } from "react";
import { SalangaiLoader } from "@/components/animations/Motifs";
import { cn } from "@/lib/utils";

export default function PracticeStudioPage() {
  const [mirror, setMirror] = useState(true);
  const [slow, setSlow] = useState(false);
  const [metronome, setMetronome] = useState(false);
  const [processing] = useState(false);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-xl">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-cream">Practice Studio</h2>
        <p className="mt-2 text-sm text-cream/50">A quiet space for your next movement.</p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <section className="overflow-hidden rounded-2xl border border-gold/18 bg-[#1a1b20]">
          <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-[#2a1a14] to-[#15161A]">
            {processing ? (
              <div className="flex flex-col items-center gap-3">
                <SalangaiLoader size={72} label="Processing video" />
                <p className="text-sm text-cream/50">Preparing your practice space...</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="font-display text-xl text-cream/80">Camera preview</p>
                <p className="mt-2 text-sm text-cream/40">Upload a video or start recording</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    className="rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] px-5 py-2.5 text-sm font-semibold text-[#1a1408]"
                  >
                    Upload video
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-gold/35 px-5 py-2.5 text-sm text-gold"
                  >
                    Start recording
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-gold/12 px-4 py-3">
            {[
              { label: "Mirror mode", on: mirror, toggle: () => setMirror((v) => !v) },
              { label: "Slow playback", on: slow, toggle: () => setSlow((v) => !v) },
              { label: "Rhythm", on: metronome, toggle: () => setMetronome((v) => !v) },
            ].map((ctrl) => (
              <button
                key={ctrl.label}
                type="button"
                onClick={ctrl.toggle}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[0.75rem] transition-colors",
                  ctrl.on
                    ? "border-gold/45 bg-gold/15 text-gold"
                    : "border-cream/12 text-cream/45 hover:border-gold/25",
                )}
              >
                {ctrl.label}
              </button>
            ))}
            <span className="ml-auto font-display text-sm text-cream/50">00:00</span>
          </div>
        </section>

        <aside className="rounded-2xl border border-gold/18 bg-[#1a1b20] p-5 sm:p-6">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-gold/75">
            Practice notes
          </p>
          <label className="mt-4 block">
            <span className="text-[0.7rem] text-cream/40">Movement name</span>
            <input
              className="mt-1.5 w-full rounded-lg border border-cream/12 bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/40"
              defaultValue="Varnam — Abhinaya Study"
            />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label>
              <span className="text-[0.7rem] text-cream/40">Repetitions</span>
              <input
                type="number"
                defaultValue={8}
                className="mt-1.5 w-full rounded-lg border border-cream/12 bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/40"
              />
            </label>
            <label>
              <span className="text-[0.7rem] text-cream/40">Difficulty</span>
              <select
                defaultValue="Advanced"
                className="mt-1.5 w-full rounded-lg border border-cream/12 bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/40"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-[0.7rem] text-cream/40">Focus area</span>
            <input
              className="mt-1.5 w-full rounded-lg border border-cream/12 bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/40"
              defaultValue="Eyes · breath · soft hold"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-[0.7rem] text-cream/40">Notes</span>
            <textarea
              rows={5}
              className="mt-1.5 w-full rounded-lg border border-cream/12 bg-[#15161A] px-3 py-2.5 text-sm leading-relaxed text-cream outline-none focus:border-gold/40"
              defaultValue="Hold the gaze one beat longer before the turn. Keep shoulders soft."
            />
          </label>
          <button
            type="button"
            className="mt-5 w-full rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] py-3 text-sm font-semibold text-[#1a1408]"
          >
            Save session
          </button>
        </aside>
      </div>
    </div>
  );
}
