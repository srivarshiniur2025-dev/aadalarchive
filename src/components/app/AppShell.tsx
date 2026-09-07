"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HeritageIcons } from "@/components/heritage/HeritageIcons";
import { PortraitFrame } from "@/components/heritage/HeritageChrome";
import {
  ArchiveSeal,
  ArchivalLabel,
  OrnamentalCorner,
  TempleArch,
  TempleDivider,
  TemplePillar,
} from "@/components/heritage/TempleArchitecture";
import { APP_BOTTOM_NAV, CREATE_ACTIONS, NAV_GROUPS, PAGE_META } from "./nav";
import { ArchiveEntrance } from "./ArchiveEntrance";
import "./app-temple.css";

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
        "app-create-menu absolute z-50 w-[300px] overflow-hidden p-2",
        anchor === "top" ? "left-0 top-[calc(100%+0.5rem)]" : "bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2",
      )}
      role="menu"
    >
      <p className="px-3 pb-2 pt-1 font-inscription text-[0.55rem] tracking-[0.22em] text-[#A8752B]">
        Create
      </p>
      {CREATE_ACTIONS.map((action, i) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.id}
            href={action.href}
            role="menuitem"
            onClick={onClose}
            className={cn(
              "flex items-start gap-2.5 px-3 py-2.5 transition-colors hover:bg-[#24262B]",
              i > 0 && "border-t border-[#A8752B]/20",
            )}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#E5A93C]/90" />
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[0.92rem] text-[#F4EBDD]">{action.title}</span>
              <span className="mt-0.5 block text-[0.72rem] leading-snug text-[#D8C6A7]/55">
                {action.description}
              </span>
            </span>
            <span className="mt-1 text-[0.7rem] text-gold/70" aria-hidden>
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: (p: { className?: string }) => ReactNode;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "app-nav-item relative flex items-center gap-3 px-3 py-2.5 text-[0.84rem]",
        active ? "app-nav-active" : "text-[#D8C6A7]/58",
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", active ? "text-[#E5A93C]" : "text-[#A8752B]/70")} />
      <span className={cn("truncate", active && "text-[#F4EBDD]")}>{label}</span>
    </Link>
  );
}

function SidebarBody({
  user,
  isActive,
  onNavigate,
  createOpen,
  setCreateOpen,
}: {
  user: User;
  isActive: (href: string) => boolean;
  onNavigate?: () => void;
  createOpen: boolean;
  setCreateOpen: (v: boolean | ((p: boolean) => boolean)) => void;
}) {
  return (
    <div className="relative flex h-full flex-col">
      <TemplePillar side="left" />
      <TemplePillar side="right" />

      <div className="relative z-[1] flex h-full flex-col px-3">
        <div className="px-1 pt-3">
          <TempleArch />
        </div>

        {/* Institutional seal + wordmark */}
        <Link
          href="/home"
          onClick={onNavigate}
          className="relative mx-1 mt-2 mb-1 flex items-center gap-3 border border-[#A8752B]/32 bg-[#0D1012]/45 px-3 py-3"
        >
          <OrnamentalCorner position="tl" />
          <OrnamentalCorner position="tr" />
          <OrnamentalCorner position="bl" />
          <OrnamentalCorner position="br" />
          <ArchiveSeal className="h-10 w-auto shrink-0" />
          <span className="min-w-0 leading-none">
            <span className="block font-display text-[1.08rem] tracking-[0.02em] text-[#F4EBDD]">
              AadalArchive
            </span>
            <span className="mt-1.5 block font-inscription text-[0.5rem] tracking-[0.2em] text-[#A8752B]">
              Classical Dance Archive
            </span>
          </span>
        </Link>

        <div className="relative mx-1 mt-4">
          <button
            type="button"
            className="app-create-btn"
            onClick={() => setCreateOpen((v) => !v)}
          >
            <HeritageIcons.Create className="h-4 w-4" />
            Create
          </button>
          <CreateMenu open={createOpen} onClose={() => setCreateOpen(false)} />
        </div>

        <TempleDivider className="mx-1 mt-5" />

        {/* Navigation chambers */}
        <nav className="mt-4 flex-1 space-y-5 overflow-y-auto pb-3" aria-label="App">
          {NAV_GROUPS.map((group) => (
            <div key={group.id} className="space-y-1.5">
              <ArchivalLabel>{group.label}</ArchivalLabel>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    active={isActive(item.href)}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <TempleDivider className="mx-1 mb-3" />

        {/* Utility + archival identity */}
        <div className="space-y-0.5 pb-4">
          <NavLink
            href="/notifications"
            label="Notifications"
            icon={HeritageIcons.Notifications}
            active={isActive("/notifications")}
            onNavigate={onNavigate}
          />
          <NavLink
            href="/settings"
            label="Settings"
            icon={HeritageIcons.Settings}
            active={isActive("/settings")}
            onNavigate={onNavigate}
          />
          <Link
            href="/profile"
            onClick={onNavigate}
            className="app-profile-plaque mt-3 flex items-center gap-3 px-2.5 py-2.5"
          >
            <PortraitFrame src={user.avatar} size={36} />
            <span className="min-w-0">
              <span className="block truncate font-display text-[0.9rem] text-[#F4EBDD]">
                {user.name.split(" ")[0]}
              </span>
              <span className="mt-0.5 block font-inscription text-[0.52rem] tracking-[0.16em] text-[#A8752B]">
                {user.danceForm || "Archive Member"}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children, user }: { children: React.ReactNode; user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [mobileCreateOpen, setMobileCreateOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchId = useId();

  const metaKey = Object.keys(PAGE_META).find((k) => pathname === k || pathname.startsWith(`${k}/`));
  const meta = (metaKey && PAGE_META[metaKey]) || { title: "AadalArchive", subtitle: "Your dance archive" };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const room =
    pathname.startsWith("/explore")
      ? "explore"
      : pathname.startsWith("/discover")
        ? "discover"
        : pathname.startsWith("/boards")
          ? "boards"
          : pathname.startsWith("/albums")
            ? "albums"
            : pathname.startsWith("/choreography")
              ? "choreography"
              : pathname.startsWith("/studio")
                ? "studio"
                : pathname.startsWith("/profile") || pathname.startsWith("/portfolio")
                  ? "profile"
                  : "home";

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="app-shell min-h-screen" data-room={room}>
      <ArchiveEntrance />
      <aside className="app-sidebar fixed inset-y-0 left-0 z-40 hidden flex-col lg:flex">
        <SidebarBody
          user={user}
          isActive={isActive}
          createOpen={createOpen}
          setCreateOpen={setCreateOpen}
        />
      </aside>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="app-sidebar !absolute inset-y-0 left-0 flex !w-[min(100%,300px)] flex-col shadow-2xl">
            <SidebarBody
              user={user}
              isActive={isActive}
              onNavigate={() => setDrawerOpen(false)}
              createOpen={createOpen}
              setCreateOpen={setCreateOpen}
            />
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-[248px]">
        <header className="app-topbar sticky top-0 z-30">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center border border-[#A8752B]/30 text-[#D8C6A7]/70 lg:hidden"
                aria-label="Open menu"
                onClick={() => setDrawerOpen(true)}
              >
                <HeritageIcons.Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <h1 className="truncate font-display text-lg text-[#F4EBDD]">{meta.title}</h1>
                <p className="hidden truncate font-inscription text-[0.55rem] tracking-[0.14em] text-[#D8C6A7]/45 sm:block">
                  {meta.subtitle}
                </p>
              </div>
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
                <HeritageIcons.Search className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#A8752B]" />
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search inspiration, boards, choreography…"
                  className="h-9 w-64 border border-[#A8752B]/35 bg-[#1C1E24] pl-10 pr-3 text-sm text-[#F4EBDD] placeholder:text-[#D8C6A7]/35 outline-none transition-colors focus:border-[#E5A93C]/50 lg:w-72"
                />
              </form>

              <Link
                href="/notifications"
                className="hidden h-9 w-9 items-center justify-center border border-[#A8752B]/28 text-[#D8C6A7]/65 transition-colors hover:text-[#E5A93C] sm:inline-flex"
                aria-label="Notifications"
              >
                <HeritageIcons.Notifications className="h-5 w-5" />
              </Link>

              <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 border border-[#A8752B]/30 bg-[#1C1E24]/60 p-0.5 pr-2"
              >
                <PortraitFrame src={user.avatar} size={28} />
                <span className="hidden text-[#D8C6A7]/40 sm:inline" aria-hidden>
                  ▾
                </span>
              </Link>
            </div>
          </div>
        </header>

        <main className="app-main min-h-[calc(100vh-3.5rem)] px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10">
          <div key={pathname} className="app-fade">
            {children}
          </div>
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#A8752B]/28 bg-[#1C1E24]/96 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md lg:hidden"
        aria-label="Mobile"
      >
        <ul className="mx-auto flex max-w-lg items-end justify-between">
          {APP_BOTTOM_NAV.map((item) => {
            if ("isCreate" in item && item.isCreate) {
              return (
                <li key="create" className="relative -mt-4">
                  <button
                    type="button"
                    onClick={() => setMobileCreateOpen((v) => !v)}
                    className="flex h-12 w-12 items-center justify-center border border-[#E5A93C]/55 bg-gradient-to-b from-[#F0C56A] to-[#A8752B] text-[#0D1012] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                    aria-label="Create"
                  >
                    <HeritageIcons.Create className="h-5 w-5" />
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
                    "flex w-14 flex-col items-center gap-0.5 py-1 text-[0.55rem]",
                    active ? "text-[#E5A93C]" : "text-[#D8C6A7]/45",
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
