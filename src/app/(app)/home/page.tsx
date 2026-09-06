"use client";

import Image from "next/image";
import Link from "next/link";
import { CURRENT_USER, BOARDS, ALBUMS, CHOREOGRAPHY, FEED_ITEMS } from "@/lib/data";
import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const QUICK = [
  {
    title: "Save inspiration",
    desc: "Save a pose, costume, or expression",
    href: "/discover",
    icon: Icons.Save,
    accent: "border-gold/30 hover:border-gold/55 hover:shadow-[0_0_28px_rgba(229,169,60,0.12)]",
    iconColor: "text-gold",
  },
  {
    title: "Create a board",
    desc: "Arrange ideas by theme",
    href: "/boards?create=1",
    icon: Icons.Boards,
    accent: "border-teal/30 hover:border-[#0E627A]/60 hover:shadow-[0_0_28px_rgba(14,98,122,0.15)]",
    iconColor: "text-[#7ec8d8]",
  },
  {
    title: "Start an album",
    desc: "Keep memories from an event",
    href: "/albums?create=1",
    icon: Icons.Albums,
    accent: "border-[#F38222]/30 hover:border-[#F38222]/55 hover:shadow-[0_0_28px_rgba(243,130,34,0.12)]",
    iconColor: "text-[#F38222]",
  },
  {
    title: "Upload choreography",
    desc: "Store a movement for later",
    href: "/choreography?upload=1",
    icon: Icons.Video,
    accent: "border-cream/20 hover:border-cream/40 hover:shadow-[0_0_28px_rgba(244,235,221,0.08)]",
    iconColor: "text-cream/80",
  },
] as const;

export default function HomePage() {
  const firstName = CURRENT_USER.name.split(" ")[0];
  const practice = CHOREOGRAPHY[0];

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {/* Welcome hero */}
      <section className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-[#3A2412] via-[#2a1a14] to-[#15161A] px-6 py-10 sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 60% at 85% 40%, rgba(229,169,60,0.25), transparent 60%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(14,98,122,0.15), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-8 top-4 h-48 w-48 rounded-full border border-gold/15 opacity-40" aria-hidden />
        <div className="pointer-events-none absolute -right-2 top-12 h-36 w-36 rounded-full border border-gold/10 opacity-30" aria-hidden />

        <div className="relative max-w-xl">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold/80">
            Your practice space
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.75rem)] font-medium leading-[1.1] text-cream">
            {greeting()}, {firstName}.
          </h2>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-cream/55">
            Your dance space is ready.
            <br />
            Find something to inspire your next movement.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] px-5 py-2.5 text-sm font-semibold text-[#1a1408] transition-transform hover:scale-[1.02]"
            >
              Explore inspiration
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 rounded-full border border-gold/35 px-5 py-2.5 text-sm text-gold transition-colors hover:bg-gold/10"
            >
              Continue practicing
            </Link>
          </div>
          <p className="mt-6 text-[0.72rem] tracking-wide text-cream/35">
            Your archive · {BOARDS.length} boards · {ALBUMS.length} albums
          </p>
        </div>
      </section>

      {/* Continue practicing */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="overflow-hidden rounded-2xl border border-gold/18 bg-[#1a1b20]">
          <div className="grid sm:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-video sm:aspect-auto sm:min-h-[220px]">
              <Image src={practice.poster} alt="" fill className="object-cover" sizes="(max-width:640px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/80 via-transparent to-transparent" />
              <button
                type="button"
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-gold/20 text-gold backdrop-blur-sm"
                aria-label="Resume practice"
              >
                <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-gold" />
              </button>
              <span className="absolute bottom-3 right-3 rounded bg-black/50 px-2 py-0.5 text-[0.7rem] text-cream/80">
                {practice.duration}
              </span>
            </div>
            <div className="flex flex-col justify-center p-5 sm:p-6">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-gold/75">
                Continue your practice
              </p>
              <h3 className="mt-2 font-display text-xl text-cream">{practice.title}</h3>
              <p className="mt-1 text-sm text-cream/45">Last practiced 2 days ago</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream/10">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold to-[#F38222]" />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem] text-cream/40">
                <span className="rounded-full border border-gold/20 px-2.5 py-1">Mirror mode</span>
                <span className="rounded-full border border-gold/20 px-2.5 py-1">Slow playback</span>
              </div>
              <Link
                href="/studio"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold/10"
              >
                Resume practice →
              </Link>
            </div>
          </div>
        </article>

        <aside className="rounded-2xl border border-gold/15 bg-[#1a1b20]/80 p-5 sm:p-6">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-gold/70">
            Your dance story
          </p>
          <ul className="mt-4 space-y-3">
            {[
              { label: "Boards", value: BOARDS.length },
              { label: "Albums", value: ALBUMS.length },
              { label: "Choreography", value: CHOREOGRAPHY.length },
              { label: "Saved ideas", value: FEED_ITEMS.length },
            ].map((row) => (
              <li key={row.label} className="flex items-center justify-between border-b border-gold/10 pb-2 text-sm">
                <span className="text-cream/50">{row.label}</span>
                <span className="font-display text-cream">{row.value}</span>
              </li>
            ))}
          </ul>
          <Link href="/profile" className="mt-5 inline-flex text-sm text-gold hover:underline">
            Open your profile →
          </Link>
        </aside>
      </section>

      {/* Quick actions */}
      <section>
        <h3 className="font-display text-xl text-cream">Quick actions</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className={cn(
                  "group rounded-xl border bg-[#1a1b20]/90 p-5 transition-all duration-300 hover:-translate-y-1",
                  card.accent,
                )}
              >
                <Icon className={cn("h-6 w-6 transition-transform duration-300 group-hover:rotate-6", card.iconColor)} />
                <h4 className="mt-4 font-display text-lg text-cream">{card.title}</h4>
                <p className="mt-1 text-[0.8rem] leading-relaxed text-cream/45">{card.desc}</p>
                <span className="mt-4 inline-flex text-sm text-gold transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent inspiration peek */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-xl text-cream">Saved inspiration</h3>
            <p className="mt-1 text-sm text-cream/45">Ideas waiting for your next rehearsal.</p>
          </div>
          <Link href="/discover" className="text-sm text-gold hover:underline">
            Discover more →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {FEED_ITEMS.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href="/discover"
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-gold/15"
            >
              <Image
                src={item.mediaUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-[0.58rem] uppercase tracking-[0.14em] text-gold/80">{item.category}</p>
                <p className="mt-1 line-clamp-2 font-display text-sm text-cream">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
