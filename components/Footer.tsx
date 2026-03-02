"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-charcoal-900 text-cream-200">
      {/* Top decorative line */}
      <div className="h-px bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              {!logoError ? (
                <Image
                  src="/logo.png"
                  alt="Mulheres FM & CRE"
                  width={160}
                  height={56}
                  className="h-12 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div>
                  <p className="font-display text-2xl font-semibold text-cream-100">
                    Mulheres
                  </p>
                  <p className="font-body text-xs tracking-[0.25em] uppercase text-gold font-semibold">
                    FM & CRE
                  </p>
                </div>
              )}
            </div>
            <p className="font-body text-sm text-charcoal-300 leading-relaxed max-w-xs">
              Ecossistema feminino que conecta profissionais de Facilities
              Management e Corporate Real Estate em São Paulo.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-charcoal-700 flex items-center justify-center text-charcoal-400 hover:border-gold hover:text-gold transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-charcoal-700 flex items-center justify-center text-charcoal-400 hover:border-gold hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-6">
              Navegação
            </p>
            <ul className="space-y-3">
              {[
                { href: "/proposito", label: "Nosso Propósito" },
                { href: "/agenda", label: "Agenda" },
                { href: "/eventos-anteriores", label: "Eventos Anteriores" },
                { href: "/blog", label: "Blog" },
                { href: "/na-midia", label: "Na Mídia" },
                { href: "/patrocinadores", label: "Patrocinadores" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-charcoal-400 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-6">
              Faça Parte
            </p>
            <p className="font-body text-sm text-charcoal-400 leading-relaxed mb-6">
              Junte-se a uma comunidade de profissionais que estão transformando
              o mercado de FM e CRE no Brasil.
            </p>
            <Link href="/quero-fazer-parte" className="btn-outline-gold text-xs">
              Quero Fazer Parte
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-charcoal-600">
            © {new Date().getFullYear()} Mulheres FM & CRE. Todos os direitos reservados.
          </p>
          <a
            href="https://anuntech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-charcoal-600 hover:text-charcoal-400 transition-colors"
          >
            feito com amor por <span className="text-gold">Anuntech</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
