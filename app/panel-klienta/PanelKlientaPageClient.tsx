"use client";

import Link from "next/link";
import { ClientLoginForm } from "@/components/client/ClientLoginForm";
import { ClientPanel } from "@/components/client/ClientPanel";
import { DEMO_CLIENT_SESSION } from "@/lib/client-auth-demo";

export function PanelKlientaPageClient() {
  return (
    <div className="space-y-12">
      <div className="max-w-xl">
        <p className="text-sm leading-relaxed text-ink-muted">
          Panel Klienta służy do zgłaszania samochodów w komis. Po zalogowaniu
          dodasz auto ze zdjęciami i wyślesz je do weryfikacji.
        </p>
      </div>

      <div className="max-w-md rounded-2xl border border-border bg-bg-muted/30 p-6">
        <h2 className="text-lg font-semibold text-ink">Logowanie</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Demo: podgląd okna logowania. Prawdziwe logowanie będzie dostępne w
          wersji produkcyjnej.
        </p>
        <div className="mt-6">
          <ClientLoginForm demoOnly />
        </div>
      </div>

      <div className="border-t border-border pt-10">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Podgląd panelu po zalogowaniu (demo)
        </p>
        <ClientPanel session={DEMO_CLIENT_SESSION} demoMode showAllListings />
      </div>

      <Link
        href="/wstaw-auto-w-komis"
        className="inline-flex text-sm font-semibold text-primary hover:underline"
      >
        Dowiedz się jak działa sprzedaż komisowa
      </Link>
    </div>
  );
}
