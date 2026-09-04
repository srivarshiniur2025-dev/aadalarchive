"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  KolamRing,
  SalangaiLoader,
  TempleArch,
} from "@/components/animations/Motifs";
import { Button } from "@/components/ui/Primitives";
import { Icons } from "@/components/icons/Icons";
import { ALBUMS, CHOREOGRAPHY, CURRENT_USER, FEED_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = [
  "Poses",
  "Expressions",
  "Costumes",
  "Dance Videos",
  "Photos",
  "Jewelry",
  "Stage",
  "Albums",
];

type Phase = "black" | "line" | "threshold" | "rhythm" | "salangai" | "reveal" | "title" | "ready";

export function LandingPage() {
  const [phase, setPhase] = useState<Phase>("black");
  const [navSolid, setNavSolid] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setPhase("ready");
      return;
    }
    const timeline: [number, Phase][] = [
      [400, "line"],
      [1100, "threshold"],
      [1800, "rhythm"],
      [2400, "salangai"],
      [3200, "reveal"],
      [4000, "title"],
      [4800, "ready"],
    ];
    const timers = timeline.map(([ms, p]) =>
      setTimeout(() => setPhase(p), ms),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showCurtain = phase !== "ready" && !reduced;

  return (
    <div className="relative overflow-x-hidden">
      {showCurtain ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian"
          aria-live="polite"
          aria-label="Opening performance"
        >
          <div className="absolute inset-0 kolam-bg opacity-20" />
          <div className="relative flex w-full max-w-lg flex-col items-center px-6">
            {(phase === "line" ||
              phase === "threshold" ||
              phase === "rhythm" ||
              phase === "salangai" ||
              phase === "reveal" ||
              phase === "title") && (
              <div
                className={cn(
                  "h-px w-16 bg-gold",
                  phase !== "line" && "animate-threshold w-full max-w-sm",
                )}
              />
            )}

            {(phase === "rhythm" ||
              phase === "salangai" ||
              phase === "reveal" ||
              phase === "title") && (
              <div className="mt-8 flex gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-brass/80"
                    style={{
                      animation: `bell-pulse 1.4s ease-in-out ${i * 0.12}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}

            {(phase === "salangai" ||
              phase === "reveal" ||
              phase === "title") && (
              <div className="mt-10">
                <SalangaiLoader size={92} label="Opening the stage" />
              </div>
            )}

            {(phase === "reveal" || phase === "title") && (
              <div className="relative mt-10 h-40 w-40 overflow-hidden rounded-full border border-gold/35 opacity-80 animate-fade-rise">
                <Image
                  src="https://images.unsplash.com/photo-1547153760-18fc86302687?w=400&q=80"
                  alt=""
                  fill
                  className="object-cover object-top opacity-70"
                  sizes="160px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              </div>
            )}

            {phase === "title" && (
              <p className="font-inscription mt-8 animate-vertical text-xs text-gold">
                Aadal Archive
              </p>
            )}
          </div>
        </div>
      ) : null}

      {/* Nav */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          navSolid
            ? "border-b border-[var(--border-gold)] bg-charcoal/95 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-12 lg:px-16">
          <Link href="/" className="font-inscription text-[0.68rem] text-gold">
            AADAL ARCHIVE
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Landing">
            {[
              { label: "Discover", href: "/discover" },
              { label: "Explore", href: "/explore" },
              { label: "Collections", href: "/boards" },
              { label: "Albums", href: "/albums" },
              { label: "Dance Videos", href: "/choreography" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label-ui text-sandalwood transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button href="/login" variant="ghost" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button href="/signup" variant="secondary">
              Join
            </Button>
          </div>
        </div>
      </header>

      {/* Hero 100vh */}
      <section className="relative min-h-[100svh]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547153760-18fc86302687?w=1800&q=80"
            alt="Classical dancer in expressive Bharatanatyam-inspired silhouette"
            fill
            priority
            className="object-cover object-[center_18%] opacity-50 md:opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian" />
          <div className="absolute inset-0 kolam-bg opacity-15" />
        </div>

        <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] items-end gap-10 px-5 pb-20 pt-28 md:grid-cols-2 md:items-center md:px-12 lg:px-16 lg:pb-24">
          <div className="animate-fade-rise">
            <p className="label-ui mb-5 text-gold">
              Welcome to your dance space
            </p>
            <h1 className="font-display text-5xl font-light leading-[1.05] tracking-[0.02em] text-ivory sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              Where movement{" "}
              <span className="gold-text italic font-medium">becomes memory.</span>
            </h1>
            <div className="gold-rule my-7 animate-gold-line" />
            <p className="max-w-md text-base leading-relaxed text-sandalwood md:text-lg">
              Find new dance inspiration, save ideas, keep practice videos, and
              remember every performance.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/signup" variant="doorway">
                Start your dance journey
                <Icons.Forward className="btn-arrow h-4 w-4" />
              </Button>
              <Button href="/discover" variant="secondary">
                Find your next idea
              </Button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute -right-4 top-0 opacity-35 xl:right-8">
              <TempleArch className="h-64 w-[22rem]" />
            </div>
            <div className="pointer-events-none absolute left-8 top-16 opacity-30">
              <KolamRing className="h-44 w-44 animate-[salangai-orbit_36s_linear_infinite]" />
            </div>
            <div className="relative ml-auto aspect-[3/4] w-full max-w-md overflow-hidden border border-[var(--border-gold)]">
              <Image
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&q=80"
                alt="Expressive classical dance portrait"
                fill
                className="object-cover"
                sizes="420px"
              />
              <div className="absolute inset-4 border border-gold/25 pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="label-ui text-gold">Your dance space</p>
                <p className="font-display mt-1 text-2xl text-ivory">
                  Inspiration, practice, and memories
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-sandalwood">
          <span className="label-ui text-[0.58rem]">Scroll to begin</span>
          <span className="h-8 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative border-y border-[var(--border-gold)] bg-maroon/50 py-24 md:py-32">
        <div className="absolute inset-0 kolam-bg opacity-20" />
        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-12">
          <p className="font-display text-3xl font-light leading-snug tracking-[0.01em] text-ivory md:text-5xl">
            “From inspiration to rehearsal to performance, every movement
            deserves a place.”
          </p>
          <p className="label-ui mt-8 text-gold">
            Discover · Collections · Albums · Practice
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-12 lg:px-8 lg:py-32">
        <SectionEyebrow title="Explore by visual category" />
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href="/explore"
              className="rounded-[var(--radius-sm)] border border-[var(--border-gold)] px-4 py-2.5 text-sm text-sandalwood transition-colors hover:border-brass hover:text-gold"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured inspiration */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-12 lg:px-8 lg:pb-32">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionEyebrow
            title="Featured inspiration"
            subtitle="Poses, expressions, costumes, and stage light — save what inspires you."
          />
          <Button href="/discover" variant="secondary">
            Open Discover
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {FEED_ITEMS.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href="/discover"
              className="group relative aspect-[3/4] overflow-hidden border border-[var(--border-gold)]"
            >
              <Image
                src={item.mediaUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 font-display text-lg text-ivory">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Choreography */}
      <section className="border-y border-[var(--border-gold)] bg-charcoal/80 py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-5 md:px-12 lg:px-8">
          <SectionEyebrow
            title="Dance video preview"
            subtitle="Slow down, flip the view, and add Rhythm Notes — short notes about timing, movement, or expression."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CHOREOGRAPHY.map((video) => (
              <Link
                key={video.id}
                href={`/choreography/${video.id}`}
                className="group border border-[var(--border-gold)] bg-obsidian/60 transition-colors hover:border-brass/70"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.poster}
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-obsidian/25 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
                      <Icons.Video className="h-5 w-5" />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl text-ivory">{video.title}</h3>
                  <p className="mt-1 text-xs text-sandalwood">
                    {video.guru} · {video.duration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Albums */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-12 lg:px-8 lg:py-32">
          <SectionEyebrow
            title="Performance Album preview"
            subtitle="Keep memories from a show — rehearsals, costumes, stage moments, and after."
          />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ALBUMS.map((album) => (
            <Link
              key={album.id}
              href={`/albums/${album.id}`}
              className="silk-panel group overflow-hidden p-3 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={album.cover}
                  alt={album.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="33vw"
                />
                <div className="pointer-events-none absolute inset-3 border border-gold/30" />
              </div>
              <div className="px-2 pb-2 pt-4">
                <h3 className="font-display text-2xl text-ivory">{album.name}</h3>
                <p className="mt-1 text-sm text-sandalwood">
                  {album.venue} · {album.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Profile preview */}
      <section className="border-y border-[var(--border-gold)] bg-maroon/30 py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-12 lg:px-8">
          <SectionEyebrow title="Dance Journey" />
          <div className="mt-10 grid items-center gap-8 md:grid-cols-[0.35fr_0.65fr]">
            <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full border border-gold/50 md:w-56">
              <Image
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                fill
                className="object-cover"
                sizes="224px"
              />
            </div>
            <div>
              <h3 className="font-display text-4xl text-ivory">
                {CURRENT_USER.name}
              </h3>
              <p className="mt-2 text-sandalwood">
                {CURRENT_USER.danceForm} · {CURRENT_USER.location}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {CURRENT_USER.artisticStatement}
              </p>
              <Button href="/profile" variant="secondary" className="mt-6">
                Show your dance journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural statement */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:px-12 lg:py-32">
        <div className="gold-rule mx-auto mb-8" />
        <p className="font-display text-3xl font-light leading-snug text-ivory md:text-4xl">
          Every pose has a story. Every rehearsal has a memory. Every movement
          deserves a place.
        </p>
      </section>

      {/* Signup CTA */}
      <section className="relative overflow-hidden border-t border-[var(--border-gold)] py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-temple/35 to-obsidian" />
        <div className="absolute inset-0 kolam-bg opacity-25" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <SalangaiLoader size={56} className="mx-auto mb-8" label="" />
          <h2 className="font-display text-4xl font-light text-ivory md:text-5xl">
            Welcome to your dance space
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sandalwood">
            Save inspiration for later. Record your practice. Keep your memories
            safe here.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/signup" variant="doorway">
              Continue
            </Button>
            <Button href="/login" variant="secondary">
              Sign in
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border-gold)] px-5 py-12 md:px-12">
        <div className="mx-auto mb-8 h-px max-w-xs bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-inscription text-[0.68rem] text-gold">AADAL ARCHIVE</p>
            <p className="mt-3 max-w-sm text-sm text-sandalwood">
              Your memories are safe here.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-sandalwood">
            <Link href="/discover" className="hover:text-gold">
              Discover
            </Link>
            <Link href="/explore" className="hover:text-gold">
              Explore
            </Link>
            <Link href="/signup" className="hover:text-gold">
              Join
            </Link>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Credits</span>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-[1280px] text-xs text-bronze">
          Looks and moves like classical dance. Speaks in simple words.
        </p>
      </footer>
    </div>
  );
}

function SectionEyebrow({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <p className="label-ui text-gold">Aadal Archive</p>
      <h2 className="font-display mt-3 text-4xl font-light tracking-[0.02em] text-ivory md:text-5xl">
        {title}
      </h2>
      <div className="gold-rule mt-5" />
      {subtitle ? (
        <p className="mt-4 max-w-lg text-sandalwood">{subtitle}</p>
      ) : null}
    </div>
  );
}
