import Link from "next/link";
import { db } from "@/lib/data";

export default function AdminDashboard() {
  const events = db.events.getAll();
  const agenda = db.agenda.getAll();
  const blog = db.blog.getAll();
  const sponsors = db.sponsors.getAll();
  const media = db.media.getAll();
  const members = db.members.getAll();

  const stats = [
    { label: "Membros Inscritos", value: members.length, href: "/admin/membros", color: "text-gold" },
    { label: "Eventos na Agenda", value: agenda.filter(a => a.status === "upcoming").length, href: "/admin/agenda", color: "text-blue-400" },
    { label: "Posts no Blog", value: blog.filter(p => p.published).length, href: "/admin/blog", color: "text-green-400" },
    { label: "Patrocinadores", value: sponsors.length, href: "/admin/patrocinadores", color: "text-purple-400" },
    { label: "Eventos Anteriores", value: events.length, href: "/admin/eventos", color: "text-orange-400" },
    { label: "Cobertura de Mídia", value: media.length, href: "/admin/midia", color: "text-pink-400" },
  ];

  const recentMembers = members
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-charcoal-900">Dashboard</h1>
        <p className="font-body text-sm text-muted mt-1">
          Bem-vinda ao painel de administração Mulheres FM & CRE
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white border border-gray-200 p-6 hover:border-gold transition-colors group"
          >
            <p className={`font-display text-4xl font-semibold ${s.color} group-hover:scale-110 transition-transform inline-block`}>
              {s.value}
            </p>
            <p className="font-body text-xs text-muted mt-2 tracking-wide uppercase">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent members */}
      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-charcoal-900">Inscrições Recentes</h2>
          <Link href="/admin/membros" className="font-body text-xs text-gold hover:text-gold-dark">
            Ver todas →
          </Link>
        </div>
        {recentMembers.length === 0 ? (
          <p className="font-body text-sm text-muted text-center py-8">
            Nenhuma inscrição ainda.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentMembers.map((m) => (
              <div key={m.id} className="py-4 flex items-start justify-between">
                <div>
                  <p className="font-body text-sm font-semibold text-charcoal-900">{m.name}</p>
                  <p className="font-body text-xs text-muted mt-0.5">{m.company} · {m.role}</p>
                  <p className="font-body text-xs text-muted">{m.email}</p>
                </div>
                <p className="font-body text-xs text-muted shrink-0">
                  {new Date(m.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
