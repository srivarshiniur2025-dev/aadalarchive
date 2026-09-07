"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useId, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CHOREOGRAPHY, DANCE_FORMS } from "@/lib/data";
import type { ChoreographyVideo, Privacy } from "@/lib/types";
import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

const FILTERS = [
  "All videos",
  "My uploads",
  "Saved videos",
  "Practice studies",
  "Full choreography",
  "Reference videos",
] as const;

const MAX_VIDEO_BYTES = 200 * 1024 * 1024;
const ALLOWED_TYPES = ["video/mp4", "video/quicktime", "video/webm"];

function ChoreographyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleId = useId();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All videos");
  const [videos, setVideos] = useState<ChoreographyVideo[]>(CHOREOGRAPHY);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [danceForm, setDanceForm] = useState<string>(DANCE_FORMS[0] ?? "Bharatanatyam");
  const [composition, setComposition] = useState("");
  const [choreographer, setChoreographer] = useState("");
  const [guru, setGuru] = useState("");
  const [music, setMusic] = useState("");
  const [difficulty, setDifficulty] = useState<ChoreographyVideo["difficulty"]>("intermediate");
  const [privacy, setPrivacy] = useState<Extract<Privacy, "private" | "unlisted" | "public">>("private");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("upload") === "1") setOpen(true);
  }, [searchParams]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeUpload();
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

  function openUpload() {
    setOpen(true);
    if (searchParams.get("upload") !== "1") {
      router.replace("/choreography?upload=1", { scroll: false });
    }
  }

  function closeUpload() {
    setOpen(false);
    setSaving(false);
    setTitle("");
    setDescription("");
    setDanceForm(DANCE_FORMS[0] ?? "Bharatanatyam");
    setComposition("");
    setChoreographer("");
    setGuru("");
    setMusic("");
    setDifficulty("intermediate");
    setPrivacy("private");
    setFile(null);
    setFileError(null);
    if (searchParams.get("upload") === "1") {
      router.replace("/choreography", { scroll: false });
    }
  }

  function onFileChange(selected: File | null) {
    setFileError(null);
    if (!selected) {
      setFile(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFileError("Use MP4, MOV, or WEBM only.");
      setFile(null);
      return;
    }
    if (selected.size > MAX_VIDEO_BYTES) {
      setFileError("Video must be under 200MB.");
      setFile(null);
      return;
    }
    setFile(selected);
  }

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || saving) return;
    if (fileError) return;

    setSaving(true);
    void (async () => {
      const { createChoreographyAction } = await import("@/lib/services/choreography");
      const fd = new FormData();
      fd.set("title", trimmed);
      fd.set("description", description.trim() || "A movement study for practice.");
      fd.set("danceForm", danceForm);
      fd.set("composition", composition.trim());
      fd.set("choreographer", choreographer.trim());
      fd.set("guru", guru.trim());
      fd.set("music", music.trim());
      fd.set("difficulty", difficulty);
      fd.set("privacy", privacy);
      fd.set("allowDownload", "false");
      if (file) fd.set("video", file);

      const result = await createChoreographyAction({}, fd);

      const localVideo = (id: string): ChoreographyVideo => ({
        id,
        title: trimmed,
        description: description.trim() || "A movement study for practice.",
        mediaUrl: file ? URL.createObjectURL(file) : CHOREOGRAPHY[0]?.mediaUrl ?? "/explore/categories/poses.jpg",
        poster: CHOREOGRAPHY[0]?.poster ?? "/explore/categories/poses.jpg",
        danceForm,
        composition: composition.trim() || "Untitled composition",
        choreographer: choreographer.trim() || "You",
        dancers: [],
        guru: guru.trim() || "",
        music: music.trim() || "",
        difficulty,
        duration: file ? "—" : "0:00",
        tags: ["upload"],
        privacy,
        allowDownload: false,
        notes: [],
        relatedBoardIds: [],
        relatedAlbumIds: [],
      });

      if (result.id) {
        setVideos((prev) => [localVideo(result.id!), ...prev]);
        setFilter("My uploads");
        closeUpload();
        return;
      }

      if (result.error?.includes("not configured") || result.error?.includes("Sign in")) {
        setVideos((prev) => [localVideo(`c-${Date.now()}`), ...prev]);
        setFilter("My uploads");
        closeUpload();
        return;
      }

      setSaving(false);
      window.alert(result.error ?? "Could not upload choreography");
    })();
  }

  const visible =
    filter === "My uploads"
      ? videos.filter((v) => v.tags.includes("upload") || v.id.startsWith("c-"))
      : videos;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] text-cream">Choreography</h2>
          <p className="mt-2 text-sm text-cream/50">Store the movement. Return anytime.</p>
        </div>
        <button type="button" onClick={openUpload} className="studio-btn px-4 py-2.5">
          Upload choreography
        </button>
      </header>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-lg border px-3.5 py-1.5 text-[0.78rem] transition-colors",
              filter === f
                ? "border-gold/40 bg-gold/12 text-gold"
                : "border-cream/[0.08] text-cream/45 hover:text-cream/70",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((video) => (
          <article key={video.id} className="studio-tile group overflow-hidden">
            <div className="relative aspect-video">
              <Image src={video.poster} alt="" fill className="media-zoom object-cover" sizes="33vw" />
              <span className="absolute bottom-2 right-2 rounded bg-black/55 px-2 py-0.5 text-[0.68rem] text-cream/85">
                {video.duration}
              </span>
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-gold/20 text-gold">
                <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-gold" />
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg text-cream">{video.title}</h3>
              <p className="mt-1 text-[0.8rem] text-cream/45">
                {video.composition} · {video.difficulty}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.7rem]">
                <Link href="/studio" className="rounded-lg border border-gold/30 px-2.5 py-1 text-gold">
                  Practice
                </Link>
                <span className="rounded-lg border border-cream/[0.08] px-2.5 py-1 text-cream/45">Save</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close" onClick={closeUpload} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-cream/[0.1] bg-[#12131a] p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id={titleId} className="font-display text-2xl text-cream">
                  Upload choreography
                </h2>
                <p className="mt-1 text-sm text-cream/50">
                  Add a movement study for practice and archive.
                </p>
              </div>
              <button type="button" onClick={closeUpload} className="p-2 text-cream/45 hover:text-gold" aria-label="Close">
                <Icons.Close className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleUpload}>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Title</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                  placeholder="e.g. Alarippu — practice take"
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                />
              </label>

              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Video file</span>
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
                  onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                  className="mt-1.5 block w-full text-sm text-cream/70 file:mr-3 file:rounded-lg file:border-0 file:bg-gold/15 file:px-3 file:py-2 file:text-gold"
                />
                <span className="mt-1 block text-[0.7rem] text-cream/35">MP4, MOV, or WEBM · max 200MB</span>
                {file ? <span className="mt-1 block text-[0.75rem] text-gold/80">{file.name}</span> : null}
                {fileError ? (
                  <span className="mt-1 block text-[0.75rem] text-[#F38222]" role="alert">
                    {fileError}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="What should future-you remember about this piece?"
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Dance form</span>
                  <select
                    value={danceForm}
                    onChange={(e) => setDanceForm(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                  >
                    {DANCE_FORMS.map((form) => (
                      <option key={form} value={form}>
                        {form}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Difficulty</span>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as ChoreographyVideo["difficulty"])}
                    className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Composition</span>
                  <input
                    value={composition}
                    onChange={(e) => setComposition(e.target.value)}
                    placeholder="Alarippu"
                    className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                  />
                </label>
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Music</span>
                  <input
                    value={music}
                    onChange={(e) => setMusic(e.target.value)}
                    placeholder="Adi talam"
                    className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Choreographer</span>
                  <input
                    value={choreographer}
                    onChange={(e) => setChoreographer(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                  />
                </label>
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Guru</span>
                  <input
                    value={guru}
                    onChange={(e) => setGuru(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Privacy</span>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as typeof privacy)}
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                >
                  <option value="private">Private</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="public">Public</option>
                </select>
              </label>

              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={closeUpload} className="studio-btn-ghost px-4 py-2.5">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="studio-btn px-4 py-2.5 disabled:opacity-60">
                  {saving ? "Uploading…" : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ChoreographyPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-cream">Choreography</h2>
        </div>
      }
    >
      <ChoreographyPageContent />
    </Suspense>
  );
}
