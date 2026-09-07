"use client";

import Image from "next/image";
import { Suspense, useEffect, useId, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CHOREOGRAPHY } from "@/lib/data";
import { SalangaiLoader } from "@/components/animations/Motifs";
import { HeritageIcons } from "@/components/heritage/HeritageIcons";
import { HeritageButton, HeritageCorners, Inscription } from "@/components/heritage/HeritageChrome";
import { cn } from "@/lib/utils";

const MAX_VIDEO_BYTES = 200 * 1024 * 1024;
const ALLOWED_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
const STORAGE_KEY = "aadal-practice-sessions";

type SavedSession = {
  id: string;
  title: string;
  notes: string;
  repetitions: number;
  difficulty: string;
  durationLabel: string;
  savedAt: string;
};

function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function PracticeStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const liveStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const metronomeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [mirror, setMirror] = useState(true);
  const [slow, setSlow] = useState(false);
  const [loop, setLoop] = useState(true);
  const [metronome, setMetronome] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [sourceLabel, setSourceLabel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [title, setTitle] = useState("Varnam — Abhinaya Study");
  const [notes, setNotes] = useState("Hold the gaze one beat longer before the turn. Keep shoulders soft.");
  const [repetitions, setRepetitions] = useState(8);
  const [difficulty, setDifficulty] = useState("Advanced");
  const [savedCount, setSavedCount] = useState(0);

  const poster = CHOREOGRAPHY[0]?.poster;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? (JSON.parse(raw) as SavedSession[]) : [];
      setSavedCount(Array.isArray(list) ? list.length : 0);
    } catch {
      setSavedCount(0);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("record") === "1") {
      void startRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = slow ? 0.5 : 1;
    video.loop = loop;
    video.style.transform = mirror ? "scaleX(-1)" : "none";
  }, [slow, loop, mirror, videoUrl]);

  useEffect(() => {
    if (!metronome) {
      if (metronomeRef.current) clearInterval(metronomeRef.current);
      metronomeRef.current = null;
      return;
    }
    const beep = () => {
      try {
        const ctx = audioCtxRef.current ?? new AudioContext();
        audioCtxRef.current = ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 880;
        gain.gain.value = 0.04;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch {
        /* audio optional */
      }
    };
    beep();
    metronomeRef.current = setInterval(beep, 1000);
    return () => {
      if (metronomeRef.current) clearInterval(metronomeRef.current);
    };
  }, [metronome]);

  useEffect(() => {
    return () => {
      stopTimer();
      stopLiveStream();
      if (videoUrl?.startsWith("blob:")) URL.revokeObjectURL(videoUrl);
      void audioCtxRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopTimer() {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = null;
  }

  function startTimer(reset = true) {
    stopTimer();
    if (reset) setElapsed(0);
    tickRef.current = setInterval(() => setElapsed((v) => v + 1), 1000);
  }

  function stopLiveStream() {
    liveStreamRef.current?.getTracks().forEach((t) => t.stop());
    liveStreamRef.current = null;
  }

  function clearVideoUrl() {
    if (videoUrl?.startsWith("blob:")) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
  }

  function onFileChange(file: File | null) {
    setError(null);
    setStatus(null);
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Use MP4, MOV, or WEBM only.");
      return;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      setError("Video must be under 200MB.");
      return;
    }

    setProcessing(true);
    stopLiveStream();
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    }
    clearVideoUrl();
    const url = URL.createObjectURL(file);
    setTimeout(() => {
      setVideoUrl(url);
      setSourceLabel(file.name);
      setProcessing(false);
      setStatus("Video ready for practice.");
      setPlaying(false);
      setElapsed(0);
    }, 350);
  }

  async function startRecording() {
    setError(null);
    setStatus(null);
    if (recording) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera capture is not available in this browser.");
      return;
    }

    try {
      setProcessing(true);
      stopLiveStream();
      clearVideoUrl();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });
      liveStreamRef.current = stream;

      const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : MediaRecorder.isTypeSupported("video/webm")
          ? "video/webm"
          : "";
      const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stopLiveStream();
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.muted = false;
        }
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setSourceLabel("Captured practice take");
        setRecording(false);
        setProcessing(false);
        setStatus("Recording saved to this rehearsal session.");
        stopTimer();
        if (searchParams.get("record") === "1") {
          router.replace("/studio", { scroll: false });
        }
      };

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        void videoRef.current.play();
      }

      recorder.start(250);
      setRecording(true);
      setProcessing(false);
      setPlaying(true);
      startTimer(true);
      setStatus("Recording… tap Stop when finished.");
    } catch {
      setProcessing(false);
      setRecording(false);
      setError("Could not access camera or microphone. Check browser permissions.");
    }
  }

  function stopRecording() {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") return;
    mediaRecorderRef.current.stop();
    setProcessing(true);
  }

  function togglePlayback() {
    const video = videoRef.current;
    if (!video || !videoUrl || recording) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
      startTimer(false);
    } else {
      video.pause();
      setPlaying(false);
      stopTimer();
    }
  }

  function saveSession() {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Add a movement name before saving.");
      return;
    }
    const entry: SavedSession = {
      id: `ps-${Date.now()}`,
      title: trimmed,
      notes: notes.trim(),
      repetitions,
      difficulty,
      durationLabel: formatTime(elapsed),
      savedAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? (JSON.parse(raw) as SavedSession[]) : [];
      const next = [entry, ...(Array.isArray(list) ? list : [])].slice(0, 40);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSavedCount(next.length);
      setStatus(`Session saved · ${entry.durationLabel} · ${next.length} in archive`);
      setError(null);
    } catch {
      setError("Could not save this session on this device.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-xl">
        <Inscription>Rehearsal hall</Inscription>
        <h2 className="mt-1 font-display text-[clamp(1.6rem,3vw,2.2rem)] text-[#F4EBDD]">Practice Studio</h2>
        <p className="mt-2 text-sm text-[#D8C6A7]/60">A private classical dance rehearsal space.</p>
      </header>

      <input
        id={fileInputId}
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
        className="sr-only"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_0.85fr]">
        <section className="heritage-panel overflow-hidden">
          <HeritageCorners />
          <div className="relative flex aspect-video items-center justify-center bg-[#15161A]">
            {!videoUrl && !recording && poster ? (
              <Image src={poster} alt="" fill className="object-cover opacity-25" sizes="60vw" />
            ) : null}

            <video
              ref={videoRef}
              src={videoUrl ?? undefined}
              playsInline
              className={cn(
                "absolute inset-0 h-full w-full object-contain bg-[#0D1012]",
                !videoUrl && !recording && "hidden",
              )}
              onPlay={() => {
                setPlaying(true);
                if (!recording) startTimer(false);
              }}
              onPause={() => {
                if (!recording) {
                  setPlaying(false);
                  stopTimer();
                }
              }}
              onEnded={() => {
                if (!loop) {
                  setPlaying(false);
                  stopTimer();
                }
              }}
            />

            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-10 opacity-20 sm:w-14"
              style={{
                backgroundImage: "url(/temple/clean/pillar-edge.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-10 opacity-20 sm:w-14"
              style={{
                backgroundImage: "url(/temple/clean/pillar-edge.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scaleX(-1)",
              }}
              aria-hidden
            />

            {processing ? (
              <div className="relative z-[1] flex flex-col items-center gap-3">
                <SalangaiLoader size={64} label="Processing video" />
                <p className="text-sm text-[#D8C6A7]/55">Preparing your practice space...</p>
              </div>
            ) : null}

            {!processing && !videoUrl && !recording ? (
              <div className="relative z-[1] px-4 text-center">
                <p className="font-display text-xl text-[#F4EBDD]/85">Rehearsal stage</p>
                <p className="mt-2 text-sm text-[#D8C6A7]/50">Upload a video or begin recording</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                  <HeritageButton type="button" onClick={() => fileInputRef.current?.click()}>
                    <HeritageIcons.Upload className="h-4 w-4" />
                    Upload video
                  </HeritageButton>
                  <HeritageButton type="button" variant="secondary" onClick={() => void startRecording()}>
                    <HeritageIcons.Record className="h-4 w-4" />
                    Start recording
                  </HeritageButton>
                </div>
              </div>
            ) : null}

            {!processing && (videoUrl || recording) ? (
              <div className="absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between gap-3 bg-gradient-to-t from-[#0D1012]/90 to-transparent px-4 pb-3 pt-10">
                <div className="min-w-0">
                  <p className="truncate text-[0.75rem] text-[#D8C6A7]/70">{sourceLabel || "Live camera"}</p>
                  {recording ? (
                    <p className="mt-0.5 font-inscription text-[0.55rem] tracking-[0.14em] text-[#F38222]">
                      Recording
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 gap-2">
                  {recording ? (
                    <HeritageButton type="button" variant="secondary" onClick={stopRecording}>
                      Stop
                    </HeritageButton>
                  ) : (
                    <>
                      <HeritageButton type="button" variant="secondary" onClick={togglePlayback}>
                        {playing ? "Pause" : "Play"}
                      </HeritageButton>
                      <HeritageButton type="button" variant="ghost" onClick={() => fileInputRef.current?.click()}>
                        Replace
                      </HeritageButton>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-[#A8752B]/22 px-4 py-3">
            {[
              { label: "Mirror", icon: HeritageIcons.Mirror, on: mirror, toggle: () => setMirror((v) => !v) },
              { label: "Slow", icon: HeritageIcons.Practice, on: slow, toggle: () => setSlow((v) => !v) },
              { label: "Loop", icon: HeritageIcons.Archive, on: loop, toggle: () => setLoop((v) => !v) },
              {
                label: "Rhythm",
                icon: HeritageIcons.Bell,
                on: metronome,
                toggle: () => setMetronome((v) => !v),
              },
            ].map((ctrl) => {
              const Icon = ctrl.icon;
              return (
                <button
                  key={ctrl.label}
                  type="button"
                  onClick={ctrl.toggle}
                  className={cn(
                    "inline-flex items-center gap-1.5 border px-3 py-1.5 text-[0.75rem] transition-colors",
                    ctrl.on
                      ? "border-[#E5A93C]/40 bg-[#E5A93C]/12 text-[#E5A93C]"
                      : "border-[#A8752B]/25 text-[#D8C6A7]/55 hover:border-[#E5A93C]/30",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {ctrl.label}
                </button>
              );
            })}
            <span className="ml-auto font-display text-sm tracking-wider text-[#D8C6A7]/55">
              {formatTime(elapsed)}
            </span>
          </div>
        </section>

        <aside className="heritage-panel p-5 sm:p-6">
          <Inscription>Practice notes</Inscription>
          <label className="mt-4 block">
            <span className="text-[0.7rem] text-[#D8C6A7]/50">Movement name</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 w-full border border-[#A8752B]/28 bg-[#15161A] px-3 py-2.5 text-sm text-[#F4EBDD] outline-none focus:border-[#E5A93C]/40"
            />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label>
              <span className="text-[0.7rem] text-[#D8C6A7]/50">Repetitions</span>
              <input
                type="number"
                min={1}
                value={repetitions}
                onChange={(e) => setRepetitions(Number(e.target.value) || 1)}
                className="mt-1.5 w-full border border-[#A8752B]/28 bg-[#15161A] px-3 py-2.5 text-sm text-[#F4EBDD] outline-none focus:border-[#E5A93C]/40"
              />
            </label>
            <label>
              <span className="text-[0.7rem] text-[#D8C6A7]/50">Difficulty</span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-1.5 w-full border border-[#A8752B]/28 bg-[#15161A] px-3 py-2.5 text-sm text-[#F4EBDD] outline-none focus:border-[#E5A93C]/40"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
          </div>
          <label className="mt-4 block">
            <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-[#D8C6A7]/50">
              <HeritageIcons.Notes className="h-3.5 w-3.5" />
              Notes
            </span>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5 w-full border border-[#A8752B]/28 bg-[#15161A] px-3 py-2.5 text-sm leading-relaxed text-[#F4EBDD] outline-none focus:border-[#E5A93C]/40"
            />
          </label>

          {error ? (
            <p className="mt-3 text-[0.78rem] text-[#F38222]" role="alert">
              {error}
            </p>
          ) : null}
          {status ? (
            <p className="mt-3 text-[0.78rem] text-[#D8C6A7]/70" role="status">
              {status}
            </p>
          ) : null}
          {savedCount > 0 ? (
            <p className="mt-2 font-inscription text-[0.55rem] tracking-[0.14em] text-[#A8752B]">
              {savedCount} practice session{savedCount === 1 ? "" : "s"} on this device
            </p>
          ) : null}

          <HeritageButton type="button" className="mt-5 w-full justify-center py-3" onClick={saveSession}>
            <HeritageIcons.Save className="h-4 w-4" />
            Save session
          </HeritageButton>
        </aside>
      </div>
    </div>
  );
}

export default function PracticeStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-[#F4EBDD]">Practice Studio</h2>
        </div>
      }
    >
      <PracticeStudioContent />
    </Suspense>
  );
}
