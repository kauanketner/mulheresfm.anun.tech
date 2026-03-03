import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/data";
import MercadoPagoButton from "@/components/MercadoPagoButton";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const items = db.agenda.getAll();
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = db.agenda.getAll().find((i) => i.id === params.id);
  if (!item) return { title: "Evento não encontrado" };
  return { title: item.title };
}

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

export default function EventDetailPage({ params }: Props) {
  const item = db.agenda.getAll().find((i) => i.id === params.id);
  if (!item) notFound();

  const d = formatDateShort(item.date);

  return (
    <>
      {/* Back nav */}
      <div className="pt-28 pb-4 bg-cream-200 deco-pattern">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/agenda"
            className="inline-flex items-center gap-2 font-body text-xs text-muted hover:text-gold transition-colors tracking-wider uppercase"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Agenda
          </Link>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-cream-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-0">
          <div className="w-full aspect-[16/6] overflow-hidden">
            {item.banner ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.banner}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-700 flex items-center justify-center relative overflow-hidden">
                {/* Deco lines */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gold" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gold" />
                </div>
                <div className="text-center px-8 relative z-10">
                  <p className="font-body text-xs text-gold tracking-widest uppercase mb-3">◆ Mulheres FM &amp; CRE</p>
                  <h2 className="font-display text-white text-2xl md:text-3xl leading-tight max-w-2xl">
                    {item.title}
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event details */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">

            {/* Left: main content */}
            <div>
              {/* Date badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center border border-gold px-4 py-3 min-w-[72px]">
                  <p className="font-body text-xs text-gold font-semibold tracking-wider">{d.month}</p>
                  <p className="font-display text-4xl text-charcoal-900 font-semibold leading-none">{d.day}</p>
                  <p className="font-body text-xs text-muted">{d.year}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-muted tracking-wider uppercase mb-1">
                    ◆ {item.status === "upcoming" ? "Próximo Evento" : "Evento Realizado"}
                  </p>
                  <p className="font-body text-sm text-charcoal-600">
                    {formatDate(item.date)} · {item.time}
                  </p>
                </div>
              </div>

              {/* Title */}
              <h1
                className="font-display text-charcoal-900 leading-tight mb-8"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
              >
                {item.title}
              </h1>

              {/* Location */}
              <div className="flex items-start gap-3 mb-6 p-4 bg-cream-200 border-l-2 border-gold">
                <span className="text-gold mt-0.5">◆</span>
                <div>
                  <p className="font-body text-sm font-semibold text-charcoal-800">{item.location}</p>
                  {item.address && (
                    <p className="font-body text-xs text-muted mt-0.5">{item.address}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <div className="mb-8">
                  <p className="font-body text-base text-charcoal-700 leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              )}
            </div>

            {/* Right: ticket CTA */}
            {(item.mercadoPagoId || (item.registrationUrl && item.registrationUrl !== "#")) && (
              <div className="lg:sticky lg:top-28">
                <div className="border border-gold/40 bg-cream-200 p-6">
                  <p className="section-label mb-3">◆ Ingresso</p>
                  <h3 className="font-display text-xl text-charcoal-900 mb-1 leading-snug">
                    Garanta sua vaga
                  </h3>
                  <p className="font-body text-xs text-muted mb-6 leading-relaxed">
                    Inscreva-se agora e faça parte deste encontro exclusivo para profissionais de FM &amp; CRE.
                  </p>

                  {/* Divider */}
                  <div className="w-8 h-px bg-gold mb-6" />

                  {/* Event quick info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-gold text-xs">◆</span>
                      <span className="font-body text-xs text-charcoal-700">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gold text-xs">◆</span>
                      <span className="font-body text-xs text-charcoal-700">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gold text-xs">◆</span>
                      <span className="font-body text-xs text-charcoal-700">{item.location}</span>
                    </div>
                  </div>

                  {/* Mercado Pago button or fallback */}
                  {item.mercadoPagoId ? (
                    <MercadoPagoButton preferenceId={item.mercadoPagoId} />
                  ) : item.registrationUrl && item.registrationUrl !== "#" ? (
                    <a
                      href={item.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold text-xs w-full text-center block"
                    >
                      Inscreva-se
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
