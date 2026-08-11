import type { Metadata } from "next";
import { PanelKlientaPageClient } from "./PanelKlientaPageClient";

export const metadata: Metadata = {
  title: "(Panel Klienta)",
  description:
    "Panel klienta do zgłaszania aut w komis. Demo.",
};

export default function PanelKlientaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Konto klienta
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          (Panel Klienta)
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Zgłaszaj samochody do sprzedaży komisowej i śledź status weryfikacji.
        </p>
      </div>
      <div className="mt-10 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <PanelKlientaPageClient />
      </div>
    </div>
  );
}
