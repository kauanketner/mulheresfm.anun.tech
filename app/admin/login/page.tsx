"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Senha incorreta. Tente novamente.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo area */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border border-gold rotate-45 flex items-center justify-center">
              <span className="-rotate-45 text-gold font-display font-bold text-xs">M</span>
            </div>
          </div>
          <p className="font-display text-2xl text-cream-100">Painel Admin</p>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold">
            Mulheres FM & CRE
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="admin-label text-charcoal-400">Senha de Acesso</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-charcoal-800 border border-charcoal-700 focus:border-gold outline-none text-cream-100 font-body text-sm px-4 py-3 transition-colors"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <p className="font-body text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-gold w-full justify-center disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Acessar Painel"}
          </button>
        </form>

        <p className="text-center">
          <a href="/" className="font-body text-xs text-charcoal-600 hover:text-charcoal-400 transition-colors">
            ← Voltar ao site
          </a>
        </p>
      </div>
    </div>
  );
}
