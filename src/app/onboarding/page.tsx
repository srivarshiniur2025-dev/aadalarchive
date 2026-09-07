"use client";

import { useActionState, useMemo, useState } from "react";
import { Button, Input } from "@/components/ui/Primitives";
import { KolamRing } from "@/components/animations/Motifs";
import { DANCE_FORMS, INTERESTS, USER_TYPES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { completeOnboardingAction, type AuthActionState } from "@/lib/auth/actions";

const steps = ["Profile", "You", "Interests", "Ready"] as const;
const initialState: AuthActionState = {};

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [userType, setUserType] = useState("dancer");
  const [danceForm, setDanceForm] = useState("Bharatanatyam");
  const [interests, setInterests] = useState<string[]>([
    "poses",
    "abhinaya",
    "choreography",
  ]);
  const [state, formAction, pending] = useActionState(completeOnboardingAction, initialState);

  const selectedLabels = useMemo(
    () => INTERESTS.filter((i) => interests.includes(i.id)).map((i) => i.label),
    [interests],
  );

  function toggleInterest(id: string) {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function next() {
    if (step < steps.length - 1) setStep((s) => s + 1);
  }

  return (
    <div className="relative min-h-screen px-4 py-10">
      <div className="pointer-events-none absolute inset-0 kolam-bg opacity-25" />
      <div className="relative mx-auto max-w-2xl">
        <p className="font-inscription text-[0.65rem] tracking-[0.28em] text-gold">
          AADAL ARCHIVE
        </p>
        <p className="mt-2 text-sm text-sandalwood">Welcome to your dance space.</p>
        <div className="mt-4 flex gap-2">
          {steps.map((label, i) => (
            <div
              key={label}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= step ? "bg-gold" : "bg-gold/20",
              )}
              aria-label={label}
            />
          ))}
        </div>

        <div className="silk-panel mt-8 rounded-2xl p-6 md:p-8">
          {state.error ? (
            <p className="mb-4 text-sm text-[#F38222]" role="alert">
              {state.error}
            </p>
          ) : null}

          {step === 0 ? (
            <div className="space-y-5">
              <h1 className="font-display text-4xl text-ivory">Show your dance journey</h1>
              <p className="text-sm text-sandalwood">Add a short note about you.</p>
              <Input
                label="Your name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Where you dance"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Chennai, India"
              />
              <Input
                label="About you"
                id="bio"
                as="textarea"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="I love classical dance and saving ideas for my next show."
              />
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-5">
              <h1 className="font-display text-4xl text-ivory">Who are you here?</h1>
              <p className="text-sm text-sandalwood">Pick the role that fits you best.</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {USER_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    className={cn(
                      "rounded-[var(--radius-sm)] border px-3 py-3 text-left text-sm transition-colors",
                      userType === type.id
                        ? "border-gold bg-temple/30 text-ivory"
                        : "border-[var(--border-gold)] text-sandalwood hover:border-gold/60",
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              <label className="block space-y-1.5">
                <span className="label-ui">Dance style</span>
                <select
                  value={danceForm}
                  onChange={(e) => setDanceForm(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--border-bronze)] bg-charcoal/60 px-3 py-2.5 text-sm text-ivory"
                >
                  {DANCE_FORMS.map((form) => (
                    <option key={form} value={form}>
                      {form}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <h1 className="font-display text-4xl text-ivory">What do you want to explore?</h1>
              <p className="text-sm text-sandalwood">Find your next idea — pick a few topics.</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => {
                  const on = interests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-all",
                        on
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-[var(--border-gold)] text-sandalwood hover:border-gold/50",
                      )}
                    >
                      {interest.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="relative overflow-hidden py-6 text-center">
              <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
                <KolamRing className="absolute inset-0 h-full w-full animate-[salangai-orbit_20s_linear_infinite] text-gold/50" />
                {selectedLabels.slice(0, 8).map((label, i) => {
                  const angle =
                    (i / Math.max(selectedLabels.length, 1)) * Math.PI * 2 - Math.PI / 2;
                  const x = 50 + Math.cos(angle) * 38;
                  const y = 50 + Math.sin(angle) * 38;
                  return (
                    <span
                      key={label}
                      className="absolute animate-fade-rise rounded-full border border-gold/40 bg-charcoal/80 px-2 py-1 text-[0.65rem] text-gold"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                        animationDelay: `${i * 80}ms`,
                      }}
                    >
                      {label}
                    </span>
                  );
                })}
                <span className="font-inscription relative z-10 text-[0.65rem] tracking-[0.2em] text-ivory">
                  {danceForm}
                </span>
              </div>
              <h1 className="font-display mt-4 text-3xl text-ivory">Your dance space is ready</h1>
              <p className="mt-2 text-sm text-sandalwood">Continue to find new dance inspiration.</p>
            </div>
          ) : null}

          <div className="mt-8 flex justify-between">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0 || pending}
            >
              Back
            </Button>

            {step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={next}
                disabled={step === 0 && name.trim().length < 2}
              >
                Continue
              </Button>
            ) : (
              <form action={formAction}>
                <input type="hidden" name="name" value={name} />
                <input type="hidden" name="location" value={location} />
                <input type="hidden" name="bio" value={bio} />
                <input type="hidden" name="userType" value={userType} />
                <input type="hidden" name="danceForm" value={danceForm} />
                {interests.map((id) => (
                  <input key={id} type="hidden" name="interests" value={id} />
                ))}
                <Button type="submit" disabled={pending}>
                  {pending ? "Saving…" : "Enter archive"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
