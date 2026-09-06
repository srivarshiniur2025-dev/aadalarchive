"use client";

import Link from "next/link";
import { FadeRise } from "@/components/ui/Motion";
import { TempleOrnament } from "@/components/temple";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/discover", label: "Blog" },
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

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M11 18.5 12.5 12c.4-1.4 1.8-1.2 1.8.2 0 2.2-1.5 4-3.8 4" strokeLinecap="round" />
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
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="ds-container-wide py-16 sm:py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-3">
              <LogoMark />
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl tracking-[0.02em] text-cream transition-colors group-hover:text-gold">
                  AadalArchive
                </span>
                <span className="mt-2 text-[0.55rem] font-medium tracking-[0.2em] text-cream/40">
                  CREATE · PERFORM · PRESERVE
                </span>
              </span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-cream/45">
              Where every movement becomes a memory.
            </p>
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
            <p className="label-ui !text-[0.6rem] !text-cream/35">Follow</p>
            <ul className="mt-4 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-cream/50 transition-colors hover:text-gold"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FadeRise className="mt-16 flex flex-col items-center gap-5 border-t border-gold/10 pt-10 text-center">
          <TempleOrnament type="lotus" className="h-7 w-7 opacity-50" />
          <p className="font-display text-xl text-cream/80 sm:text-2xl">
            Dance today. <span className="italic text-gold">Inspire always.</span>
          </p>
          <div className="mt-1 h-px w-40 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <p className="text-xs tracking-wide text-cream/30">
            © {new Date().getFullYear()} AadalArchive
          </p>
        </FadeRise>
      </div>
    </footer>
  );
}
