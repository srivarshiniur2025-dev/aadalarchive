"use client";

import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";
import { Button } from "@/components/design-system";
import { cn } from "@/lib/utils";
import { TempleArchBorder } from "./TempleArch";

type Feature = {
  id: string;
  title: string;
  body: string;
  href: string;
  icon: "boards" | "studio" | "collab" | "events" | "portfolio";
};

const FEATURES: Feature[] = [
  {
    id: "boards",
    title: "Create Boards",
    body: "Save ideas and references for every piece.",
    href: "/boards",
    icon: "boards",
  },
  {
    id: "studio",
    title: "Practice Studio",
    body: "Record, note, and track your progress.",
    href: "/studio",
    icon: "studio",
  },
  {
    id: "collab",
    title: "Collaborate",
    body: "Invite teachers, peers, and artists.",
    href: "/boards",
    icon: "collab",
  },
  {
    id: "events",
    title: "Events",
    body: "Document performances and festivals.",
    href: "/albums",
    icon: "events",
  },
  {
    id: "portfolio",
    title: "Your Portfolio",
    body: "Showcase the journey you are building.",
    href: "/profile",
    icon: "portfolio",
  },
];

function FeatureIcon({ kind }: { kind: Feature["icon"] }) {
  const common = "h-10 w-10 text-gold";
  if (kind === "boards") {
    return (
      <svg viewBox="0 0 40 40" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="6" y="8" width="12" height="12" rx="1.5" />
        <rect x="22" y="8" width="12" height="12" rx="1.5" />
        <rect x="6" y="24" width="12" height="8" rx="1.5" />
        <rect x="22" y="24" width="12" height="8" rx="1.5" />
      </svg>
    );
  }
  if (kind === "studio") {
    return (
      <svg viewBox="0 0 40 40" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="7" y="9" width="26" height="22" rx="3" />
        <path d="M17 15v10l9-5-9-5Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "collab") {
    return (
      <svg viewBox="0 0 40 40" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <circle cx="14" cy="14" r="4" />
        <circle cx="26" cy="14" r="4" />
        <circle cx="20" cy="22" r="4" />
        <path d="M8 30c1.5-4 4-6 6-6M32 30c-1.5-4-4-6-6-6M14 30c1.5-3.5 4-5 6-5s4.5 1.5 6 5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "events") {
    return (
      <svg viewBox="0 0 40 40" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="8" y="10" width="24" height="22" rx="2" />
        <path d="M8 16h24M14 8v4M26 8v4" strokeLinecap="round" />
        <circle cx="15" cy="23" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="20" cy="23" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="25" cy="23" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="20" cy="14" r="5" />
      <path d="M10 32c1.5-6 5-9 10-9s8.5 3 10 9" strokeLinecap="round" />
      <path d="M28 10l3 1.5L28 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeatureArchCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <FadeRise delay={0.05 * index} className="h-full">
      <Link
        href={feature.href}
        className={cn(
          "group relative flex h-full min-h-[260px] flex-col items-center px-4 pb-7 pt-16 text-center sm:min-h-[280px]",
          "transition-transform duration-300 hover:-translate-y-1",
        )}
      >
        <TempleArchBorder variant="outline" />
        <div className="relative z-[1] flex flex-1 flex-col items-center justify-end">
          <FeatureIcon kind={feature.icon} />
          <h3 className="mt-5 font-display text-lg text-cream sm:text-xl">{feature.title}</h3>
          <p className="mt-2 max-w-[11rem] text-xs leading-relaxed text-cream/50 sm:text-sm">
            {feature.body}
          </p>
        </div>
      </Link>
    </FadeRise>
  );
}

export function DanceJourneySection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal ds-section"
      aria-labelledby="journey-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(229,169,60,0.06),transparent_45%)]" />
      </div>

      <div className="ds-container-wide relative z-10">
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <FadeRise className="max-w-lg">
            <p className="label-ui">Everything in one place</p>
            <h2
              id="journey-heading"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.1] text-cream"
            >
              Your Dance Journey
              <br />
              <span className="italic text-gold">In One Place</span>
            </h2>
          </FadeRise>
          <FadeRise delay={0.08}>
            <Button href="/signup" variant="outline" size="sm">
              See How It Works
              <span aria-hidden>→</span>
            </Button>
          </FadeRise>
        </div>

        <div className="scrollbar-thin -mx-[var(--section-pad-x)] flex gap-4 overflow-x-auto px-[var(--section-pad-x)] pb-3 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 xl:gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.id}
              className="w-[58vw] max-w-[220px] shrink-0 sm:w-[40vw] sm:max-w-[240px] lg:w-auto lg:max-w-none"
            >
              <FeatureArchCard feature={feature} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
