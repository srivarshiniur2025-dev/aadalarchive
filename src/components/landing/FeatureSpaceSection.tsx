"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";
import { TempleArchBackdrop } from "./TempleArchBackdrop";

type Feature = {
  id: string;
  title: string;
  body: string;
  href: string;
  image: string;
  layout: "tall" | "wide" | "panel" | "arch" | "stack";
  accent: "gold" | "teal" | "orange";
  rotate?: string;
  detail: string;
};

const FEATURES: Feature[] = [
  {
    id: "boards",
    title: "Creative Boards",
    body: "Save and organize ideas for performances, costumes, photoshoots and more.",
    href: "/boards",
    image: "/landing/feature-boards.png",
    layout: "tall",
    accent: "gold",
    rotate: undefined,
    detail: "Moods · looks · references",
  },
  {
    id: "albums",
    title: "Event Albums",
    body: "Document arangetrams, recitals, competitions, rehearsals and special performances.",
    href: "/albums",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
    layout: "wide",
    accent: "orange",
    rotate: undefined,
    detail: "Photos · videos · memories",
  },
  {
    id: "studio",
    title: "Practice Studio",
    body: "Upload or record practice videos, add notes, timestamps and track your progress.",
    href: "/studio",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86302687?w=900&q=80",
    layout: "panel",
    accent: "teal",
    detail: "Notes · timestamps · progress",
  },
  {
    id: "collab",
    title: "Collaboration",
    body: "Invite photographers, teachers, friends and collaborators to contribute.",
    href: "/boards",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    layout: "stack",
    accent: "gold",
    rotate: undefined,
    detail: "Invite · share · create together",
  },
  {
    id: "portfolio",
    title: "Your Portfolio",
    body: "Publish selected work and share your artistic journey with the world.",
    href: "/profile",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&q=80",
    layout: "arch",
    accent: "orange",
    rotate: undefined,
    detail: "Public · curated · timeless",
  },
];

const accentRing = {
  gold: "group-hover:border-gold/80",
  teal: "group-hover:border-teal/70",
  orange: "group-hover:border-orange/70",
} as const;

const accentText = {
  gold: "text-gold",
  teal: "text-teal",
  orange: "text-orange",
} as const;

function FloatingChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-md border border-[var(--border-gold)] bg-charcoal/70 px-2.5 py-1 text-[0.62rem] font-medium tracking-wide text-cream/75 backdrop-blur-md shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      {label}
    </span>
  );
}

