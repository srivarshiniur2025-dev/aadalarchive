import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/services/profiles";
import { listUserBoards, listSavedItems } from "@/lib/services/boards";
import {
  buildDiscoverSections,
  filtersForForm,
  inferProjectHint,
  normalizeDanceForm,
  facetsForForm,
  expandDanceQuery,
  INTEREST_QUERY_MAP,
} from "@/lib/dance";

export async function GET() {
  const profile = await getCurrentProfile();
  const boards = await listUserBoards();
  const saved = await listSavedItems();

  const danceForm = normalizeDanceForm(profile?.dance_form || "Bharatanatyam");
  const interests = profile?.interests || [];
  const boardTitles = boards.map((b) => b.title).filter(Boolean);
  const boardTags = boards.flatMap((b) => b.tags || []);
  const projectHint =
    profile?.current_project || inferProjectHint(boardTitles);
  const savedCategories = [
    ...new Set(saved.map((s) => s.category).filter(Boolean) as string[]),
  ];

  const sections = buildDiscoverSections({
    name: profile?.name,
    danceForm,
    interests,
    boardTitles,
    boardTags,
    savedCategories,
  });

  const filters = filtersForForm(danceForm);
  const facets = facetsForForm(danceForm);
  const seedQuery =
    sections[0]?.query ||
    `${danceForm} ${INTEREST_QUERY_MAP[interests[0] || ""] || "dance photography"}`;

  const suggestions = expandDanceQuery("", {
    danceForm,
    interests,
    projectHint,
    boardTitles,
  }).slice(0, 8);

  const interestLabels = interests.map((id) =>
    id
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  );

  return NextResponse.json({
    profile: profile
      ? {
          name: profile.name,
          danceForm,
          secondaryDanceForms: profile.secondary_dance_forms || [],
          interests,
          interestLabels,
          currentProject: projectHint,
          experienceLevel: profile.experience_level,
          guruName: profile.guru_name,
        }
      : {
          name: null,
          danceForm,
          secondaryDanceForms: [],
          interests: [],
          interestLabels: [],
          currentProject: projectHint,
          experienceLevel: null,
          guruName: null,
        },
    boards: boards.map((b) => ({
      id: b.id,
      title: b.title,
      tags: b.tags,
      privacy: b.privacy,
    })),
    sections,
    filters,
    facets,
    suggestions,
    seedQuery,
    projectSuggestions: projectHint
      ? [
          { label: "Stage Design", query: `${danceForm} stage design ${projectHint}` },
          { label: "Costume", query: `${danceForm} costume ${projectHint}` },
          { label: "Jewellery", query: `${danceForm} jewellery` },
          { label: "Photography", query: `${danceForm} photography poses` },
          { label: "Lighting", query: `stage lighting dance performance` },
          { label: "Makeup", query: `classical dance stage makeup` },
        ]
      : [],
  });
}
