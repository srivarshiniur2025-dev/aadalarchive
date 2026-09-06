"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeRise } from "@/components/ui/Motion";
import { Button } from "@/components/design-system";
import { cn } from "@/lib/utils";

type Card = {
  id: string;
  label: string;
  href: string;
  image: string;
  object?: string;
  tall?: boolean;
};

const CARDS: Card[] = [
  {
    id: "temples",
    label: "Temples",
    href: "/explore?category=temples",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80",
    object: "object-[50%_30%]",
    tall: true,
  },
  {
    id: "salangai",
    label: "Salangai",
    href: "/explore?category=salangai",
    image: "/landing/inspiration-salangai.png",
  },
  {
    id: "hastas",
    label: "Hastas",
    href: "/explore?category=hastas",
    image: "https://images.unsplash.com/photo-1547153760-18fc86302687?w=700&q=80",
    object: "object-[50%_55%]",
    tall: true,
  },
  {
    id: "expressions",
    label: "Expressions",
    href: "/explore?category=expressions",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700&q=80",
    object: "object-[50%_20%]",
  },
  {
    id: "costumes",
    label: "Costumes",
    href: "/explore?category=costumes",
    image: "https://images.unsplash.com/photo-1594737625785-c62885b4c0e4?w=700&q=80",
    object: "object-[50%_25%]",
    tall: true,
  },
  {
    id: "history",
    label: "History",
    href: "/explore?category=history",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=700&q=80",
    object: "object-[50%_40%]",
  },
];

function NicheCard({ card, index }: { card: Card; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <FadeRise delay={0.05 * index} className="h-full">
      <Link
        href={card.href}
        className={cn("group flex h-full flex-col", card.tall && "lg:pt-8")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <div
          className={cn(
            "relative overflow-hidden border border-gold/10 transition-[border-color,box-shadow] duration-500 group-hover:border-gold/35 group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.45)]",
            card.tall ? "aspect-[3/4.2]" : "aspect-[3/3.6]",
          )}
        >
          <Image
            src={card.image}
            alt={card.label}
            fill
            sizes="(max-width:768px) 60vw, 16vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]",
              card.object ?? "object-center",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15161A]/75 via-[#15161A]/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(229,169,60,0.12),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <svg
            className="pointer-events-none absolute inset-x-[16%] top-3 h-7 w-[68%] text-gold/50"
            viewBox="0 0 100 24"
            fill="none"
            aria-hidden
          >
            <path d="M6 20 C6 20 25 5 50 5 C75 5 94 20 94 20" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="5" r="1.4" fill="currentColor" />
          </svg>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
            <p className={cn("font-display text-lg sm:text-xl", hover ? "text-gold" : "text-cream")}>
              {card.label}
            </p>
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-[#15161A]/50 text-gold backdrop-blur-sm transition-all group-hover:translate-x-0.5 group-hover:border-gold group-hover:bg-gold group-hover:text-[#15161A]"
              aria-hidden
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </FadeRise>
  );
}

export function InspirationSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#15161A] py-20 sm:py-24 lg:py-28"
      aria-labelledby="inspiration-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(229,169,60,0.06),transparent_45%)]" aria-hidden />

      <div className="ds-container-wide relative z-10">
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <FadeRise className="max-w-md">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold/45" aria-hidden />
              <p className="label-ui">Moods · Movements · Stories</p>
            </div>
            <h2
              id="inspiration-heading"
              className="mt-4 font-display text-[clamp(2.1rem,4.2vw,3.15rem)] font-medium leading-[1.06] text-cream"
            >
              Find
              <br />
              Your <span className="italic text-gold">Inspiration</span>
            </h2>
          </FadeRise>
          <FadeRise delay={0.08}>
            <Button href="/explore" variant="outline" size="sm">
              Explore Now
              <span aria-hidden>→</span>
            </Button>
          </FadeRise>
        </div>

        <div className="scrollbar-thin -mx-[var(--section-pad-x)] flex gap-5 overflow-x-auto px-[var(--section-pad-x)] pb-4 lg:hidden">
          {CARDS.map((card, i) => (
            <div key={card.id} className="w-[52vw] max-w-[220px] shrink-0">
              <NicheCard card={card} index={i} />
            </div>
          ))}
        </div>

        <div className="hidden grid-cols-6 gap-5 xl:gap-6 lg:grid">
          {CARDS.map((card, i) => (
            <NicheCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
