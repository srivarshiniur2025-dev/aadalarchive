"use client";

import Image from "next/image";
import { useId } from "react";
import { cn } from "@/lib/utils";

/** Gold scalloped arch — 411×552 (black keyed out) */
export const GOLD_SCALLOP_FRAME = "/explore/frames/gold-scalloped-arch.png";
export const GOLD_SCALLOP_ASPECT = "411 / 552";

/**
 * Clip follows the PEARL INNER EDGE of the gold frame — not the outer tip.
 * Crown carvings sit ABOVE this void; sides sit INSIDE the pillars.
 */
const SCALLOP_OPENING =
  "M0.195 0.878 " +
  "L0.195 0.395 " +
  "C0.195 0.355 0.215 0.325 0.250 0.305 " +
  "C0.285 0.282 0.315 0.255 0.350 0.228 " +
  "C0.385 0.198 0.420 0.172 0.455 0.158 " +
  "C0.475 0.148 0.490 0.142 0.500 0.140 " +
  "C0.510 0.142 0.525 0.148 0.545 0.158 " +
  "C0.580 0.172 0.615 0.198 0.650 0.228 " +
  "C0.685 0.255 0.715 0.282 0.750 0.305 " +
  "C0.785 0.325 0.805 0.355 0.805 0.395 " +
  "L0.805 0.878 " +
  "Z";

/**
 * Photo clipped exactly to the gold frame opening.
 */
export function GoldScallopFrame({
  src,
  alt,
  className,
  imgClassName,
  children,
  priority,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
  priority?: boolean;
  objectPosition?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const clipId = `gold-scallop-${uid}`;

  return (
    <div
      className={cn("relative isolate w-full overflow-hidden", className)}
      style={{ aspectRatio: GOLD_SCALLOP_ASPECT }}
    >
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={SCALLOP_OPENING} />
          </clipPath>
        </defs>
      </svg>

      {/* Photo ONLY inside pearl opening — never above the crown */}
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
          sizes="(max-width:768px) 50vw, 280px"
          className={cn("object-cover", imgClassName)}
          style={{ objectPosition }}
        />
      </div>

      {/* Frame locked 1:1 to box (no object-contain letterboxing) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${GOLD_SCALLOP_FRAME}?v=fit3`}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full select-none object-fill drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
      />

      {children ? (
        <div className="pointer-events-none absolute inset-0 z-[3]">{children}</div>
      ) : null}
    </div>
  );
}
