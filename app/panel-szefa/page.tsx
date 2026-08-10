import type { Metadata } from "next";
import { BossPanel } from "@/components/boss/BossPanel";

export const metadata: Metadata = {
  title: "(Panel Szefa)",
  description:
    "Panel zarządzania ofertą, rezerwacjami i zgłoszeniami sprzedaży. Demo.",
};

export default function PanelSzefaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Dostęp wewnętrzny
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          (Panel Szefa)
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Dodawanie aut do oferty, podgląd rezerwacji i zgłoszeń sprzedaży od
          klientów. Docelowo panel wymaga logowania.
        </p>
      </div>
      <div className="mt-10 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <BossPanel />
      </div>
    </div>
  );
}
