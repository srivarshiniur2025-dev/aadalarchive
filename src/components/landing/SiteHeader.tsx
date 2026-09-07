"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/design-system";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#hero", label: "Home", hash: "hero" },
  { href: "/#explore", label: "Explore", hash: "explore" },
  { href: "/#create", label: "Create", hash: "create" },
  { href: "/#contact", label: "Contact", hash: "contact" },
] as const;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.2 16.2 20 20" />
    </svg>
  );
}

function scrollToHash(hash: string) {
  if (hash === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(hash);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader({
  contentClassName,
  /** When true, header floats over content with no document-flow spacer (landing hero). */
  overlay = false,
}: {
  contentClassName?: string;
  overlay?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hash, setHash] = useState("");
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const sync = () => setHash(window.location.hash.replace(/^#/, ""));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    linkHash: string,
  ) => {
    if (pathname !== "/") return;
    e.preventDefault();
    window.history.pushState(null, "", `/#${linkHash}`);
    setHash(linkHash);
    scrollToHash(linkHash);
    setOpen(false);
  };

  const isActive = (linkHash: string) => {
    if (pathname !== "/") return false;
    if (linkHash === "hero") return !hash || hash === "hero";
    return hash === linkHash;
  };

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 bg-transparent", contentClassName)}>
        <div className="ds-container-wide">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem] lg:gap-8">
            <Link
              href="/#hero"
              className="group flex shrink-0 items-center gap-3"
              aria-label="AadalArchive home"
              onClick={(e) => onNavClick(e, "hero")}
            >
              <BrandLogo
                size={44}
                priority
                decorative
                className="transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.35rem] tracking-[0.02em] text-cream transition-colors group-hover:text-gold sm:text-[1.5rem]">
                  AadalArchive
                </span>
                <span className="mt-1 hidden text-[0.55rem] font-medium tracking-[0.18em] text-cream/40 sm:block">
                  Discover · Create · Perform · Preserve
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.hash);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.hash)}
                    className={cn(
                      "group relative px-3 py-2 text-[0.82rem] font-medium tracking-[0.04em] transition-colors",
                      active ? "text-gold" : "text-cream/70 hover:text-gold",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-gold/80 transition-transform duration-300 group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <form
                className="relative hidden items-center md:flex"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!query.trim()) return;
                  window.location.href = `/#explore`;
                }}
              >
                <SearchIcon className="pointer-events-none absolute left-3.5 text-cream/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search inspiration..."
                  aria-label="Search inspiration"
                  className={cn(
                    "h-10 w-52 rounded-full border border-gold/10 bg-surface-elevated/70 pl-10 pr-4 text-sm text-cream",
                    "placeholder:text-cream/35 outline-none transition-all",
                    "focus:w-64 focus:border-gold/35 focus:bg-surface/80 xl:w-60 xl:focus:w-72",
                  )}
                />
              </form>

              <Link
                href="/login"
                className="hidden text-sm font-medium tracking-wide text-cream/75 transition-colors hover:text-gold lg:inline"
              >
                Log In
              </Link>

              <Button href="/signup" size="sm" className="hidden !min-h-10 sm:inline-flex">
                Sign Up
              </Button>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-cream lg:hidden"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">Menu</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {open ? (
                    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {overlay ? null : (
        <div className="h-16 lg:h-[4.5rem]" aria-hidden />
      )}

      {open ? (
        <div
          id={menuId}
          className="fixed inset-x-0 top-16 z-50 mx-4 overflow-hidden rounded-[1rem] border border-[var(--border-gold)] bg-charcoal/95 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl lg:top-[4.5rem] lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => onNavClick(e, link.hash)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-cream/80 hover:bg-surface hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-3 border-t border-gold/15 pt-4">
            <Link href="/login" className="text-sm text-cream/70 hover:text-gold">
              Log In
            </Link>
            <Button href="/signup" size="sm" className="!min-h-10">
              Sign Up
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
