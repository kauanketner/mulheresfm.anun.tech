import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/data";

export const metadata: Metadata = { title: "Agenda" };

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return {
    day: d.toLocaleDateString("pt-BR", { day: "2-digit" }),
    month: d.toLocaleDateString("pt-BR", { month: "short" }).toUpperCase(),
    year: d.toLocaleDateString("pt-BR", { year: "numeric" }),
  };
}

export default function AgendaPage() {
  const items = db.agenda.getAll();
  const upcoming = items.filter((i) => i.status === "upcoming");
  const past = items.filter((i) => i.status === "past");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream-200 deco-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-4">◆ Agenda</p>
          <h1
            className="font-display text-charcoal-900 max-w-2xl leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Próximos eventos{" "}
            <em className="italic text-gold">e encontros.</em>
          </h1>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {upcoming.length === 0 ? (
            <p className="font-body text-muted text-center py-12">
              Nenhum evento programado no momento. Acompanhe nossas redes sociais.
            </p>
          ) : (
            <div className="space-y-px bg-border">
              {upcoming.map((item) => {
                const d = formatDateShort(item.date);
                return (
                  <article key={item.id} className="bg-cream-100 p-8 grid sm:grid-cols-[80px_1fr_auto] gap-6 items-start group hover:bg-cream-200 transition-colors">
                    {/* Date block */}
                    <div className="text-center border border-gold p-3">
                      <p className="font-body text-xs text-gold font-semibold tracking-wider">
                        {d.month}
                      </p>
                      <p className="font-display text-3xl text-charcoal-900 font-semibold leading-none">
                        {d.day}
                      </p>
                      <p className="font-body text-xs text-muted">{d.year}</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h2 className="font-display text-xl text-charcoal-900 group-hover:text-gold transition-colors">
                        {item.title}
                      </h2>
                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        <span className="font-body text-xs text-muted flex items-center gap-1.5">
                          <span className="text-gold text-xs">◆</span>
                          {item.time} · {formatDate(item.date).split(",")[0]}
                        </span>
                        <span className="font-body text-xs text-muted flex items-center gap-1.5">
                          <span className="text-gold text-xs">◆</span>
                          {item.location}
                        </span>
                      </div>
                      <p className="font-body text-sm text-muted leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                      <p className="font-body text-xs text-charcoal-400">{item.address}</p>
                    </div>

                    {/* CTA */}
                    <div className="shrink-0">
                      {item.registrationUrl && item.registrationUrl !== "#" ? (
                        <a
                          href={item.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold text-xs whitespace-nowrap"
                        >
                          Inscreva-se
                        </a>
                      ) : (
                        <span className="font-body text-xs text-muted bg-cream-300 px-4 py-2 inline-block">
                          Em breve
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Past events */}
      {past.length > 0 && (
        <section className="py-16 bg-cream-200 border-t border-border">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-display text-2xl text-charcoal-600">Eventos Realizados</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-4">
              {past.map((item) => {
                const d = formatDateShort(item.date);
                return (
                  <article key={item.id} className="flex gap-6 items-start opacity-70 hover:opacity-100 transition-opacity">
                    <div className="text-center border border-border p-2 min-w-[64px]">
                      <p className="font-body text-xs text-muted font-semibold">{d.month}</p>
                      <p className="font-display text-2xl text-charcoal-600 leading-none">{d.day}</p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-charcoal-700">{item.title}</h3>
                      <p className="font-body text-xs text-muted mt-1">{item.location}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <Link href="/eventos-anteriores" className="btn-outline-gold text-xs">
                Ver Todos os Eventos Anteriores
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
