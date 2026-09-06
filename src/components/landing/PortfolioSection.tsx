"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";

const SECONDARY = [
  {
    id: "boards",
    label: "Boards",
    href: "/boards",
    image: "/landing/feature-boards.png",
  },
  {
    id: "videos",
    label: "Videos",
    href: "/choreography",
    image: "https://images.unsplash.com/photo-1547153760-18fc86302687?w=600&q=80",
  },
  {
    id: "collabs",
    label: "Collaborations",
    href: "/discover",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
] as const;

export function PortfolioSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#15161A] ds-section"
      aria-labelledby="portfolio-heading"
    >
      <div className="ds-container-wide relative z-10">
        <FadeRise className="mb-12 max-w-lg sm:mb-14">
          <p className="label-ui">Your archive</p>
          <h2
            id="portfolio-heading"
            className="mt-4 font-display text-[clamp(1.9rem,3.8vw,2.85rem)] font-medium leading-[1.1] text-cream"
          >
            Your movement.
            <br />
            <span className="italic text-gold">Your story.</span>
          </h2>
        </FadeRise>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <FadeRise className="relative min-h-[420px] overflow-hidden border border-gold/15 shadow-[0_30px_60px_rgba(0,0,0,0.4)] lg:col-span-7 lg:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1100&q=85"
              alt="Featured performance"
              fill
              sizes="60vw"
              className="object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15161A] via-transparent to-[#15161A]/20" />
            <div className="absolute inset-x-0 bottom-0 z-[2] px-6 pb-7 sm:px-8">
              <p className="label-ui !text-gold/80">Featured performance</p>
              <p className="mt-2 font-display text-2xl text-cream sm:text-3xl">Arangetram · 2025</p>
              <Link
                href="/profile"
                className="mt-3 inline-flex text-sm text-cream/55 transition-colors hover:text-gold"
              >
                Open portfolio →
              </Link>
            </div>
          </FadeRise>

          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {SECONDARY.map((item, i) => (
              <FadeRise key={item.id} delay={0.06 * (i + 1)} className="relative min-h-[160px] overflow-hidden border border-gold/12 sm:min-h-[170px]">
                <Link href={item.href} className="group absolute inset-0 block">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/90 to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 z-[2] px-5 pb-5 font-display text-lg text-cream">
                    {item.label}
                  </p>
                </Link>
              </FadeRise>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
