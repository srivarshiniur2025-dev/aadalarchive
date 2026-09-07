"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CURRENT_USER,
  BOARDS,
  ALBUMS,
  CHOREOGRAPHY,
  FEED_ITEMS,
  PROJECTS,
} from "@/lib/data";
import { HeritageIcons } from "@/components/heritage/HeritageIcons";
import {
  FeaturedArchFrame,
  HeritageButton,
  HeritageCorners,
  HeritageDivider,
  Inscription,
} from "@/components/heritage/HeritageChrome";
import { cn } from "@/lib/utils";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const JOURNEY = ["Inspiration", "Idea", "Planning", "Practice", "Performance", "Archive"] as const;
const WORK_TABS = ["Boards", "Events", "Choreography", "Practice"] as const;

const QUICK = [
  { title: "New Board", href: "/boards?create=1", icon: HeritageIcons.Boards },
  { title: "New Event", href: "/albums?create=1", icon: HeritageIcons.Albums },
  { title: "Upload Choreography", href: "/choreography?upload=1", icon: HeritageIcons.Upload },
  { title: "Capture Practice", href: "/studio?record=1", icon: HeritageIcons.Practice },
] as const;

export default function HomePage() {
  const firstName = CURRENT_USER.name.split(" ")[0];
  const featuredAlbum = ALBUMS[0];
  const practice = CHOREOGRAPHY[0];
  const [workTab, setWorkTab] = useState<(typeof WORK_TABS)[number]>("Boards");

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {/* Greeting */}
      <section className="heritage-panel px-5 py-6 sm:px-7 sm:py-7">
        <HeritageCorners />
        <Inscription>
          {greeting()}, {firstName}
        </Inscription>
        <h2 className="mt-2 max-w-xl font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-tight text-cream">
          Continue your creative journey.
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#D8C7A3]/65">
          Your inspirations, ideas, rehearsals and performances — preserved in one archive.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <HeritageButton href="/discover">
            <HeritageIcons.Explore className="h-4 w-4" />
            Explore Inspiration
          </HeritageButton>
          <HeritageButton href="/studio" variant="secondary">
            <HeritageIcons.Practice className="h-4 w-4" />
            Continue Practice
          </HeritageButton>
        </div>
      </section>

      {/* Featured project */}
      <section>
        <div className="mb-4">
          <Inscription>Continue your journey</Inscription>
          <h3 className="mt-1 font-display text-xl text-cream">Active collection</h3>
        </div>
        <article className="heritage-panel overflow-hidden">
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <FeaturedArchFrame
              src={featuredAlbum?.cover || PROJECTS[0].cover}
              className="rounded-none border-0 shadow-none lg:min-h-[280px]"
            />
            <div className="flex flex-col justify-center p-5 sm:p-7">
              <Inscription>Performance archive</Inscription>
              <h4 className="mt-2 font-display text-2xl text-cream">
                {featuredAlbum?.name || "My Arangetram"}
              </h4>
              <HeritageDivider className="mt-3 max-w-[12rem]" />
              <ul className="mt-5 space-y-1.5 text-sm text-[#D8C7A3]/70">
                <li>{FEED_ITEMS.length} inspirations</li>
                <li>{CHOREOGRAPHY.length} choreography notes</li>
                <li>{CHOREOGRAPHY.length} practice videos</li>
              </ul>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.12em] text-[#A9823D]/80">
                Last edited 2 hours ago
              </p>
              <HeritageButton href={`/albums/${featuredAlbum?.id || "a1"}`} className="mt-5 w-fit">
                <HeritageIcons.Archive className="h-4 w-4" />
                Continue Creating
              </HeritageButton>
            </div>
          </div>
        </article>
      </section>

      {/* Quick create */}
      <section>
        <Inscription>Create</Inscription>
        <h3 className="mt-1 font-display text-xl text-cream">Create something</h3>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {QUICK.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="heritage-card group flex items-center gap-3 px-3.5 py-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[#A9823D]/30 text-gold">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[0.82rem] text-[#D8C7A3]/85">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Your work */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Inscription>Archive</Inscription>
            <h3 className="mt-1 font-display text-xl text-cream">Your work</h3>
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {WORK_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setWorkTab(tab)}
                className={cn(
                  "heritage-tab shrink-0 px-3 py-2 text-[0.78rem]",
                  workTab === tab && "heritage-tab-active",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workTab === "Boards" &&
            BOARDS.map((board) => (
              <Link key={board.id} href="/boards" className="heritage-card group overflow-hidden">
                <div className="heritage-media relative aspect-[4/3] rounded-none border-0">
                  <Image src={board.cover} alt="" fill className="hz object-cover" sizes="33vw" />
                </div>
                <div className="p-3.5">
                  <h4 className="font-display text-[1.05rem] text-cream">{board.title}</h4>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.1em] text-[#A9823D]/80">
                    {board.itemIds.length} saved · collection
                  </p>
                </div>
              </Link>
            ))}

          {workTab === "Events" &&
            ALBUMS.slice(0, 6).map((album) => (
              <Link key={album.id} href={`/albums/${album.id}`} className="heritage-card group overflow-hidden">
                <div className="heritage-media relative aspect-[5/4] rounded-none border-0">
                  <Image src={album.cover} alt="" fill className="hz object-cover" sizes="33vw" />
                </div>
                <div className="p-3.5">
                  <h4 className="font-display text-[1.05rem] text-cream">{album.name}</h4>
                  <p className="mt-1 text-[0.72rem] text-[#D8C7A3]/55">
                    {album.date} · {album.venue}
                  </p>
                </div>
              </Link>
            ))}

          {workTab === "Choreography" &&
            CHOREOGRAPHY.map((video) => (
              <Link key={video.id} href="/choreography" className="heritage-card group overflow-hidden">
                <div className="heritage-media relative aspect-video rounded-none border-0">
                  <Image src={video.poster} alt="" fill className="hz object-cover" sizes="33vw" />
                  <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-[#211B15]/55 text-gold">
                    <HeritageIcons.Play className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-3.5">
                  <h4 className="font-display text-[1.05rem] text-cream">{video.title}</h4>
                  <p className="mt-1 text-[0.72rem] text-[#D8C7A3]/55">{video.difficulty}</p>
                </div>
              </Link>
            ))}

          {workTab === "Practice" && (
            <Link href="/studio" className="heritage-card group overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="heritage-media relative aspect-video rounded-none border-0">
                <Image src={practice.poster} alt="" fill className="hz object-cover" sizes="33vw" />
              </div>
              <div className="p-3.5">
                <h4 className="font-display text-[1.05rem] text-cream">{practice.title}</h4>
                <p className="mt-1 text-[0.72rem] text-[#D8C7A3]/55">Resume rehearsal</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Recently saved */}
      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <Inscription>Inspiration</Inscription>
            <h3 className="mt-1 font-display text-xl text-cream">Recently saved</h3>
            <p className="mt-1 text-sm text-[#D8C7A3]/55">Ideas waiting for your next rehearsal.</p>
          </div>
          <Link href="/saved" className="inline-flex items-center gap-1.5 text-sm text-gold">
            <HeritageIcons.Save className="h-3.5 w-3.5" />
            View all
          </Link>
        </div>
        <div className="mt-5 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {FEED_ITEMS.slice(0, 8).map((item, idx) => (
            <Link
              key={item.id}
              href="/discover"
              className={cn(
                "heritage-media group mb-3 block break-inside-avoid",
                idx % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]",
              )}
            >
              <div className="relative h-full min-h-[140px] w-full">
                <Image src={item.mediaUrl} alt={item.title} fill className="hz object-cover" sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/85 via-transparent to-transparent" />
                <button
                  type="button"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md bg-[#211B15]/75 text-gold opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Saved"
                >
                  <HeritageIcons.Save className="h-3.5 w-3.5" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-2.5">
                  <p className="text-[0.52rem] uppercase tracking-[0.14em] text-[#A9823D]">{item.category}</p>
                  <p className="mt-0.5 line-clamp-2 font-display text-sm text-cream">{item.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="heritage-panel px-5 py-6 sm:px-7">
        <Inscription>Path</Inscription>
        <h3 className="mt-1 font-display text-lg text-cream">Dance journey</h3>
        <ol className="mt-6 flex flex-wrap items-center gap-y-3">
          {JOURNEY.map((step, i) => (
            <li key={step} className="flex items-center">
              <span className="flex flex-col items-center px-1 sm:px-2">
                <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.4)]" />
                <span className="mt-2 text-[0.65rem] tracking-wide text-[#D8C7A3]/65">{step}</span>
              </span>
              {i < JOURNEY.length - 1 ? (
                <span className="mx-1 h-px w-4 bg-[#A9823D]/35 sm:w-7" aria-hidden />
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#A9823D]/18 pt-6 text-sm text-[#D8C7A3]/50">
        <span>
          <em className="not-italic text-cream/80">{BOARDS.length}</em> Boards
        </span>
        <span>
          <em className="not-italic text-cream/80">{ALBUMS.length}</em> Events
        </span>
        <span>
          <em className="not-italic text-cream/80">{CHOREOGRAPHY.length}</em> Choreographies
        </span>
        <span>
          <em className="not-italic text-cream/80">{FEED_ITEMS.length}</em> Saved Ideas
        </span>
      </section>
    </div>
  );
}
