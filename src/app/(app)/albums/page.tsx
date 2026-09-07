"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useId, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ALBUMS } from "@/lib/data";
import type { Album, Privacy } from "@/lib/types";
import { Icons } from "@/components/icons/Icons";

const EVENT_TYPES = [
  "Arangetram",
  "Recital",
  "Competition",
  "Festival",
  "Rehearsal",
  "Performance",
  "Photoshoot",
  "Other",
] as const;

function AlbumsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleId = useId();
  const [albums, setAlbums] = useState<Album[]>(ALBUMS);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState<(typeof EVENT_TYPES)[number]>("Performance");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState<Privacy>("private");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (searchParams.get("create") === "1") setOpen(true);
  }, [searchParams]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCreate();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function openCreate() {
    setOpen(true);
    if (searchParams.get("create") !== "1") {
      router.replace("/albums?create=1", { scroll: false });
    }
  }

  function closeCreate() {
    setOpen(false);
    setName("");
    setEventType("Performance");
    setEventDate("");
    setVenue("");
    setLocation("");
    setDescription("");
    setPrivacy("private");
    setSaving(false);
    if (searchParams.get("create") === "1") {
      router.replace("/albums", { scroll: false });
    }
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || saving) return;

    setSaving(true);
    void (async () => {
      const { createAlbumAction } = await import("@/lib/services/albums");
      const fd = new FormData();
      fd.set("name", trimmed);
      fd.set("eventType", eventType);
      fd.set("eventDate", eventDate);
      fd.set("venue", venue.trim());
      fd.set("location", location.trim());
      fd.set("description", description.trim() || "A performance memory archive.");
      fd.set("privacy", privacy === "group_only" ? "invite_only" : privacy);
      const result = await createAlbumAction({}, fd);

      const localAlbum = (id: string): Album => ({
        id,
        name: trimmed,
        date: eventDate || new Date().toISOString().slice(0, 10),
        venue: venue.trim() || "Venue TBD",
        location: location.trim() || "",
        danceForm: "Bharatanatyam",
        description: description.trim() || "A performance memory archive.",
        cover: ALBUMS[0]?.cover ?? "/explore/categories/photography.jpg",
        privacy,
        category: eventType,
        sections: ["on_stage", "backstage", "audience"],
        itemIds: [],
        contributors: [],
      });

      if (result.id) {
        setAlbums((prev) => [localAlbum(result.id!), ...prev]);
        closeCreate();
        return;
      }

      if (result.error?.includes("not configured") || result.error?.includes("Sign in")) {
        setAlbums((prev) => [localAlbum(`a-${Date.now()}`), ...prev]);
        closeCreate();
        return;
      }

      setSaving(false);
      window.alert(result.error ?? "Could not create album");
    })();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-inscription text-[0.55rem] tracking-[0.2em] text-[#A8752B]">Memory chambers</p>
          <h2 className="mt-1 font-display text-[clamp(1.6rem,3vw,2.2rem)] text-[#F4EBDD]">Events / Albums</h2>
          <p className="mt-2 text-sm text-[#D8C6A7]/55">Keep every stage memory close.</p>
        </div>
        <button type="button" onClick={openCreate} className="studio-btn px-4 py-2.5">
          Create an album
        </button>
      </header>

      {albums.length === 0 ? (
        <div className="app-panel mt-16 px-6 py-16 text-center">
          <p className="font-display text-2xl text-[#F4EBDD]">Your first album is waiting.</p>
          <p className="mt-2 text-sm text-[#D8C6A7]/55">
            Preserve a recital, arangetram, or rehearsal in one place.
          </p>
          <button type="button" onClick={openCreate} className="studio-btn mt-6 px-4 py-2.5">
            Create your first album
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album, index) => (
            <Link key={album.id} href={`/albums/${album.id}`} className="studio-tile group overflow-hidden">
              <div className="relative aspect-[5/4]">
                <span className="photo-corner photo-corner-tl" aria-hidden />
                <span className="photo-corner photo-corner-tr" aria-hidden />
                <span className="photo-corner photo-corner-bl" aria-hidden />
                <span className="photo-corner photo-corner-br" aria-hidden />
                <Image src={album.cover} alt="" fill className="media-zoom object-cover" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1012]/80 via-[#16495A]/15 to-transparent" />
                <span className="absolute right-3 top-3 font-inscription text-[0.65rem] tracking-[0.14em] text-[#E5A93C]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="border-t border-[#A8752B]/25 bg-[#1C1E24] p-4">
                <h3 className="font-display text-lg text-[#F4EBDD]">{album.name}</h3>
                <p className="mt-1 text-[0.8rem] text-[#D8C6A7]/55">
                  {album.date} · {album.venue}
                </p>
                <p className="mt-2 font-inscription text-[0.58rem] tracking-[0.12em] text-[#A8752B]">
                  {album.itemIds.length} memories · {album.privacy}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close" onClick={closeCreate} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] max-h-[90vh] w-full max-w-md overflow-y-auto border border-[#A8752B]/40 bg-[#1C1E24] p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id={titleId} className="font-display text-2xl text-cream">
                  Create an album
                </h2>
                <p className="mt-1 text-sm text-cream/50">
                  Archive a performance, rehearsal, or photoshoot.
                </p>
              </div>
              <button type="button" onClick={closeCreate} className="p-2 text-cream/45 hover:text-gold" aria-label="Close">
                <Icons.Close className="h-4 w-4" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleCreate}>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Album name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                  placeholder="e.g. Arangetram 2026"
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                />
              </label>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Event type</span>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as (typeof EVENT_TYPES)[number])}
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Date</span>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Venue</span>
                  <input
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Temple hall"
                    className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                  />
                </label>
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Location</span>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Chennai"
                    className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="What should this album remember?"
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                />
              </label>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Privacy</span>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as Privacy)}
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                >
                  <option value="private">Private</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="public">Public</option>
                  <option value="invite_only">Invite only</option>
                </select>
              </label>
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={closeCreate} className="studio-btn-ghost px-4 py-2.5">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="studio-btn px-4 py-2.5 disabled:opacity-60">
                  {saving ? "Creating…" : "Create album"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AlbumsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-cream">Events / Albums</h2>
        </div>
      }
    >
      <AlbumsPageContent />
    </Suspense>
  );
}
