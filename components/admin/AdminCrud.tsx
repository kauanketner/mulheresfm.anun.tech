"use client";

import { useState } from "react";

export interface FieldDef {
  key: string;
  label: string;
  type: "text" | "email" | "url" | "date" | "time" | "textarea" | "select" | "checkbox" | "image" | "images";
  options?: string[];
  required?: boolean;
}

interface AdminCrudProps<T extends { id: string }> {
  title: string;
  items: T[];
  columns: { key: keyof T; label: string }[];
  fields: FieldDef[];
  apiEndpoint: string;
  emptyMessage?: string;
}

export default function AdminCrud<T extends { id: string }>({
  title,
  items: initialItems,
  columns,
  fields,
  apiEndpoint,
  emptyMessage = "Nenhum item cadastrado.",
}: AdminCrudProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    const defaults: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.type === "checkbox") defaults[f.key] = false;
      else if (f.type === "images") defaults[f.key] = [];
      else defaults[f.key] = "";
    });
    setFormData(defaults);
    setEditing(null);
    setShowForm(true);
    setError("");
  }

  function openEdit(item: T) {
    const data = { ...item } as Record<string, unknown>;
    fields.forEach((f) => {
      if (f.type === "images" && !Array.isArray(data[f.key])) {
        data[f.key] = [];
      }
    });
    setFormData(data);
    setEditing(item);
    setShowForm(true);
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
    setFormData({});
    setError("");
  }

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Erro no upload");
    const data = await res.json();
    return data.url as string;
  }

  async function handleImageUpload(fieldKey: string, file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setFormData((p) => ({ ...p, [fieldKey]: url }));
    } catch {
      setError("Erro ao fazer upload da imagem");
    } finally {
      setUploading(false);
    }
  }

  async function handleImagesUpload(fieldKey: string, files: FileList) {
    setUploading(true);
    setError("");
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      setFormData((p) => ({
        ...p,
        [fieldKey]: [...((p[fieldKey] as string[]) || []), ...urls],
      }));
    } catch {
      setError("Erro ao fazer upload das imagens");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(fieldKey: string, index: number) {
    setFormData((p) => ({
      ...p,
      [fieldKey]: ((p[fieldKey] as string[]) || []).filter((_, i) => i !== index),
    }));
  }

  async function handleSave() {
    setLoading(true);
    setError("");
    try {
      const method = editing ? "PUT" : "POST";
      const res = await fetch(apiEndpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(await res.text());
      const saved = await res.json();
      if (editing) {
        setItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
      } else {
        setItems((prev) => [...prev, saved]);
      }
      closeForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Confirmar exclusão?")) return;
    try {
      await fetch(apiEndpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      alert("Erro ao excluir");
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-charcoal-900">{title}</h1>
          <p className="font-body text-sm text-muted mt-1">{items.length} item(ns)</p>
        </div>
        <button onClick={openCreate} className="btn-gold text-xs">
          + Adicionar
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-x-auto">
        {items.length === 0 ? (
          <p className="font-body text-sm text-muted text-center py-16">{emptyMessage}</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {columns.map((col) => (
                  <th key={String(col.key)} className="text-left px-4 py-3 font-body text-xs font-semibold text-muted tracking-wider uppercase">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-body text-xs font-semibold text-muted tracking-wider uppercase text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 font-body text-sm text-charcoal-700 max-w-xs truncate">
                      {Array.isArray(item[col.key])
                        ? `${(item[col.key] as unknown[]).length} foto(s)`
                        : String(item[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-3 justify-end">
                      <button
                        onClick={() => openEdit(item)}
                        className="font-body text-xs text-gold hover:text-gold-dark"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="font-body text-xs text-red-400 hover:text-red-600"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-display text-xl text-charcoal-900">
                {editing ? "Editar" : "Adicionar"} {title}
              </h2>
              <button onClick={closeForm} className="text-muted hover:text-charcoal-900 text-lg">✕</button>
            </div>

            {/* Fields */}
            <div className="px-6 py-6 space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="admin-label">{field.label}</label>

                  {field.type === "textarea" ? (
                    <textarea
                      rows={4}
                      className="admin-input resize-none"
                      value={String(formData[field.key] || "")}
                      onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                    />
                  ) : field.type === "select" ? (
                    <select
                      className="admin-input"
                      value={String(formData[field.key] || "")}
                      onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                    >
                      <option value="">Selecione...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={field.key}
                        checked={Boolean(formData[field.key])}
                        onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.checked }))}
                        className="w-4 h-4 accent-gold"
                      />
                      <label htmlFor={field.key} className="font-body text-sm text-charcoal-700">
                        {field.label}
                      </label>
                    </div>
                  ) : field.type === "image" ? (
                    <div className="space-y-2">
                      {!!formData[field.key] && (
                        <div className="relative inline-block">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={String(formData[field.key])}
                            alt="preview"
                            className="h-24 w-auto object-cover border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, [field.key]: "" }))}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="btn-outline-gold text-xs py-1 px-3 inline-block">
                          {uploading ? "Enviando..." : "Escolher imagem"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(field.key, file);
                          }}
                        />
                      </label>
                    </div>
                  ) : field.type === "images" ? (
                    <div className="space-y-3">
                      {((formData[field.key] as string[]) || []).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {((formData[field.key] as string[]) || []).map((img, i) => (
                            <div key={i} className="relative">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={img}
                                alt={`foto ${i + 1}`}
                                className="h-20 w-28 object-cover border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(field.key, i)}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="btn-outline-gold text-xs py-1 px-3 inline-block">
                          {uploading ? "Enviando..." : "+ Adicionar fotos"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          disabled={uploading}
                          onChange={(e) => {
                            if (e.target.files?.length) handleImagesUpload(field.key, e.target.files);
                          }}
                        />
                      </label>
                      <p className="font-body text-xs text-muted">
                        {((formData[field.key] as string[]) || []).length} foto(s) adicionada(s)
                      </p>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      className="admin-input"
                      value={String(formData[field.key] || "")}
                      onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}

              {error && <p className="font-body text-xs text-red-400">{error}</p>}
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-3 justify-end">
              <button onClick={closeForm} className="btn-outline-gold text-xs">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={loading || uploading} className="btn-gold text-xs disabled:opacity-50">
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
