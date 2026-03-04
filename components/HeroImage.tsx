"use client";

import { useState } from "react";

export default function HeroImage() {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/api/uploads/hero-women.png"
      alt="Mulheres FM & CRE"
      className="h-full max-h-[80vh] w-auto object-contain object-bottom drop-shadow-2xl"
      onError={() => setError(true)}
    />
  );
}
