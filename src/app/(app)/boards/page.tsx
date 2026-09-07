"use client";

import Image from "next/image";
import { Suspense, useEffect, useId, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BOARDS } from "@/lib/data";
import type { Board } from "@/lib/types";
import { Icons } from "@/components/icons/Icons";

function BoardsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleId = useId();
  const [boards, setBoards] = useState<Board[]>(BOARDS);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState<Board["privacy"]>("private");

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
      router.replace("/boards?create=1", { scroll: false });
    }
  }

  function closeCreate() {
    setOpen(false);
    setTitle("");
    setDescription("");
    setPrivacy("private");
    if (searchParams.get("create") === "1") {
      router.replace("/boards", { scroll: false });
    }
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    void (async () => {
      const { createBoardAction } = await import("@/lib/services/boards");
      const fd = new FormData();
      fd.set("title", trimmed);
      fd.set("description", description.trim() || "A new collection for ideas that move you.");
      fd.set("privacy", privacy === "group_only" ? "invite_only" : privacy === "unlisted" ? "private" : privacy);
      const result = await createBoardAction({}, fd);

      if (result.id) {
        setBoards((prev) => [
          {
            id: result.id!,
            title: trimmed,
            description: description.trim() || "A new collection for ideas that move you.",
            cover: "/explore/categories/poses.jpg",
            privacy,
            itemIds: [],
            tags: [],
            collaborative: false,
            notes: {},
          },
          ...prev,
        ]);
        closeCreate();
        return;
      }

      // Fallback local create when Supabase is not configured / unavailable
      if (result.error?.includes("not configured") || result.error?.includes("Sign in")) {
        setBoards((prev) => [
          {
            id: `b-${Date.now()}`,
            title: trimmed,
            description: description.trim() || "A new collection for ideas that move you.",
            cover: BOARDS[0]?.cover ?? "/explore/categories/poses.jpg",
            privacy,
            itemIds: [],
            tags: [],
            collaborative: false,
            notes: {},
          },
          ...prev,
        ]);
        closeCreate();
        return;
      }

      window.alert(result.error ?? "Could not create board");
    })();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-inscription text-[0.55rem] tracking-[0.2em] text-[#A8752B]">Archive drawers</p>
          <h2 className="mt-1 font-display text-[clamp(1.6rem,3vw,2.2rem)] text-[#F4EBDD]">Boards</h2>
          <p className="mt-2 text-sm text-[#D8C6A7]/55">Arrange the ideas that move you.</p>
        </div>
        <button type="button" onClick={openCreate} className="studio-btn px-4 py-2.5">
          Create a board
        </button>
      </header>

      {boards.length === 0 ? (
        <div className="app-panel mt-16 px-6 py-16 text-center">
          <p className="font-display text-2xl text-[#F4EBDD]">Your first board is waiting.</p>
          <p className="mt-2 text-sm text-[#D8C6A7]/55">
            Save a pose, costume, or idea and begin your collection.
          </p>
          <button type="button" onClick={openCreate} className="studio-btn mt-6 px-4 py-2.5">
            Create your first board
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <article key={board.id} className="studio-tile group overflow-hidden">
              <div className="relative aspect-[4/3]">
                <span className="photo-corner photo-corner-tl" aria-hidden />
                <span className="photo-corner photo-corner-tr" aria-hidden />
                <span className="photo-corner photo-corner-bl" aria-hidden />
                <span className="photo-corner photo-corner-br" aria-hidden />
                <Image src={board.cover} alt="" fill className="media-zoom object-cover" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1012]/85 via-transparent to-transparent" />
                <span className="archive-drawer-label absolute left-3 top-3 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.12em] text-[#E5A93C]">
                  {board.privacy}
                </span>
              </div>
              <div className="border-t border-[#A8752B]/25 bg-[#1C1E24] p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg text-[#F4EBDD]">{board.title}</h3>
                  <button type="button" className="text-[#D8C6A7]/35 hover:text-[#E5A93C]" aria-label="Board menu">
                    ···
                  </button>
                </div>
                <p className="mt-1 line-clamp-2 text-[0.8rem] text-[#D8C6A7]/50">{board.description}</p>
                <p className="mt-3 font-inscription text-[0.58rem] tracking-[0.12em] text-[#A8752B]">
                  {board.itemIds.length} saved
                </p>
              </div>
            </article>
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
            className="relative z-[1] w-full max-w-md border border-[#A8752B]/40 bg-[#1C1E24] p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id={titleId} className="font-display text-2xl text-cream">
                  Create a board
                </h2>
                <p className="mt-1 text-sm text-cream/50">
                  Collect poses, costumes, and ideas for a feeling or performance.
                </p>
              </div>
              <button type="button" onClick={closeCreate} className="p-2 text-cream/45 hover:text-gold" aria-label="Close">
                <Icons.Close className="h-4 w-4" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleCreate}>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Board name</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                  placeholder="e.g. Expressions for Padam"
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                />
              </label>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="What will this board hold?"
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                />
              </label>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-gold/75">Privacy</span>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as Board["privacy"])}
                  className="mt-1.5 w-full rounded-lg border border-cream/[0.1] bg-[#15161A] px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/45"
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                  <option value="invite_only">Invite only</option>
                </select>
              </label>
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={closeCreate} className="studio-btn-ghost px-4 py-2.5">
                  Cancel
                </button>
                <button type="submit" className="studio-btn px-4 py-2.5">
                  Create board
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function BoardsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-cream">Boards</h2>
        </div>
      }
    >
      <BoardsPageContent />
    </Suspense>
  );
}
