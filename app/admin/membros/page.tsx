import { db } from "@/lib/data";

export default function AdminMembrosPage() {
  const members = db.members
    .getAll()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-charcoal-900">Membros Inscritos</h1>
          <p className="font-body text-sm text-muted mt-1">{members.length} inscrição(ões)</p>
        </div>
        <a
          href="/api/members"
          download="membros.json"
          className="btn-outline-gold text-xs"
        >
          Exportar JSON
        </a>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        {members.length === 0 ? (
          <p className="font-body text-sm text-muted text-center py-16">
            Nenhuma inscrição recebida ainda.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {["Nome", "E-mail", "Empresa", "Cargo", "Área", "Cidade/UF", "Como conheceu", "Data"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-body text-xs font-semibold text-muted tracking-wider uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-body text-sm font-semibold text-charcoal-900 whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted">{m.email}</td>
                  <td className="px-4 py-3 font-body text-sm text-charcoal-700">{m.company}</td>
                  <td className="px-4 py-3 font-body text-sm text-charcoal-700">{m.role}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted">{m.area}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted whitespace-nowrap">{m.city} / {m.state}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted">{m.source}</td>
                  <td className="px-4 py-3 font-body text-xs text-muted whitespace-nowrap">
                    {new Date(m.createdAt).toLocaleDateString("pt-BR")}
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
