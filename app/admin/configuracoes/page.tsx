"use client";

import { useState } from "react";

export default function AdminConfiguracoesPage() {
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleLogoUpload(file: File) {
    setUploading(true);
    setSuccess(false);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      // ?name=logo saves as logo.png in the uploads directory
      const res = await fetch("/api/upload?name=logo", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Erro ao enviar arquivo");
      const data = await res.json();
      setLogoUrl(data.url + "?t=" + Date.now()); // cache-bust
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao enviar logo");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-charcoal-900">Configurações</h1>
        <p className="font-body text-sm text-muted mt-1">
          Personalize as configurações gerais do site
        </p>
      </div>

      {/* Logo section */}
      <div className="bg-white border border-gray-200 p-6 max-w-xl">
        <h2 className="font-display text-xl text-charcoal-900 mb-1">Logo do Site</h2>
        <p className="font-body text-xs text-muted mb-6 leading-relaxed">
          Envie uma imagem PNG ou SVG para substituir o logo exibido no cabeçalho do site.
          O logo será servido em <code className="bg-gray-100 px-1 font-mono">/api/uploads/logo.png</code>.
        </p>

        {/* Current logo preview */}
        <div className="mb-6">
          <p className="admin-label mb-2">Logo atual</p>
          <div className="border border-gray-200 bg-gray-50 p-4 flex items-center justify-center h-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl ?? "/api/uploads/logo.png"}
              alt="Logo atual"
              className="max-h-16 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <p className="font-body text-xs text-muted hidden" id="no-logo-msg">
              Nenhum logo enviado ainda
            </p>
          </div>
        </div>

        {/* Upload */}
        <div className="space-y-3">
          <p className="admin-label">Enviar novo logo</p>
          <label className={`flex items-center gap-3 cursor-pointer w-fit ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
            <span className="btn-outline-gold text-xs py-2 px-4">
              {uploading ? "Enviando..." : "Escolher imagem"}
            </span>
            <span className="font-body text-xs text-muted">PNG, SVG ou JPG recomendado</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleLogoUpload(file);
              }}
            />
          </label>

          {success && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3">
              <span className="text-sm">✓</span>
              <p className="font-body text-xs">
                Logo atualizado com sucesso! O novo logo já está ativo no site.
              </p>
            </div>
          )}

          {error && (
            <p className="font-body text-xs text-red-600 bg-red-50 border border-red-200 px-4 py-3">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="font-body text-xs text-muted leading-relaxed">
            <strong>Dica:</strong> Use uma imagem com fundo transparente (PNG) para melhor resultado.
            O logo é exibido com altura máxima de 40px no cabeçalho.
          </p>
        </div>
      </div>
    </div>
  );
}
