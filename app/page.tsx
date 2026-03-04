export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/data";
import GoldDivider from "@/components/GoldDivider";
import HeroImage from "@/components/HeroImage";

export default function Home() {
  const agenda = db.agenda.getAll().filter((a) => a.status === "upcoming");
  const nextEvent = agenda[0];
  const sponsors = db.sponsors.getAll();

  const stats = [
    { value: "200+", label: "Profissionais" },
    { value: "3+", label: "Anos de História" },
    { value: "30+", label: "Encontros Realizados" },
    { value: "8+", label: "Parceiros Estratégicos" },
  ];

  const pillars = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="10" cy="10" r="5" stroke="#D3B257" strokeWidth="1.5" />
          <circle cx="22" cy="10" r="5" stroke="#D3B257" strokeWidth="1.5" />
          <path d="M2 26c0-4.418 3.582-8 8-8h12c4.418 0 8 3.582 8 8" stroke="#D3B257" strokeWidth="1.5" />
        </svg>
      ),
      title: "Eventos e Networking",
      desc: "Realizamos encontros presenciais regulares, visando estimular a colaboração, a troca de conhecimento e a aproximação entre as participantes.",
      link: "/agenda",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4v24M4 16h24" stroke="#D3B257" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="4" y="4" width="24" height="24" rx="2" stroke="#D3B257" strokeWidth="1.5" />
        </svg>
      ),
      title: "Capacitação",
      desc: "Temos um compromisso com a responsabilidade social, promovendo ações que beneficiam nosso mercado e a sociedade, através da capacitação de mulheres para o mercado de trabalho.",
      link: "/proposito",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4l4.5 7H26l-5.5 5 2 7-7-4.5L8 23l2-7L4.5 11H10L16 4z" stroke="#D3B257" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      title: "Atualização e Mentoria",
      desc: "Para mulheres que já têm alguma experiência em Facilities ou Mercado Corporativo e querem seguir evoluindo na carreira.",
      link: "/proposito",
    },
  ];

  const testimonials = [
    {
      quote: "O grupo me deu não só networking, mas um senso de pertencimento que nunca encontrei em nenhum outro espaço profissional.",
      name: "Ana Paula R.",
      role: "Diretora de FM — Grupo Votorantim",
    },
    {
      quote: "Graças às conexões feitas aqui, fechei três contratos estratégicos em menos de seis meses. O grupo gera negócios de verdade.",
      name: "Fernanda M.",
      role: "Gerente de CRE — Itaú Unibanco",
    },
    {
      quote: "A qualidade das conversas e o nível das profissionais é impressionante. Cada encontro me inspira a ir mais longe na carreira.",
      name: "Claudia B.",
      role: "Head of Workplace — BTG Pactual",
    },
  ];

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        {/* Dark left background */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] bg-charcoal-900" aria-hidden="true" />
        {/* Deco pattern on dark side */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] deco-pattern opacity-20 pointer-events-none" aria-hidden="true" />
        {/* Cream right background */}
        <div className="absolute inset-y-0 right-0 w-0 lg:w-[48%] bg-cream-200" aria-hidden="true" />
        {/* Gold separator */}
        <div className="hidden lg:block absolute inset-y-0 left-[52%] w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent z-20" aria-hidden="true" />

        {/* GRID */}
        <div className="relative z-10 h-full grid lg:grid-cols-[52%_48%]">

          {/* LEFT: editorial text */}
          <div className="flex flex-col justify-between px-8 lg:px-14 xl:px-20 pt-28 pb-10">

            {/* Top block */}
            <div>
              <div className="flex items-center gap-3 mb-10 lg:mb-12">
                <div className="h-px w-6 bg-gold flex-shrink-0" />
                <span className="font-body text-[11px] text-gold tracking-[0.3em] uppercase">
                  Mulheres FM &amp; CRE · São Paulo
                </span>
              </div>

              <h1 className="font-display leading-[0.92]" style={{ fontSize: "clamp(3rem, 5.2vw, 5.5rem)" }}>
                <span className="block text-cream-100">O ecossistema</span>
                <span className="block gold-shimmer">feminino</span>
                <span className="block text-cream-100">que transforma</span>
                <span className="block text-charcoal-500">o mercado.</span>
              </h1>

              <div className="gold-line w-20 my-7 lg:my-9" />

              <p className="font-body text-charcoal-400 text-sm leading-relaxed max-w-xs lg:max-w-sm">
                Líderes em Facilities Management e Corporate Real Estate.
                Parcerias reais, negócios estratégicos, impacto transformador.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/quero-fazer-parte" className="btn-gold">
                  Quero Fazer Parte
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
                <Link href="/agenda" className="btn-outline-gold">
                  Ver Agenda
                </Link>
              </div>
            </div>

            {/* Bottom: stats + next event */}
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-charcoal-700">
                {[
                  { value: "200+", label: "Profissionais" },
                  { value: "30+", label: "Encontros" },
                  { value: "3+", label: "Anos" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl lg:text-3xl text-gold">{s.value}</p>
                    <p className="font-body text-[10px] text-charcoal-500 uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {nextEvent && (
                <div className="pt-5 border-t border-charcoal-700">
                  <p className="font-body text-[10px] text-gold tracking-[0.25em] uppercase mb-2">◆ Próximo Evento</p>
                  <Link href={`/agenda/${nextEvent.id}`} className="group flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-cream-100 text-lg leading-snug group-hover:text-gold transition-colors">
                        {nextEvent.title}
                      </p>
                      <p className="font-body text-xs text-charcoal-400 mt-0.5">
                        {new Date(nextEvent.date + "T12:00:00").toLocaleDateString("pt-BR", {
                          day: "numeric", month: "long", year: "numeric",
                        })} · {nextEvent.time} · {nextEvent.location}
                      </p>
                    </div>
                    <svg className="shrink-0 text-gold mt-1" width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: photo anchored at bottom */}
          <div className="hidden lg:flex items-end justify-start bg-cream-200 overflow-hidden">
            <HeroImage />
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="bg-charcoal-900 border-t border-charcoal-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-charcoal-700">
            {stats.map((s) => (
              <div key={s.label} className="px-8 py-8 text-center">
                <p className="font-display text-4xl font-semibold text-gold">{s.value}</p>
                <p className="font-body text-xs text-charcoal-500 tracking-wider uppercase mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <p className="section-label">◆ O Que Fazemos</p>
            <h2 className="section-title">
              Construindo o futuro <em className="italic">juntas</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-cream-100 p-10 group hover:bg-charcoal-900 transition-all duration-500 cursor-default flex flex-col">
                <div className="mb-6">{pillar.icon}</div>
                <h3 className="font-display text-2xl text-charcoal-900 group-hover:text-cream-100 mb-4 transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-muted group-hover:text-charcoal-400 leading-relaxed transition-colors duration-300 flex-1">
                  {pillar.desc}
                </p>
                <div className="mt-8">
                  <Link
                    href={pillar.link}
                    className="font-body text-xs tracking-[0.15em] uppercase text-gold font-semibold group-hover:text-gold-light transition-colors flex items-center gap-2"
                  >
                    Saiba Mais
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section className="py-24 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <GoldDivider className="mb-16" />
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="section-label text-gold">◆ Sobre o Grupo</p>
              <h2
                className="font-display text-cream-100 leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Nascido em São Paulo,{" "}
                <em className="italic text-gold">crescendo em impacto.</em>
              </h2>
              <p className="font-body text-charcoal-400 leading-relaxed">
                Nosso grupo desenvolve parcerias duradouras, promove bons negócios
                e relacionamentos reais, baseado em apoio e trocas contínuas.
              </p>
              <p className="font-body text-charcoal-400 leading-relaxed">
                Somos um farol de empoderamento, engajamento e realização, guiando
                mulheres em Facilities e Corporate Real Estate para alcançar seus
                objetivos e moldar um setor mais inclusivo e igualitário.
              </p>
              <Link href="/proposito" className="btn-outline-gold text-xs">
                Conhecer Nosso Propósito
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "FM", label: "Facilities Management" },
                { n: "CRE", label: "Corporate Real Estate" },
                { n: "ESG", label: "Sustentabilidade" },
                { n: "NET", label: "Networking" },
              ].map((item) => (
                <div key={item.n} className="border border-charcoal-700 p-6 hover:border-gold transition-colors duration-300 group">
                  <p className="font-display text-3xl text-gold font-semibold group-hover:scale-105 transition-transform inline-block">
                    {item.n}
                  </p>
                  <p className="font-body text-xs text-charcoal-500 mt-2 tracking-wide">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <GoldDivider className="mt-16" />
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-24 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <p className="section-label">◆ Depoimentos</p>
            <h2 className="section-title">Histórias que <em className="italic">inspiram</em></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-cream-100 p-8 border-t-2 border-gold card-hover">
                <p className="font-display text-5xl text-gold/20 leading-none mb-4">❝</p>
                <p className="font-body text-charcoal-800 leading-relaxed mb-6 italic text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-body text-sm font-semibold text-charcoal-900">{t.name}</p>
                  <p className="font-body text-xs text-muted mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSORS STRIP ──────────────────────────────────────── */}
      {sponsors.length > 0 && (
        <section className="py-16 bg-cream-100 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-center section-label mb-10">◆ Parceiros Estratégicos</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {sponsors.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl text-charcoal-400 hover:text-gold transition-colors duration-200 font-medium"
                >
                  {s.name}
                </a>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/patrocinadores" className="btn-outline-gold text-xs">
                Ver Todos os Parceiros
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── SEJA UM PATROCINADOR ─────────────────────────────────── */}
      <section className="py-24 bg-cream-200 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-6">
              <p className="section-label">◆ Seja um Patrocinador / Apoiador</p>
              <h2
                className="font-display text-charcoal-900 leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Associe sua marca ao{" "}
                <em className="italic text-gold">empoderamento feminino.</em>
              </h2>
              <Link href="/patrocinadores" className="btn-gold text-xs">
                Saiba Mais
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </div>

            {/* Right: text */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold opacity-30" />
              <div className="pl-8 space-y-4">
                <p className="font-body text-charcoal-700 leading-relaxed">
                  As mulheres desempenham um papel crucial no setor de facilities
                  management. Seja liderando equipes, gerenciando operações ou
                  contribuindo com suas habilidades técnicas e organizacionais,
                  temos uma presença cada vez mais forte nessa área.
                </p>
                <p className="font-body text-charcoal-700 leading-relaxed">
                  A diversidade de gênero traz perspectivas valiosas e promove um
                  ambiente de trabalho mais inclusivo e inovador. As mulheres em
                  Facilities e Corporate Real Estate têm demonstrado liderança,
                  resiliência e expertise em garantir que edifícios e instalações
                  funcionem de maneira eficiente, segura e sustentável.
                </p>
                <p className="font-body text-charcoal-700 leading-relaxed">
                  À medida que mais mulheres continuam a ingressar e a crescer em
                  suas carreiras, mais elas contribuem para moldar um setor
                  dinâmico e em constante evolução, onde o talento e a diversidade
                  são celebrados e valorizados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MULHERES EM FACILITIES CTA ──────────────────────────── */}
      <section className="py-24 bg-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none deco-pattern opacity-30" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8">
          <p className="section-label text-gold">◆ Mulheres em Facilities</p>
          <h2
            className="font-display text-cream-100 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Faça parte você{" "}
            <em className="italic text-gold">também.</em>
          </h2>
          <p className="font-body text-charcoal-400 text-lg leading-relaxed">
            Junte-se a nós e faça parte de uma comunidade dedicada ao avanço
            profissional, à troca de conhecimento e ao empoderamento feminino.
          </p>
          <Link href="/quero-fazer-parte" className="btn-gold">
            FAÇA PARTE VOCÊ TAMBÉM
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
