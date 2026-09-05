"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { FadeRise } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

function Kuthuvilakku({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 90" className={className} fill="none" aria-hidden>
      <ellipse cx="24" cy="84" rx="16" ry="4" fill="#8C5E17" fillOpacity="0.55" />
      <path d="M14 78h20l-2-6H16l-2 6Z" fill="#8C5E17" />
      <rect x="21" y="42" width="6" height="30" rx="1.5" fill="#E5A93C" />
      <ellipse cx="24" cy="40" rx="14" ry="5" fill="#8C5E17" />
      <path d="M10 40c4-2 10-3 14-3s10 1 14 3c-2 3-8 5-14 5s-12-2-14-5Z" fill="#E5A93C" fillOpacity="0.85" />
      <path d="M24 18c4 5 5 9 0 16-5-7-4-11 0-16Z" fill="#F38222" />
      <circle cx="24" cy="20" r="4" fill="#E5A93C" fillOpacity="0.85" />
      <circle cx="24" cy="16" r="8" fill="#F38222" fillOpacity="0.2" />
    </svg>
  );
}

function SalangaiProp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" aria-hidden>
      <ellipse cx="32" cy="20" rx="24" ry="10" stroke="#E5A93C" strokeWidth="2" />
      <ellipse cx="32" cy="20" rx="16" ry="6" stroke="#8C5E17" strokeWidth="1.2" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={32 + Math.cos(a) * 24}
            cy={20 + Math.sin(a) * 10}
            r="2.6"
            fill="#E5A93C"
          />
        );
      })}
    </svg>
  );
}

function NatarajaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" className={className} fill="none" aria-hidden>
      <circle cx="40" cy="48" r="36" stroke="#E5A93C" strokeOpacity="0.35" strokeWidth="1.2" />
      <circle cx="40" cy="48" r="28" stroke="#E5A93C" strokeOpacity="0.18" strokeWidth="1" />
      <path
        d="M40 78c-8-4-12-14-10-24 2-8 6-12 10-22 4 10 8 14 10 22 2 10-2 20-10 24Z"
        fill="#2a2622"
        stroke="#E5A93C"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <circle cx="40" cy="22" r="7" fill="#2a2622" stroke="#E5A93C" strokeOpacity="0.55" />
      <path d="M28 40c-6 2-10 8-8 14M52 40c6 2 10 8 8 14" stroke="#F0C56A" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M40 30v8M34 55h12" stroke="#0E627A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function JasmineBloom({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="12"
          cy="7"
          rx="2.2"
          ry="4.5"
          fill="#F4EBDD"
          fillOpacity="0.85"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="2" fill="#E5A93C" />
    </svg>
  );
}

function SilkRibbon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-28 w-16 rounded-full opacity-70 blur-[0.5px]",
        className,
      )}
      style={{
        background:
          "linear-gradient(160deg, rgba(14,98,122,0.55) 0%, rgba(229,169,60,0.35) 45%, rgba(243,130,34,0.4) 100%)",
        transform: "rotate(28deg) skewY(-8deg)",
      }}
      aria-hidden
    />
  );
}

function GoldOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="#E5A93C" strokeOpacity="0.5" />
      <circle cx="14" cy="14" r="4" fill="#E5A93C" fillOpacity="0.75" />
      <path d="M14 2v4M14 22v4M2 14h4M22 14h4" stroke="#E5A93C" strokeOpacity="0.45" strokeWidth="1" />
    </svg>
  );
}

function FloatingPetals() {
  const petals = [
    { left: "8%", top: "22%", delay: "0s", kind: "jasmine" as const },
    { left: "18%", top: "68%", delay: "1.4s", kind: "lotus" as const },
    { left: "72%", top: "18%", delay: "0.6s", kind: "lotus" as const },
    { left: "84%", top: "55%", delay: "2s", kind: "jasmine" as const },
    { left: "62%", top: "78%", delay: "1.1s", kind: "lotus" as const },
    { left: "40%", top: "12%", delay: "2.4s", kind: "jasmine" as const },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p, i) =>
        p.kind === "jasmine" ? (
          <JasmineBloom
            key={i}
            className="hero-petal absolute h-5 w-5 opacity-60"
            style={
              {
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
              } as CSSProperties
            }
          />
        ) : (
          <span
            key={i}
            className="hero-petal absolute rounded-[45%_55%_50%_50%] bg-gradient-to-br from-orange/70 to-[#7a1c28]/85 opacity-50"
            style={{
              left: p.left,
              top: p.top,
              width: 9,
              height: 12,
              animationDelay: p.delay,
            }}
          />
        ),
      )}
    </div>
  );
}

