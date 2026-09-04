import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@/components/ui/Primitives";
import { SalangaiLoader } from "@/components/animations/Motifs";

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[0.55fr_0.45fr]">
      <aside className="relative hidden min-h-screen lg:block">
        <Image
          src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1400&q=80"
          alt="Expressive classical dance portrait"
          fill
          className="object-cover"
          priority
          sizes="55vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/20 via-maroon/45 to-obsidian/90" />
        <div className="absolute inset-0 kolam-bg opacity-20" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="font-inscription text-[0.7rem] text-gold">AADAL ARCHIVE</p>
          <p className="font-display mt-4 text-4xl font-light text-ivory">
            Begin with one movement.
          </p>
        </div>
      </aside>

      <div className="relative flex flex-col justify-center bg-charcoal px-6 py-12 md:px-12">
        <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent lg:block" />
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <div className="relative mb-6 h-32 overflow-hidden border border-[var(--border-gold)]">
              <Image
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80"
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
            Welcome to your dance space
          </h1>
          <p className="mt-2 text-sm text-sandalwood">
            Create an account to save ideas and practice videos.
          </p>
          <form className="mt-8 space-y-4" action="/onboarding">
            <Input label="Full name" id="name" required placeholder="Ananya Krishnan" />
            <Input label="Email" id="email" type="email" required placeholder="you@email.com" />
            <Input
              label="Password"
              id="password"
              type="password"
              required
              placeholder="At least 8 characters"
            />
            <Button type="submit" variant="doorway" className="w-full">
              Continue
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-sandalwood">
            Already have an account?{" "}
            <Link href="/login" className="text-gold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
