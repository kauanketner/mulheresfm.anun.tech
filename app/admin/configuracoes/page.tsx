"use client";

import { useState } from "react";

type UploadState = { url: string | null; success: boolean; error: string; uploading: boolean };

function useUpload(paramName: string) {
  const [state, setState] = useState<UploadState>({ url: null, success: false, error: "", uploading: false });

  async function upload(file: File) {
    setState((s) => ({ ...s, uploading: true, success: false, error: "" }));
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/upload?name=${paramName}`, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Erro ao enviar arquivo");
      const data = await res.json();
      setState({ url: data.url + "?t=" + Date.now(), success: true, error: "", uploading: false });
    } catch (e) {
      setState((s) => ({ ...s, error: e instanceof Error ? e.message : "Erro ao enviar", uploading: false }));
    }
  }

  return { ...state, upload };
}

function UploadCard({
  title,
  description,
  previewSrc,
  previewAlt,
  previewClass,
  tip,
  state,
}: {
  title: string;
  description: React.ReactNode;
  previewSrc: string;
  previewAlt: string;
  previewClass?: string;
  tip: string;
  state: ReturnType<typeof useUpload>;
}) {
  return (
    <div className="bg-white border border-gray-200 p-6 max-w-xl">
      <h2 className="font-display text-xl text-charcoal-900 mb-1">{title}</h2>
      <p className="font-body text-xs text-muted mb-6 leading-relaxed">{description}</p>

      <div className="mb-6">
        <p className="admin-label mb-2">Prévia atual</p>
        <div className="border border-gray-200 bg-gray-50 p-4 flex items-center justify-center h-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={state.url ?? previewSrc}
            alt={previewAlt}
            className={`max-h-20 w-auto object-contain ${previewClass ?? ""}`}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="admin-label">Enviar imagem</p>
        <label className={`flex items-center gap-3 cursor-pointer w-fit ${state.uploading ? "opacity-50 pointer-events-none" : ""}`}>
          <span className="btn-outline-gold text-xs py-2 px-4">
            {state.uploading ? "Enviando..." : "Escolher imagem"}
          </span>
          <span className="font-body text-xs text-muted">PNG com fundo transparente recomendado</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={state.uploading}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) state.upload(f); }}
          />
        </label>

        {state.success && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3">
            <span className="text-sm">✓</span>
            <p className="font-body text-xs">Atualizado com sucesso! A imagem já está ativa no site.</p>
          </div>
        )}
        {state.error && (
          <p className="font-body text-xs text-red-600 bg-red-50 border border-red-200 px-4 py-3">
            {state.error}
          </p>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="font-body text-xs text-muted leading-relaxed">
          <strong>Dica:</strong> {tip}
        </p>
      </div>
    </div>
  );
}

export default function AdminConfiguracoesPage() {
  const logo = useUpload("logo");
  const hero = useUpload("hero-women");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-charcoal-900">Configurações</h1>
        <p className="font-body text-sm text-muted mt-1">
          Personalize as configurações gerais do site
        </p>
      </div>

      <div className="space-y-8">
        <UploadCard
          title="Logo do Site"
          description={<>Envie uma imagem PNG ou SVG para o logo do cabeçalho. Salvo em <code className="bg-gray-100 px-1 font-mono">/api/uploads/logo.png</code>.</>}
          previewSrc="/api/uploads/logo.png"
          previewAlt="Logo"
          tip="Use PNG com fundo transparente. O logo é exibido com altura máxima de 40px."
          state={logo}
        />

        <UploadCard
          title="Foto do Hero (Página Inicial)"
          description={<>Foto das 3 mulheres exibida no lado esquerdo do hero. Use PNG com fundo transparente. Salvo em <code className="bg-gray-100 px-1 font-mono">/api/uploads/hero-women.png</code>.</>}
          previewSrc="/api/uploads/hero-women.png"
          previewAlt="Foto hero"
          previewClass="object-bottom"
          tip="Use PNG com fundo transparente para o efeito de recorte. Resolução mínima recomendada: 800x1000px."
          state={hero}
        />
      </div>
    </div>
  );
}
