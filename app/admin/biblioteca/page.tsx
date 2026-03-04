"use client";

import { useState, useEffect, useCallback } from "react";

interface FileItem {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminBibliotecaPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/biblioteca");
      if (!res.ok) throw new Error();
      setFiles(await res.json());
    } catch {
      setError("Erro ao carregar arquivos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  async function handleUpload(fileList: FileList) {
    setUploading(true);
    setError("");
    try {
      await Promise.all(
        Array.from(fileList).map(async (file) => {
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          if (!res.ok) throw new Error("Erro no upload");
        })
      );
      await fetchFiles();
    } catch {
      setError("Erro ao enviar arquivo(s)");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(filename: string) {
    if (!confirm(`Excluir "${filename}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await fetch("/api/biblioteca", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      setFiles((prev) => prev.filter((f) => f.filename !== filename));
    } catch {
      setError("Erro ao excluir arquivo");
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-charcoal-900">Biblioteca de Imagens</h1>
          <p className="font-body text-sm text-muted mt-1">
            {files.length} arquivo(s) enviado(s)
          </p>
        </div>

        <label className={`btn-gold text-xs cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? "Enviando..." : "+ Enviar imagens"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              if (e.target.files?.length) handleUpload(e.target.files);
            }}
          />
        </label>
      </div>

      {error && (
        <p className="font-body text-xs text-red-600 bg-red-50 border border-red-200 px-4 py-3 mb-6">
          {error}
        </p>
      )}

      {loading ? (
        <p className="font-body text-sm text-muted text-center py-16">Carregando...</p>
      ) : files.length === 0 ? (
        <div className="bg-white border border-gray-200 flex flex-col items-center justify-center py-20 text-center">
          <p className="font-body text-sm text-muted mb-2">Nenhuma imagem enviada ainda.</p>
          <p className="font-body text-xs text-muted">
            Use o botão acima para enviar imagens do projeto.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <div
              key={file.filename}
              className="bg-white border border-gray-200 overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="aspect-square overflow-hidden bg-gray-50 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={file.url}
                  alt={file.filename}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info + actions */}
              <div className="p-3">
                <p
                  className="font-body text-xs text-charcoal-700 truncate mb-0.5"
                  title={file.filename}
                >
                  {file.filename}
                </p>
                <p className="font-body text-xs text-muted mb-3">{formatSize(file.size)}</p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyUrl(file.url)}
                    className="flex-1 font-body text-xs text-center py-1.5 border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
                  >
                    {copied === file.url ? "Copiado!" : "Copiar URL"}
                  </button>
                  <button
                    onClick={() => handleDelete(file.filename)}
                    className="font-body text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
