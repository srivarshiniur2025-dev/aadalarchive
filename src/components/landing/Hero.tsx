"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/design-system";
import { cn } from "@/lib/utils";

function PlayGlyph() {
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold"
      aria-hidden
    >
      <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[9px] border-y-transparent border-l-gold" />
    </span>
  );
}

/**
 * Single cinematic doorway — one composed scene, soft-faded into the page.
 */
function HeroTempleStage({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[540px]", className)}>
      <div
        className="pointer-events-none absolute left-1/2 top-[20%] h-[65%] w-[72%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(229,169,60,0.1),transparent_68%)] blur-3xl"
        aria-hidden
      />

      <div
        className="relative aspect-[4/5] w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 82% at 50% 48%, #000 42%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse 78% 82% at 50% 48%, #000 42%, transparent 78%)",
        }}
      >
        <Image
          src="/landing/hero-dancer.png"
          alt="Bharatanatyam dancer framed by a South Indian temple entrance"
          fill
          priority
          sizes="(max-width:1024px) 85vw, 40vw"
          className="object-cover object-[50%_20%] brightness-[1.18] contrast-[1.08]"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_40%,rgba(21,22,26,0.35)_72%,#15161A_92%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#15161A] via-[#15161A]/75 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[16%] bg-gradient-to-r from-[#15161A] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-[#15161A] to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}

/**
 * PAGE 1 — Hero
 * Editorial copy left · temple doorway right.
 * Side pillars are mounted by LandingPage around this section.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#15161A]"
      aria-label="AadalArchive hero"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_38%,rgba(229,169,60,0.06),transparent_48%)]" />
      </div>

      <div className="ds-container-wide relative z-10 grid items-center gap-8 pt-20 pb-10 lg:min-h-svh lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-10 lg:pt-[4.75rem] lg:pb-8 xl:gap-14">
        <div className="relative z-20 order-2 max-w-md lg:order-1 lg:max-w-none">
          <p className="text-[0.65rem] font-medium tracking-[0.22em] text-cream/42">
            DISCOVER · CREATE · PERFORM · PRESERVE
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.45rem,4.6vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.025em] text-cream">
            Aadal
            <br />
            Connects
            <br />
            <span className="italic text-gold">Generations</span>
          </h1>

          <p className="mt-5 max-w-[20.5rem] text-[0.92rem] leading-[1.7] text-cream/52">
            A creative space to find inspiration, plan, practice, showcase and preserve
            your dance journey.
          </p>

          <p className="mt-4 font-display text-[0.9rem] italic text-cream/62">
            Where every movement becomes a memory.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Button href="/signup" size="md">
              Start Your Journey
              <span aria-hidden>→</span>
            </Button>
            <Link
              href="/#explore"
              className="inline-flex items-center gap-3 py-2 text-sm font-medium tracking-wide text-cream/65 transition-colors hover:text-gold"
            >
              <PlayGlyph />
              Watch the Story
            </Link>
          </div>
        </div>

        <div className="relative z-10 order-1 flex justify-center lg:order-2 lg:justify-end">
          <HeroTempleStage />
        </div>
      </div>
    </section>
  );
}

/** Hero-only edge pillars — absolute to the hero stage (not fixed across the page). */
export function LandingSidePillars() {
  const pillarSrc = "/temple/clean/pillar-edge.png?v=hq2";

  const sharedFilter =
    "sepia(0.45) saturate(1.25) hue-rotate(2deg) brightness(0.9) contrast(1.06)";

  return (
    <>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[40] hidden w-[110px] overflow-hidden lg:block xl:w-[128px] 2xl:w-[144px]"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pillarSrc}
          alt=""
          draggable={false}
          className="select-none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "115%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "left center",
            transform: "scaleX(-1)",
            opacity: 0.7,
            filter: `${sharedFilter} drop-shadow(8px 0 18px rgba(0,0,0,0.55))`,
          }}
        />
        <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-[#15161A] via-[#15161A]/50 to-transparent" />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[40] hidden w-[110px] overflow-hidden lg:block xl:w-[128px] 2xl:w-[144px]"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pillarSrc}
          alt=""
          draggable={false}
          className="select-none"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "115%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "left center",
            opacity: 0.7,
            filter: `${sharedFilter} drop-shadow(-8px 0 18px rgba(0,0,0,0.55))`,
          }}
        />
        <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#15161A] via-[#15161A]/50 to-transparent" />
      </div>
    </>
  );
}
