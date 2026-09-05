"use client";

import Image from "next/image";
import { FadeRise } from "@/components/ui/Motion";
import { TempleArchBorder, TempleArchClip } from "./TempleArch";

export function StoriesCtaSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal"
      aria-labelledby="stories-heading"
    >
      <div className="ds-container-wide relative grid min-h-[70svh] items-center gap-10 py-20 lg:min-h-[80svh] lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:py-24">
        <FadeRise className="relative z-10 max-w-md">
          <p className="label-ui">People · Places · Practice · Performances · Memories</p>
          <h2
            id="stories-heading"
            className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cream"
          >
            Where Stories
            <br />
            <span className="italic text-gold">Dance On</span>
          </h2>
          <div className="ornament-line mt-8" aria-hidden />
        </FadeRise>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:ml-auto lg:max-w-[480px]">
          <TempleArchClip className="absolute inset-0">
            <Image
              src="/landing/cinematic-temple-corridor.png"
              alt="Dancer silhouette in temple light"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-[50%_20%] brightness-[0.55] contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(229,169,60,0.2),transparent_55%)]" />
          </TempleArchClip>
          <TempleArchBorder variant="cta" />

          <FadeRise
            delay={0.12}
            className="absolute inset-x-0 bottom-[12%] z-[2] px-8 text-center sm:px-10"
          >
            <p className="font-display text-lg leading-snug text-cream/85 sm:text-xl">
              Not just a dancer.
              <br />
              <span className="italic text-gold">A part of a timeless story.</span>
            </p>
            <svg
              viewBox="0 0 28 28"
              className="mx-auto mt-4 h-5 w-5 text-gold opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              aria-hidden
            >
              <path d="M14 24c0-3.5 2.4-5.8 2.4-9.5 0 0-2.4 1.2-2.4 3.6 0-2.4-2.4-3.6-2.4-3.6 0 3.7 2.4 6 2.4 9.5Z" />
              <path d="M14 17.2c-2.6-1.1-5-1-7.2.3 2.2 1.1 4.6 2.1 7.2 2.1s5-1 7.2-2.1c-2.2-1.3-4.6-1.4-7.2-.3Z" />
            </svg>
          </FadeRise>
        </div>
      </div>
    </section>
  );
}
