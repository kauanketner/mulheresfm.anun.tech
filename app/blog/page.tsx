import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/data";

export const metadata: Metadata = { title: "Blog" };

const categoryColors: Record<string, string> = {
  Mercado: "bg-gold/10 text-gold",
  Carreira: "bg-charcoal-100 text-charcoal-700",
  Eventos: "bg-cream-400 text-charcoal-700",
  Insights: "bg-charcoal-900 text-gold",
};

export default function BlogPage() {
  const posts = db.blog
    .getAll()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream-200 deco-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-4">◆ Blog</p>
          <h1
            className="font-display text-charcoal-900 max-w-2xl leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Conteúdo e reflexões{" "}
            <em className="italic text-gold">para profissionais de FM & CRE.</em>
          </h1>
        </div>
      </section>

      {/* Category pills */}
      {categories.length > 0 && (
        <section className="bg-cream-100 py-4 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex gap-3 flex-wrap">
              <span className="font-body text-xs tracking-wider uppercase text-muted py-1.5 px-4 bg-cream-200 font-semibold">
                Todos
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`font-body text-xs tracking-wider uppercase py-1.5 px-4 font-semibold ${
                    categoryColors[cat] || "bg-cream-300 text-charcoal-700"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-muted font-body py-20">
              Nenhum artigo publicado ainda.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {posts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`bg-cream-100 group block card-hover ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Image area */}
                  <div
                    className={`bg-charcoal-800 relative overflow-hidden ${
                      i === 0 ? "h-64" : "h-44"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <span
                        className={`font-body text-xs tracking-wider uppercase font-semibold py-1 px-3 ${
                          categoryColors[post.category] || "bg-cream-300 text-charcoal-700"
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40 group-hover:border-gold transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <p className="font-body text-xs text-gold font-semibold">
                        {new Date(post.date + "T12:00:00").toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <span className="text-border">·</span>
                      <p className="font-body text-xs text-muted">{post.author}</p>
                    </div>
                    <h2
                      className={`font-display text-charcoal-900 group-hover:text-gold transition-colors leading-snug mb-3 ${
                        i === 0 ? "text-3xl" : "text-xl"
                      }`}
                    >
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-muted leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="font-body text-xs text-gold font-semibold tracking-wider uppercase mt-4 flex items-center gap-2 group-hover:gap-3 transition-all">
                      Ler artigo
                      <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
