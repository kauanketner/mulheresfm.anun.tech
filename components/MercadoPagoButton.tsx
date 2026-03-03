"use client";

import { useEffect, useRef } from "react";

interface MercadoPagoButtonProps {
  preferenceId: string;
}

export default function MercadoPagoButton({ preferenceId }: MercadoPagoButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !preferenceId) return;
    ref.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";
    script.setAttribute("data-preference-id", preferenceId);
    script.setAttribute("data-source", "button");
    ref.current.appendChild(script);

    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [preferenceId]);

  return <div ref={ref} />;
}
