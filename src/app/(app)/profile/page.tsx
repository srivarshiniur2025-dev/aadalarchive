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
      <section className="studio-tile overflow-hidden">
        <div className="relative h-36 sm:h-44">
          <Image
            src="/landing/login-temple-doorway.jpg"
            alt=""
            fill
            className="object-cover object-[50%_35%] opacity-55"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1E24] via-[#15161A]/55 to-[#16495A]/20" />
          <span className="photo-corner photo-corner-tl" aria-hidden />
          <span className="photo-corner photo-corner-tr" aria-hidden />
        </div>
        <div className="relative px-5 pb-6 sm:px-7">
          <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Image
                  src={CURRENT_USER.avatar}
                  alt=""
                  width={112}
                  height={112}
                  className="h-24 w-24 rounded-full object-cover ring-2 ring-[#E5A93C]/55 sm:h-28 sm:w-28"
                />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border border-[#A8752B]/50 bg-[#1C1E24] px-2 py-0.5 font-inscription text-[0.5rem] tracking-[0.14em] text-[#E5A93C]">
                  Archive
                </span>
              </div>
              <div className="pb-1">
                <p className="font-inscription text-[0.55rem] tracking-[0.18em] text-[#A8752B]">Personal shrine</p>
                <h2 className="mt-0.5 font-display text-2xl text-[#F4EBDD] sm:text-3xl">{CURRENT_USER.name}</h2>
                <p className="mt-1 text-sm text-[#D8C6A7]/55">
                  {CURRENT_USER.danceForm} dancer · {CURRENT_USER.location}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="studio-btn px-4 py-2">
                Edit profile
              </button>
              <button type="button" className="studio-btn-ghost px-4 py-2">
                Share profile
              </button>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#D8C6A7]/55">
            Learning through rhythm, expression, and memory.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#D8C6A7]/50">
            <span>
              <em className="not-italic text-[#E5A93C]">{BOARDS.length}</em> Boards
            </span>
            <span>
              <em className="not-italic text-[#E5A93C]">{ALBUMS.length}</em> Albums
            </span>
            <span>
              <em className="not-italic text-[#E5A93C]">{CHOREOGRAPHY.length}</em> Choreography
            </span>
            <span>
              <em className="not-italic text-[#E5A93C]">18</em> Practice sessions
            </span>
          </div>
        </div>
      </section>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-[#A8752B]/20">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "heritage-tab relative shrink-0 px-3 py-2.5 text-[0.82rem]",
              tab === t ? "heritage-tab-active text-[#E5A93C]" : "text-[#D8C6A7]/45",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <section className="app-panel mt-8 p-6">
          <h3 className="font-display text-xl text-[#F4EBDD]">Dance journey</h3>
          <ol className="mt-6 flex flex-wrap items-center gap-y-3">
            {MILESTONES.map((m, i) => (
              <li key={m.label} className="flex items-center">
                <span className="flex w-24 flex-col items-center text-center sm:w-28">
                  <span className="flex h-8 w-8 items-center justify-center border border-[#E5A93C]/45 bg-[#15161A]">
                    <span className="h-2 w-2 rounded-full bg-[#E5A93C]" />
                  </span>
                  <span className="mt-2 font-inscription text-[0.65rem] tracking-[0.1em] text-[#E5A93C]/85">
                    {m.year}
                  </span>
                  <span className="mt-1 text-[0.75rem] leading-snug text-[#D8C6A7]/65">{m.label}</span>
                </span>
                {i < MILESTONES.length - 1 ? (
                  <span className="mb-10 h-px w-4 bg-[#A8752B]/40 sm:w-6" aria-hidden />
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {tab === "Inspiration" ? (
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {FEED_ITEMS.slice(0, 8).map((item) => (
            <div key={item.id} className="studio-media relative aspect-[3/4]">
              <span className="photo-corner photo-corner-tl" aria-hidden />
              <span className="photo-corner photo-corner-br" aria-hidden />
              <Image src={item.mediaUrl} alt={item.title} fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Albums" ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALBUMS.map((a) => (
            <div key={a.id} className="studio-tile p-4">
              <p className="font-display text-[#F4EBDD]">{a.name}</p>
              <p className="mt-1 text-sm text-[#D8C6A7]/50">{a.date}</p>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Choreography" ? (
        <div className="mt-8 space-y-2">
          {CHOREOGRAPHY.map((c) => (
            <div key={c.id} className="studio-tile px-4 py-3">
              <p className="font-display text-[#F4EBDD]">{c.title}</p>
              <p className="text-sm text-[#D8C6A7]/50">
                {c.duration} · {c.difficulty}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Practice Notes" ? (
        <div className="app-panel mt-8 p-8 text-center">
          <p className="font-display text-xl text-[#F4EBDD]">Nothing saved here yet.</p>
          <p className="mt-2 text-sm text-[#D8C6A7]/55">Find an idea that moves you and save it to begin.</p>
        </div>
      ) : null}
    </div>
  );
}
