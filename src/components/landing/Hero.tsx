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

function ArchGoldLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={cn("pointer-events-none absolute inset-x-[8%] top-[4%] h-auto w-[84%] text-gold/50", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M10 110 V48 Q10 12 100 12 Q190 12 190 48 V110"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="120"
        className="[animation:archive-gold-draw_2.4s_var(--ease-dance)_both]"
      />
    </svg>
  );
}

/**
 * Grand temple doorway — architecture frames the dancer.
 */
function HeroTempleStage({ className }: { className?: string }) {
  return (
    <div className={cn("archive-arch-reveal relative mx-auto w-full max-w-[560px]", className)}>
      {/* Diya / ceremonial glow */}
      <div
        className="archive-diya-glow pointer-events-none absolute left-1/2 top-[18%] h-[70%] w-[78%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(229,169,60,0.14),transparent_68%)] blur-3xl"
        aria-hidden
      />
      <div
        className="archive-light-drift pointer-events-none absolute left-[18%] top-[30%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(28,123,143,0.22),transparent_70%)] blur-2xl"
        aria-hidden
      />

      {/* Dust motes */}
      <span className="archive-dust-particle pointer-events-none absolute left-[28%] top-[55%] h-1 w-1 rounded-full bg-gold/40" style={{ animationDelay: "0.2s" }} aria-hidden />
      <span className="archive-dust-particle pointer-events-none absolute left-[62%] top-[40%] h-0.5 w-0.5 rounded-full bg-cream/35" style={{ animationDelay: "1.4s" }} aria-hidden />
      <span className="archive-dust-particle pointer-events-none absolute left-[48%] top-[70%] h-1 w-1 rounded-full bg-gold/30" style={{ animationDelay: "2.8s" }} aria-hidden />

      <div className="archive-corner relative overflow-hidden border border-[#A8752B]/35 bg-[#1C1E24]/40 p-2 shadow-[0_28px_60px_rgba(0,0,0,0.45)]">
        <ArchGoldLine />
        <div
          className="relative aspect-[4/5] w-full overflow-hidden"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 72% 78% at 50% 46%, #000 38%, transparent 76%)",
            maskImage:
              "radial-gradient(ellipse 72% 78% at 50% 46%, #000 38%, transparent 76%)",
          }}
        >
          <Image
            src="/landing/hero-dancer.png"
            alt="Bharatanatyam dancer framed by a South Indian temple entrance"
            fill
            priority
            sizes="(max-width:1024px) 85vw, 40vw"
            className="object-cover object-[50%_20%] brightness-[1.16] contrast-[1.08] transition-transform duration-[1400ms] ease-[cubic-bezier(0.45,0.05,0.25,1)] will-change-transform hover:scale-[1.025]"
          />

          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_38%,rgba(13,16,18,0.4)_72%,#0D1012_94%)]"
            aria-hidden
          />
          <div className="archive-teal-veil pointer-events-none absolute inset-0" aria-hidden />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#15161A] via-[#15161A]/80 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

/**
 * PAGE 1 — Hero
 * Editorial copy left · temple doorway right.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#15161A]"
      aria-label="AadalArchive hero"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_38%,rgba(229,169,60,0.07),transparent_48%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(14,98,122,0.1),transparent_45%)]" />
      </div>

      <div className="ds-container-wide relative z-10 grid items-center gap-8 pt-20 pb-10 lg:min-h-svh lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-10 lg:pt-[4.75rem] lg:pb-8 xl:gap-14">
        <div className="relative z-20 order-2 max-w-md lg:order-1 lg:max-w-none">
          <p className="font-inscription text-[0.62rem] tracking-[0.24em] text-[#D8C6A7]/55">
            DISCOVER · CREATE · PERFORM · PRESERVE
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.45rem,4.6vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[#F4EBDD]">
            Aadal
            <br />
            Connects
            <br />
            <span className="italic text-gold">Generations</span>
          </h1>

          <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold/70 to-transparent" aria-hidden />

          <p className="mt-5 max-w-[20.5rem] text-[0.92rem] leading-[1.7] text-[#D8C6A7]/70">
            A creative space to find inspiration, plan, practice, showcase and preserve
            your dance journey.
          </p>

          <p className="mt-4 font-display text-[0.9rem] italic text-[#F4EBDD]/65">
            Where every movement becomes a memory.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Button href="/signup" size="md">
              Start Your Journey
              <span aria-hidden>→</span>
            </Button>
            <Link
              href="/#explore"
              className="inline-flex items-center gap-3 py-2 text-sm font-medium tracking-wide text-[#F4EBDD]/65 transition-colors hover:text-gold"
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
    "sepia(0.35) saturate(1.15) hue-rotate(8deg) brightness(0.88) contrast(1.08)";

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
            opacity: 0.78,
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
            opacity: 0.78,
            filter: `${sharedFilter} drop-shadow(-8px 0 18px rgba(0,0,0,0.55))`,
          }}
        />
        <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#15161A] via-[#15161A]/50 to-transparent" />
      </div>
    </>
  );
}
