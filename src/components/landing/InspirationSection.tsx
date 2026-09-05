"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";
import { Button } from "@/components/design-system";
import { cn } from "@/lib/utils";
import { TempleArchBorder, TempleArchClip } from "./TempleArch";

type Card = {
  id: string;
  label: string;
  href: string;
  image: string;
  object?: string;
};

const CARDS: Card[] = [
  {
    id: "temples",
    label: "Temples",
    href: "/explore?category=temples",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80",
    object: "object-[50%_30%]",
  },
  {
    id: "salangai",
    label: "Salangai",
    href: "/explore?category=salangai",
    image: "/landing/inspiration-salangai.png",
    object: "object-center",
  },
  {
    id: "hastas",
    label: "Hastas",
    href: "/explore?category=hastas",
    image: "https://images.unsplash.com/photo-1547153760-18fc86302687?w=700&q=80",
    object: "object-[50%_55%]",
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
  },
  {
    id: "history",
    label: "History",
    href: "/explore?category=history",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=80",
    object: "object-center",
  },
];

function ArrowCircle({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/45 bg-charcoal/50 text-gold backdrop-blur-sm transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ArchCard({ card, index }: { card: Card; index: number }) {
  return (
    <FadeRise delay={0.05 * index} className="h-full">
      <Link
        href={card.href}
        className="group relative block h-full min-h-[280px] w-full sm:min-h-[320px] lg:min-h-[380px]"
      >
        <TempleArchClip className="absolute inset-0">
          <Image
            src={card.image}
            alt={card.label}
            fill
            sizes="(max-width: 768px) 70vw, 16vw"
            className={cn("object-cover transition-transform duration-700 group-hover:scale-[1.03]", card.object)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
        </TempleArchClip>
        <TempleArchBorder variant="card" />

        <div className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-2 px-4 pb-5 sm:px-5 sm:pb-6">
          <p className="font-display text-lg text-cream sm:text-xl">{card.label}</p>
          <ArrowCircle />
        </div>
      </Link>
    </FadeRise>
  );
}

export function InspirationSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal ds-section"
      aria-labelledby="inspiration-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,98,122,0.12),transparent_50%)]" />
      </div>

      <div className="ds-container-wide relative z-10">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <FadeRise className="max-w-md">
            <p className="label-ui">Moods · Movements · Stories</p>
            <h2
              id="inspiration-heading"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.1] text-cream"
            >
              Find Your <span className="italic text-gold">Inspiration</span>
            </h2>
          </FadeRise>
          <FadeRise delay={0.1}>
            <Button href="/explore" variant="outline" size="sm">
              Explore Now
              <span aria-hidden>→</span>
            </Button>
          </FadeRise>
        </div>

        {/* Mobile / tablet: horizontal arch gallery */}
        <div className="scrollbar-thin -mx-[var(--section-pad-x)] flex gap-4 overflow-x-auto px-[var(--section-pad-x)] pb-4 lg:hidden">
          {CARDS.map((card, i) => (
            <div key={card.id} className="w-[58vw] max-w-[240px] shrink-0 sm:w-[40vw] sm:max-w-[260px]">
              <ArchCard card={card} index={i} />
            </div>
          ))}
        </div>

        {/* Desktop: six equal temple windows */}
        <div className="hidden grid-cols-6 gap-4 xl:gap-5 lg:grid">
          {CARDS.map((card, i) => (
            <ArchCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
