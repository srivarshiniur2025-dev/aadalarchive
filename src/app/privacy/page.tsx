import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

export const metadata: Metadata = {
  title: "Privacy Policy — AadalArchive",
  description:
    "How AadalArchive handles account information, uploaded content, inspiration search, and third-party image providers.",
};

const SECTIONS = [
  { id: "collect", label: "Information we collect" },
  { id: "account", label: "Account information" },
  { id: "uploads", label: "User-uploaded content" },
  { id: "search", label: "Search and inspiration activity" },
  { id: "boards", label: "Boards, albums, and saved content" },
  { id: "providers", label: "Image and API providers" },
  { id: "cookies", label: "Cookies and local storage" },
  { id: "use", label: "How information is used" },
  { id: "sharing", label: "Data sharing" },
  { id: "retention", label: "Data retention" },
  { id: "security", label: "Security" },
  { id: "rights", label: "User rights" },
  { id: "third-parties", label: "Third-party services" },
  { id: "children", label: "Children’s privacy" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
] as const;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[#A8752B]/20 pt-10">
      <h2 className="font-display text-2xl text-[#F4EBDD] sm:text-[1.65rem]">{title}</h2>
      <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-[#D8C6A7]/75">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const updated = "September 8, 2026";

  return (
    <div className="min-h-screen bg-[#0D1012] text-[#F4EBDD]">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_0%,rgba(229,169,60,0.07),transparent_55%),radial-gradient(ellipse_45%_35%_at_10%_80%,rgba(14,98,122,0.1),transparent_50%)]"
        aria-hidden
      />

      <header className="relative z-[1] border-b border-[#A8752B]/25 bg-[#15161A]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="group inline-flex items-center gap-3 leading-none">
            <BrandLogo size={40} priority decorative />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl tracking-[0.02em] text-[#F4EBDD] transition-colors group-hover:text-[#E5A93C]">
                AadalArchive
              </span>
              <span className="mt-1.5 font-inscription text-[0.5rem] tracking-[0.18em] text-[#A8752B]">
                Classical Dance Archive
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-[#D8C6A7]/60">
            <Link href="/" className="transition-colors hover:text-[#E5A93C]">
              Home
            </Link>
            <Link href="/login" className="transition-colors hover:text-[#E5A93C]">
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-[1] mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="font-inscription text-[0.55rem] tracking-[0.2em] text-[#A8752B]">Legal</p>
        <h1 className="mt-2 font-display text-[clamp(2rem,5vw,2.75rem)] text-[#F4EBDD]">
          Privacy Policy
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#D8C6A7]/65">
          This page explains, in plain language, how AadalArchive handles information when you use
          our website and archive tools. It is informational and may be updated over time. It is
          not legal advice.
        </p>
        <p className="mt-4 text-xs tracking-wide text-[#77736D]">Last updated · {updated}</p>

        <aside className="mt-8 border border-[#A8752B]/30 bg-[#1C1E24] p-5 sm:p-6">
          <p className="font-inscription text-[0.55rem] tracking-[0.16em] text-[#A8752B]">
            Important distinction
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#D8C6A7]/75">
            <strong className="font-medium text-[#F4EBDD]">User-generated content</strong> is
            material you create or upload (for example practice videos, notes, boards, and albums).{" "}
            <strong className="font-medium text-[#F4EBDD]">Third-party inspiration content</strong>{" "}
            is imagery and metadata returned from external providers such as Unsplash, Pexels, and
            Pinterest. Those providers have their own terms and privacy practices. AadalArchive does
            not claim ownership of third-party inspiration media.
          </p>
        </aside>

        <nav aria-label="On this page" className="mt-10">
          <p className="font-inscription text-[0.55rem] tracking-[0.16em] text-[#A8752B]">
            On this page
          </p>
          <ol className="mt-3 columns-1 gap-x-8 sm:columns-2">
            {SECTIONS.map((s, i) => (
              <li key={s.id} className="mb-2 break-inside-avoid">
                <a
                  href={`#${s.id}`}
                  className="text-sm text-[#D8C6A7]/65 transition-colors hover:text-[#E5A93C]"
                >
                  <span className="mr-2 font-inscription text-[0.65rem] text-[#A8752B]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-2">
          <Section id="collect" title="Information we collect">
            <p>
              Depending on how you use AadalArchive, we may process information you provide
              directly, information created by your use of the product, and limited technical data
              needed to operate the service (such as basic device or log information collected by
              our hosting and authentication providers).
            </p>
            <p>
              We aim to collect only what is needed to provide archive features—accounts,
              inspiration search, boards, albums, choreography, and practice tools.
            </p>
          </Section>

          <Section id="account" title="Account information">
            <p>
              If you create an account, we may store details such as your name or display name,
              email address, authentication credentials (handled by our auth provider), profile
              preferences (for example dance form or interests), and similar account settings you
              choose to save.
            </p>
            <p>
              If you use a demo or guest mode where available, less account information may be
              stored, and some features may be limited.
            </p>
          </Section>

          <Section id="uploads" title="User-uploaded content">
            <p>
              Content you upload or create in AadalArchive—such as choreography or practice videos,
              captions, practice notes, portfolio text, and album media—is treated as{" "}
              <em className="not-italic text-[#F4EBDD]/90">user-generated content</em>. You remain
              responsible for having the rights to upload and share that material.
            </p>
            <p>
              We store this content to provide the features you request (playback, organization,
              private archive views, and related tools). Visibility depends on the privacy settings
              you choose where those controls are available.
            </p>
          </Section>

          <Section id="search" title="Search and inspiration activity">
            <p>
              When you search Discover or related inspiration tools, we may process your search
              queries, filters, dance-form context, and interactions such as saving an item or
              adding it to a board. This helps return more relevant results and support your
              archive workflow.
            </p>
            <p>
              Search queries may be sent to third-party image APIs to retrieve results. See{" "}
              <a href="#providers" className="text-[#E5A93C] underline-offset-2 hover:underline">
                Image and API providers
              </a>{" "}
              below.
            </p>
          </Section>

          <Section id="boards" title="Boards, albums, and saved content">
            <p>
              Boards, event albums, saved inspiration references, and related metadata (titles,
              descriptions, privacy settings, notes, and organization) are stored so you can return
              to your creative work later.
            </p>
            <p>
              Saved inspiration items may include links, titles, creator attribution, and provider
              identifiers for third-party images. That does not convert third-party media into
              AadalArchive-owned content.
            </p>
          </Section>

          <Section id="providers" title="Image and API providers">
            <p>
              Inspiration results may come from external services, including Unsplash, Pexels, and
              Pinterest when those integrations are enabled. Those results are{" "}
              <em className="not-italic text-[#F4EBDD]/90">third-party inspiration content</em>.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Provider APIs may receive your search terms and standard technical request data in
                order to return images.
              </li>
              <li>
                Provider content remains subject to each provider’s license, terms, and privacy
                policy.
              </li>
              <li>
                Attribution and source links may be shown where required or helpful.
              </li>
              <li>
                Availability of a provider depends on configuration and that provider’s access
                rules; AadalArchive may fall back to other sources or local archive references.
              </li>
            </ul>
            <p>
              Please review the privacy practices of Unsplash, Pexels, Pinterest, and any other
              provider we surface in the product for details on how they process data.
            </p>
          </Section>

          <Section id="cookies" title="Cookies and local storage">
            <p>
              We use cookies and similar technologies as needed for authentication sessions, basic
              security, and remembering preferences. Local storage on your device may also hold
              limited data for features such as practice session notes or demo-mode state.
            </p>
            <p>
              You can control cookies through your browser settings. Disabling certain cookies may
              prevent sign-in or other core features from working.
            </p>
          </Section>

          <Section id="use" title="How information is used">
            <p>We use information to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide, maintain, and improve AadalArchive features</li>
              <li>Authenticate accounts and protect against abuse</li>
              <li>Personalize inspiration search and archive organization</li>
              <li>Store and display content you choose to save or upload</li>
              <li>Communicate about account or product matters when appropriate</li>
              <li>Comply with applicable legal obligations where required</li>
            </ul>
          </Section>

          <Section id="sharing" title="Data sharing">
            <p>
              We do not sell your personal information. We may share information with service
              providers who help us operate the product (for example hosting, authentication,
              database, storage, and image-search APIs), only as needed to provide those services.
            </p>
            <p>
              We may also disclose information if required by law, to protect the security of the
              service or users, or in connection with a business transfer if AadalArchive’s
              operations change hands—subject to applicable protections.
            </p>
            <p>
              Content you set to public or share with collaborators may be visible to others
              according to those settings.
            </p>
          </Section>

          <Section id="retention" title="Data retention">
            <p>
              We retain account and content data for as long as your account remains active or as
              needed to provide the service. You may delete certain content within the product
              where deletion controls exist. Residual copies may remain in backups for a limited
              period after deletion.
            </p>
            <p>
              Cached inspiration metadata may be stored temporarily to improve performance and is
              not a substitute for the original provider’s hosting of the media.
            </p>
          </Section>

          <Section id="security" title="Security">
            <p>
              We use reasonable administrative and technical measures designed to protect
              information, including encrypted transport (HTTPS) and access controls through our
              infrastructure providers. No method of transmission or storage is completely secure,
              and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section id="rights" title="User rights">
            <p>
              Depending on where you live, you may have rights to access, correct, export, or
              delete certain personal information, or to object to or restrict certain processing.
              Features in your account settings may help you update profile details or remove
              content you control.
            </p>
            <p>
              To make a privacy-related request, contact us using the email below. We may need to
              verify your request before acting on it. Some requests may be limited by law or by
              technical constraints (for example, information held solely by a third-party
              provider).
            </p>
          </Section>

          <Section id="third-parties" title="Third-party services">
            <p>
              AadalArchive relies on third-party infrastructure and APIs, which may include
              authentication and database hosting (such as Supabase), application hosting (such as
              Vercel), and inspiration providers (such as Unsplash, Pexels, and Pinterest). Those
              services process data under their own policies.
            </p>
            <p>
              Links or embeds from third parties are not controlled by AadalArchive. Visiting
              external sites is subject to those sites’ terms and privacy notices.
            </p>
          </Section>

          <Section id="children" title="Children’s privacy">
            <p>
              AadalArchive is not directed to children under 13 (or the minimum age required in
              your jurisdiction). We do not knowingly collect personal information from children
              under that age. If you believe a child has provided personal information, contact us
              and we will take appropriate steps to review and remove it where required.
            </p>
          </Section>

          <Section id="changes" title="Changes to this policy">
            <p>
              We may update this Privacy Policy as the product evolves. When we do, we will revise
              the “Last updated” date on this page. Continued use of AadalArchive after an update
              means you are informed of the revised policy as posted here. For material changes, we
              may provide additional notice in the product when practical.
            </p>
          </Section>

          <Section id="contact" title="Contact">
            <p>
              Privacy questions or requests about AadalArchive can be sent to{" "}
              <a
                href="mailto:hello@aadalarchive.com"
                className="text-[#E5A93C] underline-offset-2 hover:underline"
              >
                hello@aadalarchive.com
              </a>
              .
            </p>
            <p>
              We have not published a physical mailing address or phone number on this page. If
              additional contact channels are added later, they may appear here or on our Contact
              section.
            </p>
          </Section>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#A8752B]/25 pt-8">
          <Link href="/" className="text-sm text-[#D8C6A7]/60 transition-colors hover:text-[#E5A93C]">
            ← Back to AadalArchive
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-[#D8C6A7]/60 transition-colors hover:text-[#E5A93C]"
          >
            Contact
          </Link>
        </div>
      </main>
    </div>
  );
}
