"use client";

import { useId } from "react";

/**
 * Shared subtle temple-arch motif for section backdrops.
 * Low opacity — structural atmosphere, not decoration stickers.
 */
export function TempleArchBackdrop({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `arch-polish-${uid}`;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-[8%] mx-auto h-[55%] max-w-4xl opacity-[0.09] ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 800 480" className="h-full w-full" preserveAspectRatio="xMidYMin meet">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0E627A" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path
          d="M90 460 V175 C90 75 230 28 400 28 C570 28 710 75 710 175 V460"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
        />
        <path
          d="M140 460 V185 C140 100 255 60 400 60 C545 60 660 100 660 185 V460"
          fill="none"
          stroke="#E5A93C"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
