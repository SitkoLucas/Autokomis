"use client";

import Link from "next/link";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import {
  openFinancingModal,
  openTradeInModal,
  ShareButton,
  StickyVehicleCta,
} from "@/components/vehicles/StickyVehicleCta";
import { formatMileage, formatMonthly, formatPower, formatPrice } from "@/lib/format";
import {
  drivetrainLabel,
  fuelLabel,
  getSimilarVehicles,
  statusLabel,
  transmissionLabel,
  vehicleDisplayName,
  type Vehicle,
} from "@/lib/vehicles";

export function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  const similar = getSimilarVehicles(vehicle, 4);
  const specs = [
    { label: "Rok", value: String(vehicle.year) },
    { label: "Przebieg", value: formatMileage(vehicle.mileage) },
    { label: "Moc", value: formatPower(vehicle.power) },
    { label: "Paliwo", value: fuelLabel(vehicle.fuel) },
    { label: "Skrzynia", value: transmissionLabel(vehicle.transmission) },
    { label: "Napęd", value: drivetrainLabel(vehicle.drivetrain) },
    { label: "Silnik", value: vehicle.engine },
    { label: "Kolor", value: vehicle.color },
    { label: "Nadwozie", value: vehicle.bodyType },
    { label: "Drzwi / miejsca", value: `${vehicle.doors} / ${vehicle.seats}` },
  ];

  const history = [
    { label: "VIN", value: vehicle.vin },
    { label: "Pochodzenie", value: vehicle.origin },
    { label: "Liczba właścicieli", value: String(vehicle.owners) },
    { label: "Historia serwisowa", value: vehicle.serviceHistory },
    {
      label: "Bezwypadkowość",
      value: vehicle.accidentFree ? "Tak (dane demo)" : "Do weryfikacji",
    },
    { label: "Pierwsza rejestracja", value: vehicle.firstRegistration },
  ];

  return (
    <div className="bg-white pb-36 lg:pb-16">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          <Link href="/oferta" className="hover:text-ink">
            Oferta
          </Link>
          <span>/</span>
          <span className="text-ink">{vehicleDisplayName(vehicle)}</span>
        </div>

        <VehicleGallery
          images={vehicle.images}
          alt={vehicleDisplayName(vehicle)}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-12">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {statusLabel(vehicle.status)}
                </span>
                <ShareButton vehicle={vehicle} />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {vehicle.make} {vehicle.model}
                </h1>
                <p className="mt-1 text-lg text-ink-muted">{vehicle.version}</p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
                <span>{vehicle.year}</span>
                <span>{formatMileage(vehicle.mileage)}</span>
                <span>{formatPower(vehicle.power)}</span>
                <span>{fuelLabel(vehicle.fuel)}</span>
                <span>{transmissionLabel(vehicle.transmission)}</span>
                <span>{drivetrainLabel(vehicle.drivetrain)}</span>
              </div>
              <div className="lg:hidden">
                <p className="text-3xl font-semibold text-ink">
                  {formatPrice(vehicle.price)}
                </p>
                <p className="text-sm font-medium text-primary">
                  {formatMonthly(vehicle.monthlyPrice)}
                </p>
              </div>
            </header>

            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Najważniejsze parametry
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-bg-muted/50 px-4 py-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-ink-muted">
                      {s.label}
                    </p>
                    <p className="mt-1 font-semibold text-ink">{s.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Historia samochodu
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Dane demonstracyjne na potrzeby prezentacji.
              </p>
              <dl className="mt-5 divide-y divide-border rounded-3xl border border-border">
                {history.map((h) => (
                  <div
                    key={h.label}
                    className="grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4"
                  >
                    <dt className="text-sm font-medium text-ink-muted">
                      {h.label}
                    </dt>
                    <dd className="text-sm font-semibold text-ink">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">Wyposażenie</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {vehicle.equipment.map((group) => (
                  <div
                    key={group.category}
                    className="rounded-3xl border border-border px-5 py-5"
                  >
                    <h3 className="font-semibold text-ink">{group.category}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">Opis</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted">
                {vehicle.description}
              </p>
            </section>

            <section className="rounded-[2rem] border border-border bg-bg-muted px-6 py-8">
              <h2 className="text-2xl font-semibold text-ink">Finansowanie</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Przykładowa prezentacja raty. Bez prawdziwego kalkulatora
                kredytowego.
              </p>
              <div className="mt-5 flex flex-wrap items-end gap-6">
                <div>
                  <p className="text-sm text-ink-muted">Cena</p>
                  <p className="text-2xl font-semibold text-ink">
                    {formatPrice(vehicle.price)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-ink-muted">Rata</p>
                  <p className="text-2xl font-semibold text-primary">
                    {formatMonthly(vehicle.monthlyPrice)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openFinancingModal()}
                className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Oblicz finansowanie
              </button>
            </section>

            <section className="rounded-[2rem] border border-border px-6 py-8">
              <h2 className="text-2xl font-semibold text-ink">
                Auto w rozliczeniu
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-ink-muted">
                Zostaw dane swojego auta. Formularz zachowa informację, że
                interesuje Cię {vehicleDisplayName(vehicle)}.
              </p>
              <button
                type="button"
                onClick={() => openTradeInModal()}
                className="mt-6 inline-flex rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink hover:bg-bg-muted"
              >
                Zostaw auto w rozliczeniu
              </button>
            </section>
          </div>

          <StickyVehicleCta vehicle={vehicle} />
        </div>

        {similar.length ? (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-ink">
              Podobne samochody
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((v) => (
                <VehicleCard key={v.slug} vehicle={v} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
