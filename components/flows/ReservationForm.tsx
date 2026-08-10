"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { SuccessState } from "@/components/ui/SuccessState";
import { formatPrice } from "@/lib/format";
import { submitLeadDemo } from "@/lib/leads";
import {
  addBusinessDays,
  calcDeposit,
  formatBusinessDate,
  getReservableVehicles,
  MAX_RESERVATION_BUSINESS_DAYS,
  MIN_RESERVATION_BUSINESS_DAYS,
} from "@/lib/reservation";
import { vehicleDisplayName, type Vehicle } from "@/lib/vehicles";

function resolveSlug(options: Vehicle[], initialSlug?: string): string {
  if (initialSlug && options.some((v) => v.slug === initialSlug)) {
    return initialSlug;
  }
  return options[0]?.slug ?? "";
}

export function ReservationForm({
  initialSlug,
}: {
  initialSlug?: string;
}) {
  const router = useRouter();
  const options = useMemo(() => getReservableVehicles(), []);
  const [slug, setSlug] = useState(() => resolveSlug(options, initialSlug));
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSlug(resolveSlug(options, initialSlug));
  }, [initialSlug, options]);

  const vehicle: Vehicle | undefined = options.find((v) => v.slug === slug);
  const deposit = vehicle
    ? calcDeposit(vehicle.price, days)
    : { percent: days, amount: 0 };
  const until = addBusinessDays(new Date(), days);

  if (done && vehicle) {
    return (
      <SuccessState
        title="Rezerwacja zgłoszona"
        description={`Skontaktujemy się w sprawie zaliczki ${formatPrice(deposit.amount)} za ${vehicleDisplayName(vehicle)} (do ${formatBusinessDate(until)}).`}
        onClose={() => router.push("/oferta")}
      />
    );
  }

  if (!options.length) {
    return (
      <p className="text-sm text-ink-muted">
        Brak dostępnych pojazdów do rezerwacji. Sprawdź ofertę później.
      </p>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!vehicle) return;
        const fd = new FormData(e.currentTarget);
        const origin =
          typeof window !== "undefined" ? window.location.origin : "";
        setLoading(true);
        await submitLeadDemo({
          type: "reserve",
          name: String(fd.get("name") || ""),
          phone: String(fd.get("phone") || ""),
          vehicle: {
            vehicleSlug: vehicle.slug,
            vehicleName: vehicleDisplayName(vehicle),
            price: vehicle.price,
            vehicleUrl: `${origin}/oferta?slug=${encodeURIComponent(vehicle.slug)}`,
          },
          reservationDays: days,
          depositPercent: deposit.percent,
          depositAmount: deposit.amount,
        });
        setLoading(false);
        setDone(true);
      }}
    >
      <Field label="Pojazd">
        <select
          className={inputClass}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        >
          {options.map((v) => (
            <option key={v.slug} value={v.slug}>
              {vehicleDisplayName(v)} · {formatPrice(v.price)}
            </option>
          ))}
        </select>
      </Field>

      <div>
        <div className="mb-2 flex items-end justify-between gap-3">
          <span className="text-sm font-medium text-ink">
            Liczba dni roboczych
          </span>
          <span className="text-sm font-semibold text-primary">
            {days} {days === 1 ? "dzień" : "dni"} · {deposit.percent}%
          </span>
        </div>
        <input
          type="range"
          min={MIN_RESERVATION_BUSINESS_DAYS}
          max={MAX_RESERVATION_BUSINESS_DAYS}
          step={1}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full accent-primary"
          aria-label="Liczba dni roboczych rezerwacji"
        />
        <div className="mt-1 flex justify-between text-[11px] text-ink-muted">
          <span>{MIN_RESERVATION_BUSINESS_DAYS} dzień</span>
          <span>{MAX_RESERVATION_BUSINESS_DAYS} dni</span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-muted/50 px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Zaliczka
        </p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
          {formatPrice(deposit.amount)}
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {deposit.percent}% ceny przykładowej
          {vehicle ? ` (${formatPrice(vehicle.price)})` : ""}. Rezerwacja do{" "}
          <span className="font-medium text-ink">
            {formatBusinessDate(until)}
          </span>
          .
        </p>
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        1% wartości auta za każdy dzień roboczy (max 10). Po kontakcie i wpłacie
        auto jest zarezerwowane. Niewstawienie się po pojazd w terminie oznacza
        przepadek zaliczki.
      </p>

      <Field label="Imię">
        <input name="name" required className={inputClass} autoComplete="name" />
      </Field>
      <Field label="Telefon">
        <input
          name="phone"
          required
          className={inputClass}
          inputMode="tel"
          autoComplete="tel"
        />
      </Field>

      <Button type="submit" className="w-full" disabled={loading || !vehicle}>
        {loading ? "Wysyłanie..." : "Zgłoś rezerwację"}
      </Button>
    </form>
  );
}
