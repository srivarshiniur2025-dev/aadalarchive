import Link from "next/link";
import { Button, Input } from "@/components/ui/Primitives";

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="silk-panel relative w-full max-w-md rounded-2xl p-8">
        <Link href="/login" className="text-xs text-gold hover:underline">
          ← Back to sign in
        </Link>
        <h1 className="font-display mt-4 text-4xl text-ivory">Reset password</h1>
        <p className="mt-2 text-sm text-muted">
          We will send a graceful recovery link to your email.
        </p>
        <form className="mt-8 space-y-4" action="/login">
          <Input label="Email" id="email" type="email" required />
          <Button type="submit" className="w-full py-3">
            Send reset link
          </Button>
        </form>
      </div>
    </div>
  );
}
