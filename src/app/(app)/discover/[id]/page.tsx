import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeedItem } from "@/lib/data";
import { Button, PrivacyBadge } from "@/components/ui/Primitives";

export default async function DiscoverItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getFeedItem(id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/discover" className="text-sm text-gold hover:underline">
        ← Back to Discover
      </Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[var(--border-gold)]">
          <Image
            src={item.mediaUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="60vw"
            priority
          />
        </div>
        <div>
          <p className="font-inscription text-[0.65rem] uppercase tracking-[0.2em] text-gold">
            {item.category} · {item.danceForm}
          </p>
          <h1 className="font-display mt-2 text-4xl text-ivory">{item.title}</h1>
          <p className="mt-3 text-muted">{item.description}</p>
          <p className="mt-4 text-sm text-sandalwood">
            By {item.creator.name} · @{item.creator.handle}
          </p>
          <div className="mt-6 space-y-2 rounded-lg border border-[var(--border-gold)] bg-charcoal-elevated/60 p-4">
            <h2 className="font-display text-xl text-ivory">Credits</h2>
            {Object.entries(item.credits)
              .filter(([k, v]) => k !== "labels" && v)
              .map(([key, value]) => (
                <p key={key} className="text-sm text-muted">
                  <span className="capitalize text-sandalwood">{key}: </span>
                  {String(value)}
                </p>
              ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {item.credits.labels.map((label) => (
                <PrivacyBadge key={label} privacy={label} />
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button>Save to board</Button>
            <Button variant="secondary">Share</Button>
            <Button variant="ghost">Report</Button>
          </div>
          <div className="mt-8">
            <h3 className="font-display text-xl text-ivory">Related</h3>
            <p className="mt-1 text-sm text-muted">
              Similar poses · Matching costume ideas · Related choreography
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
