import { db } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function AdminInscritosPage() {
  const registrations = db.eventRegistrations
    .getAll()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-charcoal-900">Inscritos em Eventos</h1>
          <p className="font-body text-sm text-muted mt-1">
            {registrations.length} inscrição(ões) no total
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        {registrations.length === 0 ? (
          <p className="font-body text-sm text-muted text-center py-16">
            Nenhuma inscrição recebida ainda.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {["Evento", "Nome", "E-mail", "WhatsApp", "CPF", "Data"].map((h) => (
                  <th
                    key={h}
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
                    <span className="truncate block" title={r.eventTitle}>
                      {r.eventTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-charcoal-900 whitespace-nowrap">
                    {r.nome}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-muted">
                    {r.email}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-muted whitespace-nowrap">
                    {r.whatsapp}
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-muted font-mono whitespace-nowrap">
                    {r.cpf}
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-muted whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString("pt-BR")}
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
