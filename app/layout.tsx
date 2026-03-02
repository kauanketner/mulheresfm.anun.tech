import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mulheres FM & CRE",
    template: "%s | Mulheres FM & CRE",
  },
  description:
    "Ecossistema feminino que conecta profissionais de Facilities Management e Corporate Real Estate em São Paulo.",
  keywords: [
    "facilities management",
    "corporate real estate",
    "mulheres",
    "networking",
    "São Paulo",
  ],
  openGraph: {
    title: "Mulheres FM & CRE",
    description:
      "Ecossistema feminino que conecta profissionais de Facilities Management e Corporate Real Estate.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased bg-cream-100">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
