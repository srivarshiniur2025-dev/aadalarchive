import Link from "next/link";
import { cn } from "@/lib/utils";

export function OrnamentCorners({ className }: { className?: string }) {
  return (
    <div className={cn("temple-corners pointer-events-none absolute inset-0", className)} aria-hidden>
      <span className="corner-br" />
      <span className="corner-bl" />
    </div>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
      <svg viewBox="0 0 24 24" className="h-3 w-3 text-gold/80" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 20c0-3 2-5 2-8 0 0-2 1-2 3 0-2-2-3-2-3 0 3 2 5 2 8Z" />
        <path d="M12 15c-2-1-4-1-6 0 2 1 4 2 6 2 2 0 4-1 6-2-2-1-4-1-6 0Z" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
    </div>
  );
}

export function HeritageButton({
  children,
  className,
  href,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  if (href) {
    return (
      <Link href={href} className={cn("heritage-btn px-4 py-2.5 text-sm", className)}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cn("heritage-btn px-4 py-2.5 text-sm", className)}>
      {children}
    </button>
  );
}

export function HeritageGhost({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  if (href) {
    return (
      <Link href={href} className={cn("heritage-btn-ghost px-4 py-2.5 text-sm", className)}>
        {children}
      </Link>
    );
  }
  return <span className={cn("heritage-btn-ghost px-4 py-2.5 text-sm", className)}>{children}</span>;
}

export function PageIntro({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-xl">
        <h2 className="font-display text-[clamp(1.85rem,3vw,2.5rem)] font-medium leading-tight text-cream">
          {title}
        </h2>
        <p className="mt-2 text-sm text-beige/70">{subtitle}</p>
        <span className="mt-3 block h-px w-16 origin-left bg-gold/50 gold-underline-draw" aria-hidden />
      </div>
      {action}
    </header>
  );
}
