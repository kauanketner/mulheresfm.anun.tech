import { NextRequest, NextResponse } from "next/server";
import { db, generateId } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

// Public: receive form submission
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, company, role, area, city, state, source, message } = body;

  if (!name || !email || !company || !role) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const members = db.members.getAll();
  const newMember = {
    id: generateId(),
    name,
    email,
    company,
    role,
    area: area || "",
    city: city || "",
    state: state || "",
    source: source || "",
    message: message || "",
    createdAt: new Date().toISOString(),
  };
  members.push(newMember);
  db.members.save(members);

  return NextResponse.json({ ok: true }, { status: 201 });
}

// Admin: list all
export async function GET() {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  return NextResponse.json(db.members.getAll());
}

// Admin: delete
export async function DELETE(request: NextRequest) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { id } = await request.json();
  const items = db.members.getAll().filter((i) => i.id !== id);
  db.members.save(items);
  return NextResponse.json({ ok: true });
}
