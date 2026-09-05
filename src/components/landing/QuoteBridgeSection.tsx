"use client";

import Image from "next/image";
import { FadeRise } from "@/components/ui/Motion";
import { TempleArchBorder, TempleArchClip } from "./TempleArch";

export function QuoteBridgeSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal py-16 sm:py-20 lg:py-24"
      aria-label="Art quote"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(14,98,122,0.14),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_60%,rgba(244,235,221,0.06),transparent_40%)]" />
      </div>

      <div className="ds-container-wide relative z-10 grid items-center gap-10 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:gap-8">
        {/* Nataraja in circular / arch niche */}
        <FadeRise className="relative mx-auto aspect-square w-full max-w-[220px] lg:max-w-none">
          <TempleArchClip className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80"
              alt="Nataraja bronze sculpture"
              fill
              sizes="220px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-charcoal/25" />
          </TempleArchClip>
          <TempleArchBorder variant="card" />
        </FadeRise>

        <FadeRise delay={0.08} className="text-center">
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.35rem)] font-medium leading-snug text-cream">
            Art is a bridge between
            <br />
            the past and{" "}
            <span className="italic text-gold">the you.</span>
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden />
        </FadeRise>

        {/* Jasmine atmosphere */}
        <FadeRise delay={0.12} className="relative mx-auto hidden aspect-[4/5] w-full max-w-[200px] lg:block lg:max-w-none">
          <div className="absolute inset-0 overflow-hidden rounded-[40%_40%_1rem_1rem] opacity-70">
            <Image
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&q=80"
              alt=""
              fill
              sizes="200px"
              className="object-cover object-center blur-[1px]"
            />
            <div className="absolute inset-0 bg-charcoal/40" />
          </div>
        </FadeRise>
      </div>
    </section>
  );
}
