"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./ContactSection.module.css";

/** Reuse existing SiteFooter social destinations — no invented brand handles. */
const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:hello@aadalarchive.com",
    text: "hello@aadalarchive.com",
    icon: EmailIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    text: "Instagram",
    icon: InstagramIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    text: "YouTube",
    icon: YouTubeIcon,
  },
  {
    label: "Community",
    href: "/discover",
    text: "Community",
    icon: CommunityIcon,
  },
] as const;

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3" y="6.5" width="18" height="11" rx="3" />
      <path d="M11 10.2v3.6l3.2-1.8-3.2-1.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CommunityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="9" cy="9" r="2.5" />
      <circle cx="16" cy="10" r="2" />
      <path d="M4.5 18c.6-2.4 2.4-3.8 4.5-3.8s3.9 1.4 4.5 3.8" strokeLinecap="round" />
      <path d="M13.2 18c.4-1.6 1.5-2.6 2.8-2.6 1.4 0 2.5 1 2.9 2.6" strokeLinecap="round" />
    </svg>
  );
}

function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M12 20c0-3 2-5 2-8 0 0-2 1-2 3 0-2-2-3-2-3 0 3 2 5 2 8Z" />
      <path d="M12 15c-2-1-4-1-6 0 2 1 4 2 6 2 2 0 4-1 6-2-2-1-4-1-6 0Z" />
      <path d="M12 13c1.5-2 2-4 1.5-6.5C12 8 11 10 10.5 6.5 10 9 10.5 11 12 13Z" />
    </svg>
  );
}

function validate(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please share your name.";
  if (!values.email.trim()) {
    errors.email = "An email helps us reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Add a short subject.";
  if (!values.message.trim()) errors.message = "Tell us a little more.";
  else if (values.message.trim().length < 12) errors.message = "A few more words, please.";
  return errors;
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate({ name, email, subject, message });
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // UI-only affirmation — no backend contact endpoint in the project.
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 450);
  };

  return (
    <section
      id="contact"
      className={cn(styles.section, "scroll-mt-20")}
      aria-labelledby="contact-heading"
    >
      <div className={styles.bg} aria-hidden>
        <Image
          src="/landing/contact-doorway.jpg"
          alt=""
          fill
          sizes="100vw"
          className={styles.bgImg}
        />
        <div className={styles.bgScrim} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Let&apos;s Connect</p>
          <h2 id="contact-heading" className={styles.title}>
            Let&apos;s Keep
            <br />
            the Story{" "}
            <span className={styles.titleGold}>Dancing.</span>
          </h2>
          <p className={styles.lede}>
            Have an idea, a collaboration, a question,
            <br />
            or a story to share?
            <br />
            We&apos;d love to hear from you.
          </p>
          <div className={styles.divider} aria-hidden>
            <span className={styles.dividerLine} />
            <LotusMark className={styles.dividerMark} />
          </div>
        </div>

        <div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Get in Touch</h3>

            {sent ? (
              <p className={styles.success} role="status">
                Thank you — your message is with us.
                <br />
                <span>The story continues.</span>
              </p>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(styles.input, errors.name && styles.inputError)}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className={styles.error}>
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(styles.input, errors.email && styles.inputError)}
                    placeholder="you@email.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className={styles.error}>
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={cn(styles.input, errors.subject && styles.inputError)}
                    placeholder="Collaboration, question, story…"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  />
                  {errors.subject ? (
                    <p id="contact-subject-error" className={styles.error}>
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(styles.textarea, errors.message && styles.textareaError)}
                    placeholder="Share what you’re thinking…"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className={styles.error}>
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <button type="submit" className={styles.submit} disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                  <span aria-hidden>→</span>
                </button>
              </form>
            )}

            <div className={styles.links}>
              {CONTACT_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.link}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  <item.icon className={styles.linkIcon} />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          <Link href="/discover" className={styles.community}>
            Want to be part of the archive? Join the Community
            <span className={styles.communityArrow} aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
