"use client";

import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/explore", label: "Explore" },
  { href: "/boards", label: "Boards" },
  { href: "/albums", label: "Events" },
  { href: "/discover", label: "Community" },
  { href: "/#help", label: "Help" },
  { href: "/#contact", label: "Contact" },
] as const;

const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram", icon: InstagramIcon },
  { href: "https://youtube.com", label: "YouTube", icon: YouTubeIcon },
  { href: "https://pinterest.com", label: "Pinterest", icon: PinterestIcon },
  { href: "https://x.com", label: "X", icon: XIcon },
] as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9", className)}
      fill="none"
      aria-hidden
    >
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
      <path d="M20 8.5c0 0-1.2 2.8 0 5.2 1.2-2.4 0-5.2 0-5.2Z" fill="#F0C56A" />
    </svg>
  );
}

function LotusOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-5 w-5 text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden
    >
      <path d="M16 28c0-4 2.6-6.5 2.6-10.5 0 0-2.6 1.3-2.6 4 0-2.7-2.6-4-2.6-4 0 4 2.6 6.5 2.6 10.5Z" />
      <path d="M16 19.5c-2.8-1.2-5.5-1.1-8 .3 2.5 1.2 5.2 2.3 8 2.3s5.5-1.1 8-2.3c-2.5-1.4-5.2-1.5-8-.3Z" />
      <path d="M16 17c2-2.8 2.5-5.5 1.8-8.5-1 2.5-2 4.8-1.8 8.5-.4-3.7-1.4-6-2.8-8.5-.6 3 .2 5.7 2.8 8.5Z" />
      <path d="M16 7s-1.1 2.4 0 4.6c1.1-2.2 0-4.6 0-4.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TempleBorder() {
  return (
    <div className="relative w-full" aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <svg
        viewBox="0 0 1200 28"
        className="mx-auto mt-0 block h-5 w-full max-w-5xl opacity-70"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 H420 C460 20 480 6 600 6 C720 6 740 20 780 20 H1200"
          fill="none"
          stroke="#E5A93C"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        <path
          d="M480 20 C510 20 540 10 600 10 C660 10 690 20 720 20"
          fill="none"
          stroke="#E5A93C"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <circle cx="600" cy="6" r="2.5" fill="#E5A93C" fillOpacity="0.55" />
      </svg>
    </div>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3" y="6.5" width="18" height="11" rx="3" />
      <path d="M11 10.2v3.6l3.2-1.8-3.2-1.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M11 18.5 12.5 12c.4-1.4 1.8-1.2 1.8.2 0 2.2-1.5 4-3.8 4" strokeLinecap="round" />
      <circle cx="12.2" cy="9.2" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M6 6.5 17.5 17.5M17.5 6.5 6 17.5" strokeLinecap="round" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative bg-charcoal text-cream">
      <TempleBorder />

      <div className="ds-container-wide py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-3">
              <LogoMark className="transition-transform duration-300 group-hover:scale-[1.04]" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl tracking-[0.02em] text-cream transition-colors group-hover:text-gold">
                  AadalCanvas
                </span>
                <span className="mt-2 text-[0.58rem] font-medium tracking-[0.22em] text-cream/40">
                  CREATE · PERFORM · PRESERVE
                </span>
              </span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-cream/45">
              A modern visual world for dancers — inspiration, practice, and performance held with
              care.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="lg:pt-1">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 sm:gap-x-9">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium tracking-wide text-cream/55 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="lg:pt-1">
            <p className="label-ui !text-[0.6rem] !text-cream/35">Follow</p>
            <ul className="mt-4 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-cream/50 transition-all duration-200 hover:border-gold/40 hover:text-gold"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing */}
        <FadeRise className="mt-16 flex flex-col items-center gap-5 border-t border-gold/10 pt-10 text-center sm:mt-20 sm:pt-12">
          <LotusOrnament className="opacity-80" />
          <p className="font-display text-xl text-cream/80 sm:text-2xl">
            Dance today.{" "}
            <span className="italic text-gold">Inspire always.</span>
          </p>
          <p className="text-xs tracking-wide text-cream/30">
            © {new Date().getFullYear()} AadalCanvas
          </p>
        </FadeRise>
      </div>
    </footer>
  );
}
