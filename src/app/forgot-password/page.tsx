"use client";

import Link from "next/link";
import { useActionState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button, Input } from "@/components/ui/Primitives";
import { forgotPasswordAction, type AuthActionState } from "@/lib/auth/actions";

const initialState: AuthActionState = {};

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, initialState);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="silk-panel relative w-full max-w-md rounded-2xl p-8">
        <Link href="/login" className="text-xs text-gold hover:underline">
          ← Back to sign in
        </Link>
        <div className="mt-6 flex justify-center">
          <BrandLogo size={52} decorative />
        </div>
        <h1 className="font-display mt-4 text-center text-4xl text-ivory">Reset password</h1>
        <p className="mt-2 text-sm text-muted">
          We will send a graceful recovery link to your email.
        </p>

        {state.error ? (
          <p className="mt-4 text-sm text-[#F38222]" role="alert">
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p className="mt-4 text-sm text-gold" role="status">
            {state.success}
          </p>
        ) : null}

        <form className="mt-8 space-y-4" action={formAction}>
          <Input label="Email" id="email" name="email" type="email" required />
          <Button type="submit" className="w-full py-3" disabled={pending}>
            {pending ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      </div>
    </div>
  );
}
