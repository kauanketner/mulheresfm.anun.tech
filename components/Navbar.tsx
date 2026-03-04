"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/proposito", label: "Propósito" },
  { href: "/agenda", label: "Agenda" },
  { href: "/eventos-anteriores", label: "Eventos" },
  { href: "/blog", label: "Blog" },
  { href: "/na-midia", label: "Na Mídia" },
  { href: "/patrocinadores", label: "Patrocinadores" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-100/95 backdrop-blur-md shadow-[0_1px_0_0_#E5DDD0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group"
            aria-label="Mulheres FM & CRE - Início"
          >
            {!logoError ? (
              <Image
                src="/api/uploads/logo.png"
                alt="Mulheres FM & CRE"
                width={140}
                height={48}
                className={`h-10 w-auto object-contain transition-all duration-300 ${
                  // white logo: invert to black on light bg, keep white on dark bg
                  scrolled ? "brightness-0" : "brightness-0"
                } group-hover:opacity-70`}
                style={{
                  filter: "brightness(0)",
                }}
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              /* Text fallback if logo file not found */
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold tracking-wide text-charcoal-900 group-hover:text-gold transition-colors duration-300">
                  Mulheres
                </span>
                <span className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                  FM & CRE
                </span>
              </div>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-xs tracking-[0.12em] uppercase font-semibold transition-colors duration-200 relative group ${
                    active ? "text-gold" : "text-charcoal-700 hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link href="/quero-fazer-parte" className="btn-gold text-xs">
              Fazer Parte
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span className={`block w-6 h-px bg-charcoal-900 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block w-6 h-px bg-charcoal-900 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-charcoal-900 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-screen" : "max-h-0"}`}>
        <div className="bg-cream-100 border-t border-border px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm tracking-[0.12em] uppercase font-semibold transition-colors ${
                  active ? "text-gold" : "text-charcoal-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/quero-fazer-parte" className="btn-gold text-xs self-start">
            Fazer Parte
          </Link>
        </div>
      </div>
    </header>
  );
}
