import type { Metadata } from "next";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";

export const metadata: Metadata = { title: "Nosso Propósito" };

const values = [
  {
    title: "Visibilidade",
    desc: "Amplificamos histórias femininas e tornamos visíveis as conquistas das profissionais do setor.",
  },
  {
    title: "Colaboração",
    desc: "Construímos pontes entre concorrentes, fornecedoras e clientes em um ambiente de confiança mútua.",
  },
  {
    title: "Excelência",
    desc: "Elevamos o padrão técnico e comportamental das profissionais de FM e CRE através de educação contínua.",
  },
  {
    title: "Diversidade",
    desc: "Promovemos um mercado mais inclusivo, que reconhece e valoriza diferentes perspectivas e trajetórias.",
  },
  {
    title: "Impacto Social",
    desc: "Contribuímos com a sociedade por meio de ações de recolocação, capacitação e responsabilidade social.",
  },
  {
    title: "Inovação",
    desc: "Estimulamos o pensamento inovador e a adoção de novas tecnologias no mercado imobiliário corporativo.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "Fundação",
    desc: "O grupo nasce em São Paulo com o primeiro encontro reunindo 50 profissionais de FM e CRE.",
  },
  {
    year: "2022",
    title: "Primeiros Parceiros",
    desc: "Estabelecemos as primeiras parcerias estratégicas com entidades do setor imobiliário.",
  },
  {
    year: "2023",
    title: "Expansão",
    desc: "Dobramos nossa base de membros e realizamos o primeiro Fórum Anual com mais de 200 participantes.",
  },
  {
    year: "2023",
    title: "Reconhecimento",
    desc: "O grupo é citado pela imprensa especializada como referência em diversidade no setor de facilities.",
  },
  {
    year: "2024",
    title: "Responsabilidade Social",
    desc: "Lançamos o programa de apoio à recolocação profissional, beneficiando mais de 30 mulheres.",
  },
  {
    year: "2025",
    title: "Próximos Passos",
    desc: "Expansão para outras capitais brasileiras e lançamento da plataforma digital de capacitação.",
  },
];

export default function PropositoPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-cream-200 deco-pattern relative overflow-hidden">
        <div className="absolute top-8 right-8 opacity-20">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="99" stroke="#D3B257" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" stroke="#D3B257" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="40" stroke="#D3B257" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-4">◆ Nosso Propósito</p>
          <h1
            className="font-display text-charcoal-900 max-w-3xl leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Um ecossistema feminino construído{" "}
            <em className="italic gold-shimmer">com propósito.</em>
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="h-1 w-16 bg-gold" />
              <h2 className="font-display text-charcoal-900 text-3xl leading-snug">
                Nossa Missão
              </h2>
              <p className="font-body text-muted leading-relaxed text-lg">
                Proporcionar um espaço onde as profissionais de Facilities e
                Corporate Real Estate possam compartilhar suas histórias,
                desafios e conquistas, contribuindo para a visibilidade e
                valorização das mulheres neste mercado.
              </p>
            </div>
            <div className="bg-charcoal-900 p-10 relative">
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold" />
              <p className="font-display text-5xl text-gold/20 mb-4">❝</p>
              <p className="font-display text-2xl text-cream-100 leading-snug italic">
                &ldquo;Um farol de empoderamento, engajamento e realização.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <p className="section-label">◆ Nossos Valores</p>
            <h2 className="section-title">O que nos guia</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {values.map((v, i) => (
              <div key={i} className="bg-cream-200 p-8 group hover:bg-charcoal-900 transition-all duration-400">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gold text-xs">◆</span>
                  <h3 className="font-display text-xl text-charcoal-900 group-hover:text-cream-100 transition-colors">
                    {v.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-muted group-hover:text-charcoal-400 leading-relaxed transition-colors">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <GoldDivider className="mb-16" />
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="section-label text-gold">◆ Nossa Visão</p>
            <h2
              className="font-display text-cream-100 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Ampliar oportunidades, elevar padrões{" "}
              <em className="italic text-gold">e transformar o setor.</em>
            </h2>
            <p className="font-body text-charcoal-400 leading-relaxed text-lg">
              Com olhos voltados para o futuro, aspiramos ampliar as
              oportunidades de networking, oferecer uma plataforma para
              aquisição contínua de conhecimento e contribuir para elevar a
              autoestima das profissionais da área.
            </p>
          </div>
          <GoldDivider className="mt-16" />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <p className="section-label">◆ Nossa História</p>
            <h2 className="section-title">De onde viemos, para onde vamos</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`bg-cream-200 p-6 border-l-2 border-gold ${
                        i % 2 === 0 ? "md:border-l-0 md:border-r-2" : ""
                      }`}
                    >
                      <p className="font-body text-xs text-gold tracking-[0.2em] uppercase font-semibold mb-2">
                        {item.year}
                      </p>
                      <h3 className="font-display text-xl text-charcoal-900 mb-2">{item.title}</h3>
                      <p className="font-body text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-gold border-2 border-cream-100 shrink-0 z-10" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream-200 border-t border-border">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <p className="section-label">◆ Faça Parte</p>
          <h2 className="font-display text-charcoal-900 text-3xl">
            Compartilhe desse propósito conosco
          </h2>
          <p className="font-body text-muted leading-relaxed">
            Junte-se a uma comunidade que está moldando o futuro do mercado de
            FM e CRE no Brasil.
          </p>
          <Link href="/quero-fazer-parte" className="btn-gold">
            Quero Fazer Parte
          </Link>
        </div>
      </section>
    </>
  );
}
