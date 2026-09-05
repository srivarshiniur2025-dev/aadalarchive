"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/design-system";
import { cn } from "@/lib/utils";
import { TempleArchBorder, TempleArchClip, TempleLamp } from "./TempleArch";

const VALUES = ["TRADITION", "CREATIVITY", "COMMUNITY", "FOREVER"] as const;

function LotusOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={cn("h-5 w-5 text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden
    >
      <path d="M14 24c0-3.5 2.4-5.8 2.4-9.5 0 0-2.4 1.2-2.4 3.6 0-2.4-2.4-3.6-2.4-3.6 0 3.7 2.4 6 2.4 9.5Z" />
      <path d="M14 17.2c-2.6-1.1-5-1-7.2.3 2.2 1.1 4.6 2.1 7.2 2.1s5-1 7.2-2.1c-2.2-1.3-4.6-1.4-7.2-.3Z" />
      <path d="M14 15c1.8-2.6 2.3-5 1.6-7.6-.9 2.2-1.8 4.4-1.6 7.6-.3-3.2-1.2-5.4-2.4-7.6-.5 2.6.2 5 2.4 7.6Z" />
      <path d="M14 6.2s-1 2.2 0 4.2c1-2 0-4.2 0-4.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/55 text-gold"
      aria-hidden
    >
      <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-gold" />
    </span>
  );
}

function HeroArchScene() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[480px] lg:max-w-[520px]">
      {/* Soft temple glow — flat, no parallax */}
      <div
        className="pointer-events-none absolute inset-[12%] rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(229,169,60,0.28), rgba(14,98,122,0.12) 50%, transparent 70%)",
        }}
        aria-hidden
      />

      <TempleArchClip className="absolute inset-0 z-[1]">
        <Image
          src="/landing/hero-dancer.png"
          alt="Bharatanatyam dancer framed by a carved temple arch"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 42vw"
          className="object-cover object-[50%_15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-charcoal/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(229,169,60,0.12),transparent_55%)]" />
      </TempleArchClip>

      <TempleArchBorder variant="hero" className="z-[2]" />

      {/* Floor lamps — part of the arch scene, not floating stickers */}
      <div className="absolute bottom-[4%] left-[18%] z-[3] drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)]">
        <TempleLamp tall />
      </div>
      <div className="absolute bottom-[4%] right-[18%] z-[3] drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)]">
        <TempleLamp />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal"
      aria-label="AadalCanvas hero"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(14,98,122,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_70%,rgba(229,169,60,0.08),transparent_50%)]" />
      </div>

      <div className="ds-container-wide relative grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-14 lg:min-h-[calc(100svh-5.25rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-16 xl:gap-14">
        <div className="relative z-10 max-w-xl lg:max-w-[28rem]">
          <h1 className="font-display text-[clamp(2.35rem,5vw,3.85rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cream">
            Aadal Connects
            <br />
            <span className="italic text-gold">Generations</span>
          </h1>

          <p className="mt-6 max-w-[24rem] text-[0.95rem] leading-relaxed text-cream/58 sm:text-base">
            A creative space to find inspiration, plan, practice, showcase and preserve your dance
            journey.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/signup" size="md">
              Start Your Journey
              <span aria-hidden>→</span>
            </Button>
            <Link
              href="/choreography"
              className="inline-flex items-center gap-3 px-2 py-2 text-sm font-medium tracking-wide text-cream/70 transition-colors hover:text-gold"
            >
              <PlayGlyph />
              Watch the Story
            </Link>
          </div>

          <p className="mt-10 font-display text-base italic text-cream/45 sm:text-lg">
            “Movement is a language older than words.”
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-center lg:justify-end">
          <HeroArchScene />

          <aside
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
            aria-label="Brand values"
          >
            <LotusOrnament className="mb-1 opacity-90" />
            {VALUES.map((word, i) => (
              <span key={word} className="flex flex-col items-center gap-4">
                <span
                  className="text-[0.58rem] font-medium tracking-[0.28em] text-cream/40"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {word}
                </span>
                {i < VALUES.length - 1 ? (
                  <span className="h-4 w-px bg-gradient-to-b from-gold/40 to-transparent" aria-hidden />
                ) : null}
              </span>
            ))}
          </aside>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 px-5 pb-8 xl:hidden">
        <LotusOrnament className="opacity-80" />
        <p className="text-[0.58rem] font-medium tracking-[0.16em] text-cream/40">
          TRADITION · CREATIVITY · COMMUNITY · FOREVER
        </p>
      </div>
    </section>
  );
}
