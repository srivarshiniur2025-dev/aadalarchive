"use client";

import Image from "next/image";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  TEMPLE,
  type ArchVariant,
  type BorderVariant,
  type OrnamentType,
  type PillarVariant,
} from "./assets";

/** Cleaned RGBA temple assets — normal compositing only. */
const ARCH_IMG = "object-contain object-bottom pointer-events-none select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]";
const PILLAR_IMG = "object-contain object-bottom pointer-events-none select-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]";
const ORN_IMG = "object-contain pointer-events-none select-none opacity-90";

/** Scalloped opening clip — content shows through the arch void only */
function OpeningClip({
  children,
  className,
  size = "grand",
}: {
  children: ReactNode;
  className?: string;
  size?: "grand" | "classic" | "card";
}) {
  const uid = useId().replace(/:/g, "");
  const id = `temple-open-${size}-${uid}`;

  /* Apex sits lower to match thick carved crowns on cleaned arch PNGs */
  const d =
    size === "grand"
      ? "M0.24 1 V0.52 C0.24 0.52 0.28 0.40 0.36 0.34 C0.42 0.26 0.47 0.22 0.5 0.21 C0.53 0.22 0.58 0.26 0.64 0.34 C0.72 0.40 0.76 0.52 0.76 0.52 V1 Z"
      : size === "classic"
        ? "M0.20 1 V0.46 C0.20 0.46 0.26 0.34 0.35 0.28 C0.42 0.20 0.47 0.16 0.5 0.15 C0.53 0.16 0.58 0.20 0.65 0.28 C0.74 0.34 0.80 0.46 0.80 0.46 V1 Z"
        : "M0.18 1 V0.42 C0.18 0.42 0.24 0.30 0.34 0.24 C0.42 0.15 0.47 0.11 0.5 0.10 C0.53 0.11 0.58 0.15 0.66 0.24 C0.76 0.30 0.82 0.42 0.82 0.42 V1 Z";

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={d} />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ clipPath: `url(#${id})` }}>
        {children}
      </div>
    </div>
  );
}

export function TemplePillar({
  variant = "main",
  side = "left",
  className,
}: {
  variant?: PillarVariant;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none relative h-full w-full select-none", className)}
      aria-hidden
    >
      <Image
        src={TEMPLE.pillar[variant]}
        alt=""
        fill
        sizes="(max-width:1024px) 18vw, 140px"
        className={cn(PILLAR_IMG, side === "right" && "scale-x-[-1]")}
      />
    </div>
  );
}

export function TempleArch({
  variant = "grand",
  className,
  priority,
}: {
  variant?: ArchVariant;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[3]", className)}
      aria-hidden
    >
      <Image
        src={TEMPLE.arch[variant]}
        alt=""
        fill
        priority={priority}
        sizes="(max-width:768px) 90vw, 55vw"
        className={ARCH_IMG}
      />
    </div>
  );
}

/**
 * Content BEHIND transparent arch frame.
 * No dark rectangular chrome — architecture alone defines the silhouette.
 */
export function TempleFrame({
  children,
  variant = "medium",
  className,
  glow,
  priority,
}: {
  children: ReactNode;
  variant?: ArchVariant;
  className?: string;
  glow?: boolean;
  priority?: boolean;
}) {
  const clipSize =
    variant === "grand" ? "grand" : variant === "classic" ? "classic" : "card";

  return (
    <div
      className={cn(
        "temple-frame relative isolate overflow-visible bg-transparent",
        glow && "temple-frame-glow",
        className,
      )}
    >
      <OpeningClip size={clipSize} className="absolute inset-0 z-[1]">
        {children}
      </OpeningClip>
      <TempleArch variant={variant} priority={priority} />
    </div>
  );
}

export function TempleNiche({
  children,
  variant = "niche",
  className,
  glow,
}: {
  children: ReactNode;
  variant?: ArchVariant;
  className?: string;
  glow?: boolean;
}) {
  return (
    <TempleFrame variant={variant} className={className} glow={glow}>
      {children}
    </TempleFrame>
  );
}

export function TempleOrnament({
  type = "lotus",
  className,
}: {
  type?: OrnamentType;
  className?: string;
}) {
  const src = type.startsWith("crest-")
    ? TEMPLE.crest[type.replace("crest-", "") as keyof typeof TEMPLE.crest]
    : TEMPLE.detail[type as keyof typeof TEMPLE.detail];

  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden>
      <Image src={src} alt="" fill sizes="160px" className={ORN_IMG} />
    </div>
  );
}

export function TempleBorder({
  variant = "01",
  className,
}: {
  variant?: BorderVariant;
  className?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none relative h-6 w-full overflow-hidden", className)}
      aria-hidden
    >
      <Image
        src={TEMPLE.border[variant]}
        alt=""
        fill
        sizes="1200px"
        className="object-cover object-center opacity-70"
      />
    </div>
  );
}

export function TempleCornice({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none relative h-8 w-full overflow-hidden", className)}
      aria-hidden
    >
      <Image
        src={TEMPLE.detail.cornice}
        alt=""
        fill
        sizes="1200px"
        className="object-cover object-center opacity-65"
      />
    </div>
  );
}

/** Subtle temple floor / plinth under pillars + arch */
export function TempleBase({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none relative h-10 w-full overflow-hidden opacity-80",
        className,
      )}
      aria-hidden
    >
      <Image
        src={TEMPLE.detail.baseMoulding}
        alt=""
        fill
        sizes="900px"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#15161A] via-transparent to-transparent" />
    </div>
  );
}

export { TEMPLE };
export type { ArchVariant, BorderVariant, OrnamentType, PillarVariant };
