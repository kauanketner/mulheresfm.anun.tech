"use client";

import { useState } from "react";
import MercadoPagoButton from "@/components/MercadoPagoButton";

type FlowState = "idle" | "form" | "payment";

interface FormFields {
  nome: string;
  email: string;
  whatsapp: string;
  cpf: string;
}

interface Props {
  eventId: string;
  eventTitle: string;
  mercadoPagoId?: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

function formatCpf(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function formatWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function canSubmit(f: FormFields): boolean {
  return (
    f.nome.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) &&
    f.whatsapp.replace(/\D/g, "").length === 11 &&
    f.cpf.replace(/\D/g, "").length === 11
  );
}

export default function EventRegistrationForm({
  eventId,
  eventTitle,
  mercadoPagoId,
  eventDate,
  eventTime,
  eventLocation,
}: Props) {
  const [state, setState] = useState<FlowState>("idle");
  const [fields, setFields] = useState<FormFields>({
    nome: "",
    email: "",
    whatsapp: "",
    cpf: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function set(key: keyof FormFields, value: string) {
    setFields((p) => ({ ...p, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit(fields) || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          eventTitle,
          nome: fields.nome.trim(),
          email: fields.email.trim(),
          whatsapp: fields.whatsapp,
          cpf: fields.cpf,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao enviar inscrição");
      }
      setState("payment");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  const quickInfo = [eventDate, eventTime, eventLocation];

  /* ── IDLE ─────────────────────────────────────────────── */
  if (state === "idle") {
    return (
      <div className="border border-gold/40 bg-cream-200 p-6">
        <p className="section-label mb-3">◆ Ingresso</p>
        <h3 className="font-display text-xl text-charcoal-900 mb-1 leading-snug">
          Garanta sua vaga
        </h3>
        <p className="font-body text-xs text-muted mb-6 leading-relaxed">
          Inscreva-se agora e faça parte deste encontro exclusivo para
          profissionais de FM &amp; CRE.
        </p>

        <div className="w-8 h-px bg-gold mb-6" />

        <div className="space-y-2 mb-6">
          {quickInfo.map((info) => (
            <div key={info} className="flex items-center gap-2">
              <span className="text-gold text-xs">◆</span>
              <span className="font-body text-xs text-charcoal-700">{info}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setState("form")}
          className="btn-gold text-xs w-full justify-center"
        >
          Inscreva-se
        </button>
      </div>
    );
  }

  /* ── PAYMENT ──────────────────────────────────────────── */
  if (state === "payment") {
    return (
      <div className="border border-gold/40 bg-cream-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 border border-gold flex items-center justify-center shrink-0">
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path
                d="M2 7l3.5 3.5 6.5-7"
                stroke="#D3B257"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="section-label">◆ Inscrição confirmada</p>
            <p className="font-body text-xs text-muted mt-0.5">Dados salvos com sucesso</p>
          </div>
        </div>

        <div className="w-8 h-px bg-gold mb-5" />

        <h3 className="font-display text-lg text-charcoal-900 mb-2 leading-snug">
          Finalize o pagamento
        </h3>
        <p className="font-body text-xs text-muted mb-5 leading-relaxed">
          Olá,{" "}
          <strong className="text-charcoal-800">
            {fields.nome.split(" ")[0]}
          </strong>
          ! Sua inscrição foi registrada. Clique abaixo para concluir o
          pagamento via Mercado Pago.
        </p>

        {mercadoPagoId ? (
          <MercadoPagoButton preferenceId={mercadoPagoId} />
        ) : (
          <p className="font-body text-xs text-muted italic">
            Link de pagamento em breve.
          </p>
        )}
      </div>
    );
  }

  /* ── FORM ─────────────────────────────────────────────── */
  return (
    <div className="border border-gold/40 bg-cream-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="section-label">◆ Seus dados</p>
        <button
          onClick={() => setState("idle")}
          className="font-body text-xs text-muted hover:text-charcoal-700 transition-colors"
        >
          ← Voltar
        </button>
      </div>

      <h3 className="font-display text-xl text-charcoal-900 mb-1 leading-snug">
        Preencha o formulário
      </h3>
      <p className="font-body text-xs text-muted mb-5 leading-relaxed">
        Todos os campos são obrigatórios para confirmar sua vaga.
      </p>

      <div className="w-8 h-px bg-gold mb-5" />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="admin-label" htmlFor="reg-nome">
            Nome completo
          </label>
          <input
            id="reg-nome"
            type="text"
            autoComplete="name"
            value={fields.nome}
            onChange={(e) => set("nome", e.target.value)}
            placeholder="Seu nome completo"
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label" htmlFor="reg-email">
            E-mail
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="seu@email.com.br"
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label" htmlFor="reg-whatsapp">
            WhatsApp
          </label>
          <input
            id="reg-whatsapp"
            type="tel"
            autoComplete="tel"
            value={fields.whatsapp}
            onChange={(e) => set("whatsapp", formatWhatsapp(e.target.value))}
            placeholder="(11) 99999-9999"
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label" htmlFor="reg-cpf">
            CPF
          </label>
          <input
            id="reg-cpf"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={fields.cpf}
            onChange={(e) => set("cpf", formatCpf(e.target.value))}
            placeholder="000.000.000-00"
            className="admin-input"
          />
        </div>

        {error && (
          <p className="font-body text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit(fields) || submitting}
          className="btn-gold text-xs w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          style={{ transform: "none" }}
        >
          {submitting ? "Enviando..." : "Confirmar inscrição"}
        </button>

        <p className="font-body text-xs text-muted text-center leading-relaxed">
          Seus dados são mantidos em sigilo e usados somente para controle de
          vagas do evento.
        </p>
      </form>
    </div>
  );
}
