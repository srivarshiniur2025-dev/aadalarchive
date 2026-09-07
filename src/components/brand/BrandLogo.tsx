import Image from "next/image";
import { cn } from "@/lib/utils";

export const BRAND_LOGO_SRC = "/brand/aadal-logo.png";

/** Intrinsic logo aspect (813×954). */
const LOGO_ASPECT = 954 / 813;

/** Official AadalArchive mark — dancer + gopuram seal (transparent PNG). */
export function BrandLogo({
  className,
  size = 40,
  priority = false,
  decorative = false,
}: {
  className?: string;
  /** Width in CSS pixels; height follows intrinsic ratio. */
  size?: number;
  priority?: boolean;
  /** Hide from screen readers when paired with visible wordmark. */
  decorative?: boolean;
}) {
  const height = Math.round(size * LOGO_ASPECT);
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt={decorative ? "" : "AadalArchive"}
      width={size}
      height={height}
      priority={priority}
      aria-hidden={decorative || undefined}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ width: size }}
    />
  );
}
