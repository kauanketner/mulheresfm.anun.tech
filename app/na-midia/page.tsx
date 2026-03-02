import type { Metadata } from "next";
import { db, type MediaItem } from "@/lib/data";

export const metadata: Metadata = { title: "Na Mídia" };

const typeLabel: Record<MediaItem["type"], string> = {
  magazine: "Revista",
  podcast: "Podcast",
  tv: "TV",
  blog: "Blog",
};

const typeIcon: Record<MediaItem["type"], string> = {
  magazine: "📰",
  podcast: "🎙",
  tv: "📺",
  blog: "✍️",
};

export default function NaMidiaPage() {
  const items = db.media
    .getAll()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const types = ["magazine", "podcast", "tv", "blog"] as MediaItem["type"][];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream-200 deco-pattern relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cream-300/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-4">◆ Na Mídia</p>
          <h1
            className="font-display text-charcoal-900 max-w-2xl leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Nossa presença na{" "}
            <em className="italic text-gold">imprensa especializada.</em>
          </h1>
          <p className="font-body text-muted max-w-lg mt-4 leading-relaxed">
            O trabalho do grupo é reconhecido por veículos de comunicação
            especializados em facilities, real estate e negócios.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-charcoal-900 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-8 justify-center">
            {types.map((t) => {
              const count = items.filter((i) => i.type === t).length;
              return (
                <div key={t} className="text-center">
                  <p className="font-body text-2xl">{typeIcon[t]}</p>
                  <p className="font-display text-2xl text-gold">{count}</p>
                  <p className="font-body text-xs text-charcoal-500 tracking-wider uppercase">
                    {typeLabel[t]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {items.length === 0 ? (
            <p className="text-center text-muted font-body py-20">
              Nenhuma cobertura de mídia cadastrada ainda.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream-100 group hover:bg-charcoal-900 transition-all duration-400 block card-hover flex flex-col"
                >
                  {/* Cover image */}
                  {item.image && (
                    <div className="overflow-hidden h-40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-body text-xs text-gold bg-gold/10 px-3 py-1 font-semibold tracking-wider uppercase">
                        {typeLabel[item.type]}
                      </span>
                      <span className="font-body text-xs text-muted group-hover:text-charcoal-500">
                        {new Date(item.date + "T12:00:00").toLocaleDateString("pt-BR", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {item.outletLogo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.outletLogo}
                        alt={item.outlet}
                        className="h-6 w-auto object-contain mb-2 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    ) : (
                      <p className="font-body text-xs text-gold font-semibold tracking-wide uppercase mb-2 group-hover:text-gold-light">
                        {item.outlet}
                      </p>
                    )}

                    <h2 className="font-display text-xl text-charcoal-900 group-hover:text-cream-100 leading-snug transition-colors flex-1">
                      {item.title}
                    </h2>

                    <div className="mt-6 flex items-center gap-2 font-body text-xs text-gold font-semibold tracking-wider uppercase group-hover:text-gold-light">
                      Acessar
                      <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
