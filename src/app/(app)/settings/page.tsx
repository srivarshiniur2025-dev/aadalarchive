import Link from "next/link";
import { Button, Input, SectionHeading } from "@/components/ui/Primitives";
import { Icons } from "@/components/icons/Icons";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading
        eyebrow="Settings"
        title="Your account"
        subtitle="Manage privacy, safety, and how your dance space works."
      />

      <div className="mt-8 space-y-4">
        <section className="silk-panel rounded-[var(--radius-lg)] p-5">
          <h2 className="font-display text-xl text-ivory">Privacy</h2>
          <p className="mt-1 text-sm text-sandalwood">
            Choose who can see your dance videos and albums. New videos and
            albums start as Private.
          </p>
          <div className="mt-4 space-y-3">
            {[
              ["Default for new albums", "Private"],
              ["Default for dance videos", "Private"],
              ["Allow downloads", "Off"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border border-[var(--border-gold)] px-3 py-3"
              >
                <span className="text-sm text-ivory">{label}</span>
                <span className="text-xs text-gold">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="silk-panel rounded-[var(--radius-lg)] p-5">
          <h2 className="font-display text-xl text-ivory">Sharing</h2>
          <p className="mt-1 text-sm text-sandalwood">
            Simple roles for friends and teachers: View only, Can upload, Can
            edit.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-sandalwood">
            <li>Public — anyone can see</li>
            <li>Private — only you</li>
            <li>Shared — people you invite</li>
          </ul>
        </section>

        <section className="silk-panel rounded-[var(--radius-lg)] p-5">
          <h2 className="font-display text-xl text-ivory">Safety & credits</h2>
          <p className="mt-1 text-sm text-sandalwood">
            Always credit photographers, teachers, and dancers. Report anything
            that should not be here.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary">Report a problem</Button>
            <Button variant="ghost" href="/notifications">
              Notifications
            </Button>
          </div>
        </section>

        <section className="silk-panel rounded-[var(--radius-lg)] p-5">
          <h2 className="font-display text-xl text-ivory">Profile</h2>
          <form className="mt-4 space-y-4">
            <Input label="Display name" id="name" defaultValue="Ananya Krishnan" />
            <Input label="Location" id="location" defaultValue="Chennai, India" />
            <Button type="submit">Save</Button>
          </form>
        </section>

        <div className="flex items-center justify-between pt-2">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
          >
            <Icons.Profile className="h-4 w-4" />
            View your dance journey
          </Link>
          <Button variant="vermilion">Delete account</Button>
        </div>
      </div>
    </div>
  );
}
