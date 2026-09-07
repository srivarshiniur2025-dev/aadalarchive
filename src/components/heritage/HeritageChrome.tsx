import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Subtle carved corner marks — use sparingly on featured surfaces only */
export function HeritageCorners({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <span className="heritage-corner heritage-corner-tl" />
      <span className="heritage-corner heritage-corner-tr" />
      <span className="heritage-corner heritage-corner-bl" />
      <span className="heritage-corner heritage-corner-br" />
    </div>
  );
}

/** Thin inscription-style section label */
export function Inscription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#A9823D]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Carved gold divider */
export function HeritageDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#A9823D]/50 to-transparent" />
      <svg viewBox="0 0 20 20" className="h-3 w-3 text-[#E5A93C]/80" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M10 16c0-2.5 1.6-4.2 1.6-6.8 0 0-1.6.9-1.6 2.7 0-1.8-1.6-2.7-1.6-2.7C8.4 11.8 10 13.5 10 16Z" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#A9823D]/50 to-transparent" />
    </div>
  );
}

export function HeritageButton({
  children,
  className,
  href,
  type = "button",
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const styles = {
    primary: "heritage-btn-primary",
    secondary: "heritage-btn-secondary",
    ghost: "heritage-btn-ghost",
  }[variant];

  if (href) {
    return (
      <Link href={href} className={cn(styles, "inline-flex items-center gap-2 px-4 py-2.5 text-sm", className)}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cn(styles, "inline-flex items-center gap-2 px-4 py-2.5 text-sm", className)}>
      {children}
    </button>
  );
}

/** Featured collection frame — one strong image with subtle arch + bronze border */
export function FeaturedArchFrame({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={cn("heritage-featured relative overflow-hidden", className)}>
      <HeritageCorners />
      <div className="relative h-full min-h-[220px] w-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#15161A]/75 via-transparent to-[#211B15]/25" />
        <div
          className="pointer-events-none absolute inset-x-[12%] top-[6%] bottom-[8%] opacity-35"
          style={{
            backgroundImage: "url(/temple/clean/arch-minimal.png)",
            backgroundSize: "contain",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

/** Ornamental profile ring */
export function PortraitFrame({
  src,
  size = 96,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative shrink-0 rounded-full p-[3px]", className)}
      style={{
        background: "linear-gradient(145deg, #E5A93C 0%, #A9823D 45%, #30251A 100%)",
        width: size + 6,
        height: size + 6,
      }}
    >
      <div className="h-full w-full overflow-hidden rounded-full bg-[#15161A] p-[2px]">
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </div>
  );
}
