"use client";

import { cn } from "@/lib/utils";

export function SalangaiLoader({
  size = 64,
  className,
  label = "Loading",
}: {
  size?: number;
  className?: string;
  label?: string;
}) {
  const bells = 8;
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="status"
      aria-label={label}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="salangai-loader absolute inset-0 h-full w-full"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(194,148,71,0.28)"
          strokeWidth="1"
        />
        {Array.from({ length: bells }).map((_, i) => {
          const angle = (i / bells) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 38;
          const y = 50 + Math.sin(angle) * 38;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#c29447"
                opacity={0.35 + (i % 3) * 0.2}
                style={{
                  animation: `bell-pulse 1.6s ease-in-out ${i * 0.12}s infinite`,
                }}
              />
              <circle cx={x} cy={y - 3} r="1.2" fill="#e1b861" />
            </g>
          );
        })}
      </svg>
      <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_var(--glow-gold)]" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function LampGlow({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex flex-col items-center", className)} aria-hidden>
      <div className="animate-lamp absolute top-2 h-10 w-10 rounded-full bg-gold/50" />
      <svg width="48" height="64" viewBox="0 0 48 64" fill="none">
        <ellipse cx="24" cy="14" rx="10" ry="6" fill="#c29447" opacity="0.9" />
        <path
          d="M14 16c0 10 4 18 10 28 6-10 10-18 10-28"
          stroke="#e1b861"
          strokeWidth="2"
          fill="none"
        />
        <path d="M18 44h12l2 12H16l2-12z" fill="#80603b" />
        <rect x="20" y="56" width="8" height="4" rx="1" fill="#c29447" />
      </svg>
    </div>
  );
}

export function KolamRing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("text-gold/30", className)}
      aria-hidden
    >
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 20;
        const y1 = 100 + Math.sin(rad) * 20;
        const x2 = 100 + Math.cos(rad) * 70;
        const y2 = 100 + Math.sin(rad) * 70;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.7"
          />
        );
      })}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 70;
        const y = 100 + Math.sin(rad) * 70;
        return <circle key={`d-${deg}`} cx={x} cy={y} r="3" fill="#c29447" opacity="0.5" />;
      })}
    </svg>
  );
}

export function TempleArch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={cn("text-gold/40", className)} aria-hidden>
      <path
        d="M30 190 V90 Q30 30 150 20 Q270 30 270 90 V190"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M50 190 V95 Q50 45 150 36 Q250 45 250 95 V190"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
      <path d="M140 20 L150 4 L160 20" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function CurtainTransition({
  show,
}: {
  show: boolean;
}) {
  if (!show) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex"
      aria-hidden
    >
      <div
        className="h-full w-1/2 origin-top bg-curtain"
        style={{ animation: "curtain-wipe 0.9s var(--ease-silk) forwards" }}
      />
      <div
        className="h-full w-1/2 origin-top bg-curtain"
        style={{ animation: "curtain-wipe 0.9s var(--ease-silk) 0.05s forwards" }}
      />
    </div>
  );
}

export function UploadProgress({ progress }: { progress: number }) {
  const bells = 12;
  const lit = Math.round((progress / 100) * bells);
  return (
    <div className="flex flex-col items-center gap-3" role="progressbar" aria-valuenow={progress}>
      <svg viewBox="0 0 120 120" className="h-24 w-24">
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="rgba(201,162,39,0.2)"
          strokeWidth="1"
        />
        {Array.from({ length: bells }).map((_, i) => {
          const angle = (i / bells) * Math.PI * 2 - Math.PI / 2;
          const x = 60 + Math.cos(angle) * 46;
          const y = 60 + Math.sin(angle) * 46;
          const on = i < lit;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={on ? 5 : 3.5}
              fill={on ? "#c29447" : "rgba(194,148,71,0.2)"}
              className={on ? "transition-all duration-300" : ""}
            />
          );
        })}
        <text
          x="60"
          y="64"
          textAnchor="middle"
          fill="#f3ede3"
          fontSize="14"
          fontFamily="var(--font-body)"
        >
          {Math.round(progress)}%
        </text>
      </svg>
      <p className="text-sm text-sandalwood">Your video is being prepared…</p>
    </div>
  );
}
