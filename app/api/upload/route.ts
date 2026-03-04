import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // In production (Docker), DATA_DIR is /data and the entrypoint creates
    // a symlink /app/public/uploads -> /data/uploads for serving.
    // Writing directly to DATA_DIR/uploads is more reliable.
    const uploadsDir = process.env.DATA_DIR
      ? path.join(process.env.DATA_DIR, "uploads")
      : path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    // Optional ?name=logo param allows saving with a fixed filename (e.g. logo.png)
    const customName = req.nextUrl.searchParams.get("name");
    const filename = customName
      ? `${customName}.${ext}`
      : `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({ url: `/api/uploads/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Erro ao processar upload" }, { status: 500 });
  }
}
