import type { Metadata } from "next";
import { db, type Sponsor } from "@/lib/data";

export const metadata: Metadata = { title: "Patrocinadores" };

const tierConfig: Record<Sponsor["tier"], { label: string; color: string; size: string }> = {
  gold: { label: "Ouro", color: "text-gold", size: "text-3xl" },
  silver: { label: "Prata", color: "text-charcoal-400", size: "text-2xl" },
  bronze: { label: "Bronze", color: "text-charcoal-500", size: "text-xl" },
};

export default function PatrocinadoresPage() {
  const sponsors = db.sponsors.getAll();
  const gold = sponsors.filter((s) => s.tier === "gold");
  const silver = sponsors.filter((s) => s.tier === "silver");
  const bronze = sponsors.filter((s) => s.tier === "bronze");

  const tiers: { key: Sponsor["tier"]; items: Sponsor[] }[] = [
    { key: "gold", items: gold },
    { key: "silver", items: silver },
    { key: "bronze", items: bronze },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-charcoal-900 relative overflow-hidden deco-pattern">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label text-gold mb-4">◆ Patrocinadores</p>
          <h1
            className="font-display text-cream-100 max-w-2xl leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Parceiros que acreditam{" "}
            <em className="italic text-gold">no poder do coletivo.</em>
          </h1>
          <p className="font-body text-charcoal-400 max-w-lg mt-4 leading-relaxed">
            Empresas que compartilham nossos valores e investem no desenvolvimento
            das mulheres no mercado de FM e CRE.
          </p>
        </div>
      </section>

      {/* Sponsors by tier */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
          {tiers.map(({ key, items }) => {
            if (items.length === 0) return null;
            const cfg = tierConfig[key];
            return (
              <div key={key}>
                <div className="flex items-center gap-6 mb-10">
                  <span className={`font-body text-xs tracking-[0.25em] uppercase font-semibold ${cfg.color}`}>
                    ◆ {cfg.label}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div
                  className={`grid gap-px bg-border ${
                    key === "gold"
                      ? "sm:grid-cols-2"
                      : key === "silver"
                      ? "sm:grid-cols-3"
                      : "sm:grid-cols-4"
                  }`}
                >
                  {items.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cream-100 p-10 flex flex-col items-center justify-center group hover:bg-charcoal-900 transition-all duration-400 min-h-[140px] card-hover"
                    >
                      {s.logo ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.logo}
                            alt={s.name}
                            className="max-h-16 max-w-[160px] object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                          />
                          <p className="font-body text-xs text-muted group-hover:text-charcoal-500 mt-3 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                            Visitar site
                          </p>
                        </>
                      ) : (
                        <>
                          <p
                            className={`font-display font-semibold group-hover:text-cream-100 transition-colors text-center ${cfg.size} ${cfg.color}`}
                          >
                            {s.name}
                          </p>
                          <p className="font-body text-xs text-muted group-hover:text-charcoal-500 mt-2 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                            Visitar site
                          </p>
                        </>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Become sponsor */}
      <section className="py-20 bg-cream-200 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <p className="section-label">◆ Seja um Patrocinador</p>
              <h2 className="font-display text-charcoal-900 text-3xl leading-snug">
                Associe sua marca ao{" "}
                <em className="italic text-gold">empoderamento feminino.</em>
              </h2>
              <p className="font-body text-muted leading-relaxed">
                Torne-se um parceiro estratégico e conecte sua empresa a mais de
                200 profissionais de alto nível do setor de FM e CRE.
              </p>
            </div>
            <div className="bg-charcoal-900 p-8 space-y-4">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold">
                Entre em contato
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="admin-input"
                  disabled
                />
                <input
                  type="email"
                  placeholder="Seu e-mail corporativo"
                  className="admin-input"
                  disabled
                />
                <textarea
                  rows={3}
                  placeholder="Mensagem"
                  className="admin-input resize-none"
                  disabled
                />
              </div>
              <p className="font-body text-xs text-charcoal-500">
                Entre em contato direto: contato@mulheresfmcre.com.br
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
