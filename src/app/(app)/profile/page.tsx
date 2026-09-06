"use client";

import Image from "next/image";
import { useState } from "react";
import { CURRENT_USER, BOARDS, ALBUMS, CHOREOGRAPHY, FEED_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Inspiration", "Albums", "Choreography", "Practice Notes"] as const;

const MILESTONES = [
  { label: "Started Bharatanatyam", year: "2012" },
  { label: "First performance", year: "2015" },
  { label: "Arangetram", year: "2019" },
  { label: "Recent performance", year: "2025" },
  { label: "Current practice focus", year: "Now" },
];

export default function ProfilePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");

  return (
    <div className="mx-auto max-w-6xl">
      <section className="overflow-hidden rounded-2xl border border-gold/18 bg-[#1a1b20]">
        <div className="relative h-32 bg-gradient-to-r from-[#3A2412] via-[#5A2526]/40 to-[#15161A] sm:h-40" />
        <div className="relative px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <Image
                src={CURRENT_USER.avatar}
                alt=""
                width={112}
                height={112}
                className="h-24 w-24 rounded-full object-cover ring-2 ring-gold/40 sm:h-28 sm:w-28"
              />
              <div className="pb-1">
                <h2 className="font-display text-2xl text-cream sm:text-3xl">{CURRENT_USER.name}</h2>
                <p className="mt-1 text-sm text-cream/50">
                  {CURRENT_USER.danceForm} dancer · {CURRENT_USER.location}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded-full border border-gold/35 px-4 py-2 text-sm text-gold">
                Edit profile
              </button>
              <button type="button" className="rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/60">
                Share profile
              </button>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/50">
            Learning through rhythm, expression, and memory.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Boards", value: BOARDS.length },
              { label: "Albums", value: ALBUMS.length },
              { label: "Choreography", value: CHOREOGRAPHY.length },
              { label: "Practice sessions", value: 18 },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-gold/12 bg-[#15161A]/60 px-3 py-3 text-center">
                <p className="font-display text-xl text-cream">{m.value}</p>
                <p className="mt-0.5 text-[0.7rem] text-cream/40">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-gold/12">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "relative shrink-0 px-3 py-2.5 text-[0.82rem]",
              tab === t ? "text-gold" : "text-cream/45",
            )}
          >
            {t}
            {tab === t ? <span className="absolute inset-x-2 bottom-0 h-px bg-gold" /> : null}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <section className="mt-8">
          <h3 className="font-display text-xl text-cream">Dance journey</h3>
          <div className="mt-6 overflow-x-auto pb-2">
            <ol className="relative flex min-w-[640px] items-start justify-between gap-4 px-2">
              <div className="absolute left-4 right-4 top-3 h-px bg-gradient-to-r from-gold/20 via-gold/50 to-gold/20" />
              {MILESTONES.map((m) => (
                <li key={m.label} className="relative z-[1] flex w-28 flex-col items-center text-center">
                  <span className="h-3 w-3 rounded-full border-2 border-gold bg-[#15161A] shadow-[0_0_10px_rgba(229,169,60,0.45)]" />
                  <p className="mt-3 text-[0.7rem] text-gold/80">{m.year}</p>
                  <p className="mt-1 text-[0.78rem] leading-snug text-cream/70">{m.label}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {tab === "Inspiration" ? (
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {FEED_ITEMS.slice(0, 8).map((item) => (
            <div key={item.id} className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gold/15">
              <Image src={item.mediaUrl} alt={item.title} fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Albums" ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ALBUMS.map((a) => (
            <div key={a.id} className="rounded-xl border border-gold/15 p-4">
              <p className="font-display text-cream">{a.name}</p>
              <p className="mt-1 text-sm text-cream/45">{a.date}</p>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Choreography" ? (
        <div className="mt-8 space-y-3">
          {CHOREOGRAPHY.map((c) => (
            <div key={c.id} className="rounded-xl border border-gold/15 px-4 py-3">
              <p className="font-display text-cream">{c.title}</p>
              <p className="text-sm text-cream/45">{c.duration} · {c.difficulty}</p>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Practice Notes" ? (
        <div className="mt-8 rounded-2xl border border-gold/15 bg-[#1a1b20] p-6 text-center">
          <p className="font-display text-xl text-cream">Nothing saved here yet.</p>
          <p className="mt-2 text-sm text-cream/50">
            Find an idea that moves you and save it to begin.
          </p>
        </div>
      ) : null}
    </div>
  );
}
