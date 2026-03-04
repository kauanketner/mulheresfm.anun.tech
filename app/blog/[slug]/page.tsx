export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = db.blog.getAll().find((p) => p.slug === params.slug);
  if (!post) return { title: "Post não encontrado" };
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: Props) {
  const post = db.blog.getAll().find((p) => p.slug === params.slug && p.published);
  if (!post) notFound();

  const related = db.blog
    .getAll()
    .filter((p) => p.published && p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 deco-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/blog"
              className="font-body text-xs text-charcoal-400 hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Blog
            </Link>
            <span className="text-charcoal-700">·</span>
            <span className="font-body text-xs text-gold font-semibold tracking-wider uppercase">
              {post.category}
            </span>
          </div>

          <h1
            className="font-display text-cream-100 leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-6">
            <p className="font-body text-sm text-charcoal-400">
              {post.author}
            </p>
            <span className="text-charcoal-700">·</span>
            <p className="font-body text-sm text-charcoal-400">
              {new Date(post.date + "T12:00:00").toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Gold bar */}
        <div className="h-1 bg-gold-gradient" />
      </section>

      {/* Content */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12">
            {/* Article */}
            <article
              className="
                font-body text-charcoal-800 leading-relaxed
                prose prose-lg
                prose-headings:font-display prose-headings:text-charcoal-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:mb-5 prose-p:text-muted
                prose-strong:text-charcoal-900 prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-6
                prose-li:mb-2 prose-li:text-muted
                max-w-none
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="bg-charcoal-900 p-6 relative">
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/50" />
                <p className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-4">
                  Categoria
                </p>
                <p className="font-display text-xl text-cream-100">{post.category}</p>
              </div>

              {related.length > 0 && (
                <div>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-muted font-semibold mb-4">
                    Artigos Relacionados
                  </p>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/blog/${r.slug}`}
                        className="block group"
                      >
                        <p className="font-display text-charcoal-900 group-hover:text-gold transition-colors leading-snug">
                          {r.title}
                        </p>
                        <p className="font-body text-xs text-muted mt-1">
                          {new Date(r.date + "T12:00:00").toLocaleDateString("pt-BR", {
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="border border-border p-6">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted font-semibold mb-4">
                  Faça Parte
                </p>
                <p className="font-body text-sm text-charcoal-700 leading-relaxed mb-4">
                  Junte-se à nossa comunidade e acesse mais conteúdo exclusivo.
                </p>
                <Link href="/quero-fazer-parte" className="btn-gold text-xs w-full justify-center">
                  Inscreva-se
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Back */}
      <section className="py-12 bg-cream-200 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/blog" className="btn-outline-gold text-xs">
            ← Voltar ao Blog
          </Link>
          <Link href="/quero-fazer-parte" className="btn-gold text-xs">
            Quero Fazer Parte
          </Link>
        </div>
      </section>
    </>
  );
}
