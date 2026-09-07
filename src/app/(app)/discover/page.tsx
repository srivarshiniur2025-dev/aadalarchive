import { Suspense } from "react";
import { getCurrentProfile } from "@/lib/services/profiles";
import { listUserBoards } from "@/lib/services/boards";
import {
  buildDiscoverSections,
  inferProjectHint,
  normalizeDanceForm,
  INTEREST_QUERY_MAP,
} from "@/lib/dance";
import { DiscoverClient } from "./DiscoverClient";

export default async function DiscoverPage() {
  const profile = await getCurrentProfile();
  const boards = await listUserBoards();
  const danceForm = normalizeDanceForm(profile?.dance_form || "Bharatanatyam");
  const interests = profile?.interests || [];
  const boardTitles = boards.map((b) => b.title);
  const projectHint = profile?.current_project || inferProjectHint(boardTitles);
  const sections = buildDiscoverSections({
    name: profile?.name,
    danceForm,
    interests,
    boardTitles,
  });
  const seedQuery =
    sections[0]?.query ||
    `${danceForm} ${INTEREST_QUERY_MAP[interests[0] || ""] || "dance photography"}`;

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-cream">Discover</h2>
          <p className="mt-2 text-sm text-cream/45">Opening your creative archive…</p>
        </div>
      }
    >
      <DiscoverClient
        seedQuery={seedQuery}
        initialProfile={{
          name: profile?.name || null,
          danceForm,
          interests,
          currentProject: projectHint,
        }}
      />
    </Suspense>
  );
}
