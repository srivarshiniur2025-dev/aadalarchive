"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeRise } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

type EventCard = {
  id: string;
  title: string;
  date: string;
  location: string;
  meta: string;
  href: string;
  image: string;
  featured?: boolean;
};

const EVENTS: EventCard[] = [
  {
    id: "arangetram",
    title: "Arangetram",
    date: "12 Mar 2026",
    location: "Chennai",
    meta: "48 photos · 6 videos",
    href: "/albums",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&q=80",
    featured: true,
  },
  {
    id: "recital",
    title: "Recital",
    date: "02 Feb 2026",
    location: "Bengaluru",
    meta: "32 photos · 3 videos",
    href: "/albums",
    image: "https://images.unsplash.com/photo-1547153760-18fc86302687?w=700&q=80",
  },
  {
    id: "competition",
    title: "Competition",
    date: "18 Jan 2026",
    location: "Hyderabad",
    meta: "21 photos · 4 videos",
    href: "/albums",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=80",
  },
  {
    id: "festival",
    title: "Festival",
    date: "05 Dec 2025",
    location: "Madurai",
    meta: "60 photos · 8 videos",
    href: "/albums",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80",
  },
  {
    id: "rehearsal",
    title: "Rehearsal",
    date: "22 Nov 2025",
    location: "Studio",
    meta: "14 photos · 2 videos",
    href: "/albums",
    image: "/landing/feature-boards.png",
  },
];

function EventCardView({ event, index }: { event: EventCard; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <FadeRise delay={0.04 * index} className="h-full">
      <Link
        href={event.href}
        className={cn(
          "group relative block h-full overflow-hidden border border-gold/10 shadow-[0_24px_50px_rgba(0,0,0,0.35)] transition-[border-color] duration-500 hover:border-gold/30",
          event.featured ? "min-h-[400px] lg:min-h-[500px]" : "min-h-[260px] sm:min-h-[300px]",
        )}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes={event.featured ? "50vw" : "25vw"}
          className={cn(
            "object-cover transition-transform duration-700",
            hover && "scale-[1.03]",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15161A] via-[#15161A]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[2] space-y-1 px-5 pb-6 sm:px-6">
          <p className="font-display text-xl text-cream sm:text-2xl">{event.title}</p>
          <p className="text-xs tracking-wide text-cream/45">
            {event.date} · {event.location}
          </p>
          <p className="text-[0.65rem] text-cream/35">{event.meta}</p>
        </div>
      </Link>
    </FadeRise>
  );
}

export function EventArchiveSection() {
  const featured = EVENTS.find((e) => e.featured)!;
  const rest = EVENTS.filter((e) => !e.featured);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#15161A] ds-section"
      aria-labelledby="events-heading"
    >
      <div className="ds-container-wide relative z-10">
        <FadeRise className="mb-12 max-w-xl sm:mb-14">
          <p className="label-ui">Performance memories</p>
          <h2
            id="events-heading"
            className="mt-4 font-display text-[clamp(1.9rem,3.8vw,2.85rem)] font-medium leading-[1.1] text-cream"
          >
            Every performance deserves
            <br />
            <span className="italic text-gold">its own story.</span>
          </h2>
        </FadeRise>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <EventCardView event={featured} index={0} />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-7">
            {rest.map((event, i) => (
              <EventCardView key={event.id} event={event} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
