"use client";

import { TEMPLE } from "@/components/temple";
import { cn } from "@/lib/utils";

/** Slim temple pillar for framing gallery / archive sections. */
export function TemplePillar({
  variant = "floral",
  side = "left",
  className,
}: {
  variant?: "floral" | "simple" | "sculpted";
  side?: "left" | "right";
  className?: string;
}) {
  const src = TEMPLE.pillar[variant];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={cn(
        "pointer-events-none h-full w-12 object-contain object-bottom opacity-[0.28] xl:w-14",
        side === "right" && "scale-x-[-1]",
        className,
      )}
    />
  );
}

/** Medium arch frame for niche / featured treatments. */
export function TempleFrame({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={TEMPLE.arch.medium}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom"
      />
    </div>
  );
}
