"use client";

import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#explore", label: "Explore" },
  { href: "/boards", label: "Boards" },
  { href: "/#explore", label: "Events" },
  { href: "/discover", label: "Community" },
  { href: "/#contact", label: "Contact" },
] as const;

const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram", icon: InstagramIcon },
  { href: "https://youtube.com", label: "YouTube", icon: YouTubeIcon },
] as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} fill="none" aria-hidden>
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
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
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

export function SiteFooter() {
  return (
    <footer className="relative bg-[#15161A] text-cream">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="mx-auto max-w-[1240px] px-[5vw] py-14 sm:py-16 lg:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <Link href="/#hero" className="group inline-flex items-center gap-3">
              <LogoMark />
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl tracking-[0.02em] text-cream transition-colors group-hover:text-gold">
                  AadalArchive
                </span>
                <span className="mt-2 text-[0.55rem] font-medium tracking-[0.2em] text-cream/40">
                  Discover · Create · Perform · Preserve
                </span>
              </span>
            </Link>
          </div>

          <nav aria-label="Footer" className="lg:pt-1">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium tracking-wide text-cream/55 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:pt-1">
            <ul className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center text-cream/50 transition-colors hover:text-gold"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FadeRise className="mt-12 border-t border-gold/10 pt-8 text-center">
          <p className="text-xs tracking-wide text-cream/30">
            © {new Date().getFullYear()} AadalArchive
          </p>
        </FadeRise>
      </div>
    </footer>
  );
}
