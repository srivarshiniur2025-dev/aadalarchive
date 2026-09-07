"use client";

import Image from "next/image";
import { useState } from "react";
import { CHOREOGRAPHY } from "@/lib/data";
import { SalangaiLoader } from "@/components/animations/Motifs";
import { HeritageIcons } from "@/components/heritage/HeritageIcons";
import { HeritageButton, HeritageCorners, Inscription } from "@/components/heritage/HeritageChrome";
import { cn } from "@/lib/utils";

export default function PracticeStudioPage() {
  const [mirror, setMirror] = useState(true);
  const [slow, setSlow] = useState(false);
  const [loop, setLoop] = useState(false);
  const [metronome, setMetronome] = useState(false);
  const [processing] = useState(false);
  const poster = CHOREOGRAPHY[0]?.poster;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-xl">
        <Inscription>Rehearsal hall</Inscription>
        <h2 className="mt-1 font-display text-[clamp(1.6rem,3vw,2.2rem)] text-cream">Practice Studio</h2>
        <p className="mt-2 text-sm text-[#D8C7A3]/60">A private classical dance rehearsal space.</p>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_0.85fr]">
        <section className="heritage-panel overflow-hidden">
          <HeritageCorners />
          <div className="relative flex aspect-video items-center justify-center bg-[#15161A]">
            {poster ? (
              <Image src={poster} alt="" fill className="object-cover opacity-25" sizes="60vw" />
            ) : null}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-10 opacity-20 sm:w-14"
              style={{
                backgroundImage: "url(/temple/clean/pillar-edge.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-10 opacity-20 sm:w-14"
              style={{
                backgroundImage: "url(/temple/clean/pillar-edge.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scaleX(-1)",
              }}
              aria-hidden
            />

            {processing ? (
              <div className="relative z-[1] flex flex-col items-center gap-3">
                <SalangaiLoader size={64} label="Processing video" />
                <p className="text-sm text-[#D8C7A3]/55">Preparing your practice space...</p>
              </div>
            ) : (
              <div className="relative z-[1] px-4 text-center">
                <p className="font-display text-xl text-cream/85">Rehearsal stage</p>
                <p className="mt-2 text-sm text-[#D8C7A3]/50">Upload a video or begin recording</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                  <HeritageButton>
                    <HeritageIcons.Upload className="h-4 w-4" />
                    Upload video
                  </HeritageButton>
                  <HeritageButton variant="secondary">
                    <HeritageIcons.Record className="h-4 w-4" />
                    Start recording
                  </HeritageButton>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-[#A9823D]/22 px-4 py-3">
            {[
              { label: "Mirror", icon: HeritageIcons.Mirror, on: mirror, toggle: () => setMirror((v) => !v) },
              { label: "Slow", icon: HeritageIcons.Practice, on: slow, toggle: () => setSlow((v) => !v) },
              { label: "Loop", icon: HeritageIcons.Archive, on: loop, toggle: () => setLoop((v) => !v) },
              { label: "Rhythm", icon: HeritageIcons.Bell, on: metronome, toggle: () => setMetronome((v) => !v) },
            ].map((ctrl) => {
              const Icon = ctrl.icon;
              return (
                <button
                  key={ctrl.label}
                  type="button"
                  onClick={ctrl.toggle}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[0.75rem] transition-colors",
                    ctrl.on
                      ? "border-gold/40 bg-gold/12 text-gold"
                      : "border-[#A9823D]/25 text-[#D8C7A3]/55 hover:border-gold/30",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {ctrl.label}
                </button>
              );
            })}
            <span className="ml-auto font-display text-sm tracking-wider text-[#D8C7A3]/50">00:00</span>
          </div>
        </section>

        <aside className="heritage-panel p-5 sm:p-6">
          <Inscription>Practice notes</Inscription>
          <label className="mt-4 block">
            <span className="text-[0.7rem] text-[#D8C7A3]/50">Movement name</span>
            <input
              className="mt-1.5 w-full rounded-md border border-[#A9823D]/28 bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/40"
              defaultValue="Varnam — Abhinaya Study"
            />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label>
              <span className="text-[0.7rem] text-[#D8C7A3]/50">Repetitions</span>
              <input
                type="number"
                defaultValue={8}
                className="mt-1.5 w-full rounded-md border border-[#A9823D]/28 bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/40"
              />
            </label>
            <label>
              <span className="text-[0.7rem] text-[#D8C7A3]/50">Difficulty</span>
              <select
                defaultValue="Advanced"
                className="mt-1.5 w-full rounded-md border border-[#A9823D]/28 bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/40"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
          </div>
          <label className="mt-4 block">
            <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-[#D8C7A3]/50">
              <HeritageIcons.Notes className="h-3.5 w-3.5" />
              Notes
            </span>
            <textarea
              rows={5}
              className="mt-1.5 w-full rounded-md border border-[#A9823D]/28 bg-[#15161A] px-3 py-2.5 text-sm leading-relaxed text-cream outline-none focus:border-gold/40"
              defaultValue="Hold the gaze one beat longer before the turn. Keep shoulders soft."
            />
          </label>
          <HeritageButton type="submit" className="mt-5 w-full justify-center py-3">
            <HeritageIcons.Save className="h-4 w-4" />
            Save session
          </HeritageButton>
        </aside>
      </div>
    </div>
  );
}
