"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Carved South Indian temple arch frame — flat SVG, no 3D.
 * Used for hero, cards, and CTA openings.
 */
export function TempleArchClip({
  children,
  className,
  clipId,
}: {
  children: ReactNode;
  className?: string;
  clipId?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const id = clipId ?? `arch-clip-${uid}`;

  return (
    <div className={cn("relative h-full w-full", className)}>
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            {/* Soft ogee / horseshoe temple opening */}
            <path d="M0.12 1 V0.34 C0.12 0.12 0.28 0.04 0.5 0.04 C0.72 0.04 0.88 0.12 0.88 0.34 V1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ clipPath: `url(#${id})` }}>
        {children}
      </div>
    </div>
  );
}

/** Stone border overlay that sits on top of clipped media */
export function TempleArchBorder({
  className,
  variant = "card",
}: {
  className?: string;
  variant?: "card" | "hero" | "cta" | "outline";
}) {
  const uid = useId().replace(/:/g, "");
  const stone = `stone-${uid}`;
  const edge = `edge-${uid}`;
  const mask = `mask-${uid}`;

  const stroke =
    variant === "outline"
      ? { outer: 1.6, inner: 1, opacity: 0.55 }
      : variant === "hero"
        ? { outer: 2, inner: 1.3, opacity: 0.9 }
        : { outer: 1.5, inner: 1, opacity: 0.75 };

  return (
    <svg
      viewBox="0 0 200 280"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={stone} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3d3832" />
          <stop offset="45%" stopColor="#252220" />
          <stop offset="100%" stopColor="#141210" />
        </linearGradient>
        <linearGradient id={edge} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#8C5E17" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E5A93C" stopOpacity="0.2" />
        </linearGradient>
        <mask id={mask}>
          <rect width="200" height="280" fill="white" />
          <path
            d="M28 274 V92 C28 38 72 14 100 14 C128 14 172 38 172 92 V274 Z"
            fill="black"
          />
        </mask>
      </defs>

      {variant !== "outline" ? (
        <path
          d="M8 276 V82 C8 28 52 6 100 6 C148 6 192 28 192 82 V276 Z"
          fill={`url(#${stone})`}
          stroke={`url(#${edge})`}
          strokeWidth={stroke.outer}
          mask={`url(#${mask})`}
        />
      ) : null}

      {/* Outer carved line */}
      <path
        d="M28 274 V92 C28 38 72 14 100 14 C128 14 172 38 172 92 V274"
        fill="none"
        stroke="#E5A93C"
        strokeOpacity={stroke.opacity * 0.55}
        strokeWidth={stroke.outer}
      />
      {/* Mid carved band */}
      <path
        d="M33 274 V95 C33 44 75 19 100 19 C125 19 167 44 167 95 V274"
        fill="none"
        stroke="#E5A93C"
        strokeOpacity={stroke.opacity * 0.18}
        strokeWidth="0.9"
      />
      {/* Inner carved line */}
      <path
        d="M38 274 V98 C38 50 78 24 100 24 C122 24 162 50 162 98 V274"
        fill="none"
        stroke="#E5A93C"
        strokeOpacity={stroke.opacity * 0.28}
        strokeWidth={stroke.inner}
      />
      {/* Carved scallop along the arch crown */}
      <path
        d="M48 78 C58 58 78 42 100 42 C122 42 142 58 152 78"
        fill="none"
        stroke="#E5A93C"
        strokeOpacity="0.22"
        strokeWidth="0.9"
      />
      {/* Pillar grooves */}
      {[40, 48, 152, 160].map((x) => (
        <line
          key={x}
          x1={x}
          y1={100}
          x2={x}
          y2={274}
          stroke="#E5A93C"
          strokeOpacity="0.12"
          strokeWidth="0.8"
        />
      ))}
      {/* Springing discs + lotus dots */}
      <circle cx="40" cy="94" r="2.8" fill="#E5A93C" fillOpacity="0.4" />
      <circle cx="160" cy="94" r="2.8" fill="#E5A93C" fillOpacity="0.4" />
      <circle cx="100" cy="16" r="2" fill="#E5A93C" fillOpacity="0.35" />
      {/* Keystone tick */}
      <path
        d="M96 10 H104 M100 8 V16"
        stroke="#E5A93C"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {/* Base sill */}
      <path
        d="M28 274 H172"
        stroke="#E5A93C"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Full arch window: media + stone border */
export function TempleArchWindow({
  children,
  className,
  borderVariant = "card",
}: {
  children: ReactNode;
  className?: string;
  borderVariant?: "card" | "hero" | "cta" | "outline";
}) {
  return (
    <div className={cn("relative", className)}>
      <TempleArchClip className="absolute inset-0">{children}</TempleArchClip>
      <TempleArchBorder variant={borderVariant} />
    </div>
  );
}

/** Simple brass lamp — flat SVG for hero foreground */
export function TempleLamp({ className, tall }: { className?: string; tall?: boolean }) {
  return (
    <svg
      viewBox={tall ? "0 0 40 72" : "0 0 32 56"}
      className={cn(tall ? "h-16 w-9" : "h-12 w-7", className)}
      fill="none"
      aria-hidden
    >
      <ellipse
        cx={tall ? 20 : 16}
        cy={tall ? 68 : 52}
        rx={tall ? 14 : 11}
        ry={tall ? 3 : 2.5}
        fill="#8C5E17"
        fillOpacity="0.55"
      />
      <path
        d={tall ? "M10 62h20l-2-5H12l-2 5Z" : "M8 48h16l-1.5-4H9.5L8 48Z"}
        fill="#8C5E17"
      />
      <rect
        x={tall ? 17 : 13.5}
        y={tall ? 34 : 26}
        width={tall ? 6 : 5}
        height={tall ? 24 : 18}
        rx="1.2"
        fill="#E5A93C"
      />
      <ellipse
        cx={tall ? 20 : 16}
        cy={tall ? 32 : 24}
        rx={tall ? 12 : 9}
        ry={tall ? 4 : 3}
        fill="#8C5E17"
      />
      <path
        d={
          tall
            ? "M20 14c3.5 4 4 8 0 14-4-6-3.5-10 0-14Z"
            : "M16 10c2.8 3.2 3.2 6.5 0 11-3.2-4.5-2.8-7.8 0-11Z"
        }
        fill="#F38222"
      />
      <circle
        cx={tall ? 20 : 16}
        cy={tall ? 16 : 12}
        r={tall ? 3.2 : 2.6}
        fill="#E5A93C"
        fillOpacity="0.9"
      />
    </svg>
  );
}
