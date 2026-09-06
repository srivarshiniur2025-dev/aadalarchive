"use client";

import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";
import { Button } from "@/components/design-system";
import { cn } from "@/lib/utils";

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
    body: "Save ideas, references and moods.",
    href: "/boards",
    icon: "boards",
  },
  {
    id: "studio",
    title: "Practice Studio",
    body: "Track your progress and grow.",
    href: "/studio",
    icon: "studio",
  },
  {
    id: "collab",
    title: "Collaborate",
    body: "Connect with dancers, teachers and creators.",
    href: "/boards",
    icon: "collab",
  },
  {
    id: "events",
    title: "Events",
    body: "Discover and organize performances.",
    href: "/albums",
    icon: "events",
  },
  {
    id: "portfolio",
    title: "Your Portfolio",
    body: "Showcase your art to the world.",
    href: "/profile",
    icon: "portfolio",
  },
];

function FeatureIcon({ kind }: { kind: Feature["icon"] }) {
  const common = "h-9 w-9 text-gold";
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
      </svg>
    );
  }
  if (kind === "events") {
    return (
      <svg viewBox="0 0 40 40" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="8" y="10" width="24" height="22" rx="2" />
        <path d="M8 16h24M14 8v4M26 8v4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className={common} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="20" cy="14" r="5" />
      <path d="M10 32c1.5-6 5-9 10-9s8.5 3 10 9" strokeLinecap="round" />
    </svg>
  );
}

export function FeatureSpaceSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#15161A] ds-section"
      aria-labelledby="space-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(14,98,122,0.08),transparent_45%)]" aria-hidden />

      <div className="ds-container-wide relative z-10">
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <FadeRise className="max-w-lg">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold/45" aria-hidden />
              <p className="label-ui">Plan · Practice · Collaborate · Preserve</p>
            </div>
            <h2
              id="space-heading"
              className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] text-cream"
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

        <div
          className={cn(
            "scrollbar-thin -mx-[var(--section-pad-x)] flex gap-4 overflow-x-auto px-[var(--section-pad-x)] pb-3",
            "lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0",
          )}
        >
          {FEATURES.map((feature, i) => (
            <FadeRise
              key={feature.id}
              delay={0.05 * i}
              className="w-[64vw] max-w-[230px] shrink-0 lg:w-auto lg:max-w-none"
            >
              <Link
                href={feature.href}
                className="group relative flex h-full min-h-[240px] flex-col overflow-hidden border border-gold/12 bg-gradient-to-b from-white/[0.03] to-transparent px-5 py-7 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <FeatureIcon kind={feature.icon} />
                <h3 className="mt-7 font-display text-lg text-cream transition-colors group-hover:text-gold sm:text-xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/48">{feature.body}</p>
                <span className="mt-auto pt-6 text-sm text-gold/70 transition-colors group-hover:text-gold">
                  Open →
                </span>
              </Link>
            </FadeRise>
          ))}
        </div>
      </div>
    </section>
  );
}
