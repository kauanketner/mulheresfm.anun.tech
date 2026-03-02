"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  area: string;
  city: string;
  state: string;
  source: string;
  message: string;
}

const steps = [
  { field: "name", question: "Qual é o seu nome completo?", type: "text", placeholder: "Digite seu nome..." },
  { field: "email", question: "Qual é o seu e-mail profissional?", type: "email", placeholder: "seu@email.com.br" },
  { field: "company", question: "Em qual empresa você trabalha?", type: "text", placeholder: "Nome da empresa..." },
  { field: "role", question: "Qual é o seu cargo?", type: "text", placeholder: "Ex: Gerente de Facilities, Diretora de CRE..." },
  {
    field: "area",
    question: "Qual é a sua área de atuação?",
    type: "select",
    options: [
      "Facilities Management",
      "Corporate Real Estate",
      "Property Management",
      "Workplace",
      "Sustentabilidade / ESG",
      "Outro",
    ],
  },
  {
    field: "city",
    question: "Em qual cidade você está baseada?",
    type: "text",
    placeholder: "Ex: São Paulo...",
  },
  {
    field: "state",
    question: "E qual é o estado?",
    type: "select",
    options: ["SP", "RJ", "MG", "RS", "PR", "SC", "BA", "PE", "CE", "DF", "GO", "MT", "MS", "ES", "AM", "PA", "Outro"],
  },
  {
    field: "source",
    question: "Como você ficou sabendo do nosso grupo?",
    type: "select",
    options: [
      "Indicação de colega",
      "LinkedIn",
      "Instagram",
      "Evento do setor",
      "Imprensa / Notícia",
      "Outro",
    ],
  },
  {
    field: "message",
    question: "Há algo que você gostaria de compartilhar? (opcional)",
    type: "textarea",
    placeholder: "O que te motivou a fazer parte? Quais são seus objetivos...",
  },
];

const states = ["SP", "RJ", "MG", "RS", "PR", "SC", "BA", "PE", "CE", "DF", "GO", "MT", "MS", "ES", "AM", "PA", "Outro"];

export default function QueroFazerPartePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    area: "",
    city: "",
    state: "",
    source: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const current = steps[step];
  const progress = ((step) / steps.length) * 100;
  const isLast = step === steps.length - 1;

  const currentValue = form[current?.field as keyof FormData] || "";

  function handleChange(value: string) {
    setForm((prev) => ({ ...prev, [current.field]: value }));
  }

  function canProceed() {
    if (current?.field === "message") return true; // optional
    return currentValue.trim().length > 0;
  }

  async function next() {
    if (!canProceed()) return;
    if (isLast) {
      await submit();
    } else {
      setStep((s) => s + 1);
    }
  }

  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao enviar");
      setSubmitted(true);
    } catch {
      setError("Ocorreu um erro. Por favor, tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center space-y-8">
          {/* Diamond ornament */}
          <div className="flex justify-center">
            <div className="w-16 h-16 border-2 border-gold rotate-45 flex items-center justify-center">
              <svg className="-rotate-45" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M5 12l5 5 9-9" stroke="#D3B257" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="font-display text-4xl text-cream-100 mb-4">
              Bem-vinda, {form.name.split(" ")[0]}!
            </h1>
            <p className="font-body text-charcoal-400 leading-relaxed text-lg">
              Sua inscrição foi recebida com sucesso. Nossa equipe entrará em
              contato em breve para dar as boas-vindas ao grupo.
            </p>
          </div>
          <div className="h-px bg-gold/20" />
          <p className="font-body text-charcoal-500 text-sm">
            Enquanto isso, siga-nos no LinkedIn e Instagram para acompanhar
            novidades e conteúdos do grupo.
          </p>
          <Link href="/" className="btn-gold inline-flex">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900 flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-charcoal-800">
        <div
          className="h-full bg-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-800">
        <Link href="/" className="font-display text-lg text-cream-100 hover:text-gold transition-colors">
          Mulheres{" "}
          <span className="font-body text-xs tracking-[0.2em] uppercase text-gold">FM & CRE</span>
        </Link>
        <span className="font-body text-xs text-charcoal-500">
          {step + 1} / {steps.length}
        </span>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full space-y-8">
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-gold font-semibold tracking-[0.2em] uppercase">
              {String(step + 1).padStart(2, "0")}
            </span>
            <span className="text-charcoal-700">→</span>
          </div>

          {/* Question */}
          <h2
            className="font-display text-cream-100 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            {current.question}
          </h2>

          {/* Input */}
          <div>
            {current.type === "text" || current.type === "email" ? (
              <input
                type={current.type}
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                placeholder={current.placeholder || ""}
                autoFocus
                className="w-full bg-transparent border-b-2 border-charcoal-700 focus:border-gold outline-none text-cream-100 font-body text-xl py-3 transition-colors placeholder-charcoal-600"
              />
            ) : current.type === "textarea" ? (
              <textarea
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={current.placeholder || ""}
                autoFocus
                rows={4}
                className="w-full bg-charcoal-800 border border-charcoal-700 focus:border-gold outline-none text-cream-100 font-body text-base p-4 transition-colors placeholder-charcoal-600 resize-none"
              />
            ) : current.type === "select" ? (
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
                {current.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      handleChange(opt);
                    }}
                    className={`font-body text-sm text-left px-5 py-3 border transition-all duration-200 ${
                      currentValue === opt
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-charcoal-700 text-charcoal-300 hover:border-charcoal-500"
                    }`}
                  >
                    {currentValue === opt && (
                      <span className="mr-2 text-gold">◆</span>
                    )}
                    {opt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Error */}
          {error && (
            <p className="font-body text-sm text-red-400">{error}</p>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={next}
              disabled={!canProceed() || submitting}
              className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Enviando..."
                : isLast
                ? "Enviar inscrição"
                : "Próximo"}
              {!isLast && !submitting && (
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {step > 0 && (
              <button
                onClick={prev}
                className="font-body text-xs text-charcoal-500 hover:text-charcoal-300 transition-colors tracking-wider uppercase"
              >
                ← Voltar
              </button>
            )}

            {current.field === "message" && !isLast && (
              <button
                onClick={() => { handleChange(""); next(); }}
                className="font-body text-xs text-charcoal-600 hover:text-charcoal-400 transition-colors"
              >
                Pular
              </button>
            )}
          </div>

          <p className="font-body text-xs text-charcoal-700">
            {current.type !== "textarea"
              ? "Pressione Enter ↵ para avançar"
              : "Clique em Enviar quando estiver pronta"}
          </p>
        </div>
      </div>
    </div>
  );
}
