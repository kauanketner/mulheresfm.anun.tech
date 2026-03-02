import type { Metadata } from "next";
import { db } from "@/lib/data";

export const metadata: Metadata = { title: "Eventos Anteriores" };

function groupByYear<T extends { year: number }>(items: T[]) {
  return items.reduce(
    (acc, item) => {
      const y = item.year;
      if (!acc[y]) acc[y] = [];
      acc[y].push(item);
      return acc;
    },
    {} as Record<number, T[]>
  );
}

export default function EventosAnterioresPage() {
  const events = db.events.getAll().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const byYear = groupByYear(events);
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-charcoal-900 relative overflow-hidden deco-pattern">
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label text-gold mb-4">◆ Eventos Anteriores</p>
          <h1
            className="font-display text-cream-100 max-w-2xl leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Nossa história em{" "}
            <em className="italic text-gold">encontros e conquistas.</em>
          </h1>
          <p className="font-body text-charcoal-400 max-w-lg mt-4 leading-relaxed">
            Cada evento reflete o crescimento do nosso grupo e o impacto que
            estamos gerando no mercado de FM e CRE.
          </p>
        </div>
      </section>

      {/* Events by year */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {events.length === 0 ? (
            <p className="text-center text-muted font-body py-20">
              Nenhum evento cadastrado ainda.
            </p>
          ) : (
            <div className="space-y-20">
              {years.map((year) => (
                <div key={year}>
                  {/* Year header */}
                  <div className="flex items-center gap-6 mb-10">
                    <h2 className="font-display text-5xl text-gold font-semibold">{year}</h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {byYear[year].map((event) => (
                      <article key={event.id} className="bg-cream-200 border border-border card-hover group flex flex-col">
                        {/* Image or placeholder */}
                        <div className="relative overflow-hidden">
                          {event.images && event.images.length > 0 ? (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={event.images[0]}
                                alt={event.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {event.images.length > 1 && (
                                <span className="absolute bottom-2 right-2 bg-charcoal-900/80 text-gold font-body text-xs px-2 py-1">
                                  +{event.images.length - 1} fotos
                                </span>
                              )}
                            </>
                          ) : (
                            <div className="h-44 bg-charcoal-800 flex items-center justify-center relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900" />
                              <div className="relative z-10 text-center px-4">
                                <p className="font-display text-gold text-4xl font-semibold">{year}</p>
                                <p className="font-body text-charcoal-400 text-xs tracking-widest uppercase mt-1">
                                  {new Date(event.date + "T12:00:00").toLocaleDateString("pt-BR", { month: "long" })}
                                </p>
                              </div>
                              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" />
                            </div>
                          )}
                        </div>

                        <div className="p-6 space-y-3 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-body text-xs text-gold font-semibold tracking-wider">
                              {new Date(event.date + "T12:00:00").toLocaleDateString("pt-BR", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            <span className="font-body text-xs text-muted">·</span>
                            <span className="font-body text-xs text-muted">{event.city}</span>
                          </div>
                          <h3 className="font-display text-xl text-charcoal-900 group-hover:text-gold transition-colors leading-snug">
                            {event.title}
                          </h3>
                          <p className="font-body text-xs text-muted flex items-center gap-1.5">
                            <span className="text-gold text-xs">◆</span>
                            {event.location}
                          </p>
                          <p className="font-body text-sm text-charcoal-600 leading-relaxed line-clamp-3">
                            {event.description}
                          </p>
                        </div>

                        {/* Photo strip if multiple images */}
                        {event.images && event.images.length > 1 && (
                          <div className="px-6 pb-4 flex gap-1.5 overflow-x-auto">
                            {event.images.slice(1, 5).map((img, i) => (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                key={i}
                                src={img}
                                alt={`foto ${i + 2}`}
                                className="h-12 w-16 object-cover flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                              />
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
