import { NextResponse } from "next/server";
import {
  addInspirationToBoardAction,
  createBoardAction,
  listUserBoards,
} from "@/lib/services/boards";

export async function GET() {
  const boards = await listUserBoards();
  return NextResponse.json({
    boards: boards.map((b) => ({
      id: b.id,
      title: b.title,
      description: b.description,
      coverUrl: b.cover_url,
      privacy: b.privacy,
    })),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body?.action === "create") {
      const fd = new FormData();
      fd.set("title", body.title || "Untitled board");
      fd.set("description", body.description || "");
      fd.set("privacy", body.privacy || "private");
      const result = await createBoardAction({}, fd);
      if (result.error) return NextResponse.json(result, { status: 400 });
      return NextResponse.json(result);
    }

    if (body?.action === "add-item") {
      const result = await addInspirationToBoardAction({
        boardId: body.boardId,
        provider: body.provider,
        externalId: body.externalId,
        title: body.title,
        imageUrl: body.imageUrl,
        sourceUrl: body.sourceUrl,
        note: body.note,
      });
      if (result.error) return NextResponse.json(result, { status: 400 });
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