export function CinematicDetailSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const el = sectionRef.current;
    if (!el) return;

    const layers = [
      { key: "bg", factor: -6 },
      { key: "mid", factor: 4 },
      { key: "fg", factor: 14 },
      { key: "fog", factor: -3 },
    ].map((l) => ({
      ...l,
      node: el.querySelector<HTMLElement>(`[data-depth="${l.key}"]`),
    }));

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    };

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      for (const layer of layers) {
        if (!layer.node) continue;
        layer.node.style.transform = `translate3d(${cx * layer.factor}px, ${cy * layer.factor * 0.6}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    el.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[88svh] overflow-hidden bg-charcoal lg:min-h-[100svh]"
      aria-labelledby="detail-heading"
    >
      {/* BACKGROUND — corridor + dancer light */}
      <div
        data-depth="bg"
        className="absolute inset-[-4%] will-change-transform"
      >
          <Image
            src="/landing/cinematic-temple-corridor.png"
            alt="South Indian temple corridor with warm lamp light"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-[60%_45%] opacity-90"
          />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/55 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(229,169,60,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(14,98,122,0.18),transparent_50%)]" />
      </div>

      {/* Atmospheric fog */}
      <div
        data-depth="fog"
        className="pointer-events-none absolute inset-0 will-change-transform"
        aria-hidden
      >
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent" />
        <div className="absolute left-[-10%] top-[30%] h-[40%] w-[50%] rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute right-[5%] top-[20%] h-[35%] w-[40%] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(ellipse at 55% 60%, rgba(244,235,221,0.08), transparent 50%)",
          }}
        />
      </div>

      {/* MIDGROUND — arch suggestions / Nataraja */}
      <div
        data-depth="mid"
        className="pointer-events-none absolute inset-0 will-change-transform"
        aria-hidden
      >
        <NatarajaMark className="absolute bottom-[16%] right-[10%] hidden h-32 w-24 opacity-28 drop-shadow-[var(--shadow-ground)] lg:block xl:right-[14%] xl:h-40 xl:w-32" />
        <svg
          viewBox="0 0 300 420"
          className="absolute bottom-0 left-[42%] hidden h-[70%] w-auto opacity-[0.18] drop-shadow-[0_24px_40px_rgba(0,0,0,0.5)] lg:block"
        >
          <path
            d="M40 420 V160 C40 70 100 30 150 30 C200 30 260 70 260 160 V420"
            fill="rgba(28,30,36,0.25)"
            stroke="#E5A93C"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <path
            d="M70 420 V170 C70 95 115 55 150 55 C185 55 230 95 230 170 V420"
            fill="none"
            stroke="#E5A93C"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* FOREGROUND — lamps, flowers, jewelry, silk */}
      <div
        data-depth="fg"
        className="pointer-events-none absolute inset-0 will-change-transform"
        aria-hidden
      >
        <div className="animate-soft-float absolute bottom-[10%] left-[6%] drop-shadow-[var(--shadow-ground)] lg:left-[10%]">
          <Kuthuvilakku className="h-28 w-14 opacity-75 sm:h-36 sm:w-16" />
        </div>
        <div className="animate-soft-float-delayed absolute bottom-[8%] right-[8%] hidden drop-shadow-[var(--shadow-ground)] sm:block lg:right-[22%]">
          <Kuthuvilakku className="h-24 w-12 opacity-45" />
        </div>
        <SalangaiProp className="animate-soft-float-x absolute bottom-[20%] left-[20%] h-9 w-14 opacity-32 sm:bottom-[24%] sm:left-[16%]" />
        <SilkRibbon className="absolute -right-2 top-[30%] opacity-32 sm:right-[4%] sm:top-[26%]" />
        <GoldOrnament className="absolute left-[28%] top-[22%] h-6 w-6 opacity-18" />
        <FloatingPetals />
      </div>

      {/* Typography — significant negative space */}
      <div className="relative z-10 flex min-h-[88svh] items-center lg:min-h-[100svh]">
        <div className="ds-container-wide w-full py-28 sm:py-32">
          <FadeRise className="max-w-md lg:max-w-lg">
            <p className="label-ui">
              People · Places · Practice · Performances · Memories
            </p>
            <h2
              id="detail-heading"
            className="mt-10 font-display text-[clamp(2.2rem,4.6vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.02em] text-cream"
            >
              Art Lives
              <br />
              <span className="italic text-gold">in Every Detail.</span>
            </h2>
            <div className="mt-8 ornament-line" aria-hidden />
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-cream/50">
              A quiet corridor of light — where every ornament and step belongs to the dance.
            </p>
          </FadeRise>
        </div>
      </div>

      {/* Soft vignette */}
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(21,22,26,0.85)]"
        aria-hidden
      />
    </section>
  );
}
