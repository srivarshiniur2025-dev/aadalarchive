"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";
import type { InspirationResult, InspirationSearchResponse } from "@/lib/search/inspiration";
import type { DanceIdea } from "@/lib/dance/ideas";
import { promptsForImage } from "@/lib/dance/image-prompts";
import { intentLabel, type DanceIntent } from "@/lib/dance/intents";

type BoardOption = { id: string; title: string; privacy?: string; tags?: string[] };

type FilterChip = { id: string; label: string; query: string };

type DiscoverContext = {
  profile: {
    name: string | null;
    danceForm: string;
    interests: string[];
    interestLabels: string[];
    currentProject: string | null;
  };
  filters: FilterChip[];
  suggestions: string[];
  sections: { id: string; title: string; subtitle?: string; query: string }[];
  projectSuggestions: { label: string; query: string }[];
  boards: BoardOption[];
  seedQuery: string;
};

type Props = {
  seedQuery: string;
  initialProfile: {
    name: string | null;
    danceForm: string;
    interests: string[];
    currentProject: string | null;
  };
};

export function DiscoverClient({ seedQuery, initialProfile }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "";
  const urlMode = searchParams.get("mode") || "inspire";

  const [ctx, setCtx] = useState<DiscoverContext | null>(null);
  const danceForm = ctx?.profile.danceForm || initialProfile.danceForm;
  const [input, setInput] = useState(urlQuery || seedQuery);
  const [activeQuery, setActiveQuery] = useState(urlQuery || seedQuery);
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [intent, setIntent] = useState<string | null>(null);
  const [results, setResults] = useState<InspirationResult[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [savingId, setSavingId] = useState<string | null>(null);
  const [detail, setDetail] = useState<InspirationResult | null>(null);
  const [boardModalItem, setBoardModalItem] = useState<InspirationResult | null>(null);
  const [ideaBoardTarget, setIdeaBoardTarget] = useState<DanceIdea | null>(null);
  const [boards, setBoards] = useState<BoardOption[]>([]);
  const [boardsLoading, setBoardsLoading] = useState(false);
  const [boardError, setBoardError] = useState<string | null>(null);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userTyped, setUserTyped] = useState(false);
  const [ideas, setIdeas] = useState<DanceIdea[]>([]);
  const [ideaBatch, setIdeaBatch] = useState(1);
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [savedIdeaIds, setSavedIdeaIds] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState(urlMode);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const seededUrlRef = useRef(false);
  const shownIdeaIds = useRef<string[]>([]);

  const suggestionList = useMemo(() => {
    const base = ctx?.suggestions?.length
      ? ctx.suggestions
      : [
          `${danceForm} photography`,
          `${danceForm} costume`,
          `${danceForm} stage`,
          "temple jewellery",
          "abhinaya inspiration",
          "arangetram stage ideas",
        ];
    const q = input.trim().toLowerCase();
    if (!q) return base.slice(0, 6);
    return base.filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
  }, [ctx?.suggestions, danceForm, input]);

  const syncUrl = useCallback(
    (q: string, category?: string, nextMode?: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (category) params.set("category", category);
      if (nextMode && nextMode !== "inspire") params.set("mode", nextMode);
      router.replace(params.toString() ? `/discover?${params}` : "/discover", { scroll: false });
    },
    [router],
  );

  const fetchPage = useCallback(
    async (q: string, category: string, pageNum: number, append: boolean) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      if (append) setLoadingMore(true);
      else {
        setLoading(true);
        setError(null);
      }

      const params = new URLSearchParams({
        q,
        page: String(pageNum),
        limit: "30",
        danceForm,
      });
      if (category) params.set("category", category);

      try {
        const res = await fetch(`/api/inspiration/search?${params}`, { signal: controller.signal });
        const data = (await res.json()) as InspirationSearchResponse & { error?: string };
        if (!res.ok) {
          if (!append) {
            setResults([]);
            setError(data.error || "Unable to load inspiration right now.");
          }
          setHasMore(false);
          return;
        }
        const incoming = data.results || [];
        setIntent(data.intent || null);
        setResults((prev) => {
          if (!append) return incoming;
          const seen = new Set(prev.map((r) => r.id));
          return [...prev, ...incoming.filter((r) => !seen.has(r.id))];
        });
        setHasMore(Boolean(data.hasMore && incoming.length > 0));
        setPage(pageNum);
        setError(null);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        if (!append) {
          setResults([]);
          setError("Network failure. Check your connection and retry.");
        }
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [danceForm],
  );

  const loadIdeas = useCallback(
    async (batch: number, append: boolean, q?: string) => {
      setIdeasLoading(true);
      try {
        const params = new URLSearchParams({
          batch: String(batch),
          limit: "6",
          danceForm,
        });
        if (q) params.set("q", q);
        if (shownIdeaIds.current.length) {
          params.set("exclude", shownIdeaIds.current.slice(-40).join(","));
        }
        const res = await fetch(`/api/ideas?${params}`);
        const data = await res.json();
        const next: DanceIdea[] = data.ideas || [];
        shownIdeaIds.current = [...shownIdeaIds.current, ...next.map((i) => i.id)];
        setIdeas((prev) => (append ? [...prev, ...next] : next));
        setIdeaBatch(batch);
      } finally {
        setIdeasLoading(false);
      }
    },
    [danceForm],
  );

  useEffect(() => {
    void fetch("/api/discover/context")
      .then((r) => r.json())
      .then((data: DiscoverContext) => {
        setCtx(data);
        if (data.boards?.length) setBoards(data.boards);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (seededUrlRef.current) return;
    seededUrlRef.current = true;
    if (!urlQuery) syncUrl(seedQuery, urlCategory || "", urlMode);
  }, [urlQuery, urlCategory, urlMode, seedQuery, syncUrl]);

  useEffect(() => {
    if (userTyped) return;
    setInput(urlQuery || seedQuery);
  }, [urlQuery, seedQuery, userTyped]);

  useEffect(() => {
    const q = urlQuery || seedQuery;
    const category = urlCategory || "";
    setActiveQuery(q);
    setActiveCategory(category);
    setMode(urlMode || "inspire");
    setResults([]);
    setPage(1);
    setHasMore(true);
    void fetchPage(q, category, 1, false);
    shownIdeaIds.current = [];
    void loadIdeas(1, false, q);
  }, [urlQuery, urlCategory, urlMode, seedQuery, fetchPage, loadIdeas]);

  useEffect(() => {
    if (!userTyped) return;
    const t = window.setTimeout(() => {
      const next = input.trim();
      if (!next || (next === urlQuery && !urlCategory)) return;
      setActiveCategory("");
      syncUrl(next, "", mode);
    }, 500);
    return () => window.clearTimeout(t);
  }, [input, userTyped, urlQuery, urlCategory, mode, syncUrl]);

  useEffect(() => {
    void fetch("/api/inspirations/save")
      .then((r) => r.json())
      .then((data) => {
        setSavedKeys(new Set((data.items || []).map((i: { key: string }) => i.key)));
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!searchBoxRef.current?.contains(e.target as Node)) setShowSuggestions(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || mode === "ideas") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading && !loadingMore && !error) {
          void fetchPage(activeQuery, activeCategory, page + 1, true);
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode, activeQuery, activeCategory, page, hasMore, loading, loadingMore, error, fetchPage]);

  function runSearch(q: string, category = "") {
    const next = (q || seedQuery).trim();
    if (!next) return;
    setShowSuggestions(false);
    setUserTyped(false);
    setInput(next);
    setActiveFilter("custom");
    syncUrl(next, category, mode);
  }

  async function toggleSave(item: InspirationResult) {
    const key = item.id;
    setSavingId(key);
    try {
      if (savedKeys.has(key)) {
        const res = await fetch(
          `/api/inspirations/save?provider=${encodeURIComponent(item.provider)}&externalId=${encodeURIComponent(item.externalId)}`,
          { method: "DELETE" },
        );
        const data = await res.json();
        if (!res.ok) {
          window.alert(data.error || "Could not unsave");
          return;
        }
        setSavedKeys((prev) => {
          const n = new Set(prev);
          n.delete(key);
          return n;
        });
      } else {
        const res = await fetch("/api/inspirations/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: item.provider,
            externalId: item.externalId,
            title: item.title,
            imageUrl: item.imageUrl,
            sourceUrl: item.sourceUrl,
            creatorName: item.creatorName,
            category: item.category,
            tags: item.tags,
            metadata: { creatorUrl: item.creatorUrl, width: item.width, height: item.height },
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          window.alert(data.error || "Sign in required to save inspiration.");
          return;
        }
        setSavedKeys((prev) => new Set(prev).add(key));
      }
    } finally {
      setSavingId(null);
    }
  }

  async function openBoardModal(item: InspirationResult) {
    setBoardModalItem(item);
    setIdeaBoardTarget(null);
    setBoardError(null);
    setBoardsLoading(true);
    try {
      const res = await fetch("/api/boards");
      const data = await res.json();
      setBoards(data.boards || []);
    } catch {
      setBoardError("Could not load boards");
    } finally {
      setBoardsLoading(false);
    }
  }

  async function addInspirationToBoard(boardId: string) {
    if (!boardModalItem) return;
    const res = await fetch("/api/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add-item",
        boardId,
        provider: boardModalItem.provider,
        externalId: boardModalItem.externalId,
        title: boardModalItem.title,
        imageUrl: boardModalItem.imageUrl,
        sourceUrl: boardModalItem.sourceUrl,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setBoardError(data.error || "Sign in required for boards.");
      return;
    }
    setBoardModalItem(null);
  }

  async function saveIdea(idea: DanceIdea, boardId?: string) {
    const res = await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: idea.title,
        description: idea.description,
        category: idea.category,
        danceForm: idea.danceForm,
        sourceContext: activeQuery,
        relatedQueries: idea.relatedQueries,
        boardId,
        aiGenerated: true,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      window.alert(data.error || "Sign in required to save ideas.");
      return;
    }
    setSavedIdeaIds((prev) => new Set(prev).add(idea.id));
    if (boardId) setIdeaBoardTarget(null);
  }

  async function createBoardAndAdd() {
    if (!newBoardTitle.trim()) return;
    const createRes = await fetch("/api/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", title: newBoardTitle.trim() }),
    });
    const created = await createRes.json();
    if (!createRes.ok || !created.id) {
      setBoardError(created.error || "Could not create board");
      return;
    }
    setNewBoardTitle("");
    if (boardModalItem) await addInspirationToBoard(created.id);
    if (ideaBoardTarget) {
      await saveIdea(ideaBoardTarget, created.id);
      setIdeaBoardTarget(null);
    }
  }

  const filters = ctx?.filters || [
    { id: "all", label: "All", query: danceForm },
    { id: "photography", label: "Photography", query: `${danceForm} photography` },
    { id: "costume", label: "Costume", query: `${danceForm} costume` },
    { id: "stage", label: "Stage", query: `${danceForm} stage` },
  ];

  const detailPrompts = detail ? promptsForImage(detail) : [];
  const interestLine = (ctx?.profile.interestLabels || initialProfile.interests || [])
    .slice(0, 4)
    .join(" · ");

  return (
    <div className="mx-auto max-w-[1400px]">
      <header className="max-w-3xl">
        <p className="text-[0.58rem] uppercase tracking-[0.2em] text-gold/70">
          {initialProfile.name ? `Welcome back, ${initialProfile.name.split(" ")[0]}` : "Discover"}
        </p>
        <h2 className="mt-1 font-display text-[clamp(1.6rem,3vw,2.2rem)] text-cream">
          Inspired by your practice
        </h2>
        <p className="mt-2 text-sm text-cream/50">
          <span className="text-gold/85">{danceForm}</span>
          {interestLine ? <span className="text-cream/40"> · {interestLine}</span> : null}
          {initialProfile.currentProject || ctx?.profile.currentProject ? (
            <span className="text-cream/40">
              {" "}
              · Project: {ctx?.profile.currentProject || initialProfile.currentProject}
            </span>
          ) : null}
        </p>
      </header>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          { id: "inspire", label: "Inspiration" },
          { id: "ideas", label: "Ideas for your dance" },
          { id: "costume", label: "Costume" },
          { id: "photo", label: "Photography" },
          { id: "stage", label: "Stage" },
          { id: "practice", label: "Practice" },
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setMode(m.id);
              if (m.id === "costume") runSearch(`${danceForm} costume`);
              else if (m.id === "photo") runSearch(`${danceForm} photography`);
              else if (m.id === "stage") runSearch(`${danceForm} stage design`);
              else if (m.id === "practice") runSearch(`${danceForm} practice rehearsal`);
              else syncUrl(activeQuery || seedQuery, activeCategory, m.id);
            }}
            className={cn(
              "border px-3 py-1.5 text-[0.72rem] transition-colors",
              mode === m.id
                ? "border-gold/55 bg-[#30251A] text-gold"
                : "border-[#A9823D]/25 text-cream/55 hover:border-gold/40 hover:text-gold",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="relative mt-5 max-w-xl" ref={searchBoxRef}>
        <label className="relative block">
          <span className="sr-only">Search dancer inspiration</span>
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
          <input
            value={input}
            onChange={(e) => {
              setUserTyped(true);
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                runSearch(input);
              }
            }}
            placeholder={`Try “${danceForm} costume ideas” or “abhinaya inspiration”…`}
            className="h-11 w-full border border-[#A9823D]/28 bg-[#1B1916] pl-10 pr-3 text-sm text-cream placeholder:text-[#D8C7A3]/35 outline-none focus:border-[#E5A93C]/45"
          />
        </label>
        {showSuggestions && suggestionList.length > 0 ? (
          <ul className="absolute z-20 mt-1 w-full border border-[#A9823D]/25 bg-[#1B1916] py-1 shadow-xl">
            {suggestionList.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm text-cream/75 hover:bg-[#30251A] hover:text-gold"
                  onClick={() => runSearch(s)}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {(ctx?.projectSuggestions?.length || 0) > 0 ? (
        <div className="mt-5 border border-[#A9823D]/18 bg-[#1B1916]/60 p-4">
          <p className="text-[0.58rem] uppercase tracking-[0.16em] text-gold/70">
            Your project · {ctx?.profile.currentProject}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ctx!.projectSuggestions.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => runSearch(s.query)}
                className="border border-[#A9823D]/28 px-2.5 py-1 text-[0.72rem] text-cream/70 hover:border-gold hover:text-gold"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex gap-1 overflow-x-auto border-b border-cream/[0.06] pb-px scrollbar-none">
        {filters.map((f) => {
          const selected = activeFilter === f.id || activeQuery === f.query;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setActiveFilter(f.id);
                runSearch(f.query);
              }}
              className={cn(
                "relative shrink-0 px-3 py-2.5 text-[0.78rem] transition-colors",
                selected ? "text-gold" : "text-cream/45 hover:text-cream/70",
              )}
            >
              {f.label}
              {selected ? <span className="absolute inset-x-2 bottom-0 h-px bg-gold" /> : null}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-cream/45">
        {loading ? <span>Searching dancer-aware archives…</span> : null}
        {!loading && !error && results.length > 0 ? (
          <span>
            Real results for <em className="not-italic text-gold/80">{activeQuery}</em>
            {intent ? (
              <span className="ml-2 text-[0.65rem] uppercase tracking-[0.14em] text-[#0E627A]">
                Intent · {intentLabel(intent as DanceIntent)}
              </span>
            ) : null}
            <span className="ml-2 text-[0.65rem] uppercase tracking-[0.14em] text-gold/55">
              Unsplash · Pexels
            </span>
          </span>
        ) : null}
        {error ? (
          <span className="flex flex-wrap items-center gap-3 text-[#F38222]">
            {error}
            <button
              type="button"
              className="border border-[#F38222]/40 px-2.5 py-1 text-[0.75rem] text-cream"
              onClick={() => void fetchPage(activeQuery, activeCategory, 1, false)}
            >
              Retry
            </button>
          </span>
        ) : null}
      </div>

      {mode === "ideas" ? (
        <section className="mt-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-xl text-cream">Ideas for your dance</h3>
              <p className="mt-1 text-[0.75rem] text-cream/40">
                AI creative suggestions — not traditional authority. Use with your guru’s guidance.
              </p>
            </div>
            <button
              type="button"
              disabled={ideasLoading}
              onClick={() => void loadIdeas(ideaBatch + 1, true, activeQuery)}
              className="border border-gold/40 px-3 py-1.5 text-[0.75rem] text-gold"
            >
              {ideasLoading ? "Loading…" : "More ideas"}
            </button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <article
                key={idea.id}
                className="border border-[#A9823D]/22 bg-[#1B1916]/80 p-4"
              >
                <p className="text-[0.55rem] uppercase tracking-[0.16em] text-gold/65">
                  {idea.label} · {idea.category}
                </p>
                <h4 className="mt-2 font-display text-lg text-cream">{idea.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">{idea.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void saveIdea(idea)}
                    className={cn(
                      "px-2.5 py-1 text-[0.68rem]",
                      savedIdeaIds.has(idea.id)
                        ? "bg-gold text-[#15161A]"
                        : "border border-gold/40 text-gold",
                    )}
                  >
                    {savedIdeaIds.has(idea.id) ? "Saved" : "Save idea"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIdeaBoardTarget(idea);
                      setBoardModalItem(null);
                      setBoardError(null);
                      void fetch("/api/boards")
                        .then((r) => r.json())
                        .then((d) => setBoards(d.boards || []));
                    }}
                    className="border border-cream/20 px-2.5 py-1 text-[0.68rem] text-cream/75"
                  >
                    Add to board
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("inspire");
                      runSearch(idea.relatedQueries[0] || activeQuery);
                    }}
                    className="border border-cream/20 px-2.5 py-1 text-[0.68rem] text-cream/75"
                  >
                    Visual refs
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <>
          {ideas.length > 0 ? (
            <section className="mt-8">
              <div className="flex items-end justify-between gap-3">
                <h3 className="font-display text-xl text-cream">Ideas for your dance</h3>
                <button
                  type="button"
                  className="text-[0.75rem] text-gold/80 hover:text-gold"
                  onClick={() => {
                    setMode("ideas");
                    syncUrl(activeQuery, activeCategory, "ideas");
                  }}
                >
                  View all ideas
                </button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {ideas.slice(0, 3).map((idea) => (
                  <button
                    key={idea.id}
                    type="button"
                    onClick={() => {
                      setMode("ideas");
                      syncUrl(activeQuery, activeCategory, "ideas");
                    }}
                    className="border border-[#A9823D]/20 bg-[#1B1916]/70 p-3 text-left hover:border-gold/40"
                  >
                    <p className="text-[0.55rem] uppercase tracking-[0.14em] text-gold/60">
                      {idea.category}
                    </p>
                    <p className="mt-1 font-display text-base text-cream">{idea.title}</p>
                    <p className="mt-1 line-clamp-2 text-[0.78rem] text-cream/45">{idea.description}</p>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-8">
            <h3 className="font-display text-xl text-cream">Real inspiration</h3>
            <div className="mt-5 columns-2 gap-3 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
              {results.map((item) => {
                const saved = savedKeys.has(item.id);
                const ratio = item.width && item.height ? item.height / item.width : 1.25;
                return (
                  <article
                    key={item.id}
                    className="group relative mb-3 break-inside-avoid overflow-hidden rounded-lg bg-[#1B1916] shadow-[0_10px_28px_rgba(0,0,0,0.28)]"
                  >
                    <button type="button" className="block w-full text-left" onClick={() => setDetail(item)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.thumbnailUrl || item.imageUrl}
                        alt={item.title}
                        width={item.width || 400}
                        height={item.height || Math.round(400 * ratio)}
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.035]"
                      />
                    </button>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#15161A]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button
                        type="button"
                        disabled={savingId === item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          void toggleSave(item);
                        }}
                        className={cn(
                          "pointer-events-auto rounded-md px-2.5 py-1 text-[0.68rem] font-medium",
                          saved ? "bg-gold text-[#15161A]" : "bg-[#15161A]/85 text-gold",
                        )}
                      >
                        {saved ? "Saved" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          void openBoardModal(item);
                        }}
                        className="pointer-events-auto rounded-md bg-[#15161A]/85 px-2.5 py-1 text-[0.68rem] text-cream/85"
                      >
                        Board
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetail(item);
                        }}
                        className="pointer-events-auto rounded-md bg-[#15161A]/85 px-2.5 py-1 text-[0.68rem] text-cream/85"
                      >
                        Create idea
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <div ref={sentinelRef} className="h-10 w-full" />
            {loadingMore ? (
              <p className="py-6 text-center text-sm text-cream/45">Loading more inspiration…</p>
            ) : null}
            {!hasMore && results.length > 0 && !loading ? (
              <p className="py-6 text-center text-sm text-cream/35">End of this search stream.</p>
            ) : null}
          </section>
        </>
      )}

      {detail ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close" onClick={() => setDetail(null)} />
          <div className="relative z-[1] grid max-h-[92vh] w-full max-w-5xl overflow-hidden border border-[#A9823D]/30 bg-[#15161A] md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative max-h-[42vh] bg-black md:max-h-[92vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={detail.imageUrl} alt={detail.title} className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col overflow-y-auto p-5 sm:p-6">
              <button type="button" className="self-end text-cream/45 hover:text-gold" onClick={() => setDetail(null)}>
                <Icons.Close className="h-4 w-4" />
              </button>
              <p className="mt-2 text-[0.58rem] uppercase tracking-[0.18em] text-gold/75">
                External · {detail.provider}
              </p>
              <h3 className="mt-2 font-display text-2xl text-cream">{detail.title}</h3>
              <p className="mt-3 text-sm text-cream/55">
                Photo by{" "}
                {detail.creatorUrl ? (
                  <a href={detail.creatorUrl} target="_blank" rel="noreferrer" className="text-gold/85">
                    {detail.creatorName}
                  </a>
                ) : (
                  detail.creatorName
                )}
              </p>

              <div className="mt-5">
                <p className="text-[0.58rem] uppercase tracking-[0.16em] text-gold/70">
                  How could this inspire your dance?
                </p>
                <ul className="mt-3 space-y-3">
                  {detailPrompts.map((p) => (
                    <li key={p.lens} className="border border-[#A9823D]/18 bg-[#1B1916]/70 p-3">
                      <p className="text-[0.55rem] uppercase tracking-[0.14em] text-[#0E627A]">{p.lens}</p>
                      <p className="mt-1 text-sm text-cream/65">{p.suggestion}</p>
                      <p className="mt-1 text-[0.65rem] text-cream/35">AI creative suggestion</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void toggleSave(detail)}
                  className={cn(
                    "px-4 py-2.5 text-sm",
                    savedKeys.has(detail.id) ? "bg-gold text-[#15161A]" : "border border-gold/45 text-gold",
                  )}
                >
                  {savedKeys.has(detail.id) ? "Saved" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => void openBoardModal(detail)}
                  className="border border-cream/20 px-4 py-2.5 text-sm text-cream/80"
                >
                  Add to Board
                </button>
                <a
                  href={detail.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-cream/20 px-4 py-2.5 text-sm text-cream/80"
                >
                  View Original
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {boardModalItem || ideaBoardTarget ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close"
            onClick={() => {
              setBoardModalItem(null);
              setIdeaBoardTarget(null);
            }}
          />
          <div className="relative z-[1] w-full max-w-md border border-[#A9823D]/30 bg-[#1B1916] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl text-cream">Add to Board</h3>
                <p className="mt-1 line-clamp-2 text-sm text-cream/45">
                  {boardModalItem?.title || ideaBoardTarget?.title}
                </p>
              </div>
              <button
                type="button"
                className="text-cream/45 hover:text-gold"
                onClick={() => {
                  setBoardModalItem(null);
                  setIdeaBoardTarget(null);
                }}
              >
                <Icons.Close className="h-4 w-4" />
              </button>
            </div>
            {boardError ? <p className="mt-3 text-sm text-[#F38222]">{boardError}</p> : null}
            {boardsLoading ? <p className="mt-4 text-sm text-cream/45">Loading boards…</p> : null}
            <ul className="mt-4 max-h-56 space-y-1 overflow-y-auto">
              {boards.map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (boardModalItem) void addInspirationToBoard(b.id);
                      if (ideaBoardTarget) void saveIdea(ideaBoardTarget, b.id);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm text-cream/80 hover:bg-[#30251A]/60"
                  >
                    <span>{b.title}</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.12em] text-cream/35">{b.privacy}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <input
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="New board name"
                className="h-10 flex-1 border border-[#A9823D]/28 bg-[#15161A] px-3 text-sm text-cream outline-none"
              />
              <button type="button" onClick={() => void createBoardAndAdd()} className="border border-gold/45 px-3 text-sm text-gold">
                Create
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
