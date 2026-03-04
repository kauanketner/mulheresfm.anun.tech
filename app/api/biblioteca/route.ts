import { NextRequest, NextResponse } from "next/server";
import { readdir, unlink, stat } from "fs/promises";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

function getUploadsDir() {
  return process.env.DATA_DIR
    ? path.join(process.env.DATA_DIR, "uploads")
    : path.join(process.cwd(), "public", "uploads");
}

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const uploadsDir = getUploadsDir();
    let files: string[] = [];
    try {
      files = await readdir(uploadsDir);
    } catch {
      // Directory doesn't exist yet
      return NextResponse.json([]);
    }

    const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"];
    const items = await Promise.all(
      files
        .filter((f) => {
          const ext = f.split(".").pop()?.toLowerCase() || "";
          return imageExts.includes(ext);
        })
        .map(async (filename) => {
          const filePath = path.join(uploadsDir, filename);
          const info = await stat(filePath);
          return {
            filename,
            url: `/api/uploads/${filename}`,
            size: info.size,
            createdAt: info.birthtime.toISOString(),
          };
        })
    );

    // Newest first
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(items);
  } catch (error) {
    console.error("Biblioteca GET error:", error);
    return NextResponse.json({ error: "Erro ao listar arquivos" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { filename } = await req.json();
    if (!filename || filename.includes("..") || filename.includes("/")) {
      return NextResponse.json({ error: "Nome de arquivo inválido" }, { status: 400 });
    }

    const uploadsDir = getUploadsDir();
    const filePath = path.join(uploadsDir, filename);
    await unlink(filePath);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Biblioteca DELETE error:", error);
    return NextResponse.json({ error: "Erro ao excluir arquivo" }, { status: 500 });
  }
}
