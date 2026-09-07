"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { GoldOrnament } from "./ExploreChrome";
import { FIGMA_CTA_BG } from "./figmaExplore";
import { cn } from "@/lib/utils";

export function ExploreCTA() {
  return (
    <section className="relative z-[1] mt-4 flex min-h-[320px] items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={FIGMA_CTA_BG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#15161A]/85 via-[#15161A]/60 to-[#15161A]/85" />
      </div>

      <div className="relative z-[1] px-5 py-16 sm:px-10">
        <GoldOrnament />
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.15] text-cream">
          Turn Inspiration
          <br />
          <span className="italic font-normal text-gold">into Movement</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.85rem] leading-[1.75] text-cream/55">
          Save your favourite pieces, create boards
          <br />
          and build your dance journey.
        </p>
        <Link
          href="/signup"
          className={cn(
            "mt-8 inline-flex items-center gap-2.5 rounded-lg bg-gold px-7 py-3",
            "text-[0.9rem] font-semibold tracking-wide text-[#15161A]",
            "transition-transform duration-300 hover:scale-[1.03]",
          )}
        >
          Create a Board →
        </Link>
      </div>
    </section>
  );
}

export function ExploreFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-gold/10 px-5 py-8 sm:px-10">
      <Link href="/#hero" className="inline-flex items-center gap-2.5">
        <BrandLogo size={32} decorative />
        <div>
          <p className="font-display text-[0.85rem] font-semibold text-cream">
            AadalArchive
          </p>
          <p className="mt-0.5 text-[0.5rem] uppercase tracking-[0.14em] text-gold/70">
            Discover · Create · Perform · Preserve
          </p>
        </div>
      </Link>

      <nav className="flex flex-wrap gap-7 text-[0.85rem] text-cream/50">
        {[
          { href: "/#hero", label: "Home" },
          { href: "/#explore", label: "Explore" },
          { href: "/#create", label: "Create" },
          { href: "/signup", label: "Sign Up" },
        ].map((l) => (
          <Link key={l.label} href={l.href} className="hover:text-gold">
            {l.label}
          </Link>
        ))}
      </nav>

      <p className="text-right text-[0.75rem] leading-relaxed text-cream/35">
        Rooted in culture.
        <br />
        Created for today.
      </p>
    </footer>
  );
}
