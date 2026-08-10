import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Samochody, które warto kupić`,
    template: `%s | ${site.name}`,
  },
  description:
    "Demo prezentacyjne cyfrowego sprzedawcy autokomisu. Oferta, oględziny, rezerwacja, finansowanie i odkup auta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <DemoBanner />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
