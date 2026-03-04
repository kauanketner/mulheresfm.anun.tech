"use client";

import { useState, useEffect, useCallback } from "react";

interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  nome: string;
  email: string;
  whatsapp: string;
  cpf: string;
  createdAt: string;
}

export default function AdminInscritosPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/event-registrations");
    const data = await res.json();
    setRegistrations(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string, nome: string) {
    if (!confirm(`Excluir a inscrição de "${nome}"?`)) return;
    setDeleting(id);
    await fetch("/api/event-registrations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
    setDeleting(null);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-charcoal-900">Inscritos em Eventos</h1>
          <p className="font-body text-sm text-muted mt-1">
            {loading ? "Carregando..." : `${registrations.length} inscrição(ões) no total`}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <p className="font-body text-sm text-muted text-center py-16">Carregando...</p>
        ) : registrations.length === 0 ? (
          <p className="font-body text-sm text-muted text-center py-16">
            Nenhuma inscrição recebida ainda.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {["Evento", "Nome", "E-mail", "WhatsApp", "CPF", "Data", ""].map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-4 py-3 font-body text-xs font-semibold text-muted tracking-wider uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-body text-sm font-semibold text-charcoal-900 max-w-[200px]">
                    <span className="truncate block" title={r.eventTitle}>{r.eventTitle}</span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-charcoal-900 whitespace-nowrap">{r.nome}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted">{r.email}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted whitespace-nowrap">{r.whatsapp}</td>
                  <td className="px-4 py-3 font-body text-xs text-muted font-mono whitespace-nowrap">{r.cpf}</td>
                  <td className="px-4 py-3 font-body text-xs text-muted whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(r.id, r.nome)}
                      disabled={deleting === r.id}
                      className="font-body text-xs text-red-500 hover:text-red-700 hover:underline disabled:opacity-40 transition-colors"
                    >
                      {deleting === r.id ? "Excluindo..." : "Excluir"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
