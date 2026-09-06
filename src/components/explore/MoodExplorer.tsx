"use client";

import Image from "next/image";
import Link from "next/link";

const MOODS = [
  {
    id: "graceful",
    label: "Graceful",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86302687?w=600&q=80",
  },
  {
    id: "powerful",
    label: "Powerful",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a0942e1d4c9?w=600&q=80",
  },
  {
    id: "devotional",
    label: "Devotional",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80",
  },
  {
    id: "dramatic",
    label: "Dramatic",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80",
  },
  {
    id: "festive",
    label: "Festive",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
  },
  {
    id: "minimal",
    label: "Minimal",
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&q=80",
  },
  {
    id: "traditional",
    label: "Traditional",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
  },
  {
    id: "contemporary",
    label: "Contemporary",
    image:
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&q=80",
  },
] as const;

export function MoodExplorer() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <h2 className="font-display text-2xl text-cream/90 sm:text-[1.75rem]">
        Explore by Mood
      </h2>
      <p className="mt-2 max-w-lg text-[0.85rem] text-cream/45">
        Follow the feeling first — then find the movement that matches.
      </p>

      <div className="mt-8 flex gap-3 overflow-x-auto pb-3 scrollbar-thin sm:gap-4">
        {MOODS.map((mood) => (
          <Link
            key={mood.id}
            href={`/explore?mood=${mood.id}`}
            className="group relative h-44 w-36 shrink-0 overflow-hidden rounded-sm sm:h-52 sm:w-44"
          >
            <Image
              src={mood.image}
              alt={mood.label}
              fill
              sizes="176px"
              className="object-cover transition-transform duration-[380ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15161A] via-[#15161A]/25 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-3 font-display text-[0.95rem] text-cream/90">
              {mood.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
