"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";
import { Button } from "@/components/design-system";

export function StoriesCtaSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#15161A]"
      aria-labelledby="stories-heading"
    >
      {/* Full-bleed cinematic plate */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/landing/cinematic-temple-corridor.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[55%_40%] opacity-35 brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15161A] via-[#15161A]/85 to-[#15161A]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(243,130,34,0.12),transparent_55%)]" />
      </div>

      <div className="ds-container-wide relative grid min-h-[78svh] items-center gap-12 py-20 lg:min-h-[85svh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        <FadeRise className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" aria-hidden />
            <p className="label-ui">People · Places · Practice · Performances · Memories</p>
          </div>
          <h2
            id="stories-heading"
            className="mt-6 font-display text-[clamp(2.5rem,5.2vw,3.9rem)] font-medium leading-[1.03] tracking-[-0.02em] text-cream"
          >
            Where
            <br />
            Stories
            <br />
            <span className="italic text-gold">Dance On</span>
          </h2>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-cream/55">
            Preserve the movement, memories and moments that make your dance yours.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/signup" size="md">
              Create Your Archive
            </Button>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-2 text-sm font-medium text-cream/70 transition-colors hover:text-gold"
            >
              Explore Inspiration
              <span aria-hidden>→</span>
            </Link>
          </div>
        </FadeRise>

        <FadeRise
          delay={0.1}
          className="relative aspect-[4/5] w-full max-w-[440px] justify-self-center overflow-hidden border border-gold/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)] lg:max-w-[480px] lg:justify-self-end"
        >
          <Image
            src="/landing/hero-dancer.png"
            alt="Dancer silhouette in warm light"
            fill
            sizes="(max-width:1024px) 90vw, 40vw"
            className="object-cover object-[50%_12%] brightness-[0.75] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/80 via-transparent to-[#15161A]/30" />
          <div className="pointer-events-none absolute inset-4 border border-gold/15" aria-hidden />
          <svg
            className="pointer-events-none absolute inset-x-[18%] top-6 h-8 w-[64%] text-gold/40"
            viewBox="0 0 200 32"
            fill="none"
            aria-hidden
          >
            <path
              d="M16 28 C16 28 50 6 100 6 C150 6 184 28 184 28"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </FadeRise>
      </div>
    </section>
  );
}
