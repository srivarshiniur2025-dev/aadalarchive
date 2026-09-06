"use client";

import Image from "next/image";
import { FadeRise } from "@/components/ui/Motion";
import { TempleOrnament } from "@/components/temple";

export function QuoteBridgeSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#15161A] py-24 sm:py-28 lg:py-32"
      aria-label="Cultural transition"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(229,169,60,0.08),transparent_55%)]" />
      </div>

      <div className="ds-container-wide relative z-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:gap-12">
        <FadeRise className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden border border-gold/15 shadow-[0_30px_60px_rgba(0,0,0,0.4)] lg:max-w-none">
          <Image
            src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80"
            alt="Nataraja bronze sculpture"
            fill
            sizes="240px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/50 to-transparent" />
        </FadeRise>

        <FadeRise delay={0.08} className="text-center">
          <p className="font-display text-[clamp(1.65rem,3.4vw,2.55rem)] font-medium leading-snug text-cream">
            Art is a bridge
            <br />
            between the past and{" "}
            <span className="italic text-gold">the you.</span>
          </p>
          <TempleOrnament type="lotus" className="mx-auto mt-9 h-10 w-10 opacity-60" />
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-cream/45 lg:hidden">
            Different stories. Same roots.
          </p>
        </FadeRise>

        <FadeRise delay={0.12} className="hidden text-right lg:block">
          <p className="font-display text-[1.75rem] leading-snug text-cream/75 xl:text-3xl">
            Different
            <br />
            stories.
            <br />
            <span className="italic text-gold">Same roots.</span>
          </p>
        </FadeRise>
      </div>
    </section>
  );
}
