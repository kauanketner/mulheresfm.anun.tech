import { NextRequest, NextResponse } from "next/server";
import { db, generateId } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { eventId, eventTitle, nome, email, whatsapp, cpf } = body;

  if (!eventId || !nome || !email || !whatsapp || !cpf) {
    return NextResponse.json(
      { error: "Campos obrigatórios faltando" },
      { status: 400 }
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }

  const registrations = db.eventRegistrations.getAll();
  registrations.push({
    id: generateId(),
    eventId,
    eventTitle: eventTitle || "",
    nome,
    email,
    whatsapp,
    cpf,
    createdAt: new Date().toISOString(),
  });
  db.eventRegistrations.save(registrations);

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  let registrations = db.eventRegistrations.getAll();
  if (eventId) {
    registrations = registrations.filter((r) => r.eventId === eventId);
  }

  registrations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json(registrations);
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await request.json();
  const items = db.eventRegistrations.getAll().filter((r) => r.id !== id);
  db.eventRegistrations.save(items);

  return NextResponse.json({ ok: true });
}
