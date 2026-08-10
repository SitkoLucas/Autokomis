import type { Metadata } from "next";
import { ReservationForm } from "@/components/flows/ReservationForm";
import { MAX_RESERVATION_BUSINESS_DAYS } from "@/lib/reservation";

export const metadata: Metadata = {
  title: "Rezerwacje",
  description:
    "Zarezerwuj samochód z oferty. Zaliczka 1% ceny za każdy dzień roboczy, maksymalnie 10 dni.",
};

export default async function RezerwacjePage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const params = await searchParams;
  const initialSlug = params.slug?.trim() || undefined;

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Rezerwacje
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          Zarezerwuj pojazd
        </h1>
        <p className="mt-4 text-ink-muted">
          Wybierz auto i liczbę dni roboczych. Zaliczka wylicza się automatycznie:
          1% wartości pojazdu za każdy dzień, maksymalnie {MAX_RESERVATION_BUSINESS_DAYS}{" "}
          dni ({MAX_RESERVATION_BUSINESS_DAYS}%).
        </p>
        <ul className="mt-8 space-y-3 text-sm text-ink-muted">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Zgłoszenie online, potwierdzenie i wpłata po kontakcie z komisem.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Po wpłacie auto jest zarezerwowane na wybrany okres.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Niewstawienie się po pojazd w terminie oznacza przepadek zaliczki.
          </li>
        </ul>
        <p className="mt-8 text-xs text-ink-muted">
          Formularz działa w trybie demo: zapisuje lead lokalnie, bez wysyłki na
          serwer.
        </p>
      </div>
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Formularz rezerwacji</h2>
        <div className="mt-5">
          <ReservationForm initialSlug={initialSlug} />
        </div>
      </div>
    </div>
  );
}
