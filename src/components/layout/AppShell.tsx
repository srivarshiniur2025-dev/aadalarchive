"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

const desktopNav = [
  { href: "/discover", label: "Home", icon: Icons.Home },
  { href: "/explore", label: "Explore", icon: Icons.Explore },
  { href: "/boards", label: "Collections", icon: Icons.Boards },
  { href: "/albums", label: "Albums", icon: Icons.Albums },
  { href: "/choreography", label: "Dance Videos", icon: Icons.Video },
  { href: "/studio", label: "Practice", icon: Icons.Choreography },
];

const mobileNav = [
  { href: "/discover", label: "Home", icon: Icons.Home },
  { href: "/explore", label: "Explore", icon: Icons.Explore },
  { href: "/create", label: "Create", icon: Icons.Create, prominent: true },
  { href: "/albums", label: "Albums", icon: Icons.Albums },
  { href: "/profile", label: "Profile", icon: Icons.Profile },
];

const createOptions = [
  {
    href: "/create?type=board",
    label: "Create a collection",
    hint: "Save dance ideas and references",
    icon: Icons.Boards,
  },
  {
    href: "/create?type=album",
    label: "Create an event album",
    hint: "Keep memories from a performance",
    icon: Icons.Albums,
  },
  {
    href: "/create?type=video",
    label: "Upload a dance video",
    hint: "Store rehearsal or performance clips",
    icon: Icons.Upload,
  },
  {
    href: "/capture",
    label: "Record your practice",
    hint: "Capture from your camera",
    icon: Icons.Record,
  },
  {
    href: "/create",
    label: "Upload a photo",
    hint: "Add images to your space",
    icon: Icons.Camera,
  },
  {
    href: "/studio",
    label: "Start a practice project",
    hint: "Organize ideas for a dance piece",
    icon: Icons.Choreography,
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[var(--border-gold)] bg-paper/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8 lg:px-12">
          <Link
            href="/discover"
            className="font-inscription text-[0.65rem] text-temple"
          >
            AADAL ARCHIVE
          </Link>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {desktopNav.map((item) => {
              const active = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-200",
                    active
                      ? "bg-temple/10 text-temple"
                      : "text-ink-soft hover:text-temple",
                  )}
                >
                  <Icon className={cn("h-4 w-4", active && "text-temple")} />
                  <span className="label-ui normal-case tracking-[0.08em] !text-inherit">
                    {item.label}
                  </span>
                  {active ? (
                    <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-gold" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <Link
              href="/explore"
              title="Discover"
              aria-label="Search and discover"
              className="rounded-[var(--radius-sm)] p-2.5 text-bronze transition-colors hover:text-temple"
            >
              <Icons.Search className="h-5 w-5" />
            </Link>
            <div className="relative hidden sm:block">
              <button
                type="button"
                title="Create"
                aria-expanded={createOpen}
                aria-label="Create"
                onClick={() => setCreateOpen((v) => !v)}
                className="btn-doorway !min-h-10 !px-4 !py-2 !text-[0.7rem]"
              >
                Create
              </button>
              {createOpen ? (
                <div className="absolute right-0 top-12 z-50 w-72 border border-[var(--border-gold)] bg-paper p-2 shadow-2xl">
                  <p className="px-3 pb-2 pt-1 text-xs text-bronze">
                    Upload photos, videos, collections, or albums
                  </p>
                  {createOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <Link
                        key={opt.href + opt.label}
                        href={opt.href}
                        onClick={() => setCreateOpen(false)}
                        className="flex items-start gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 transition-colors hover:bg-temple/10"
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-temple" />
                        <span>
                          <span className="block text-sm text-ink">
                            {opt.label}
                          </span>
                          <span className="block text-xs text-bronze">
                            {opt.hint}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <Link
              href="/notifications"
              title="Notifications"
              aria-label="Notifications"
              className="rounded-[var(--radius-sm)] p-2.5 text-bronze transition-colors hover:text-temple"
            >
              <Icons.Notifications className="h-5 w-5" />
            </Link>
            <Link
              href="/settings"
              title="Settings"
              aria-label="Settings"
              className="hidden rounded-[var(--radius-sm)] p-2.5 text-bronze transition-colors hover:text-temple sm:inline-flex"
            >
              <Icons.Settings className="h-5 w-5" />
            </Link>
            <Link
              href="/profile"
              title="Profile"
              aria-label="Profile"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold bg-temple text-xs text-ivory"
            >
              AK
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 py-6 safe-bottom md:px-8 lg:px-6 lg:pb-12">
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-gold)] bg-paper/95 backdrop-blur-md lg:hidden"
        aria-label="Mobile"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="mx-auto flex max-w-lg items-end justify-around px-2 pb-2 pt-2">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            if (item.prominent) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="-mt-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-temple to-maroon text-ivory shadow-[0_8px_28px_rgba(139,35,50,0.4)]"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.label}
                  className={cn(
                    "flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 px-2 py-1 text-[0.62rem]",
                    active ? "text-temple" : "text-bronze",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
