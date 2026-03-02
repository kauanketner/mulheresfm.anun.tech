import { NextRequest, NextResponse } from "next/server";
import { db, generateId } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(db.media.getAll());
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const body = await request.json();
  const items = db.media.getAll();
  const newItem = { id: generateId(), ...body };
  items.push(newItem);
  db.media.save(items);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const body = await request.json();
  const items = db.media.getAll();
  const idx = items.findIndex((i) => i.id === body.id);
  if (idx === -1)
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  items[idx] = body;
  db.media.save(items);
  return NextResponse.json(body);
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { id } = await request.json();
  const items = db.media.getAll().filter((i) => i.id !== id);
  db.media.save(items);
  return NextResponse.json({ ok: true });
}
