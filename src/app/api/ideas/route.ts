import { NextResponse } from "next/server";
import { generateDanceIdeas } from "@/lib/dance/ideas";
import { detectIntent } from "@/lib/dance/intents";
import { getCurrentProfile } from "@/lib/services/profiles";
import { listUserBoards } from "@/lib/services/boards";
import { inferProjectHint, normalizeDanceForm } from "@/lib/dance";
import {
  addIdeaToBoardAction,
  listSavedIdeas,
  saveIdeaAction,
} from "@/lib/services/ideas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const batch = Number(searchParams.get("batch") || 1);
  const limit = Number(searchParams.get("limit") || 6);
  const exclude = (searchParams.get("exclude") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const q = searchParams.get("q") || "";
  const danceFormParam = searchParams.get("danceForm") || undefined;

  const profile = await getCurrentProfile();
  const boards = await listUserBoards();
  const danceForm = normalizeDanceForm(
    danceFormParam || profile?.dance_form || "Bharatanatyam",
  );
  const projectHint =
    profile?.current_project || inferProjectHint(boards.map((b) => b.title));

  const ideas = generateDanceIdeas({
    danceForm,
    intent: q ? detectIntent(q) : undefined,
    batch,
    limit,
    excludeIds: exclude,
    projectHint,
  });

  const saved = await listSavedIdeas();

  return NextResponse.json({
    ideas,
    batch,
    hasMore: true,
    saved: saved.map((i) => ({
      id: i.id,
      title: i.title,
      category: i.category,
      boardId: i.board_id,
    })),
    notice:
      "AI CREATIVE SUGGESTION — creative prompts for practice and planning, not historical or traditional authority.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body?.action === "add-to-board") {
      const result = await addIdeaToBoardAction(body.ideaId, body.boardId);
      if (result.error) return NextResponse.json(result, { status: 400 });
      return NextResponse.json(result);
    }

    const result = await saveIdeaAction({
      title: body.title,
      description: body.description,
      category: body.category,
      danceForm: body.danceForm,
      sourceContext: body.sourceContext,
      relatedQueries: body.relatedQueries,
      relatedImageUrl: body.relatedImageUrl,
      boardId: body.boardId,
      aiGenerated: body.aiGenerated ?? true,
      metadata: body.metadata,
    });
    if (result.error) return NextResponse.json(result, { status: 400 });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
