"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/membros", label: "Membros", icon: "◉" },
  { href: "/admin/agenda", label: "Agenda", icon: "◎" },
  { href: "/admin/inscritos", label: "Inscritos", icon: "◉" },
  { href: "/admin/eventos", label: "Eventos", icon: "◇" },
  { href: "/admin/blog", label: "Blog", icon: "◈" },
  { href: "/admin/patrocinadores", label: "Patrocinadores", icon: "◆" },
  { href: "/admin/midia", label: "Mídia", icon: "◉" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-charcoal-900 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-charcoal-800">
        <Link href="/" className="block">
          <p className="font-display text-lg text-cream-100">Mulheres</p>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold">FM & CRE · Admin</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 font-body text-sm transition-all duration-200 ${
                active
                  ? "bg-gold/10 text-gold border-l-2 border-gold"
                  : "text-charcoal-400 hover:text-cream-100 hover:bg-charcoal-800 border-l-2 border-transparent"
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-charcoal-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2 font-body text-xs text-charcoal-600 hover:text-charcoal-400 transition-colors"
        >
          <span>↗</span> Ver site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 font-body text-xs text-charcoal-600 hover:text-red-400 transition-colors text-left"
        >
          <span>→</span> Sair
        </button>
      </div>
    </aside>
  );
}
