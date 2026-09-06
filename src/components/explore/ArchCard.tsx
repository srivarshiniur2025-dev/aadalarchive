"use client";

import Image from "next/image";
import { useId } from "react";
import { TEMPLE, type ArchVariant } from "@/components/temple";
import { cn } from "@/lib/utils";

/**
 * Exact PNG pixel ratios so object-contain arch fills the box (no float/gap).
 * Measured from public/temple/clean/*.png
 */
export const ARCH_ASPECT: Partial<Record<ArchVariant, string>> = {
  niche: "165 / 220",
  small: "165 / 220",
  medium: "170 / 220",
  large: "170 / 220",
  decorative: "175 / 220",
  classic: "330 / 405",
  grand: "420 / 405",
  span: "393 / 182",
  doublePillar: "330 / 405",
  minimal: "170 / 220",
  sideCorridor: "393 / 182",
};

/** Opening voids matched to each arch silhouette (objectBoundingBox). */
const OPENING: Partial<Record<ArchVariant, string>> = {
  niche:
    "M0.22 1 V0.38 C0.22 0.38 0.27 0.26 0.37 0.20 C0.43 0.13 0.47 0.09 0.5 0.08 C0.53 0.09 0.57 0.13 0.63 0.20 C0.73 0.26 0.78 0.38 0.78 0.38 V1 Z",
  small:
    "M0.20 1 V0.40 C0.20 0.40 0.26 0.28 0.36 0.22 C0.42 0.15 0.47 0.11 0.5 0.10 C0.53 0.11 0.58 0.15 0.64 0.22 C0.74 0.28 0.80 0.40 0.80 0.40 V1 Z",
  medium:
    "M0.20 1 V0.40 C0.20 0.40 0.26 0.28 0.36 0.22 C0.42 0.15 0.47 0.11 0.5 0.10 C0.53 0.11 0.58 0.15 0.64 0.22 C0.74 0.28 0.80 0.40 0.80 0.40 V1 Z",
  large:
    "M0.20 1 V0.40 C0.20 0.40 0.26 0.28 0.36 0.22 C0.42 0.15 0.47 0.11 0.5 0.10 C0.53 0.11 0.58 0.15 0.64 0.22 C0.74 0.28 0.80 0.40 0.80 0.40 V1 Z",
  decorative:
    "M0.19 1 V0.42 C0.19 0.42 0.25 0.30 0.35 0.24 C0.42 0.16 0.47 0.12 0.5 0.11 C0.53 0.12 0.58 0.16 0.65 0.24 C0.75 0.30 0.81 0.42 0.81 0.42 V1 Z",
  classic:
    "M0.21 1 V0.42 C0.21 0.42 0.27 0.30 0.36 0.24 C0.42 0.16 0.47 0.13 0.5 0.12 C0.53 0.13 0.58 0.16 0.64 0.24 C0.73 0.30 0.79 0.42 0.79 0.42 V1 Z",
  grand:
    "M0.26 1 V0.48 C0.26 0.48 0.30 0.38 0.38 0.32 C0.43 0.26 0.47 0.22 0.5 0.21 C0.53 0.22 0.57 0.26 0.62 0.32 C0.70 0.38 0.74 0.48 0.74 0.48 V1 Z",
  /* Wide Featured portal */
  span:
    "M0.10 1 V0.58 C0.10 0.58 0.14 0.38 0.28 0.28 C0.38 0.20 0.45 0.16 0.5 0.15 C0.55 0.16 0.62 0.20 0.72 0.28 C0.86 0.38 0.90 0.58 0.90 0.58 V1 Z",
  sideCorridor:
    "M0.10 1 V0.58 C0.10 0.58 0.14 0.38 0.28 0.28 C0.38 0.20 0.45 0.16 0.5 0.15 C0.55 0.16 0.62 0.20 0.72 0.28 C0.86 0.38 0.90 0.58 0.90 0.58 V1 Z",
  doublePillar:
    "M0.21 1 V0.42 C0.21 0.42 0.27 0.30 0.36 0.24 C0.42 0.16 0.47 0.13 0.5 0.12 C0.53 0.13 0.58 0.16 0.64 0.24 C0.73 0.30 0.79 0.42 0.79 0.42 V1 Z",
  minimal:
    "M0.20 1 V0.40 C0.20 0.40 0.26 0.28 0.36 0.22 C0.42 0.15 0.47 0.11 0.5 0.10 C0.53 0.11 0.58 0.15 0.64 0.22 C0.74 0.28 0.80 0.40 0.80 0.40 V1 Z",
};

/**
 * Arch IS the frame. Photo is SVG-clipped to the opening; arch PNG overlays 1:1.
 */
export function ArchCard({
  src,
  alt,
  arch = "medium",
  className,
  imgClassName,
  children,
  priority,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  arch?: ArchVariant;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
  priority?: boolean;
  objectPosition?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const clipId = `arch-void-${arch}-${uid}`;
  const aspect = ARCH_ASPECT[arch] ?? "3 / 4";
  const opening = OPENING[arch] ?? OPENING.medium!;

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: aspect }}
    >
      {/* Keep SVG in-flow for clipPath resolution (0×0 breaks in some browsers) */}
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={opening} />
          </clipPath>
        </defs>
      </svg>

      {/* Photo — clipped to arch void only */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width:768px) 45vw, 220px"
          className={cn("object-cover scale-[1.15]", imgClassName)}
          style={{ objectPosition }}
        />
      </div>

      {/* Stone arch frame — same box aspect as PNG */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={TEMPLE.arch[arch]}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full select-none object-contain object-bottom drop-shadow-[0_10px_28px_rgba(0,0,0,0.5)]"
      />

      {children ? (
        <div className="pointer-events-none absolute inset-0 z-[3]">{children}</div>
      ) : null}
    </div>
  );
}
