"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/design-system";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/boards", label: "Boards" },
  { href: "/albums", label: "Events" },
  { href: "/discover", label: "Community" },
  { href: "/#about", label: "About" },
] as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9 sm:h-10 sm:w-10", className)}
      fill="none"
      aria-hidden
    >
      {/* Soft lotus/dancer mark — artistic, not SaaS glyph */}
      <circle cx="20" cy="20" r="18.5" stroke="#E5A93C" strokeOpacity="0.35" strokeWidth="0.8" />
      <path
        d="M20 31c0-4.5 3-7.5 3-12 0 0-3 1.5-3 4.5 0-3-3-4.5-3-4.5 0 4.5 3 7.5 3 12Z"
        fill="#E5A93C"
        fillOpacity="0.9"
      />
      <path
        d="M20 22c-3.2-1.4-6.2-1.2-9 0.4 2.8 1.4 5.8 2.6 9 2.6s6.2-1.2 9-2.6c-2.8-1.6-5.8-1.8-9-0.4Z"
        stroke="#E5A93C"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M20 19.5c2.2-3.2 2.8-6.2 2-9.5-1.4 2.8-2.6 5.5-2 9.5-0.6-4-1.8-6.7-3.2-9.5-0.6 3.3 0.2 6.3 3.2 9.5Z"
        stroke="#E5A93C"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M20 8.5c0 0-1.2 2.8 0 5.2 1.2-2.4 0-5.2 0-5.2Z"
        fill="#F0C56A"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.2 16.2 20 20" />
    </svg>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,box-shadow] duration-300 ease-[var(--ease-dance)]",
          scrolled
            ? "bg-charcoal/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "bg-charcoal/35 backdrop-blur-md",
        )}
      >
        <div className="ds-container-wide">
          <div className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5.25rem] lg:gap-8">
            {/* LEFT — Brand */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3"
              aria-label="AadalCanvas home"
            >
              <span className="transition-transform duration-300 ease-[var(--ease-dance)] group-hover:scale-[1.04] group-hover:rotate-[-2deg]">
                <LogoMark />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.35rem] tracking-[0.02em] text-cream transition-colors duration-200 group-hover:text-gold sm:text-[1.5rem]">
                  AadalCanvas
                </span>
                <span className="mt-1 hidden text-[0.58rem] font-medium tracking-[0.22em] text-cream/45 sm:block">
                  CREATE · PERFORM · PRESERVE
                </span>
              </span>
            </Link>

            {/* CENTER — Nav */}
            <nav
              className="hidden items-center gap-1 xl:gap-2 lg:flex"
              aria-label="Primary"
            >
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "group relative px-3 py-2 text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-300 ease-[var(--ease-dance)]",
                      active ? "text-gold" : "text-cream/70 hover:text-gold",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold transition-all duration-300 ease-[var(--ease-dance)]",
                        active
                          ? "scale-100 opacity-100"
                          : "scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-[420ms] ease-[var(--ease-silk)] group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT — Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <form
                className="relative hidden items-center md:flex"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!query.trim()) return;
                  window.location.href = `/discover?q=${encodeURIComponent(query.trim())}`;
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
                    "h-10 w-44 rounded-full border border-transparent bg-surface-elevated/60 pl-10 pr-4 text-sm text-cream",
                    "placeholder:text-cream/35",
                    "outline-none transition-all duration-200",
                    "focus:w-56 focus:border-[var(--border-gold)] focus:bg-surface/80 xl:w-52 xl:focus:w-64",
                  )}
                />
              </form>

              <Link
                href="/login"
                className="hidden text-sm font-medium tracking-wide text-cream/75 transition-colors duration-300 ease-[var(--ease-dance)] hover:text-gold lg:inline"
              >
                Log in
              </Link>

              <Button href="/signup" size="sm" className="hidden !min-h-10 sm:inline-flex">
                Sign Up
              </Button>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-cream transition-colors hover:text-gold lg:hidden"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">Menu</span>
                <span className="relative block h-3.5 w-5" aria-hidden>
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300",
                      open && "top-1.5 rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-200",
                      open && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-3 h-px w-full bg-current transition-transform duration-300",
                      open && "top-1.5 -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Thin gold ornamental line */}
        <div
          className="h-px w-full bg-gradient-to-r from-transparent via-gold/55 to-transparent"
          aria-hidden
        />
      </header>

      {/* Mobile menu */}
      <div
        id={menuId}
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />

        <div
          className={cn(
            "absolute inset-x-0 top-[4.5rem] mx-4 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-gold)] bg-charcoal/95 shadow-[var(--shadow-card)] backdrop-blur-xl transition-all duration-300 ease-[var(--ease-dance)]",
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium tracking-wide transition-colors",
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-cream/80 hover:bg-surface hover:text-gold",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[var(--border-gold)] p-4">
            <form
              className="relative mb-3"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                if (!query.trim()) return;
                setOpen(false);
                window.location.href = `/discover?q=${encodeURIComponent(query.trim())}`;
              }}
            >
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search inspiration..."
                aria-label="Search inspiration"
                className="h-11 w-full rounded-full border border-[var(--border-gold)] bg-surface/80 pl-10 pr-4 text-sm text-cream placeholder:text-cream/35 outline-none focus:border-gold"
              />
            </form>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button href="/login" variant="outline" fullWidth size="sm">
                Log in
              </Button>
              <Button href="/signup" fullWidth size="sm">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so page content clears fixed header */}
      <div className="h-[4.5rem] lg:h-[5.25rem]" aria-hidden />
    </>
  );
}