function ArchOverlay() {
  return (
    <svg
      viewBox="0 0 200 260"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M16 250 V95 C16 42 62 16 100 16 C138 16 184 42 184 95 V250"
        fill="none"
        stroke="#E5A93C"
        strokeOpacity="0.45"
        strokeWidth="1.4"
      />
      <path
        d="M28 250 V100 C28 55 68 28 100 28 C132 28 172 55 172 100 V250"
        fill="none"
        stroke="#E5A93C"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
    </svg>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const isTall = feature.layout === "tall" || feature.layout === "arch";
  const isPanel = feature.layout === "panel";
  const isStack = feature.layout === "stack";
  const isArch = feature.layout === "arch";

  return (
    <FadeRise delay={0.06 * index} className="h-full">
      <Link
        href={feature.href}
        className={cn(
          "group relative block h-full overflow-hidden rounded-[1rem] border border-[var(--border-gold)] bg-surface",
          "card-lift shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)]",
          accentRing[feature.accent],
          isTall && "min-h-[400px] sm:min-h-[460px]",
          feature.layout === "wide" && "min-h-[270px] sm:min-h-[290px]",
          isPanel && "min-h-[320px]",
          isStack && "min-h-[340px]",
        )}
      >
        {/* Media */}
        <div
          className={cn(
            "absolute inset-0",
            isPanel && "inset-x-4 top-4 bottom-[42%] overflow-hidden rounded-[0.85rem]",
            isStack && "inset-x-5 top-6 bottom-[38%]",
          )}
        >
          <div
            className={cn(
              "relative h-full w-full overflow-hidden",
              isStack && "rounded-[0.85rem] shadow-[6px_10px_0_rgba(14,98,122,0.22)]",
              isArch && "origin-bottom",
            )}
          >
            {isArch ? (
              <>
                <svg className="absolute h-0 w-0" aria-hidden>
                  <defs>
                    <clipPath id="feature-arch-clip" clipPathUnits="objectBoundingBox">
                      <path d="M0.08 1 V0.34 C0.08 0.12 0.28 0.04 0.5 0.04 C0.72 0.04 0.92 0.12 0.92 0.34 V1 Z" />
                    </clipPath>
                  </defs>
                </svg>
                <div className="absolute inset-0" style={{ clipPath: "url(#feature-arch-clip)" }}>
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 90vw, 40vw"
                    className="card-image-drift object-cover object-[50%_25%]"
                  />
                </div>
              </>
            ) : (
              <Image
                src={feature.image}
                alt=""
                fill
                sizes="(max-width:1024px) 90vw, 40vw"
                className={cn(
                  "card-image-drift object-cover",
                  isTall && "object-[50%_18%]",
                  feature.layout === "wide" && "object-[50%_35%]",
                )}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
          </div>
          {isArch ? <ArchOverlay /> : null}
        </div>

        {/* Stacked secondary layer for depth */}
        {isStack ? (
          <div
            className="pointer-events-none absolute inset-x-8 top-10 bottom-[42%] -z-[0] -rotate-1 rounded-[0.85rem] border border-gold/20 bg-teal/15"
            aria-hidden
          />
        ) : null}

        {/* One quiet chip — editorial, not SaaS chrome */}
        {feature.layout === "tall" ? (
          <FloatingChip
            label="Board"
            className="absolute left-5 top-5 z-[2] opacity-80 transition-transform duration-300 group-hover:-translate-y-1"
          />
        ) : null}

        {isPanel ? (
          <div className="absolute right-5 top-[36%] z-[2] max-w-[11rem] border border-[var(--border-gold)] bg-charcoal/75 px-3.5 py-3 opacity-95 shadow-[var(--shadow-soft)] backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
            <p className="text-[0.58rem] uppercase tracking-[0.14em] text-cream/45">Note</p>
            <p className="mt-1.5 font-display text-sm leading-snug text-cream/80">
              Hold this beat — softer eyes.
            </p>
          </div>
        ) : null}

        {feature.layout === "wide" ? (
          <FloatingChip
            label="Album"
            className="absolute left-5 top-5 z-[2] opacity-80 transition-transform duration-300 group-hover:-translate-y-1"
          />
        ) : null}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-[3] p-5 sm:p-6">
          <p className={cn("label-ui !text-[0.62rem]", accentText[feature.accent])}>
            0{index + 1}
          </p>
          <h3 className="mt-2 font-display text-xl text-cream sm:text-2xl">{feature.title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/55">{feature.body}</p>

          <div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:max-h-16 group-hover:opacity-100">
            <div className="flex items-center justify-between gap-3 border-t border-gold/20 pt-3">
              <p className="text-xs tracking-wide text-cream/50">{feature.detail}</p>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </FadeRise>
  );
}

export function FeatureSpaceSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal ds-section"
      aria-labelledby="space-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(14,98,122,0.14),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,rgba(243,130,34,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(229,169,60,0.06),transparent_40%)]" />
      </div>

      <TempleArchBackdrop />

      <div className="ds-container-wide relative z-10">
        <FadeRise className="mb-14 max-w-xl sm:mb-16">
          <p className="label-ui">Tools for every stage of your journey</p>
          <h2
            id="space-heading"
            className="mt-4 font-display text-[clamp(2.05rem,4.2vw,3.2rem)] font-medium leading-[1.1] text-cream"
          >
            Your Dance.
            <br />
            <span className="italic text-gold">Your Space.</span>
          </h2>
          <div className="ornament-line mt-6" aria-hidden />
        </FadeRise>

        {/* Editorial asymmetric grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          <div className="lg:col-span-4 lg:row-span-2">
            <FeatureCard feature={FEATURES[0]} index={0} />
          </div>
          <div className="lg:col-span-5">
            <FeatureCard feature={FEATURES[1]} index={1} />
          </div>
          <div className="lg:col-span-3">
            <FeatureCard feature={FEATURES[2]} index={2} />
          </div>
          <div className="lg:col-span-4">
            <FeatureCard feature={FEATURES[3]} index={3} />
          </div>
          <div className="lg:col-span-4">
            <FeatureCard feature={FEATURES[4]} index={4} />
          </div>

          <div className="lg:col-span-4">
            <FadeRise delay={0.3} className="h-full">
              <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[1rem] border border-gold/20 bg-surface/40 p-7 sm:p-8">
                <p className="font-script text-xl text-gold sm:text-2xl">One stage. Many rooms.</p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/50">
                  Boards, albums, practice, and portfolio — each with its own light.
                </p>
                <Link
                  href="/signup"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cream/60 transition-colors hover:text-gold"
                >
                  Enter your space
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </FadeRise>
          </div>
        </div>
      </div>
    </section>
  );
}
