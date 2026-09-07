"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";
import { signInDemoAction, signInWithGoogleAction, signUpAction, type AuthActionState } from "@/lib/auth/actions";

function LotusDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 20c0-3 2-5 2-8 0 0-2 1-2 3 0-2-2-3-2-3 0 3 2 5 2 8Z" />
        <path d="M12 15c-2-1-4-1-6 0 2 1 4 2 6 2 2 0 4-1 6-2-2-1-4-1-6 0Z" />
        <path d="M12 13c1.5-2 2-4 1.5-6.5C12 8 11 10 10.5 6.5 10 9 10.5 11 12 13Z" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}

function VerticalWords({
  words,
  side,
}: {
  words: string[];
  side: "left" | "right";
}) {
  return (
    <p
      className={cn(
        "pointer-events-none absolute z-10 hidden whitespace-nowrap font-display text-[0.58rem] font-medium uppercase tracking-[0.32em] text-gold/55 lg:block",
        side === "left" && "left-5 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 xl:left-7",
        side === "right" && "bottom-16 right-5 origin-center translate-x-1/2 -rotate-90 xl:right-7",
      )}
      aria-hidden
    >
      {words.join("  ")}
    </p>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19.5c1.5-3.5 3.8-5 6.5-5s5 1.5 6.5 5" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ open, className }: { open: boolean; className?: string }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M3 12s3.5-6.5 9-6.5S21 12 21 12s-3.5 6.5-9 6.5S3 12 3 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M3 12s3.5-6.5 9-6.5S21 12 21 12s-3.5 6.5-9 6.5S3 12 3 12Z" />
      <path d="m4 4 16 16" strokeLinecap="round" />
    </svg>
  );
}

const fieldClass =
  "w-full rounded-lg border border-cream/12 bg-[#1c1d22] py-3.5 pl-11 pr-4 font-display text-[0.95rem] text-cream/90 placeholder:text-cream/30 outline-none transition-colors focus:border-gold/45";

const initialState: AuthActionState = {};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <div className="relative grid min-h-screen bg-[#15161A] lg:grid-cols-[0.45fr_0.55fr]">
      <aside className="relative hidden min-h-screen overflow-hidden lg:block">
        <Image
          src="/landing/login-temple-doorway.jpg"
          alt="Bharatanatyam dancer silhouetted in a South Indian temple at golden hour"
          fill
          className="object-cover object-[38%_center]"
          priority
          sizes="45vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#15161A]/25 via-transparent to-[#15161A]/80"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#15161A]/50 to-transparent"
          aria-hidden
        />
        <VerticalWords words={["Art", "Roots", "People", "Forever"]} side="left" />
      </aside>

      <div className="relative flex flex-col items-center justify-center px-6 py-14 sm:px-10 lg:px-14">
        <VerticalWords words={["Dance", "Preserve", "Belong"]} side="right" />

        <div className="w-full max-w-[380px] text-center">
          <div className="mb-8 lg:hidden">
            <div className="relative mb-6 h-40 overflow-hidden rounded-lg">
              <Image
                src="/landing/login-temple-doorway.jpg"
                alt=""
                fill
                className="object-cover object-[38%_35%]"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15161A] via-[#15161A]/25 to-transparent" />
            </div>
          </div>

          <div className="mx-auto mb-3 flex justify-center">
            <BrandLogo size={56} priority decorative />
          </div>

          <Link
            href="/#hero"
            className="font-display text-[1.35rem] tracking-[0.04em] text-gold transition-colors hover:text-gold-soft"
          >
            AadalArchive
          </Link>

          <LotusDivider className="mt-4" />

          <h1 className="mt-8 font-display text-[clamp(2.4rem,4vw,3.15rem)] font-medium leading-[1.05] tracking-[-0.02em] text-cream">
            Begin <em className="italic text-gold">Here</em>
          </h1>

          <p className="mt-4 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-cream/45">
            Create your account
          </p>
          <p className="mx-auto mt-3 max-w-[28ch] font-display text-[0.9rem] leading-relaxed text-cream/42">
            Save ideas, practice videos, and every movement that matters.
          </p>

          {state.error ? (
            <p
              className="mt-4 rounded-lg border border-[#F38222]/35 bg-[#F38222]/10 px-3 py-2 text-left text-sm text-[#F4EBDD]"
              role="alert"
            >
              {state.error}
            </p>
          ) : null}

          <form className="mt-9 space-y-3.5 text-left" action={formAction}>
            <label className="relative block" htmlFor="name">
              <span className="sr-only">Full name</span>
              <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Full name"
                className={fieldClass}
              />
            </label>

            <label className="relative block" htmlFor="email">
              <span className="sr-only">Email address</span>
              <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                className={fieldClass}
              />
            </label>

            <label className="relative block" htmlFor="password">
              <span className="sr-only">Password</span>
              <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                minLength={8}
                placeholder="Password (8+ characters)"
                className={cn(fieldClass, "pr-11")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 transition-colors hover:text-gold"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
              >
                <EyeIcon open={showPassword} className="h-4 w-4" />
              </button>
            </label>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#f0b954] to-[#c99436] px-6 py-3.5 text-[0.92rem] font-semibold tracking-wide text-[#1a1408] transition-transform duration-300 hover:scale-[1.015] hover:brightness-105 disabled:opacity-60"
            >
              {pending ? "Creating…" : "Continue"}
              <span aria-hidden>→</span>
            </button>
          </form>

          <DemoLoginButton />

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gold/20" />
            <span className="text-[0.7rem] text-cream/40">or</span>
            <div className="h-px flex-1 bg-gold/20" />
          </div>

          <GoogleSignInButton />

          <p className="mt-8 font-display text-[0.88rem] text-cream/45">
            Already have an account?{" "}
            <Link href="/login" className="text-gold transition-colors hover:text-gold-soft">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function DemoLoginButton() {
  const [state, formAction, pending] = useActionState(signInDemoAction, initialState);

  return (
    <div className="mt-4 space-y-2">
      {state.error ? (
        <p
          className="rounded-lg border border-[#F38222]/35 bg-[#F38222]/10 px-3 py-2 text-left text-sm text-[#F4EBDD]"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
      <form action={formAction}>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 bg-[#30251A] px-6 py-3 text-[0.88rem] font-medium text-gold transition-colors hover:border-gold/70 hover:bg-[#3a2e22] disabled:opacity-60"
        >
          {pending ? "Entering archive…" : "Continue as demo"}
        </button>
      </form>
      <p className="text-center text-[0.68rem] text-cream/35">
        Preview the archive without Google — uses a local demo session.
      </p>
    </div>
  );
}

function GoogleSignInButton() {
  const [state, formAction, pending] = useActionState(signInWithGoogleAction, initialState);

  return (
    <div className="space-y-3">
      {state.error ? (
        <p
          className="rounded-lg border border-[#F38222]/35 bg-[#F38222]/10 px-3 py-2 text-left text-sm text-[#F4EBDD]"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
      <form action={formAction}>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-cream/18 bg-transparent px-6 py-3 text-[0.88rem] text-cream/75 transition-colors hover:border-gold/35 hover:text-cream disabled:opacity-60"
        >
          <GoogleMark />
          {pending ? "Connecting…" : "Continue with Google"}
        </button>
      </form>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.5-5.6-5.6S8.9 6.1 12 6.1c1.7 0 2.9.7 3.6 1.3l2.4-2.4C16.6 3.7 14.5 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12S6.9 21.3 12 21.3c5.5 0 9.1-3.8 9.1-9.2 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}
