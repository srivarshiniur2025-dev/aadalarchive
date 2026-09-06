"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CURRENT_USER } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons/Icons";
import { APP_BOTTOM_NAV, APP_NAV, CREATE_ACTIONS, PAGE_META } from "./nav";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-8 w-8", className)} fill="none" aria-hidden>
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

function CreateMenu({
  open,
  onClose,
  anchor = "top",
}: {
  open: boolean;
  onClose: () => void;
  anchor?: "top" | "bottom";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 w-[280px] overflow-hidden rounded-xl border border-gold/25 bg-[#1a1b20] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)]",
        anchor === "top" ? "right-0 top-[calc(100%+0.5rem)]" : "bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2",
      )}
      role="menu"
    >
      <p className="px-3 pb-2 pt-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-gold/70">
        Create
      </p>
      {CREATE_ACTIONS.map((action) => (
        <Link
          key={action.id}
          href={action.href}
          role="menuitem"
          onClick={onClose}
          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-gold/10"
        >
          <span className="font-display text-[0.95rem] text-cream">{action.title}</span>
          <span className="mt-0.5 block text-[0.75rem] leading-snug text-cream/45">
            {action.description}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [mobileCreateOpen, setMobileCreateOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchId = useId();

  const metaKey = Object.keys(PAGE_META).find((k) => pathname === k || pathname.startsWith(`${k}/`));
  const meta = (metaKey && PAGE_META[metaKey]) || { title: "AadalArchive", subtitle: "Your dance space" };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="min-h-screen bg-[#15161A] text-cream">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col border-r border-gold/12 bg-[#12131a] lg:flex">
        <Link href="/home" className="flex items-center gap-3 px-5 py-5">
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.15rem] tracking-[0.02em] text-cream">AadalArchive</span>
            <span className="mt-1.5 text-[0.5rem] font-medium tracking-[0.16em] text-cream/40">
              Create · Practice · Preserve
            </span>
          </span>
        </Link>

        <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3 pb-4" aria-label="App">
          {APP_NAV.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.84rem] transition-colors",
                  active
                    ? "border border-gold/35 bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(229,169,60,0.08)]"
                    : "border border-transparent text-cream/55 hover:bg-cream/[0.04] hover:text-cream",
                )}
              >
                {active ? (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_10px_rgba(229,169,60,0.7)]" />
                ) : null}
                <span
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-md",
                    active && "bg-gold/10",
                  )}
                >
                  <Icon className={cn("h-4 w-4", active ? "text-gold" : "text-cream/50")} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-gold/10 px-3 py-4">
          <Link
            href="/notifications"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[0.82rem] text-cream/50 transition-colors hover:text-gold"
          >
            <Icons.Notifications className="h-4 w-4" />
            Notifications
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[0.82rem] text-cream/50 transition-colors hover:text-gold"
          >
            <Icons.Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/#contact"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[0.82rem] text-cream/50 transition-colors hover:text-gold"
          >
            <Icons.Notes className="h-4 w-4" />
            Help
          </Link>
          <Link href="/profile" className="mt-2 flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-cream/[0.03]">
            <Image
              src={CURRENT_USER.avatar}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-gold/30"
            />
            <span className="min-w-0">
              <span className="block truncate text-[0.82rem] text-cream">{CURRENT_USER.name.split(" ")[0]}</span>
              <span className="block truncate text-[0.68rem] text-cream/40">@{CURRENT_USER.handle}</span>
            </span>
          </Link>
        </div>
      </aside>

      {/* Main column */}
      <div className="lg:pl-[232px]">
        <header className="sticky top-0 z-30 border-b border-gold/10 bg-[#15161A]/85 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <h1 className="truncate font-display text-lg text-cream sm:text-xl">{meta.title}</h1>
              <p className="hidden truncate text-[0.72rem] text-cream/40 sm:block">{meta.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <form
                className="relative hidden md:block"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!query.trim()) return;
                  router.push(`/discover?q=${encodeURIComponent(query.trim())}`);
                }}
              >
                <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cream/35" />
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search poses, costumes, expressions..."
                  className="h-10 w-56 rounded-full border border-gold/15 bg-[#1c1d22] pl-9 pr-4 text-sm text-cream placeholder:text-cream/30 outline-none transition-all focus:w-72 focus:border-gold/35 lg:w-64 lg:focus:w-80"
                />
              </form>

              <Link
                href="/notifications"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-gold/15 text-cream/55 transition-colors hover:text-gold sm:inline-flex"
                aria-label="Notifications"
              >
                <Icons.Notifications className="h-4 w-4" />
              </Link>

              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setCreateOpen((v) => !v)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] px-4 text-sm font-semibold text-[#1a1408] transition-transform hover:scale-[1.02]"
                >
                  Create
                  <Icons.Create className="h-3.5 w-3.5" />
                </button>
                <CreateMenu open={createOpen} onClose={() => setCreateOpen(false)} />
              </div>

              <Link href="/profile" className="inline-flex items-center gap-1.5 rounded-full border border-gold/15 p-0.5 pr-2">
                <Image
                  src={CURRENT_USER.avatar}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden text-cream/40 sm:inline" aria-hidden>
                  ▾
                </span>
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/15 bg-[#12131a]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md lg:hidden"
        aria-label="Mobile"
      >
        <ul className="mx-auto flex max-w-lg items-end justify-between">
          {APP_BOTTOM_NAV.map((item) => {
            if ("isCreate" in item && item.isCreate) {
              return (
                <li key="create" className="relative -mt-5">
                  <button
                    type="button"
                    onClick={() => setMobileCreateOpen((v) => !v)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] text-[#1a1408] shadow-[0_8px_24px_rgba(229,169,60,0.35)]"
                    aria-label="Create"
                  >
                    <Icons.Create className="h-6 w-6" />
                  </button>
                  <CreateMenu
                    open={mobileCreateOpen}
                    onClose={() => setMobileCreateOpen(false)}
                    anchor="bottom"
                  />
                </li>
              );
            }
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-14 flex-col items-center gap-1 py-1 text-[0.58rem]",
                    active ? "text-gold" : "text-cream/45",
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
