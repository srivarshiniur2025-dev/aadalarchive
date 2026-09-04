import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@/components/ui/Primitives";
import { SalangaiLoader } from "@/components/animations/Motifs";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[0.55fr_0.45fr]">
      <aside className="relative hidden min-h-screen lg:block">
        <Image
          src="https://images.unsplash.com/photo-1547153760-18fc86302687?w=1400&q=80"
          alt="Classical dancer silhouette"
          fill
          className="object-cover"
          priority
          sizes="55vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/30 via-maroon/40 to-obsidian/90" />
        <div className="absolute inset-0 kolam-bg opacity-20" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="font-inscription text-[0.7rem] text-gold">AADAL ARCHIVE</p>
          <p className="font-display mt-4 text-4xl font-light text-ivory">
            A digital temple stage for your archive.
          </p>
        </div>
      </aside>

      <div className="relative flex flex-col justify-center bg-charcoal px-6 py-12 md:px-12">
        <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent lg:block" />
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <div className="relative mb-6 h-36 overflow-hidden border border-[var(--border-gold)]">
              <Image
                src="https://images.unsplash.com/photo-1547153760-18fc86302687?w=800&q=80"
                alt=""
                fill
                className="object-cover object-top opacity-70"
                sizes="100vw"
              />
            </div>
          </div>
          <Link href="/" className="font-inscription text-[0.65rem] text-gold">
            AADAL ARCHIVE
          </Link>
          <div className="mt-6 flex justify-center lg:justify-start">
            <SalangaiLoader size={48} label="" />
          </div>
          <h1 className="font-display mt-6 text-4xl font-light text-ivory">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-sandalwood">
            Return to your dance space.
          </p>
          <form className="mt-8 space-y-4" action="/discover">
            <Input label="Email" id="email" type="email" required placeholder="you@email.com" />
            <Input label="Password" id="password" type="password" required placeholder="••••••••" />
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-gold hover:underline">
                Forgot password
              </Link>
            </div>
            <Button type="submit" variant="doorway" className="w-full">
              Continue with email
            </Button>
          </form>
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--border-gold)]" />
            <span className="label-ui text-[0.58rem]">or</span>
            <div className="h-px flex-1 bg-[var(--border-gold)]" />
          </div>
          <div className="grid gap-2">
            <Button variant="secondary" className="w-full" href="/discover">
              Continue with Google
            </Button>
            <Button variant="secondary" className="w-full" href="/discover">
              Continue with Apple
            </Button>
          </div>
          <p className="mt-8 text-center text-sm text-sandalwood">
            New to Aadal Archive?{" "}
            <Link href="/signup" className="text-gold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
