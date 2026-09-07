import { NextResponse } from "next/server";
import {
  listSavedItems,
  saveInspirationAction,
  unsaveInspirationAction,
} from "@/lib/services/boards";

export async function GET() {
  const items = await listSavedItems();
  return NextResponse.json({
    items: items.map((i) => ({
      id: i.id,
      provider: i.provider,
      externalId: i.external_id,
      key: `${i.provider}:${i.external_id}`,
      title: i.title,
      imageUrl: i.image_url,
      sourceUrl: i.source_url,
      creatorName: i.creator_name,
    })),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await saveInspirationAction({
      ...body,
      creatorName: body.creatorName ?? body.creator,
      externalId: body.externalId ?? body.external_id,
      imageUrl: body.imageUrl ?? body.image_url,
      sourceUrl: body.sourceUrl ?? body.source_url,
    });
    if (result.error) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  const externalId = searchParams.get("externalId");
  if (!provider || !externalId) {
    return NextResponse.json({ error: "provider and externalId required" }, { status: 400 });
  }
  const result = await unsaveInspirationAction(provider, externalId);
  if (result.error) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}
