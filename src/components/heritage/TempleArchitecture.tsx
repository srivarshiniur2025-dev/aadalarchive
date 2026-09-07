import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Thin vertical carved pillar — edge of doorway, not a photo collage */
export function TemplePillar({
  side = "left",
  className,
}: {
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 12 400"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-y-0 w-[10px] opacity-[0.55]",
        side === "left" ? "left-0" : "right-0",
        className,
      )}
      aria-hidden
    >
      {/* Base (upapitha) */}
      <rect x="1.5" y="372" width="9" height="28" fill="none" stroke="#A9823D" strokeWidth="0.7" opacity="0.7" />
      <line x1="2" y1="380" x2="10" y2="380" stroke="#A9823D" strokeWidth="0.45" opacity="0.45" />
      {/* Shaft bands — sthamba rhythm */}
      <rect x="3" y="28" width="6" height="344" fill="none" stroke="#A9823D" strokeWidth="0.55" opacity="0.5" />
      {[60, 110, 160, 210, 260, 310, 350].map((y) => (
        <line key={y} x1="3.5" y1={y} x2="8.5" y2={y} stroke="#A9823D" strokeWidth="0.4" opacity="0.35" />
      ))}
      {/* Capital / lotus band */}
      <rect x="1.5" y="0" width="9" height="28" fill="none" stroke="#A9823D" strokeWidth="0.7" opacity="0.7" />
      <path d="M3 14 Q6 8 9 14" fill="none" stroke="#E5A93C" strokeWidth="0.5" opacity="0.55" />
      <line x1="2" y1="20" x2="10" y2="20" stroke="#A9823D" strokeWidth="0.45" opacity="0.45" />
    </svg>
  );
}

/** Horizontal lintel / shallow arch — doorway crown, extremely restrained */
export function TempleArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 28"
      preserveAspectRatio="none"
      className={cn("pointer-events-none h-5 w-full opacity-60", className)}
      aria-hidden
    >
      <path d="M8 22 H232" stroke="#A9823D" strokeWidth="0.8" opacity="0.55" />
      <path
        d="M20 22 C60 6 180 6 220 22"
        fill="none"
        stroke="#A9823D"
        strokeWidth="0.9"
        opacity="0.65"
      />
      <path
        d="M36 22 C80 10 160 10 204 22"
        fill="none"
        stroke="#E5A93C"
        strokeWidth="0.55"
        opacity="0.4"
      />
      <circle cx="120" cy="12" r="1.6" fill="#E5A93C" fillOpacity="0.55" />
      <rect x="4" y="18" width="8" height="8" fill="none" stroke="#A9823D" strokeWidth="0.6" opacity="0.5" />
      <rect x="228" y="18" width="8" height="8" fill="none" stroke="#A9823D" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

/** Inscription-style section label with architectural dividers */
export function ArchivalLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 px-1", className)} role="presentation">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#A9823D]/40" aria-hidden />
      <span className="shrink-0 text-[0.58rem] font-medium uppercase tracking-[0.28em] text-[#A9823D]">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#A9823D]/40" aria-hidden />
    </div>
  );
}

/** Major structural divider with tiny geometric center */
export function TempleDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 px-1", className)} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#A9823D]/45 to-transparent" />
      <svg viewBox="0 0 10 10" className="h-2 w-2 text-[#E5A93C]/70" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M5 1.5 8.5 5 5 8.5 1.5 5Z" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#A9823D]/45 to-transparent" />
    </div>
  );
}

/** Tiny carved corner for plaque / logo seal only */
export function OrnamentalCorner({
  position,
  className,
}: {
  position: "tl" | "tr" | "bl" | "br";
  className?: string;
}) {
  const pos = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  }[position];
  return (
    <span
      className={cn("pointer-events-none absolute h-2.5 w-2.5 border-[#A9823D]/55", pos, className)}
      aria-hidden
    />
  );
}

/** Institutional seal for AadalArchive wordmark */
export function ArchiveSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-11 w-11", className)} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="22" stroke="#A9823D" strokeWidth="0.9" opacity="0.7" />
      <circle cx="24" cy="24" r="18.5" stroke="#E5A93C" strokeWidth="0.55" opacity="0.35" />
      {/* Lotus / mudra seal */}
      <path
        d="M24 34c0-4.2 2.6-7 2.6-11.2 0 0-2.6 1.5-2.6 4.4 0-2.9-2.6-4.4-2.6-4.4C21.4 27 24 29.8 24 34Z"
        fill="#E5A93C"
        fillOpacity="0.9"
      />
      <path
        d="M24 24.5c-3.2-1.3-5.8-1.1-8.2.3 2.4 1.3 5 2.5 8.2 2.5s5.8-1.2 8.2-2.5c-2.4-1.4-5-1.6-8.2-.3Z"
        stroke="#F0C56A"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M17.5 19.5c1.8-1.4 3.5-2 6.5-2s4.7.6 6.5 2" stroke="#A9823D" strokeWidth="0.7" opacity="0.7" />
      {/* Tiny kalasha tip */}
      <path d="M24 10.5v3" stroke="#E5A93C" strokeWidth="0.8" />
      <circle cx="24" cy="10" r="1.1" fill="#E5A93C" fillOpacity="0.85" />
    </svg>
  );
}

/** Ceremonial CREATE plaque — carved bronze, not SaaS yellow */
export function CreatePlaque({
  children,
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden px-3 py-3 text-sm font-semibold tracking-wide text-[#D8C7A3]",
        "bg-gradient-to-b from-[#3a2e22] via-[#30251A] to-[#241c14]",
        "border border-[#A9823D]/55",
        "shadow-[inset_0_1px_0_rgba(229,169,60,0.18),0_8px_20px_rgba(0,0,0,0.35)]",
        "transition-[border-color,box-shadow,color] duration-300",
        "hover:border-[#E5A93C]/70 hover:text-[#E5A93C] hover:shadow-[inset_0_1px_0_rgba(229,169,60,0.28),0_0_18px_rgba(169,130,61,0.15)]",
        className,
      )}
    >
      <OrnamentalCorner position="tl" />
      <OrnamentalCorner position="tr" />
      <OrnamentalCorner position="bl" />
      <OrnamentalCorner position="br" />
      <span className="relative z-[1] flex items-center justify-center gap-2.5">{children}</span>
    </button>
  );
}
